import prismadb from "@/lib/prismadb";
import TurnForm from "./components/turn-form";

interface Props {
  readonly params: {
    turnId: string;
    yearWorkId: string;
  };
}

export default async function TurnPage({
  params: { turnId, yearWorkId },
}: Props) {
  const turn = await prismadb.turn.findUnique({
    where: {
      id: turnId,
    },
    include: {
      barGroup: {
        include: {
          clients: {
            include: {
              client: true,
            },
          },
        },
      },
    },
  });

  const barGroups = await prismadb.barGroup.findMany({
    where: { yearWorkId },
    orderBy: { name: "asc" },
    include: {
      turns: true,
      clients: {
        include: {
          client: true,
        },
      },
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
        <TurnForm
          barGroups={barGroups}
          initialData={turn}
          yearWork={yearWork}
        />
      </div>
    </div>
  );
}
