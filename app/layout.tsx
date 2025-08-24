import type { Metadata } from "next";
import { Inter } from "next/font/google";

import prismadb from "@/lib/prismadb";
import { ModalProvider } from "@/providers/modal-provider";
import ToastProvider from "@/providers/toast-provider";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Comparsa No me q´stá fregao",
  description:
    "Sitio web para la gestión y organización de la comparsa de No me pises q´stá fregao",
};

export default async function RootLayout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  const workYears = await prismadb.yearWork.findMany();

  return (
    <html lang="en">
      <body className={inter.className}>
        <ToastProvider />
        <ModalProvider workYears={workYears} />
        {children}
      </body>
    </html>
  );
}
