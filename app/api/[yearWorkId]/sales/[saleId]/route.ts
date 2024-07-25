import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { yearWorkId: string; saleId: string } }
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

    const { yearWorkId, saleId } = params;

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
            "El año de trabajo informado no existe. Para poder actualizar la venta se debe informar un año de trabajo que exista.",
        },
        { status: 400 }
      );
    }

    const currentSale = await prismadb.sale.findFirst({
      where: {
        saleCategoryId,
        title,
        yearWorkId,
        id: { not: saleId },
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

    const sale = await prismadb.sale.update({
      where: {
        id: saleId,
      },
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
    console.log("[SALE_PATCH]: ", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { yearWorkId: string; saleId: string } }
) {
  try {
    const { userId } = auth();

    const { saleId } = params;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!saleId) {
      return new NextResponse(
        "No se ha especificado el ID de la venta a eliminar.",
        {
          status: 400,
        }
      );
    }

    const sale = await prismadb.sale.deleteMany({
      where: {
        id: saleId,
      },
    });

    return NextResponse.json(sale);
  } catch (error) {
    console.log("[SALE_DELETE]: ", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
