"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import Heading from "@/components/heading";
import AlertModal from "@/components/modals/alert-modal";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { formSchema } from "./turn-form.constants";

import DateTimeFormField from "@/components/form/date-time-form-field";
import { CommonFormFieldData } from "@/components/form/form.types";
import SelectFormField from "@/components/form/select-form-field";
import type {
  BarGroup,
  Client,
  ClientsOnBarGroups,
  PriceType,
  Turn,
  YearWork,
} from "@prisma/client";
import type { CustomTurn, TurnFormValues } from "./turn-form.types";

type CustomClient = ClientsOnBarGroups & {
  client: Client;
};
type CustomBarGroup = BarGroup & {
  clients: CustomClient[];
  turns: Turn[];
};

interface Props {
  readonly barGroups: CustomBarGroup[];
  readonly initialData: CustomTurn | null;
  readonly yearWork: YearWork;
}

export default function TurnForm({ initialData, yearWork, barGroups }: Props) {
  const router = useRouter();
  const params = useParams();
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const [title, description, action, saveApiUrl, apiCall, toastMessage] =
    initialData
      ? [
          "Actualizar Turno",
          "Edita la información del turno seleccionado",
          "Guardar cambios",
          `/api/${params.yearWorkId}/turns/${initialData.id}`,
          axios.patch<PriceType>,
          "Turno actualizado.",
        ]
      : [
          "Crear nuevo Turno",
          "Inserta un nuevo turno apuntado en el año de trabajo seleccionado",
          "Crear",
          `/api/${params.yearWorkId}/turns`,
          axios.post<PriceType>,
          "Nuevo turno creado.",
        ];

  const form = useForm<TurnFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      barGroupId: initialData?.barGroupId,
      endDate: initialData?.endDate,
      startDate: initialData?.startDate,
    },
  });

  const barGroupsData: CommonFormFieldData = barGroups.map(
    ({ id, name, clients, turns }) => ({
      value: id,
      label: `(${turns.length}) - ${name} - [${clients
        .map(({ client }) => client.firstName)
        .join(", ")}]`,
    })
  );

  const handleValid = async (values: TurnFormValues) => {
    try {
      setLoading(true);
      await apiCall(saveApiUrl, values);

      router.refresh();
      router.push(`/${params.yearWorkId}/turns`);
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
      await axios.delete(`/api/${params.yearWorkId}/turns/${initialData?.id}`);

      router.refresh();
      router.push(`/${params.yearWorkId}/turns`);
      toast.success("Turno eliminado");
    } catch (error) {
      toast.error(
        "Asegúrate de que toda la información de este turno se haya eliminado previamente."
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
            <DateTimeFormField
              description="Esta es la fecha y hora de inicio del turno de barra a cubrir."
              form={form}
              label="Comienzo"
              loading={loading}
              name="startDate"
            />
            <DateTimeFormField
              description="Esta es la fecha y hora de find del turno de barra a cubrir."
              form={form}
              label="Fin"
              loading={loading}
              name="endDate"
            />
            <SelectFormField
              data={barGroupsData}
              form={form}
              label="Grupo Barra"
              loading={loading}
              name="barGroupId"
              placeholder="Selecciona un grupo"
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
