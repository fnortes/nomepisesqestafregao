"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import Heading from "@/components/heading";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Separator } from "@/components/ui/separator";
import { columns, type ExpenseCategoryColumn } from "./columns";

interface Props {
  readonly expenses: ExpenseCategoryColumn[];
}

export default function ExpenseCategoriesClient({ expenses: expenses }: Props) {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          description="Administra las categorías de gastos de todo tipo. Recuerda que son compartidas entre todos los años de trabajo."
          title={`Categorías de Gastos (${expenses.length})`}
        />
        <Button
          onClick={() =>
            router.push(`/${params.yearWorkId}/expenseCategories/new`)
          }
        >
          <Plus className="w-4 h-4 mr-2" />
          Añadir nueva
        </Button>
      </div>
      <Separator />
      <DataTable
        columns={columns}
        data={expenses}
        searchConfig={{
          searchFields: [
            {
              key: "family",
              placeholder: "Buscar por familia ...",
            },
            {
              key: "name",
              placeholder: "Buscar por nombre ...",
            },
          ],
        }}
      />
    </>
  );
}
