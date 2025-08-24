import { NextRequest, NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { name, comments } = body;

    if (!name) {
      return new NextResponse(
        "Algunos de los campos obligatorios no han sido enviados.",
        { status: 400 }
      );
    }

    const currentSaleCategory = await prismadb.saleCategory.findFirst({
      where: {
        name,
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

    const saleCategory = await prismadb.saleCategory.create({
      data: {
        name,
        comments,
      },
    });

    return NextResponse.json(saleCategory);
  } catch (error) {
    console.log("[SALE_CATEGORY_POST]: ", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
