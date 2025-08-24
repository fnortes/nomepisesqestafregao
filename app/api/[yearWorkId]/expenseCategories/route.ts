import { NextRequest, NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { family, name, previousYearWorkUnitsConsumed, comments } = body;

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

    const expenseCategory = await prismadb.expenseCategory.create({
      data: {
        family,
        name,
        comments,
        previousYearWorkUnitsConsumed,
      },
    });

    return NextResponse.json(expenseCategory);
  } catch (error) {
    console.log("[EXPENSE_CATEGORY_POST]: ", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
