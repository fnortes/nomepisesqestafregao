import prismadb from "@/lib/prismadb";
import BarGroupForm from "./components/bar-group-form";

interface Props {
  params: {
    barGroupId: string;
    yearWorkId: string;
  };
}

export default async function BarGroupPage({
  params: { barGroupId, yearWorkId },
}: Props) {
  const barGroup = await prismadb.barGroup.findUnique({
    where: {
      id: barGroupId,
    },
  });

  const yearWork = await prismadb.yearWork.findFirst({
    where: { id: yearWorkId },
  });

  if (!yearWork) {
    return null;
  }

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BarGroupForm initialData={barGroup} />
      </div>
    </div>
  );
}
