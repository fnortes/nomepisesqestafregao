"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import i18next from "i18next";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodI18nMap } from "zod-i18n-map";
import translation from "zod-i18n-map/locales/es/zod.json";

import { useWorkYearModal } from "@/hooks/use-work-year-modal";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import Modal from "../ui/modal";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { YearWork } from "@prisma/client";

i18next.init({
  lng: "es",
  resources: {
    es: { zod: translation },
  },
});
z.setErrorMap(zodI18nMap);

const formSchema = z.object({
  year: z.string().length(4),
});

export default function WorkYearModal() {
  const { isOpen, onClose } = useWorkYearModal();
  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      year: new Date().getFullYear().toString(),
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      const response = await axios.post<YearWork>("/api/yearWorks", values);

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
            <form onSubmit={form.handleSubmit(onSubmit)}>
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
