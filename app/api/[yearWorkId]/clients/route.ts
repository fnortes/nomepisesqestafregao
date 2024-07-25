import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { ClientsOnFoods } from "@prisma/client";

export async function POST(
  req: NextRequest,
  { params }: { params: { yearWorkId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const {
      ageGroup,
      barGroups,
      comments,
      email,
      firstName,
      foods,
      gender,
      isNew,
      lastName,
      phone,
      priceTypeId,
      quotaModifier,
      quotaPaid,
      shirtSize,
      suitGroup,
    } = body;
    const { yearWorkId } = params;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (
      !firstName ||
      !gender ||
      !ageGroup ||
      !priceTypeId ||
      !yearWorkId ||
      !suitGroup
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

    const currentClient = await prismadb.client.findFirst({
      where: {
        firstName,
        lastName,
        yearWorkId,
      },
    });

    if (currentClient) {
      return NextResponse.json(
        {
          errorMessage:
            "Ya existe otro comparsista con este nombre y apellidos. Inténtalo de nuevo con otros distintos.",
        },
        { status: 400 }
      );
    }

    const client = await prismadb.client.create({
      data: {
        yearWorkId,
        firstName,
        lastName,
        email,
        phone,
        gender,
        ageGroup,
        isNew,
        barGroups: {
          create: barGroups.map((barGroup: string) => ({
            barGroup: { connect: { id: barGroup } },
          })),
        },
        foods: {
          create: (foods as ClientsOnFoods[]).map((food) => ({
            food: { connect: { id: food.foodId } },
            quantity: food.quantity,
            attend: food.attend,
          })),
        },
        priceTypeId,
        shirtSize,
        quotaModifier,
        quotaPaid,
        comments,
        suitGroup,
      },
    });

    return NextResponse.json(client);
  } catch (error) {
    console.log("[CLIENT_POST]: ", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
