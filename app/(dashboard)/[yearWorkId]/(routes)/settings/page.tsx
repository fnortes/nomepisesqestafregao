import prismadb from "@/lib/prismadb";
import { redirect } from "next/navigation";

import SettingsForm from "./components/settings-form";

interface Props {
  params: {
    yearWorkId: string;
  };
}
export default async function SettingsPage({ params }: Props) {
  const yearWork = await prismadb.yearWork.findFirst({
    where: {
      id: params.yearWorkId,
    },
  });

  if (!yearWork) {
    redirect("/");
  }

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SettingsForm initialData={yearWork} />
      </div>
    </div>
  );
}
