"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import Heading from "@/components/heading";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Separator } from "@/components/ui/separator";
import { columns, type FoodColumn } from "./columns";

interface Props {
  readonly foods: FoodColumn[];
}

export default function FoodsClient({ foods }: Props) {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          description="Administra las comidas y cenas disponibles para el año de trabajo seleccionado"
          title={`Comidas y cenas (${foods.length})`}
        />
        <Button onClick={() => router.push(`/${params.yearWorkId}/foods/new`)}>
          <Plus className="w-4 h-4 mr-2" />
          Añadir nueva
        </Button>
      </div>
      <Separator />
      <DataTable
        columns={columns}
        data={foods}
        searchConfig={{
          searchFields: [
            {
              key: "title",
              placeholder: "Buscar por título ...",
            },
          ],
        }}
      />
    </>
  );
}
