"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import NumberFormField from "@/components/form/number-form-field";
import SelectFormField from "@/components/form/select-form-field";
import TextFormField from "@/components/form/text-form-field";
import Heading from "@/components/heading";
import AlertModal from "@/components/modals/alert-modal";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { familiesData, formSchema } from "./expense-category-form.constants";

import { CommonFormFieldData } from "@/components/form/form.types";
import type { Expense, ExpenseCategory } from "@prisma/client";
import type { ExpenseCategoryFormValues } from "./expense-category-form.types";

interface Props {
  readonly initialData: ExpenseCategory | null;
}

export default function ExpenseCategoryForm({ initialData }: Props) {
  const router = useRouter();
  const params = useParams();
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const [title, description, action, saveApiUrl, apiCall, toastMessage] =
    initialData
      ? [
          "Actualizar Categoría de Gasto",
          "Edita la información de la categoría de gasto seleccionado",
          "Guardar cambios",
          `/api/${params.yearWorkId}/expenseCategories/${initialData.id}`,
          axios.patch<Expense>,
          "Categoría de Gasto actualizado.",
        ]
      : [
          "Crear nueva Categoría de Gasto",
          "Inserta una nueva categoría de gasto para todos los años de trabajo",
          "Crear",
          `/api/${params.yearWorkId}/expenseCategories`,
          axios.post<Expense>,
          "Nueva categoría de gasto creada.",
        ];

  const form = useForm<ExpenseCategoryFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      family: initialData?.family,
      name: initialData?.name,
      previousYearWorkUnitsConsumed:
        initialData?.previousYearWorkUnitsConsumed ?? 0,
      comments: initialData?.comments,
    },
  });

  const familiesOptionsData: CommonFormFieldData = useMemo(
    () => familiesData,
    []
  );

  const handleValid = async (values: ExpenseCategoryFormValues) => {
    try {
      setLoading(true);
      await apiCall(saveApiUrl, values);

      router.refresh();
      router.push(`/${params.yearWorkId}/expenseCategories`);
      toast.success(toastMessage);
    } catch (error) {
      let errorMessage = "Algo ha ido mal :(";

      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data.errorMessage ?? error.message;
      }

      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirm = async () => {
    try {
      setLoading(true);
      await axios.delete(
        `/api/${params.yearWorkId}/expenseCategories/${initialData?.id}`
      );

      router.refresh();
      router.push(`/${params.yearWorkId}/expenseCategories`);
      toast.success("Categoría de gasto eliminado");
    } catch (error) {
      toast.error(
        "Asegúrate de que toda la información de esta categoría de gastos se haya eliminado previamente."
      );
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        loading={loading}
        onClose={() => setOpen(false)}
        onConfirm={handleConfirm}
      />
      <div className="flex items-center justify-between">
        <Heading description={description} title={title} />
        {initialData && (
          <Button
            disabled={loading}
            onClick={() => setOpen(true)}
            size="icon"
            variant="destructive"
          >
            <Trash className="w-4 h-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          className="space-y-8 w-full"
          onSubmit={form.handleSubmit(handleValid)}
        >
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
            <SelectFormField
              data={familiesOptionsData}
              form={form}
              label="Familia"
              loading={loading}
              name="family"
              placeholder="Selecciona una familia"
            />
            <TextFormField
              form={form}
              input={{
                placeholder:
                  "Nombre de la categoría de gastos, máximo 50 caracteres",
              }}
              label="Nombre"
              loading={loading}
              name="name"
            />
            <NumberFormField
              form={form}
              input={{
                placeholder: "Introduce el consumo del año anterior",
              }}
              label="Consumo del año anterior"
              loading={loading}
              name="previousYearWorkUnitsConsumed"
              description="Son el número de unidades consumidas el año anterior para todos los gastos de esta categoría."
            />
          </div>
          <div className="grid grid-cols-1 gap-8">
            <TextFormField
              form={form}
              input={{
                placeholder: "Comentarios del gasto",
              }}
              label="Comentarios"
              loading={loading}
              name="comments"
            />
          </div>
          <Button type="submit" disabled={loading} className="ml-auto">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
}
