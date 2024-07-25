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
      benefitAmount,
      comments,
      date,
      finallyAmount,
      initialAmount,
      saleCategoryId,
      title,
    } = body;
    const { yearWorkId } = params;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (
      (!benefitAmount && benefitAmount !== 0) ||
      !saleCategoryId ||
      !date ||
      (!finallyAmount && finallyAmount !== 0) ||
      (!initialAmount && initialAmount !== 0) ||
      !title ||
      !yearWorkId
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
            "El año de trabajo informado no existe. Para poder crear una nueva venta se debe informar el año.",
        },
        { status: 400 }
      );
    }

    const currentSale = await prismadb.sale.findFirst({
      where: {
        saleCategoryId,
        title,
        yearWorkId,
      },
    });

    if (currentSale) {
      return NextResponse.json(
        {
          errorMessage:
            "Ya existe otra venta con este nombre, para la misma categoría y el mismo año de trabajo. Inténtalo de nuevo con otro distinto.",
        },
        { status: 400 }
      );
    }

    const sale = await prismadb.sale.create({
      data: {
        yearWorkId,
        saleCategoryId,
        title,
        comments,
        date,
        benefitAmount,
        finallyAmount,
        initialAmount,
      },
    });

    return NextResponse.json(sale);
  } catch (error) {
    console.log("[SALE_POST]: ", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
