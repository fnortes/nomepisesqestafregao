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
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import Modal from "../ui/modal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

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
  workYears: YearWork[];
}

export default function WorkYearModal({ workYears }: Props) {
  const { isOpen, onClose } = useWorkYearModal();
  const [loading, setLoading] = useState<boolean>(false);

  const previousWorkYear = workYears.length > 0 ? workYears[0] : null;

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
      toast.error("Algo ha ido mal :(");
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
              <FormField
                control={form.control}
                name="year"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Año</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={loading}
                        placeholder="Escribe el año con el que trabajar, de 4 cifras"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {previousWorkYear && (
                <div className="rounded-md border p-4 shadow flex flex-col gap-4">
                  <FormField
                    control={form.control}
                    name="dumpAllInformation"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            disabled={loading}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            ¿Volcar toda la información del año anterior?
                          </FormLabel>
                          <FormDescription>
                            Selecciona esta opción para no partir de un año en
                            blanco, sino hacerlo copiando toda la información
                            base del año anterior o el que tú elijas.
                          </FormDescription>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {form.getValues().dumpAllInformation && (
                    <FormField
                      control={form.control}
                      name="yearFromRestore"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Año de trabajo de origen</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {workYears.map(({ id, year }) => (
                                <SelectItem key={id} value={id}>
                                  {year}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            Selecciona el año de trabajo del cual coger todas la
                            información para replicar en el nuevo año.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                </div>
              )}
              <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                <Button variant="outline" onClick={onClose} disabled={loading}>
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
