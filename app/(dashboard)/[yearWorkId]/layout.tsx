import { redirect } from "next/navigation";

import Navbar from "@/components/navbar";
import prismadb from "@/lib/prismadb";

interface Props {
  children: React.ReactNode;
  params: { yearWorkId: string };
}

export default async function DashboardLayout({ children, params }: Props) {
  const yearWork = await prismadb.yearWork.findFirst({
    where: {
      id: params.yearWorkId,
    },
  });

  if (!yearWork) {
    redirect("/");
  }

  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
