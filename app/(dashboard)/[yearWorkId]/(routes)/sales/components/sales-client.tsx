"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import Heading from "@/components/heading";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Separator } from "@/components/ui/separator";
import { YearWork } from "@prisma/client";
import { columns, type SaleColumn } from "./columns";

interface Props {
  readonly sales: SaleColumn[];
}

export default function SalesClient({ sales }: Props) {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          description="Administra las ventas de todo tipo para el año de trabajo seleccionado"
          title={`Ventas (${sales.length})`}
        />
        <div className="flex gap-2">
          <Button
            onClick={() => router.push(`/${params.yearWorkId}/sales/new`)}
          >
            <Plus className="w-4 h-4 mr-2" />
            Añadir nueva
          </Button>
        </div>
      </div>
      <Separator />
      <DataTable
        columns={columns}
        data={sales}
        searchConfig={{
          searchFields: [
            {
              key: "title",
              placeholder: "Buscar por título ...",
            },
            {
              key: "category",
              placeholder: "Buscar por categoría ...",
            },
          ],
        }}
      />
    </>
  );
}
