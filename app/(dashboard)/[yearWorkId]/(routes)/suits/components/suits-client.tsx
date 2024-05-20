"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import Heading from "@/components/heading";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Separator } from "@/components/ui/separator";
import { columns, type SuitColumn } from "./columns";

interface Props {
  readonly suits: SuitColumn[];
}

export default function SuitsClient({ suits }: Props) {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          description="Administra los trajes para el desfile multicolor"
          title={`Trajes (${suits.length})`}
        />
        <Button onClick={() => router.push(`/${params.yearWorkId}/suits/new`)}>
          <Plus className="w-4 h-4 mr-2" />
          Añadir nuevo
        </Button>
      </div>
      <Separator />
      <DataTable
        columns={columns}
        data={suits}
        searchConfig={{
          searchFields: [],
        }}
      />
    </>
  );
}
