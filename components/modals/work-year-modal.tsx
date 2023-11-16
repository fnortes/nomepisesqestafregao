"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { YearWork } from "@prisma/client";
import axios from "axios";
import i18next from "i18next";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";
import { zodI18nMap } from "zod-i18n-map";
import translation from "zod-i18n-map/locales/es/zod.json";

import { useWorkYearModal } from "@/hooks/use-work-year-modal";
import CheckboxFormField from "../form/checkbox-form-field";
import SelectFormField, {
  type SelectFormFieldData,
} from "../form/select-form-field";
import TextFormField from "../form/text-form-field";
import { Button } from "../ui/button";
import { Form } from "../ui/form";
import Modal from "../ui/modal";

i18next.init({
  lng: "es",
  resources: {
    es: { zod: translation },
  },
});
z.setErrorMap(zodI18nMap);

const formSchema = z.object({
  year: z.string().length(4),
  dumpAllInformation: z.boolean().default(true).optional(),
  yearFromRestore: z.string().optional(),
});

interface Props {
  readonly workYears: YearWork[];
}

export default function WorkYearModal({ workYears }: Props) {
  const { isOpen, onClose } = useWorkYearModal();
  const [loading, setLoading] = useState<boolean>(false);

  const previousWorkYear = workYears.length > 0 ? workYears[0] : null;
  const workYearsMappedToSelect: SelectFormFieldData = workYears.map(
    ({ id, year }) => ({ value: id, label: year })
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      year: new Date().getFullYear().toString(),
      dumpAllInformation: true,
      yearFromRestore: previousWorkYear?.id,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      const response = await axios.post<YearWork>("/api/yearWorks", {
        year: values.year,
        yearFromRestore:
          values.dumpAllInformation && values.yearFromRestore
            ? values.yearFromRestore
            : null,
      });

      window.location.assign(`/${response.data.id}`);
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

  return (
    <Modal
      description="Añade un nuevo año de trabajo a la comparsa para poder empezar a gestionar un año de fiestas"
      isOpen={isOpen}
      onClose={onClose}
      title="Crear nuevo año de trabajo"
    >
      <div>
        <div className="space-y-4 py-2 pb-4">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              <TextFormField
                form={form}
                input={{
                  placeholder:
                    "Escribe el año con el que trabajar, de 4 cifras",
                }}
                label="Año"
                loading={loading}
                name="year"
              />
              {previousWorkYear && (
                <div className="rounded-md border p-4 shadow flex flex-col gap-4">
                  <CheckboxFormField
                    form={form}
                    label="¿Volcar toda la información del año anterior?"
                    loading={loading}
                    name="dumpAllInformation"
                    description="Selecciona esta opción para no partir de un año en blanco, sino hacerlo copiando toda la información base del año anterior o el que tú elijas."
                  />
                  {form.getValues().dumpAllInformation && (
                    <SelectFormField
                      data={workYearsMappedToSelect}
                      description="Selecciona el año de trabajo del cual coger todas la información para replicar en el nuevo año."
                      form={form}
                      label="Año de trabajo de origen"
                      loading={loading}
                      name="yearFromRestore"
                    />
                  )}
                </div>
              )}
              <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  disabled={loading}
                >
                  Cancelar
                </Button>
                <Button type="submit" disabled={loading}>
                  Continuar
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Modal>
  );
}
