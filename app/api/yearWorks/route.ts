import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const { year } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!year) {
      return new NextResponse("Year is required", { status: 400 });
    }

    const yearWork = await prismadb.yearWork.create({
      data: {
        year,
      },
    });

    return NextResponse.json(yearWork);
  } catch (error) {
    console.log("[YEAR_WORK_POST]: ", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
