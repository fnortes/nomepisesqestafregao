import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { AgeGroup } from "@prisma/client";
import { differenceInDays } from "date-fns";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { yearWorkId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const { yearToRefreshEstimated } = body;
    const { yearWorkId } = params;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!yearToRefreshEstimated || !yearWorkId) {
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
            "El año de trabajo informado no existe. Para poder refrescar los cálculos estimados de los gastos se debe informar un año de trabajo actual que exista.",
        },
        { status: 400 }
      );
    }

    const previousYearWork = await prismadb.yearWork.findFirst({
      where: { id: yearToRefreshEstimated },
    });

    if (previousYearWork === null) {
      return NextResponse.json(
        {
          errorMessage:
            "El año de trabajo previo informado no existe. Para poder refrescar los cálculos estimados de los gastos se debe informar un año de trabajo anterior que exista.",
        },
        { status: 400 }
      );
    }

    const previousTotalAdults = await prismadb.client.count({
      where: {
        yearWorkId: previousYearWork.id,
        ageGroup: {
          not: AgeGroup.BABY,
        },
      },
    });

    const currentTotalAdults = await prismadb.client.count({
      where: {
        yearWorkId: currentYearWork.id,
        ageGroup: {
          not: AgeGroup.BABY,
        },
      },
    });

    const currentExpenses = await prismadb.expense.findMany({
      where: {
        yearWorkId: currentYearWork.id,
      },
    });

    const previousYearPartyDays = differenceInDays(
      previousYearWork.lastPartyDay,
      previousYearWork.firstPartyDay
    );
    const currentYearPartyDays = differenceInDays(
      currentYearWork.lastPartyDay,
      currentYearWork.firstPartyDay
    );
    const newExpenses = currentExpenses.map(async (currentExpense) => {
      const previousExpense = await prismadb.expense.findMany({
        where: {
          yearWorkId: previousYearWork.id,
          expenseCategoryId: currentExpense.expenseCategoryId,
        },
      });

      let totalPreviousUnits = 0;
      let totalEstimatedUnits = 0;

      if (previousExpense.length > 0) {
        totalPreviousUnits = previousExpense[0].units;

        if (previousExpense.length > 1) {
          totalPreviousUnits = previousExpense
            .map((e) => e.units)
            .reduce((a, b) => a + b, 0);
        }
      }

      if (totalPreviousUnits > 0) {
        const previousUnitsToUse = Math.ceil(
          (totalPreviousUnits / previousYearPartyDays) * currentYearPartyDays
        );
        totalEstimatedUnits = Math.ceil(
          (currentTotalAdults * previousUnitsToUse) / previousTotalAdults
        );
      }

      currentExpense.previousYearWorkUnits = totalPreviousUnits;
      currentExpense.estimatedUnits = totalEstimatedUnits;

      return await prismadb.expense.update({
        where: {
          id: currentExpense.id,
        },
        data: currentExpense,
      });
    });

    return NextResponse.json(newExpenses);
  } catch (error) {
    console.log("[EXPENSE_PATCH]: ", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
