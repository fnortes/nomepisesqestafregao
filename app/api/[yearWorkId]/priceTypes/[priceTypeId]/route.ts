import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { yearWorkId: string; priceTypeId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const {
      name,
      adultPrice,
      childPrice,
      babyPrice,
      meals,
      dinners,
      paradeSuit,
      paradeWater,
      drinkTickets,
    } = body;
    const { yearWorkId, priceTypeId } = params;

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
            "El año de trabajo informado no existe. Para poder actualizar el tipo de cuota se debe informar el año de trabajo que exista.",
        },
        { status: 400 }
      );
    }

    const currentPriceType = await prismadb.priceType.findFirst({
      where: {
        name,
        id: { not: priceTypeId },
        yearWorkId,
      },
    });

    if (currentPriceType) {
      return NextResponse.json(
        {
          errorMessage:
            "Ya existe este tipo de cuota para el año actual. Inténtalo de nuevo con otro nombre.",
        },
        { status: 400 }
      );
    }

    const priceType = await prismadb.priceType.updateMany({
      where: {
        id: priceTypeId,
      },
      data: {
        yearWorkId,
        name,
        adultPrice: adultPrice || 0,
        childPrice: childPrice || 0,
        babyPrice: babyPrice || 0,
        meals,
        dinners,
        paradeSuit,
        paradeWater,
        drinkTickets,
      },
    });

    return NextResponse.json(priceType);
  } catch (error) {
    console.log("[PRICE_TYPE_PATCH]: ", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { yearWorkId: string; priceTypeId: string } }
) {
  try {
    const { userId } = auth();

    const { priceTypeId } = params;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!priceTypeId) {
      return new NextResponse("No se ha especificado el ID del tipo de cuota", {
        status: 400,
      });
    }

    const priceType = await prismadb.priceType.deleteMany({
      where: {
        id: priceTypeId,
      },
    });

    return NextResponse.json(priceType);
  } catch (error) {
    console.log("[PRICE_TYPE_DELETE]: ", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
