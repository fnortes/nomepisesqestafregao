"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
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
import { formSchema } from "./expense-form.constants";

import type { Expense, ExpenseCategory, YearWork } from "@prisma/client";
import { EXPENSE_FAMILY_LITERALS } from "../../../expenseCategories/components/expenseCategories.constants";
import type { ExpenseFormValues } from "./expense-form.types";

interface Props {
  readonly initialData: Expense | null;
  readonly categories: ExpenseCategory[];
  readonly yearWork: YearWork;
}

export default function ExpenseForm({
  initialData,
  categories,
  yearWork,
}: Props) {
  const router = useRouter();
  const params = useParams();
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const [title, description, action, saveApiUrl, apiCall, toastMessage] =
    initialData
      ? [
          "Actualizar Gasto",
          "Edita la información del gasto seleccionado",
          "Guardar cambios",
          `/api/${params.yearWorkId}/expenses/${initialData.id}`,
          axios.patch<Expense>,
          "Gasto actualizado.",
        ]
      : [
          "Crear nuevo Gasto",
          "Inserta un nuevo gasto para el año de trabajo seleccionado",
          "Crear",
          `/api/${params.yearWorkId}/expenses`,
          axios.post<Expense>,
          "Nuevo gasto creado.",
        ];

  const form = useForm<ExpenseFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      expenseCategoryId: initialData?.expenseCategoryId,
      description: initialData?.description,
      estimatedUnits: initialData?.estimatedUnits ?? 1,
      paid: initialData?.paid ?? 0,
      previousYearWorkUnits: initialData?.previousYearWorkUnits ?? 0,
      title: initialData?.title,
      total: initialData?.total ?? 0,
      unitPrice: initialData?.unitPrice ?? 0,
      units: initialData?.units ?? 1,
      comments: initialData?.comments,
    },
  });

  const categoriesOptionsData = categories.map(({ id, name, family }) => ({
    value: id,
    label: `[${EXPENSE_FAMILY_LITERALS[family]}] - ${name}`,
  }));

  useEffect(() => {
    const subscription = form.watch((value, { name, type }) => {
      if (name && ["units", "unitPrice"].indexOf(name) !== -1) {
        form.setValue("total", (value.units ?? 1) * (value.unitPrice ?? 0));
      }
    });
    return () => subscription.unsubscribe();
  }, [form]);

  const handleValid = async (values: ExpenseFormValues) => {
    try {
      setLoading(true);
      await apiCall(saveApiUrl, values);

      router.refresh();
      router.push(`/${params.yearWorkId}/expenses`);
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
        `/api/${params.yearWorkId}/expenses/${initialData?.id}`
      );

      router.refresh();
      router.push(`/${params.yearWorkId}/expenses`);
      toast.success("Gasto eliminado");
    } catch (error) {
      toast.error(
        "Asegúrate de que toda la información de este gasto se haya eliminado previamente."
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
              data={categoriesOptionsData}
              form={form}
              label="Categoría"
              loading={loading}
              name="expenseCategoryId"
              placeholder="Selecciona una categoría"
              className="col-span-2"
            />
            <TextFormField
              form={form}
              input={{
                placeholder: "Título del gasto, máximo 50 caracteres",
              }}
              label="Título"
              loading={loading}
              name="title"
            />
            <TextFormField
              form={form}
              input={{
                placeholder: "Descripción del gasto",
              }}
              label="Descripción"
              loading={loading}
              name="description"
            />
            <TextFormField
              form={form}
              input={{
                placeholder: "Comentarios del gasto",
              }}
              label="Comentarios"
              loading={loading}
              name="comments"
            />
            <NumberFormField
              form={form}
              input={{
                placeholder: "Introduce el consumo del año anterior",
              }}
              label="Consumido el año anterior"
              loading={loading}
              name="previousYearWorkUnits"
              description="Son el número de unidades consumidas de este mismo gasto, del año anterior."
            />
            <NumberFormField
              form={form}
              input={{
                placeholder:
                  "Introduce el estimado para pedir en el año actual.",
              }}
              label="Estimado para año actual"
              loading={loading}
              name="estimatedUnits"
              description="Son el número de unidades estimadas para pedir en el año actual, auto calculado en base al consumido el año anterior y en proporción al número de comparsistas."
            />
            <NumberFormField
              form={form}
              input={{
                placeholder:
                  "Introduce las unidades consumidas en el año actual.",
              }}
              label="Consumido año actual"
              loading={loading}
              name="units"
              description="Son el número de unidades consumidas (pedidas - devueltas) en el año actual."
            />
            <NumberFormField
              form={form}
              input={{
                placeholder: "Introduce el precio unitario.",
              }}
              label="Precio por unidad"
              loading={loading}
              name="unitPrice"
              showCurrency
              description="Es el precio unitario de coste para el año actual."
            />
            <NumberFormField
              form={form}
              input={{
                disabled: true,
                placeholder: "Introduce el total.",
              }}
              label="Precio total"
              loading={loading}
              name="total"
              showCurrency
              description="Es el precio total que se debe pagar por este gasto."
            />
            <NumberFormField
              form={form}
              input={{
                placeholder: "Introduce el importe pagado.",
              }}
              label="Pagado"
              loading={loading}
              name="paid"
              showCurrency
              description="Es el importe pagado para este gasto hasta la fecha."
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
