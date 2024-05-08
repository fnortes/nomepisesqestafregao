"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import Heading from "@/components/heading";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Separator } from "@/components/ui/separator";
import { columns, type PriceTypeColumn } from "./columns";

interface Props {
  readonly priceTypes: PriceTypeColumn[];
}

export default function PriceTypesClient({ priceTypes }: Props) {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          description="Administra los tipos de cuota soportados para el año de trabajo seleccionado"
          title={`Tipos de cuota (${priceTypes.length})`}
        />
        <Button
          onClick={() => router.push(`/${params.yearWorkId}/priceTypes/new`)}
        >
          <Plus className="w-4 h-4 mr-2" />
          Añadir nuevo
        </Button>
      </div>
      <Separator />
      <DataTable
        columns={columns}
        data={priceTypes}
        searchConfig={{
          searchFields: [
            {
              key: "name",
            },
          ],
        }}
      />
    </>
  );
}
