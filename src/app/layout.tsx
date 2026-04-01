import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { GoogleAnalytics } from '@next/third-parties/google'; // Importez ceci
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "The Borderless Identity",
  description: " The borderless Identity is more than a clothing brand it's a movement, a lifestyle, and a statement. We believe in breaking down barriers and embracing individuality. Our designs are inspired by the idea of a world without borders, where everyone can express themselves freely and authentically. Join us on this journey to redefine fashion and celebrate diversity with The Borderless Identity.",
  icons: {
    icon: "/icon.png", // Chemin relatif à partir du dossier public ou géré par Next.js
    apple: "/icon.png", // Optionnel : pour les appareils iOS
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
      {/* Votre ID de mesure récupéré sur l'image */}
      <GoogleAnalytics gaId="G-NSQ9NVG91X" />
    </html>
  );
}