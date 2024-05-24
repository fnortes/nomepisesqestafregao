import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { yearWorkId: string; suitId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const { comments, price, paid, ageGroup, gender } = body;
    const { yearWorkId, suitId } = params;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (
      !gender ||
      !ageGroup ||
      (!price && price !== 0) ||
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
            "El año de trabajo informado no existe. Para poder actualizar el traje se debe informar un año de trabajo que exista.",
        },
        { status: 400 }
      );
    }

    const currentSuit = await prismadb.suit.findFirst({
      where: {
        ageGroup,
        gender,
        yearWorkId,
        id: { not: suitId },
      },
    });

    if (currentSuit) {
      return NextResponse.json(
        {
          errorMessage:
            "Ya existe otro traje para el mismo grupo de edad, género y año de trabajo. Inténtalo de nuevo con otros datos distintos.",
        },
        { status: 400 }
      );
    }

    const suit = await prismadb.suit.update({
      where: {
        id: suitId,
      },
      data: {
        comments,
        paid,
        price,
        ageGroup,
        gender,
        yearWorkId,
      },
    });

    return NextResponse.json(suit);
  } catch (error) {
    console.log("[SUIT_PATCH]: ", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { yearWorkId: string; suitId: string } }
) {
  try {
    const { userId } = auth();

    const { suitId } = params;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!suitId) {
      return new NextResponse(
        "No se ha especificado el ID de la comida a eliminar.",
        {
          status: 400,
        }
      );
    }

    const suit = await prismadb.suit.deleteMany({
      where: {
        id: suitId,
      },
    });

    return NextResponse.json(suit);
  } catch (error) {
    console.log("[SUIT_DELETE]: ", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}