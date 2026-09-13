import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "FinTrack — Copilote Financier Prédictif | POC ÉSTIAM StartUp'IT",
  description: "Proof of Concept interactif de FinTrack : IA prédictive de gestion budgétaire, prévention de découverts et Open Banking DSP2.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="h-full bg-slate-950 text-slate-100 antialiased">
      <body className={`${geistSans.variable} ${geistMono.variable} min-h-full flex flex-col font-sans selection:bg-emerald-500 selection:text-slate-950`}>
        {children}
      </body>
    </html>
  );
}
