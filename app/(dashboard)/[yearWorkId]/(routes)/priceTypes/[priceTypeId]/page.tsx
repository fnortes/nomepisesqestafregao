import prismadb from "@/lib/prismadb";
import PriceTypeForm from "./components/price-type-form";

interface Props {
  readonly params: {
    priceTypeId: string;
  };
}

export default async function PriceTypePage({
  params: { priceTypeId },
}: Props) {
  const priceType = await prismadb.priceType.findUnique({
    where: {
      id: priceTypeId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <PriceTypeForm initialData={priceType} />
      </div>
    </div>
  );
}
