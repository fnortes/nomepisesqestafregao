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
    const { yearWorkId } = params;

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
            "El año de trabajo informado no existe. Para poder crear un nuevo comparsista se debe informar el año.",
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
        priceTypeId,
        shirtSize,
        quotaPaid,
        comments,
      },
    });

    return NextResponse.json(client);
  } catch (error) {
    console.log("[CLIENT_POST]: ", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
