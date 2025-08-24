import { NextRequest, NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";

export async function POST(
  req: NextRequest,
  { params }: { params: { yearWorkId: string } }
) {
  try {
    const body = await req.json();

    const {
      comments,
      description,
      estimatedUnits,
      expenseCategoryId,
      paid,
      previousYearWorkUnits,
      title,
      total,
      unitPrice,
      units,
    } = body;
    const { yearWorkId } = params;

    if (
      (!estimatedUnits && estimatedUnits !== 0) ||
      !expenseCategoryId ||
      (!paid && paid !== 0) ||
      (!previousYearWorkUnits && previousYearWorkUnits !== 0) ||
      !title ||
      (!total && total !== 0) ||
      (!unitPrice && unitPrice !== 0) ||
      (!units && units !== 0) ||
      !yearWorkId
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
            "El año de trabajo informado no existe. Para poder crear un nuevo comparsista se debe informar el año.",
        },
        { status: 400 }
      );
    }

    const currentExpense = await prismadb.expense.findFirst({
      where: {
        expenseCategoryId,
        title,
      },
    });

    if (currentExpense) {
      return NextResponse.json(
        {
          errorMessage:
            "Ya existe otro gasto con este nombre, para la misma categoría. Inténtalo de nuevo con otros distintos.",
        },
        { status: 400 }
      );
    }

    const expense = await prismadb.expense.create({
      data: {
        yearWorkId,
        expenseCategoryId,
        title,
        comments,
        description,
        previousYearWorkUnits,
        estimatedUnits,
        units,
        unitPrice,
        total,
        paid,
      },
    });

    return NextResponse.json(expense);
  } catch (error) {
    console.log("[EXPENSE_POST]: ", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
