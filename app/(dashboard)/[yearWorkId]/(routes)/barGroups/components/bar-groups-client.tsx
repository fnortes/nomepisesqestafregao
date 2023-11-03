"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import Heading from "@/components/heading";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Separator } from "@/components/ui/separator";
import { columns, type BarGroupColumn } from "./columns";

interface Props {
  readonly barGroups: BarGroupColumn[];
}

export default function BarGroupsClient({ barGroups }: Props) {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          description="Administra los grupos de barra para el año de trabajo seleccionado"
          title={`Grupos de barra (${barGroups.length})`}
        />
        <Button
          onClick={() => router.push(`/${params.yearWorkId}/barGroups/new`)}
        >
          <Plus className="w-4 h-4 mr-2" />
          Añadir nuevo
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={barGroups} searchKey="name" />
    </>
  );
}
