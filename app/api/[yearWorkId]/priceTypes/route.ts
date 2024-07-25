import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";

export async function POST(
  req: NextRequest,
  { params }: { params: { yearWorkId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const {
      adultPrice,
      babyPrice,
      childHalfPortionPrice,
      childPrice,
      dinners,
      drinkTickets,
      meals,
      name,
      paradeSuit,
      paradeWater,
      teenHalfPortionPrice,
      teenPrice,
    } = body;
    const { yearWorkId } = params;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!name || !yearWorkId) {
      return new NextResponse(
        "Algunos de los campos obligatorios no ha sido enviado.",
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
            "El año de trabajo informado no existe. Para poder crear un nuevo tipo de cuota se debe informar el año.",
        },
        { status: 400 }
      );
    }

    const currentPriceType = await prismadb.priceType.findFirst({
      where: {
        name,
        yearWorkId,
      },
    });

    if (currentPriceType) {
      return NextResponse.json(
        {
          errorMessage:
            "El nuevo tipo de cuota ya existe. Inténtalo de nuevo con otro nombre.",
        },
        { status: 400 }
      );
    }

    const priceType = await prismadb.priceType.create({
      data: {
        adultPrice: adultPrice || 0,
        babyPrice: babyPrice || 0,
        teenHalfPortionPrice: teenHalfPortionPrice || 0,
        teenPrice: teenPrice || 0,
        childHalfPortionPrice: childHalfPortionPrice || 0,
        childPrice: childPrice || 0,
        dinners,
        drinkTickets,
        meals,
        name,
        paradeSuit,
        paradeWater,
        yearWorkId,
      },
    });

    return NextResponse.json(priceType);
  } catch (error) {
    console.log("[PRICE_TYPE_POST]: ", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
