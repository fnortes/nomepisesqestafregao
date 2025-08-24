import { NextRequest, NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";

export async function POST(
  req: NextRequest,
  { params }: { params: { yearWorkId: string } }
) {
  try {
    const body = await req.json();

    const { comments, title, price, date, description, paid } = body;
    const { yearWorkId } = params;

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
            "El año de trabajo informado no existe. Para poder crear una nueva comida se debe informar el año.",
        },
        { status: 400 }
      );
    }

    const currentFood = await prismadb.food.findFirst({
      where: {
        title,
        date,
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

    const food = await prismadb.food.create({
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
    console.log("[FOOD_POST]: ", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
