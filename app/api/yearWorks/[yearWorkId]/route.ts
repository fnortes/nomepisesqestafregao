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

    const { year } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!year) {
      return new NextResponse("Year is required", { status: 400 });
    }

    if (!params.yearWorkId) {
      return new NextResponse("Year Work ID is required", { status: 400 });
    }

    const currentYearWork = await prismadb.yearWork.findFirst({
      where: { year },
    });

    if (currentYearWork !== null) {
      return NextResponse.json(
        {
          errorMessage:
            "The new year to work already exist. Try with another one",
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
      return new NextResponse("Year Work ID is required", { status: 400 });
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
