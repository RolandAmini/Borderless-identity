import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// --- RÉCUPÉRER TOUS LES PRODUITS ---
export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: {
        createdAt: 'desc' // Les plus récents en premier
      }
    });
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: "Erreur lors de la récupération" }, { status: 500 });
  }
}

// --- TON CODE POST EXISTANT ---
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, description, price, category, colorTheme, images } = body;

    const product = await prisma.product.create({
      data: {
        name,
        description,
        price: parseFloat(price),
        category,
        colorTheme,
        images,
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erreur lors de la création" }, { status: 500 });
  }
}