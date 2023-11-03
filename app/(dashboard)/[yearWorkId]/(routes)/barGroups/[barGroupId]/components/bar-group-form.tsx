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
import { formSchema } from "./bar-group-form.constants";

import type { BarGroup } from "@prisma/client";
import type { BarGroupFormValues } from "./bar-group-form.types";

interface Props {
  readonly initialData: BarGroup | null;
}

export default function BarGroupForm({ initialData }: Props) {
  const router = useRouter();
  const params = useParams();
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const [title, description, action, saveApiUrl, apiCall, toastMessage] =
    initialData
      ? [
          "Actualizar Grupo de Barra",
          "Edita la información del grupo de barra seleccionado",
          "Guardar cambios",
          `/api/barGroups/${initialData.id}`,
          axios.patch<BarGroup>,
          "Grupo de barra actualizado.",
        ]
      : [
          "Crear nuevo Grupo de Barra",
          "Inserta un nuevo grupo de barra en el año de trabajo seleccionado",
          "Crear",
          "/api/barGroups",
          axios.post<BarGroup>,
          "Nuevo grupo de barra creado.",
        ];

  const form = useForm<BarGroupFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData?.name ?? "",
    },
  });

  const handleValid = async (values: BarGroupFormValues) => {
    try {
      setLoading(true);
      await apiCall(saveApiUrl, { ...values, yearWorkId: params.yearWorkId });

      router.refresh();
      router.push(`/${params.yearWorkId}/barGroups`);
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
      await axios.delete(`/api/barGroups/${initialData?.id}`);

      router.refresh();
      router.push(`/${params.yearWorkId}/barGroups`);
      toast.success("Grupo de barra eliminado");
    } catch (error) {
      toast.error(
        "Asegúrate de que toda la información de este grupo de barra se haya eliminado previamente."
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
                placeholder: "Nombre para el grupo, máximo 10 caracteres",
              }}
              label="Nombre"
              loading={loading}
              name="name"
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
