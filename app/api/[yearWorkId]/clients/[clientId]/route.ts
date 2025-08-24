import prismadb from "@/lib/prismadb";
import { ClientsOnFoods } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { yearWorkId: string; clientId: string } }
) {
  try {
    const body = await req.json();

    const {
      ageGroup,
      allergiesComments,
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
    const { yearWorkId, clientId } = params;

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
            "El año de trabajo informado no existe. Para poder actualizar el comparsista se debe informar un año de trabajo que exista.",
        },
        { status: 400 }
      );
    }

    const currentClient = await prismadb.client.findFirst({
      where: {
        firstName,
        lastName,
        yearWorkId,
        id: { not: clientId },
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

    await prismadb.clientsOnBarGroups.deleteMany({
      where: { clientId },
    });
    await prismadb.clientsOnFoods.deleteMany({
      where: { clientId },
    });

    const client = await prismadb.client.update({
      where: {
        id: clientId,
      },
      data: {
        ageGroup,
        allergiesComments,
        barGroups: {
          create: barGroups.map((barGroup: string) => ({
            barGroup: { connect: { id: barGroup } },
          })),
        },
        comments,
        email,
        firstName,
        foods: {
          create: (foods as ClientsOnFoods[]).map((food) => ({
            food: { connect: { id: food.foodId } },
            quantity: food.quantity,
            attend: food.attend,
          })),
        },
        gender,
        isNew,
        lastName,
        phone,
        priceTypeId,
        quotaModifier,
        quotaPaid,
        shirtSize,
        suitGroup,
        yearWorkId,
      },
    });

    return NextResponse.json(client);
  } catch (error) {
    console.log("[CLIENT_PATCH]: ", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { yearWorkId: string; clientId: string } }
) {
  try {
    const { clientId } = params;

    if (!clientId) {
      return new NextResponse(
        "No se ha especificado el ID del comparsista a eliminar.",
        {
          status: 400,
        }
      );
    }

    const client = await prismadb.client.deleteMany({
      where: {
        id: clientId,
      },
    });

    return NextResponse.json(client);
  } catch (error) {
    console.log("[CLIENT_DELETE]: ", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
