import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { yearWorkId: string; barGroupId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const { name } = body;
    const { yearWorkId, barGroupId } = params;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

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
            "El año de trabajo informado no existe. Para poder actualizar el grupo de barra se debe informar el año de trabajo que exista.",
        },
        { status: 400 }
      );
    }

    const currentBarGroup = await prismadb.barGroup.findFirst({
      where: {
        name,
        id: { not: barGroupId },
      },
    });

    if (currentBarGroup) {
      return NextResponse.json(
        {
          errorMessage:
            "El nuevo nombre del grupo de barra ya existe. Inténtalo de nuevo con otro nombre.",
        },
        { status: 400 }
      );
    }

    const barGroup = await prismadb.barGroup.updateMany({
      where: {
        id: barGroupId,
      },
      data: {
        yearWorkId,
        name,
      },
    });

    return NextResponse.json(barGroup);
  } catch (error) {
    console.log("[BAR_GROUP_PATCH]: ", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { yearWorkId: string; barGroupId: string } }
) {
  try {
    const { userId } = auth();

    const { barGroupId } = params;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!barGroupId) {
      return new NextResponse(
        "No se ha especificado el ID del grupo de barra",
        {
          status: 400,
        }
      );
    }

    await prismadb.clientsOnBarGroups.deleteMany({
      where: {
        barGroupId,
      },
    });

    await prismadb.turn.deleteMany({
      where: {
        barGroupId,
      },
    });

    const barGroup = await prismadb.barGroup.deleteMany({
      where: {
        id: barGroupId,
      },
    });

    return NextResponse.json(barGroup);
  } catch (error) {
    console.log("[BAR_GROUP_DELETE]: ", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
