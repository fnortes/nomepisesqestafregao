import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { yearWorkId: string; clientId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const {
      firstName,
      lastName,
      phone,
      email,
      gender,
      ageGroup,
      isNew,
      barGroups,
      priceTypeId,
      shirtSize,
      quotaPaid,
      comments,
    } = body;
    const { yearWorkId, clientId } = params;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!firstName || !gender || !ageGroup || !priceTypeId || !yearWorkId) {
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
    const client = await prismadb.client.update({
      where: {
        id: clientId,
      },
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
        priceTypeId,
        shirtSize,
        quotaPaid,
        comments,
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
    const { userId } = auth();

    const { clientId } = params;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

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
