import prismadb from "@/lib/prismadb";
import BarGroupsClient from "./components/bar-groups-client";

interface Props {
  params: {
    yearWorkId: string;
  };
}

export default async function BarGroupsPage({ params: { yearWorkId } }: Props) {
  const barGroups = await prismadb.barGroup.findMany({ where: { yearWorkId } });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BarGroupsClient barGroups={barGroups} />
      </div>
    </div>
  );
}
