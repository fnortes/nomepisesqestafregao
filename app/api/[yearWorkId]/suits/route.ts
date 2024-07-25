import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";

export async function POST(
  req: NextRequest,
  { params }: { params: { yearWorkId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const {
      ageGroup,
      comments,
      gender,
      paid,
      suitGroup,
      total,
      unitPrice,
      units,
    } = body;
    const { yearWorkId } = params;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (
      !gender ||
      !ageGroup ||
      !suitGroup ||
      (!total && total !== 0) ||
      (!unitPrice && unitPrice !== 0) ||
      (!units && units !== 0) ||
      !yearWorkId ||
      (!paid && paid !== 0)
    ) {
      return new NextResponse(
        "Algunos de los campos obligatorios no han sido enviados.",
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
            "El año de trabajo informado no existe. Para poder crear un nuevo traje se debe informar el año.",
        },
        { status: 400 }
      );
    }

    const currentSuit = await prismadb.suit.findFirst({
      where: {
        ageGroup,
        gender,
        suitGroup,
        yearWorkId,
      },
    });

    if (currentSuit) {
      return NextResponse.json(
        {
          errorMessage:
            "Ya existe otro traje para el mismo grupo de edad, grupo de precio, género y año de trabajo. Inténtalo de nuevo con otros datos distintos.",
        },
        { status: 400 }
      );
    }

    const suit = await prismadb.suit.create({
      data: {
        ageGroup,
        comments,
        gender,
        paid,
        suitGroup,
        total,
        unitPrice,
        units,
        yearWorkId,
      },
    });

    return NextResponse.json(suit);
  } catch (error) {
    console.log("[SUIT_POST]: ", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
