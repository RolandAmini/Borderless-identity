import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> } // 1. On définit params comme une Promise
) {
  try {
    // 2. ON ATTEND que les params soient résolus
    const resolvedParams = await params; 
    const id = resolvedParams.id;

    if (!id) {
      return NextResponse.json({ error: "ID manquant" }, { status: 400 });
    }

    await prisma.product.delete({
      where: { id: id },
    });

    return NextResponse.json({ message: "Produit supprimé avec succès" });
  } catch (error) {
    console.error("Erreur suppression:", error);
    return NextResponse.json({ error: "Erreur lors de la suppression" }, { status: 500 });
  }
}

// FAIS LA MÊME CHOSE POUR LA FONCTION PATCH
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params; // Version courte du await
    const body = await request.json();

    const updated = await prisma.product.update({
      where: { id: id },
      data: {
        price: body.price ? parseFloat(body.price) : undefined,
        stock: body.stock ? parseInt(body.stock) : undefined,
        name: body.name
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: "Erreur modification" }, { status: 500 });
  }
}