"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import TextFormField from "@/components/form/text-form-field";
import Heading from "@/components/heading";
import AlertModal from "@/components/modals/alert-modal";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { formSchema } from "./suit-form.constants";

import { CommonFormFieldData } from "@/components/form/form.types";
import NumberFormField from "@/components/form/number-form-field";
import SelectFormField from "@/components/form/select-form-field";
import type { BarGroup, Suit } from "@prisma/client";
import {
  ageGroupData,
  genderOptionsData,
  suitGroupData,
} from "../../../clients/[clientId]/components/client-form.constants";
import type { SuitFormValues } from "./suit-form.types";

interface Props {
  readonly initialData: Suit | null;
}

export default function SuitForm({ initialData }: Props) {
  const router = useRouter();
  const params = useParams();
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const [title, description, action, saveApiUrl, apiCall, toastMessage] =
    initialData
      ? [
          "Actualizar Traje",
          "Edita la información del traje seleccionado",
          "Guardar cambios",
          `/api/${params.yearWorkId}/suits/${initialData.id}`,
          axios.patch<BarGroup>,
          "Traje actualizado.",
        ]
      : [
          "Crear nuevo Traje",
          "Inserta un nuevo traje para el año de trabajo seleccionado",
          "Crear",
          `/api/${params.yearWorkId}/suits`,
          axios.post<BarGroup>,
          "Nuevo traje creado.",
        ];

  const form = useForm<SuitFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ageGroup: initialData?.ageGroup,
      comments: initialData?.comments,
      gender: initialData?.gender,
      paid: initialData?.paid ?? 0,
      suitGroup: initialData?.suitGroup,
      total: initialData?.total ?? 0,
      unitPrice: initialData?.unitPrice ?? 0,
      units: initialData?.units ?? 0,
    },
  });

  const ageGroupOptionsData: CommonFormFieldData = useMemo(
    () => ageGroupData,
    []
  );

  const suitGroupOptionsData: CommonFormFieldData = useMemo(
    () => suitGroupData,
    []
  );

  useEffect(() => {
    const subscription = form.watch((value, { name, type }) => {
      if (name && ["units", "unitPrice"].indexOf(name) !== -1) {
        form.setValue("total", (value.units ?? 1) * (value.unitPrice ?? 0));
      }
    });
    return () => subscription.unsubscribe();
  }, [form]);

  const handleValid = async (values: SuitFormValues) => {
    try {
      setLoading(true);
      await apiCall(saveApiUrl, values);

      router.refresh();
      router.push(`/${params.yearWorkId}/suits`);
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
      await axios.delete(`/api/${params.yearWorkId}/suits/${initialData?.id}`);

      router.refresh();
      router.push(`/${params.yearWorkId}/suits`);
      toast.success("Traje eliminado");
    } catch (error) {
      toast.error(
        "Asegúrate de que toda la información de este traje se haya eliminado previamente."
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
              data={genderOptionsData}
              form={form}
              label="Sexo"
              loading={loading}
              name="gender"
              placeholder="Selecciona un sexo"
            />
            <SelectFormField
              data={ageGroupOptionsData}
              form={form}
              label="Grupo de edad"
              loading={loading}
              name="ageGroup"
              placeholder="Selecciona un grupo de edad"
            />
            <SelectFormField
              data={suitGroupOptionsData}
              form={form}
              label="Grupo de precio"
              loading={loading}
              name="suitGroup"
              placeholder="Selecciona un grupo de precio"
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
              description="Es el precio unitario de coste de cada traje."
            />
            <NumberFormField
              form={form}
              input={{
                disabled: true,
                placeholder: "Introduce el total.",
              }}
              label="Coste total"
              loading={loading}
              name="total"
              showCurrency
              description="Es el coste total que se debe pagar por estos trajes."
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
              description="Es el importe pagado para estos trajes hasta la fecha."
            />
            <TextFormField
              form={form}
              input={{
                placeholder: "Comentarios del traje",
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
