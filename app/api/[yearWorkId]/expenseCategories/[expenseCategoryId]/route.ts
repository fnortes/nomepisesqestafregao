import prismadb from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { expenseCategoryId: string } }
) {
  try {
    const body = await req.json();

    const { family, name, previousYearWorkUnitsConsumed, comments } = body;
    const { expenseCategoryId } = params;

    if (!family || !name || previousYearWorkUnitsConsumed === undefined) {
      return new NextResponse(
        "Algunos de los campos obligatorios no han sido enviados.",
        { status: 400 }
      );
    }

    const currentExpenseCategory = await prismadb.expenseCategory.findFirst({
      where: {
        family,
        name,
        id: { not: expenseCategoryId },
      },
    });

    if (currentExpenseCategory) {
      return NextResponse.json(
        {
          errorMessage:
            "Ya existe otra categorías de gastos para la misma familia y con el mismo nombre. Inténtalo de nuevo con otros distintos.",
        },
        { status: 400 }
      );
    }

    const expenseCategory = await prismadb.expenseCategory.update({
      where: {
        id: expenseCategoryId,
      },
      data: {
        family,
        name,
        comments,
        previousYearWorkUnitsConsumed,
      },
    });

    return NextResponse.json(expenseCategory);
  } catch (error) {
    console.log("[EXPENSE_CATEGORY_PATCH]: ", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { expenseCategoryId: string } }
) {
  try {
    const { expenseCategoryId } = params;

    if (!expenseCategoryId) {
      return new NextResponse(
        "No se ha especificado el ID de la categoría de gastos a eliminar.",
        {
          status: 400,
        }
      );
    }

    const expenseCategory = await prismadb.expenseCategory.deleteMany({
      where: {
        id: expenseCategoryId,
      },
    });

    return NextResponse.json(expenseCategory);
  } catch (error) {
    console.log("[EXPENSE_CATEGORY_DELETE]: ", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
