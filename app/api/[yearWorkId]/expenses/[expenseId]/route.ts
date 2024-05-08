import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { yearWorkId: string; expenseId: string } }
) {
  try {
    const { userId } = auth();
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
    const { yearWorkId, expenseId } = params;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

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
            "El año de trabajo informado no existe. Para poder actualizar el comparsista se debe informar un año de trabajo que exista.",
        },
        { status: 400 }
      );
    }

    const currentExpense = await prismadb.expense.findFirst({
      where: {
        expenseCategoryId,
        title,
        yearWorkId,
        id: { not: expenseId },
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

    const expense = await prismadb.expense.update({
      where: {
        id: expenseId,
      },
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
    console.log("[EXPENSE_PATCH]: ", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { yearWorkId: string; expenseId: string } }
) {
  try {
    const { userId } = auth();

    const { expenseId } = params;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!expenseId) {
      return new NextResponse(
        "No se ha especificado el ID del gasto a eliminar.",
        {
          status: 400,
        }
      );
    }

    const expense = await prismadb.expense.deleteMany({
      where: {
        id: expenseId,
      },
    });

    return NextResponse.json(expense);
  } catch (error) {
    console.log("[EXPENSE_DELETE]: ", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
