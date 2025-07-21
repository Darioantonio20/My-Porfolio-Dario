import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Darío Antonio Gutiérrez Álvarez - Desarrollador Front-end",
  description: "Portfolio personal de Darío Antonio Gutiérrez Álvarez, desarrollador Front-end especializado en React, Next.js y TypeScript. Creando experiencias digitales únicas y memorables.",
  keywords: ["desarrollador", "front-end", "react", "next.js", "typescript", "portfolio"],
  authors: [{ name: "Darío Antonio Gutiérrez Álvarez" }],
  creator: "Darío Antonio Gutiérrez Álvarez",
  openGraph: {
    title: "Darío Antonio Gutiérrez Álvarez - Desarrollador Front-end",
    description: "Portfolio personal de Darío Antonio Gutiérrez Álvarez, desarrollador Front-end especializado en React, Next.js y TypeScript.",
    type: "website",
    locale: "es_ES",
  },
  twitter: {
    card: "summary_large_image",
    title: "Darío Antonio Gutiérrez Álvarez - Desarrollador Front-end",
    description: "Portfolio personal de Darío Antonio Gutiérrez Álvarez, desarrollador Front-end especializado en React, Next.js y TypeScript.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
