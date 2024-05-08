"use client";

import { Plus, RefreshCcw } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import Heading from "@/components/heading";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { YearWork } from "@prisma/client";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { columns, type ExpenseColumn } from "./columns";

interface Props {
  readonly expenses: ExpenseColumn[];
  readonly years: YearWork[];
}

export default function ExpensesClient({ expenses, years }: Props) {
  const router = useRouter();
  const params = useParams();
  const [yearToRefreshEstimated, setYearToRefreshEstimated] = useState("");

  const refreshEstimated = async () => {
    try {
      await axios.patch(`/api/${params.yearWorkId}/expenses/refreshEstimated`, {
        yearToRefreshEstimated,
      });

      router.refresh();
      router.push(`/${params.yearWorkId}/expenses`);
      toast.success("Cálculos de gastos estimados realizados");
    } catch (error) {
      toast.error(
        "Asegúrate de que toda la información necesaria para poder refrescar los estimados de los gastos se haya informado."
      );
    }
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          description="Administra los gastos de todo tipo para el año de trabajo seleccionado"
          title={`Gastos (${expenses.length})`}
        />
        <div className="flex gap-2">
          <Button
            onClick={() => router.push(`/${params.yearWorkId}/expenses/new`)}
          >
            <Plus className="w-4 h-4 mr-2" />
            Añadir nuevo
          </Button>
          <div className="flex flex-col gap-2">
            <Select
              onValueChange={setYearToRefreshEstimated}
              value={yearToRefreshEstimated}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecciona un año de referencia" />
              </SelectTrigger>
              <SelectContent className="max-h-[250px]">
                {years.map(({ id, year }) => (
                  <SelectItem key={id} value={id}>
                    {year ?? id}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              onClick={refreshEstimated}
              disabled={yearToRefreshEstimated === ""}
            >
              <RefreshCcw className="w-4 h-4 mr-2" />
              Calcular estimados
            </Button>
          </div>
        </div>
      </div>
      <Separator />
      <DataTable
        columns={columns}
        data={expenses}
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
