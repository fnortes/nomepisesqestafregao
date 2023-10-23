import { auth } from "@clerk/nextjs";
import { AgeGroup, Client, Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";

export async function POST(req: NextRequest) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const { year, yearFromRestore } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!year) {
      return new NextResponse("Year is required", { status: 400 });
    }

    const lastPartyDay = new Date();
    lastPartyDay.setFullYear(year);
    lastPartyDay.setMonth(7);
    lastPartyDay.setDate(16);

    const firstPartyDay = new Date();
    firstPartyDay.setFullYear(year);
    firstPartyDay.setMonth(7);
    firstPartyDay.setDate(11);

    let newClientPrice = new Prisma.Decimal(20),
      previousAdults = 0,
      previousChilds = 0,
      previousFirstPartyDay = undefined,
      previousLastPartyDay = undefined,
      unitFoodPrice = new Prisma.Decimal(10),
      commissionHelp = new Prisma.Decimal(0),
      clients: Client[] = [];

    if (yearFromRestore) {
      const yearWorkFromRestore = await prismadb.yearWork.findFirst({
        where: {
          id: yearFromRestore,
        },
        include: {
          clients: true,
        },
      });

      if (yearWorkFromRestore) {
        newClientPrice = yearWorkFromRestore.newClientPrice;
        previousAdults = yearWorkFromRestore.clients.filter(
          (client) => client.ageGroup === AgeGroup.ADULT
        ).length;
        previousChilds = yearWorkFromRestore.clients.filter(
          (client) => client.ageGroup === AgeGroup.CHILD
        ).length;
        previousFirstPartyDay = yearWorkFromRestore.firstPartyDay;
        previousLastPartyDay = yearWorkFromRestore.lastPartyDay;
        unitFoodPrice = yearWorkFromRestore.unitFoodPrice;
        commissionHelp = yearWorkFromRestore.commissionHelp;
        clients = yearWorkFromRestore.clients;
      }
    }

    const yearWork = await prismadb.yearWork.create({
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
        commissionHelp,
        clients: {
          create: clients,
        },
      },
    });

    return NextResponse.json(yearWork);
  } catch (error) {
    console.log("[YEAR_WORK_POST]: ", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
