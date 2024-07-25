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
import { formSchema } from "./sale-form.constants";

import type { Expense, Sale, SaleCategory, YearWork } from "@prisma/client";
import { EXPENSE_FAMILY_LITERALS } from "../../../expenseCategories/components/expenseCategories.constants";
import type { SaleFormValues } from "./sale-form.types";
import DateFormField from "@/components/form/date-form-field";

interface Props {
  readonly initialData: Sale | null;
  readonly categories: SaleCategory[];
  readonly yearWork: YearWork;
}

export default function SaleForm({ initialData, categories, yearWork }: Props) {
  const router = useRouter();
  const params = useParams();
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const [title, description, action, saveApiUrl, apiCall, toastMessage] =
    initialData
      ? [
          "Actualizar Venta",
          "Edita la información de la venta seleccionada",
          "Guardar cambios",
          `/api/${params.yearWorkId}/sales/${initialData.id}`,
          axios.patch<Expense>,
          "Venta actualizada.",
        ]
      : [
          "Crear nueva Venta",
          "Inserta un nueva venta para el año de trabajo seleccionado",
          "Crear",
          `/api/${params.yearWorkId}/sales`,
          axios.post<Expense>,
          "Nueva venta creada.",
        ];

  const form = useForm<SaleFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      benefitAmount: initialData?.benefitAmount ?? 0,
      comments: initialData?.comments,
      date: initialData?.date,
      finallyAmount: initialData?.finallyAmount ?? 0,
      initialAmount: initialData?.initialAmount ?? 0,
      saleCategoryId: initialData?.saleCategoryId,
      title: initialData?.title,
    },
  });

  const categoriesOptionsData = categories.map(({ id, name }) => ({
    value: id,
    label: name,
  }));

  useEffect(() => {
    const subscription = form.watch((value, { name, type }) => {
      if (name && ["finallyAmount", "initialAmount"].indexOf(name) !== -1) {
        form.setValue(
          "benefitAmount",
          (value.finallyAmount ?? 0) - (value.initialAmount ?? 0)
        );
      }
    });
    return () => subscription.unsubscribe();
  }, [form]);

  const handleValid = async (values: SaleFormValues) => {
    try {
      setLoading(true);
      await apiCall(saveApiUrl, values);

      router.refresh();
      router.push(`/${params.yearWorkId}/sales`);
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
      await axios.delete(`/api/${params.yearWorkId}/sales/${initialData?.id}`);

      router.refresh();
      router.push(`/${params.yearWorkId}/sales`);
      toast.success("Venta eliminada");
    } catch (error) {
      toast.error(
        "Asegúrate de que toda la información de esta venta se haya eliminado previamente."
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
              name="saleCategoryId"
              placeholder="Selecciona una categoría"
            />
            <TextFormField
              form={form}
              input={{
                placeholder: "Título de la venta, máximo 50 caracteres",
              }}
              label="Título"
              loading={loading}
              name="title"
            />
            <DateFormField
              description="Es la fecha en la que se produce la venta."
              emptyText="Selecciona una fecha"
              form={form}
              label="Fecha"
              loading={loading}
              name="date"
            />
            <div className="col-span-3">
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
            <NumberFormField
              form={form}
              input={{
                placeholder: "Introduce la cantidad inicial de la venta.",
              }}
              label="Cantidad inicial"
              loading={loading}
              name="initialAmount"
              showCurrency
              description="Es la cantidad inicial de un día de barra, no tiene sentido este valor para otra clase de ventas."
            />
            <NumberFormField
              form={form}
              input={{
                placeholder: "Introduce la cantidad final de la venta.",
              }}
              label="Cantidad final"
              loading={loading}
              name="finallyAmount"
              showCurrency
              description="Es la cantidad final de un día de barra, no tiene sentido este valor para otra clase de ventas."
            />
            <NumberFormField
              form={form}
              input={{
                disabled: true,
                placeholder: "Introduce la cantidad de beneficios.",
              }}
              label="Beneficios"
              loading={loading}
              name="benefitAmount"
              showCurrency
              description="Es el beneficio de la venta. Siempre se auto calcula al modificar los valores de precios iniciales y finales"
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
