"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import Heading from "@/components/heading";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Separator } from "@/components/ui/separator";
import { columns, type TurnColumn } from "./columns";

interface Props {
  readonly turns: TurnColumn[];
}

export default function TurnsClient({ turns }: Props) {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          description="Administra los turnos de barra disponibles para el año de trabajo seleccionado"
          title={`Turnos (${turns.length})`}
        />
        <Button onClick={() => router.push(`/${params.yearWorkId}/turns/new`)}>
          <Plus className="w-4 h-4 mr-2" />
          Añadir nuevo
        </Button>
      </div>
      <Separator />
      <DataTable
        columns={columns}
        data={turns}
        searchConfig={{
          searchFields: [
            {
              key: "startDate",
              placeholder: "Buscar por fecha de inicio ...",
            },
          ],
        }}
      />
    </>
  );
}
