"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import TextFormField from "@/components/form/text-form-field";
import Heading from "@/components/heading";
import AlertModal from "@/components/modals/alert-modal";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { formSchema } from "./food-form.constants";

import type { BarGroup, Food } from "@prisma/client";
import type { FoodFormValues } from "./food-form.types";
import NumberFormField from "@/components/form/number-form-field";
import DateFormField from "@/components/form/date-form-field";

interface Props {
  readonly initialData: Food | null;
}

export default function FoodForm({ initialData }: Props) {
  const router = useRouter();
  const params = useParams();
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const [title, description, action, saveApiUrl, apiCall, toastMessage] =
    initialData
      ? [
          "Actualizar Comida",
          "Edita la información de la comida seleccionada",
          "Guardar cambios",
          `/api/${params.yearWorkId}/foods/${initialData.id}`,
          axios.patch<BarGroup>,
          "Comida actualizada.",
        ]
      : [
          "Crear nueva Comida",
          "Inserta una nueva comida para el año de trabajo seleccionado",
          "Crear",
          `/api/${params.yearWorkId}/foods`,
          axios.post<BarGroup>,
          "Nueva comida creada.",
        ];

  const form = useForm<FoodFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      comments: initialData?.comments,
      date: initialData?.date,
      description: initialData?.description,
      price: initialData?.price ?? 0,
      paid: initialData?.paid ?? 0,
      title: initialData?.title,
    },
  });

  const handleValid = async (values: FoodFormValues) => {
    try {
      setLoading(true);
      await apiCall(saveApiUrl, values);

      router.refresh();
      router.push(`/${params.yearWorkId}/foods`);
      toast.success(toastMessage);
    } catch (error) {
      let errorMessage = "Algo ha ido mal :(";

      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data.errorMessage;
      }

      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirm = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/${params.yearWorkId}/foods/${initialData?.id}`);

      router.refresh();
      router.push(`/${params.yearWorkId}/foods`);
      toast.success("Comida eliminada");
    } catch (error) {
      toast.error(
        "Asegúrate de que toda la información de esta comida se haya eliminado previamente."
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
            <TextFormField
              form={form}
              input={{
                placeholder: "Título de la comida",
              }}
              label="Título"
              loading={loading}
              name="title"
            />
            <DateFormField
              description="Es la fecha de la comida o cena."
              emptyText="Selecciona una fecha"
              form={form}
              label="Fecha"
              loading={loading}
              name="date"
            />
            <NumberFormField
              form={form}
              input={{
                placeholder: "Introduce el precio por persona.",
              }}
              label="Precio por persona"
              loading={loading}
              name="price"
              showCurrency
              description="Es el coste por persona de la comida."
            />
            <NumberFormField
              form={form}
              input={{
                placeholder: "Introduce el total pagado para esta comida.",
              }}
              label="Total pagado"
              loading={loading}
              name="paid"
              showCurrency
              description="Es la cantidad pagada total por la comparsa para esta comida."
            />
            <TextFormField
              form={form}
              input={{
                placeholder: "Descripción de la comida",
              }}
              label="Descripción"
              loading={loading}
              name="description"
            />
            <TextFormField
              form={form}
              input={{
                placeholder: "Comentarios de la comida",
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
