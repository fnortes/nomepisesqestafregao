"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import CheckboxFormField from "@/components/form/checkbox-form-field";
import NumberFormField from "@/components/form/number-form-field";
import TextFormField from "@/components/form/text-form-field";
import Heading from "@/components/heading";
import AlertModal from "@/components/modals/alert-modal";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { formSchema } from "./price-type-form.constants";

import type { PriceType } from "@prisma/client";
import type { PriceTypeFormValues } from "./price-type-form.types";

interface Props {
  readonly initialData: PriceType | null;
}

export default function PriceTypeForm({ initialData }: Props) {
  const router = useRouter();
  const params = useParams();
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const [title, description, action, saveApiUrl, apiCall, toastMessage] =
    initialData
      ? [
          "Actualizar Tipo de cuota",
          "Edita la información del tipo de cuota seleccionado",
          "Guardar cambios",
          `/api/${params.yearWorkId}/priceTypes/${initialData.id}`,
          axios.patch<PriceType>,
          "Tipo de cuota actualizado.",
        ]
      : [
          "Crear nuevo Tipo de cuota",
          "Inserta un nuevo tipo de cuota en el año de trabajo seleccionado",
          "Crear",
          `/api/${params.yearWorkId}/priceTypes`,
          axios.post<PriceType>,
          "Nuevo tipo de cuota creado.",
        ];

  const form = useForm<PriceTypeFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData?.name ?? "",
      adultPrice: initialData?.adultPrice ?? 0,
      childPrice: initialData?.childPrice ?? 0,
      babyPrice: initialData?.babyPrice ?? 0,
      meals: initialData?.meals ?? false,
      dinners: initialData?.dinners ?? false,
      paradeSuit: initialData?.paradeSuit ?? false,
      paradeWater: initialData?.paradeWater ?? false,
      drinkTickets: initialData?.drinkTickets ?? false,
    },
  });

  const handleValid = async (values: PriceTypeFormValues) => {
    try {
      setLoading(true);
      await apiCall(saveApiUrl, values);

      router.refresh();
      router.push(`/${params.yearWorkId}/priceTypes`);
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
      await axios.delete(
        `/api/${params.yearWorkId}/priceTypes/${initialData?.id}`
      );

      router.refresh();
      router.push(`/${params.yearWorkId}/priceTypes`);
      toast.success("Tipo de cuota eliminado");
    } catch (error) {
      toast.error(
        "Asegúrate de que toda la información de este tipo de cuota se haya eliminado previamente."
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
                  "Nombre para el tipo de cuota, máximo 50 caracteres",
              }}
              label="Nombre"
              loading={loading}
              name="name"
            />
            <NumberFormField
              form={form}
              input={{ placeholder: "Cantidad de cuota para los adultos" }}
              label="Cuota para adultos"
              loading={loading}
              name="adultPrice"
              showCurrency
            />
            <NumberFormField
              form={form}
              input={{ placeholder: "Cantidad de cuota para los niños" }}
              label="Cuota para niños"
              loading={loading}
              name="childPrice"
              showCurrency
            />
            <NumberFormField
              form={form}
              input={{ placeholder: "Cantidad de cuota para los bebés" }}
              label="Cuota para bebés"
              loading={loading}
              name="babyPrice"
              showCurrency
            />
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
            <CheckboxFormField
              form={form}
              label="Comidas"
              loading={loading}
              name="meals"
            />
            <CheckboxFormField
              form={form}
              label="Cenas"
              loading={loading}
              name="dinners"
            />
            <CheckboxFormField
              form={form}
              label="Desfile con traje"
              loading={loading}
              name="paradeSuit"
            />
            <CheckboxFormField
              form={form}
              label="Desfile del agua"
              loading={loading}
              name="paradeWater"
            />
            <CheckboxFormField
              form={form}
              label="Tickets bebida"
              loading={loading}
              name="drinkTickets"
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
