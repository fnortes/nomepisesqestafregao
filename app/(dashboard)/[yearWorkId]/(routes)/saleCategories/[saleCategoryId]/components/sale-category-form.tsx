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
import { formSchema } from "./sale-category-form.constants";

import type { Expense, SaleCategory } from "@prisma/client";
import type { SaleCategoryFormValues } from "./sale-category-form.types";

interface Props {
  readonly initialData: SaleCategory | null;
}

export default function SaleCategoryForm({ initialData }: Props) {
  const router = useRouter();
  const params = useParams();
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const [title, description, action, saveApiUrl, apiCall, toastMessage] =
    initialData
      ? [
          "Actualizar Categoría de Ventas",
          "Edita la información de la categoría de ventas seleccionada",
          "Guardar cambios",
          `/api/${params.yearWorkId}/saleCategories/${initialData.id}`,
          axios.patch<Expense>,
          "Categoría de Ventas actualizada.",
        ]
      : [
          "Crear nueva Categoría de Ventas",
          "Inserta una nueva categoría de ventas para todos los años de trabajo",
          "Crear",
          `/api/${params.yearWorkId}/saleCategories`,
          axios.post<Expense>,
          "Nueva categoría de ventas creada.",
        ];

  const form = useForm<SaleCategoryFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData?.name,
      comments: initialData?.comments,
    },
  });

  const handleValid = async (values: SaleCategoryFormValues) => {
    try {
      setLoading(true);
      await apiCall(saveApiUrl, values);

      router.refresh();
      router.push(`/${params.yearWorkId}/saleCategories`);
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
        `/api/${params.yearWorkId}/saleCategories/${initialData?.id}`
      );

      router.refresh();
      router.push(`/${params.yearWorkId}/saleCategories`);
      toast.success("Categoría de ventas eliminada");
    } catch (error) {
      toast.error(
        "Asegúrate de que toda la información de esta categoría de ventas se haya eliminado previamente."
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
                placeholder:
                  "Nombre de la categoría de ventas, máximo 50 caracteres",
              }}
              label="Nombre"
              loading={loading}
              name="name"
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
