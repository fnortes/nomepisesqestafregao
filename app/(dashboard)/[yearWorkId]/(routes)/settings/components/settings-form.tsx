"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import Heading from "@/components/heading";
import AlertModal from "@/components/modals/alert-modal";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import TextFormField from "../../../../../../components/form/text-form-field";
import { formSchema } from "./settings-form.constants";

import type { YearWork } from "@prisma/client";
import DateFormField from "../../../../../../components/form/date-form-field";
import NumberFormField from "../../../../../../components/form/number-form-field";
import type { SettingsFormValues } from "./settings-form.types";
import CheckboxFormField from "@/components/form/checkbox-form-field";

interface Props {
  readonly initialData: YearWork;
}

export default function SettingsForm({ initialData }: Props) {
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      awardsReward: initialData.awardsReward,
      awardsRewardPaid: initialData.awardsRewardPaid,
      comments: initialData.comments,
      commissionHelp: initialData.commissionHelp,
      commissionHelpPaid: initialData.commissionHelpPaid,
      firstPartyDay: initialData.firstPartyDay,
      lastPartyDay: initialData.lastPartyDay,
      newClientPrice: initialData.newClientPrice,
      previousAdults: initialData.previousAdults,
      previousChilds: initialData.previousChilds,
      previousTeens: initialData.previousTeens,
      previousYearWorkAmount: initialData.previousYearWorkAmount,
      unitFoodPrice: initialData.unitFoodPrice,
      year: initialData.year,
    },
  });

  const onSubmit = async (values: SettingsFormValues) => {
    try {
      setLoading(true);
      await axios.patch<YearWork>(`/api/yearWorks/${initialData.id}`, values);

      router.refresh();
      toast.success("Año de trabajo actualizado");
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

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/yearWorks/${initialData.id}`);

      router.refresh();
      router.push("/");
      toast.success("Año de trabajo eliminado");
    } catch (error) {
      toast.error(
        "Asegúrate de que toda la información de este año de trabajado se haya eliminado previamente."
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
        onConfirm={onDelete}
      />
      <div className="flex items-center justify-between">
        <Heading
          description="Administra las preferencias del año de trabajo"
          title="Configuración"
        />
        <Button
          disabled={loading}
          onClick={() => setOpen(true)}
          size="icon"
          variant="destructive"
        >
          <Trash className="w-4 h-4" />
        </Button>
      </div>
      <Separator />
      <Form {...form}>
        <form
          className="space-y-8 w-full"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
            <TextFormField
              form={form}
              input={{ placeholder: "Año con el que trabajar, de 4 cifras" }}
              label="Año"
              loading={loading}
              name="year"
            />
            <NumberFormField
              form={form}
              input={{ placeholder: "Cantidad extra para nuevos comparsistas" }}
              label="Cuota nuevos comparsistas"
              loading={loading}
              name="newClientPrice"
              showCurrency
            />
            <NumberFormField
              form={form}
              input={{
                placeholder: "Cantidad a pagar por comida o cena suelta",
              }}
              label="Cuota comida"
              loading={loading}
              name="unitFoodPrice"
              showCurrency
            />
            <NumberFormField
              form={form}
              input={{
                placeholder: "Número de adultos del año anterior",
              }}
              label="Adultos año anterior"
              loading={loading}
              name="previousAdults"
            />
            <NumberFormField
              form={form}
              input={{
                placeholder: "Número de adolescentes del año anterior",
              }}
              label="Adolescentes año anterior"
              loading={loading}
              name="previousTeens"
            />
            <NumberFormField
              form={form}
              input={{
                placeholder: "Número de niños del año anterior",
              }}
              label="Niños con cuota año anterior"
              loading={loading}
              name="previousChilds"
            />
            <DateFormField
              description="Este día se usará para calcular cuantas noches de fiestas hay."
              emptyText="Selecciona una fecha"
              form={form}
              label="Comienzo fiestas"
              loading={loading}
              name="firstPartyDay"
            />
            <DateFormField
              description="Este día se usará para calcular cuantas noches de fiestas hay."
              emptyText="Selecciona una fecha"
              form={form}
              label="Final fiestas"
              loading={loading}
              name="lastPartyDay"
            />
            <NumberFormField
              form={form}
              input={{
                placeholder: "Cantidad de dinero sobrante del año anterior",
              }}
              label="Saldo año anterior"
              loading={loading}
              name="previousYearWorkAmount"
              showCurrency
            />
            <NumberFormField
              form={form}
              input={{
                placeholder: "Cantidad de dinero recibida por premios",
              }}
              label="Premios"
              loading={loading}
              name="awardsReward"
              showCurrency
            />
            <CheckboxFormField
              form={form}
              label="Premios pagados"
              loading={loading}
              name="awardsRewardPaid"
            />
            <NumberFormField
              form={form}
              input={{
                placeholder:
                  "Cantidad de dinero recibida de ayuda por la comisión",
              }}
              label="Ayuda comisión"
              loading={loading}
              name="commissionHelp"
              showCurrency
            />
            <CheckboxFormField
              form={form}
              label="Ayuda comisión pagada"
              loading={loading}
              name="commissionHelpPaid"
            />
            <TextFormField
              form={form}
              input={{
                placeholder: "Comentarios generales del año",
              }}
              label="Comentarios"
              loading={loading}
              name="comments"
            />
          </div>
          <Button type="submit" disabled={loading} className="ml-auto">
            Guardar cambios
          </Button>
        </form>
      </Form>
    </>
  );
}
