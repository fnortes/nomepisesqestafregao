import prismadb from "@/lib/prismadb";
import SuitForm from "./components/suit-form";

interface Props {
  params: {
    suitId: string;
  };
}

export default async function SuitPage({
  params: { suitId },
}: Readonly<Props>) {
  const suit = await prismadb.suit.findUnique({
    where: {
      id: suitId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SuitForm initialData={suit} />
      </div>
    </div>
  );
}
