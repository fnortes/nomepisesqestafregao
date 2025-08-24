import prismadb from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { saleCategoryId: string } }
) {
  try {
    const body = await req.json();

    const { name, comments } = body;
    const { saleCategoryId } = params;

    if (!name) {
      return new NextResponse(
        "Algunos de los campos obligatorios no han sido enviados.",
        { status: 400 }
      );
    }

    const currentSaleCategory = await prismadb.saleCategory.findFirst({
      where: {
        name,
        id: { not: saleCategoryId },
      },
    });

    if (currentSaleCategory) {
      return NextResponse.json(
        {
          errorMessage:
            "Ya existe otra categoría de ventas con el mismo nombre. Inténtalo de nuevo con otro distinto.",
        },
        { status: 400 }
      );
    }

    const saleCategory = await prismadb.saleCategory.update({
      where: {
        id: saleCategoryId,
      },
      data: {
        name,
        comments,
      },
    });

    return NextResponse.json(saleCategory);
  } catch (error) {
    console.log("[SALE_CATEGORY_PATCH]: ", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { saleCategoryId: string } }
) {
  try {
    const { saleCategoryId } = params;

    if (!saleCategoryId) {
      return new NextResponse(
        "No se ha especificado el ID de la categoría de ventas a eliminar.",
        {
          status: 400,
        }
      );
    }

    const saleCategory = await prismadb.saleCategory.deleteMany({
      where: {
        id: saleCategoryId,
      },
    });

    return NextResponse.json(saleCategory);
  } catch (error) {
    console.log("[SALE_CATEGORY_DELETE]: ", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
