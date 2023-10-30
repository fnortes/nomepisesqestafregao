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
      year,
      newClientPrice,
      previousAdults,
      previousChilds,
      firstPartyDay,
      lastPartyDay,
      previousFirstPartyDay,
      previousLastPartyDay,
      unitFoodPrice,
      previousYearWorkAmount,
      awardsReward,
      commissionHelp,
    } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (
      !year ||
      !newClientPrice ||
      !previousAdults ||
      !previousChilds ||
      !firstPartyDay ||
      !lastPartyDay ||
      !previousFirstPartyDay ||
      !previousLastPartyDay ||
      !unitFoodPrice ||
      !previousYearWorkAmount ||
      !awardsReward ||
      !commissionHelp
    ) {
      return new NextResponse(
        "Alguno de los datos obligatorios no se han informado.",
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
        year,
        newClientPrice,
        previousAdults,
        previousChilds,
        firstPartyDay,
        lastPartyDay,
        previousFirstPartyDay,
        previousLastPartyDay,
        unitFoodPrice,
        previousYearWorkAmount,
        awardsReward,
        commissionHelp,
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
