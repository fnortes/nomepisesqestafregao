import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { yearWorkId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const {
      awardsReward,
      awardsRewardPaid,
      comments,
      commissionHelp,
      commissionHelpPaid,
      firstPartyDay,
      lastPartyDay,
      newClientPrice,
      previousAdults,
      previousChilds,
      previousTeens,
      previousYearWorkAmount,
      unitFoodPrice,
      year,
    } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (
      !year ||
      (!newClientPrice && newClientPrice !== 0) ||
      !previousAdults ||
      (!previousTeens && previousTeens !== 0) ||
      (!previousChilds && previousChilds !== 0) ||
      !firstPartyDay ||
      !lastPartyDay ||
      (!unitFoodPrice && unitFoodPrice !== 0) ||
      !previousYearWorkAmount ||
      (!awardsReward && awardsReward !== 0) ||
      !commissionHelp
    ) {
      return NextResponse.json(
        {
          errorMessage: "Alguno de los datos obligatorios no se han informado.",
        },
        { status: 400 }
      );
    }

    if (!params.yearWorkId) {
      return new NextResponse("No se ha especificado el ID del año.", {
        status: 400,
      });
    }

    const currentYearWork = await prismadb.yearWork.findFirst({
      where: { year, id: { not: params.yearWorkId } },
    });

    if (currentYearWork !== null) {
      return NextResponse.json(
        {
          errorMessage:
            "El año de trabajo informado ya existe. Inténtalo de nuevo con otro año.",
        },
        { status: 400 }
      );
    }

    const yearWork = await prismadb.yearWork.updateMany({
      where: {
        id: params.yearWorkId,
      },
      data: {
        awardsReward,
        awardsRewardPaid,
        comments,
        commissionHelp,
        commissionHelpPaid,
        firstPartyDay,
        lastPartyDay,
        newClientPrice,
        previousAdults,
        previousChilds,
        previousTeens,
        previousYearWorkAmount,
        unitFoodPrice,
        year,
      },
    });

    return NextResponse.json(yearWork);
  } catch (error) {
    console.log("[YEAR_WORK_PATCH]: ", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { yearWorkId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!params.yearWorkId) {
      return new NextResponse("No se ha especificado el ID del año", {
        status: 400,
      });
    }

    const yearWork = await prismadb.yearWork.deleteMany({
      where: {
        id: params.yearWorkId,
      },
    });

    return NextResponse.json(yearWork);
  } catch (error) {
    console.log("[YEAR_WORK_DELETE]: ", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
