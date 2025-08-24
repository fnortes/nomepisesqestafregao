import { NextRequest, NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";

export async function POST(
  req: NextRequest,
  { params }: { params: { yearWorkId: string } }
) {
  try {
    const body = await req.json();

    const { name } = body;
    const { yearWorkId } = params;

    if (!name || !yearWorkId) {
      return new NextResponse(
        "Algunos de los campos obligatorios no ha sido enviado.",
        { status: 400 }
      );
    }

    const currentYearWork = await prismadb.yearWork.findFirst({
      where: { id: yearWorkId },
    });

    if (currentYearWork === null) {
      return NextResponse.json(
        {
          errorMessage:
            "El año de trabajo informado no existe. Para poder crear un nuevo grupo de barra se debe informar el año.",
        },
        { status: 400 }
      );
    }

    const currentBarGroup = await prismadb.barGroup.findFirst({
      where: {
        name,
        yearWorkId,
      },
    });

    if (currentBarGroup) {
      return NextResponse.json(
        {
          errorMessage:
            "El nuevo grupo de barra ya existe. Inténtalo de nuevo con otro nombre.",
        },
        { status: 400 }
      );
    }

    const barGroup = await prismadb.barGroup.create({
      data: {
        name,
        yearWorkId,
      },
    });

    return NextResponse.json(barGroup);
  } catch (error) {
    console.log("[BAR_GROUP_POST]: ", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
