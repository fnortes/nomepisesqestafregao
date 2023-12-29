import prismadb from "@/lib/prismadb";
import ClientForm from "./components/client-form";

interface Props {
  readonly params: {
    clientId: string;
    yearWorkId: string;
  };
}

export default async function ClientPage({
  params: { clientId, yearWorkId },
}: Props) {
  const client = await prismadb.client.findUnique({
    where: {
      id: clientId,
    },
    include: { barGroups: true, priceType: true },
  });
  const barGroups = await prismadb.barGroup.findMany({
    where: { yearWorkId },
    orderBy: { name: "asc" },
  });
  const priceTypes = await prismadb.priceType.findMany({
    where: { yearWorkId },
    orderBy: { name: "asc" },
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
        <ClientForm
          initialData={client}
          barGroups={barGroups}
          priceTypes={priceTypes}
          yearWork={yearWork}
        />
      </div>
    </div>
  );
}
