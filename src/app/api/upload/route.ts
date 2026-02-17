import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "Fichier manquant" }, { status: 400 });
    }
// On prépare les données pour Cloudinary sans utiliser de Signature secrète
const cloudinaryData = new FormData();
cloudinaryData.append("file", file);
cloudinaryData.append("upload_preset", "ml_default"); // Changé ici
cloudinaryData.append("cloud_name", "dboku0qm8");
    // On appelle directement l'API REST de Cloudinary
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/dboku0qm8/image/upload`,
      {
        method: "POST",
        body: cloudinaryData,
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json({ error: data.error.message }, { status: 400 });
    }

    return NextResponse.json({ url: data.secure_url });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}