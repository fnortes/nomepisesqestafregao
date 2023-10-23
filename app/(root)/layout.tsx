import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";

interface Props {
  children: React.ReactNode;
}

export default async function SetupLayout({ children }: Props) {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const yearWork = await prismadb.yearWork.findFirst();

  if (yearWork) {
    redirect(`/${yearWork.id}`);
  }

  return <>{children}</>;
}
