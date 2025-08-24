import prismadb from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { yearWorkId: string; foodId: string } }
) {
  try {
    const body = await req.json();

    const { comments, title, paid, price, date, description } = body;
    const { yearWorkId, foodId } = params;

    if (
      (!price && price !== 0) ||
      !title ||
      !date ||
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
            "El año de trabajo informado no existe. Para poder actualizar la comida se debe informar un año de trabajo que exista.",
        },
        { status: 400 }
      );
    }

    const currentFood = await prismadb.food.findFirst({
      where: {
        date,
        title,
        id: { not: foodId },
      },
    });

    if (currentFood) {
      return NextResponse.json(
        {
          errorMessage:
            "Ya existe otra comida con este título y para la misma fecha. Inténtalo de nuevo con otros datos distintos.",
        },
        { status: 400 }
      );
    }

    const food = await prismadb.food.update({
      where: {
        id: foodId,
      },
      data: {
        comments,
        date,
        description,
        paid,
        price,
        title,
        yearWorkId,
      },
    });

    return NextResponse.json(food);
  } catch (error) {
    console.log("[FOOD_PATCH]: ", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { yearWorkId: string; foodId: string } }
) {
  try {
    const { foodId } = params;

    if (!foodId) {
      return new NextResponse(
        "No se ha especificado el ID de la comida a eliminar.",
        {
          status: 400,
        }
      );
    }

    const food = await prismadb.food.deleteMany({
      where: {
        id: foodId,
      },
    });

    return NextResponse.json(food);
  } catch (error) {
    console.log("[FOOD_DELETE]: ", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
