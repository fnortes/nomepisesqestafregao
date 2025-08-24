import prismadb from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { yearWorkId: string; turnId: string } }
) {
  try {
    const body = await req.json();

    const { startDate, endDate, barGroupId } = body;
    const { yearWorkId, turnId } = params;

    if (!startDate || !endDate || !barGroupId || !yearWorkId) {
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
            "El año de trabajo informado no existe. Para poder actualizar el comparsista se debe informar un año de trabajo que exista.",
        },
        { status: 400 }
      );
    }

    const currentTurn = await prismadb.turn.findFirst({
      where: {
        startDate,
        endDate,
        barGroup: {
          yearWorkId,
        },
        id: { not: turnId },
      },
    });

    if (currentTurn) {
      return NextResponse.json(
        {
          errorMessage:
            "Ya existe otro turno para el mismo horario y el mismo año de trabajo. Inténtalo de nuevo con otros distintos.",
        },
        { status: 400 }
      );
    }

    const turn = await prismadb.turn.update({
      where: {
        id: turnId,
      },
      data: {
        endDate,
        startDate,
        barGroupId,
      },
    });

    return NextResponse.json(turn);
  } catch (error) {
    console.log("[TURN_PATCH]: ", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { yearWorkId: string; turnId: string } }
) {
  try {
    const { turnId } = params;

    if (!turnId) {
      return new NextResponse(
        "No se ha especificado el ID del turno a eliminar.",
        {
          status: 400,
        }
      );
    }

    const turn = await prismadb.turn.deleteMany({
      where: {
        id: turnId,
      },
    });

    return NextResponse.json(turn);
  } catch (error) {
    console.log("[TURN_DELETE]: ", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
