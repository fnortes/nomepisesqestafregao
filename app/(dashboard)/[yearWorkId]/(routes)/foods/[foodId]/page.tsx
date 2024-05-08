import prismadb from "@/lib/prismadb";
import FoodForm from "./components/food-form";

interface Props {
  params: {
    foodId: string;
  };
}

export default async function FoodPage({
  params: { foodId },
}: Readonly<Props>) {
  const food = await prismadb.food.findUnique({
    where: {
      id: foodId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <FoodForm initialData={food} />
      </div>
    </div>
  );
}
