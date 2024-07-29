"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import Heading from "@/components/heading";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Separator } from "@/components/ui/separator";
import { PriceType } from "@prisma/client";
import { useState } from "react";
import ClientsSearchForm from "./clients-search-form";
import { columns, type ClientColumn } from "./columns";

interface Props {
  readonly clients: ClientColumn[];
  readonly priceTypes: PriceType[];
}

export default function ClientsClient({ clients, priceTypes }: Props) {
  const [tableData, setTableData] = useState<ClientColumn[]>(clients);
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          description="Administra los comparsistas apuntados para el año de trabajo seleccionado"
          title={`Comparsistas (${tableData.length})`}
        />
        <Button
          onClick={() => router.push(`/${params.yearWorkId}/clients/new`)}
        >
          <Plus className="w-4 h-4 mr-2" />
          Añadir nuevo
        </Button>
      </div>
      <Separator />
      <ClientsSearchForm
        clients={clients}
        priceTypes={priceTypes}
        setTableData={setTableData}
      />
      <Separator />
      <DataTable columns={columns} data={tableData} />
    </>
  );
}
