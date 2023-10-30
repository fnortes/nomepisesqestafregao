"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { format } from "date-fns";
import { CalendarIcon, Euro, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";

import Heading from "@/components/heading";
import AlertModal from "@/components/modals/alert-modal";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

import type { YearWork } from "@prisma/client";

interface Props {
  initialData: YearWork;
}

const formSchema = z
  .object({
    year: z.string().length(4),
    newClientPrice: z.number().min(0).max(99),
    previousAdults: z.number().int().min(1).max(99),
    previousChilds: z.number().int().min(1).max(99),
    firstPartyDay: z.date(),
    lastPartyDay: z.date(),
    previousFirstPartyDay: z.date(),
    previousLastPartyDay: z.date(),
    unitFoodPrice: z.number().min(0).max(99),
    previousYearWorkAmount: z.number().min(0).max(9999),
    awardsReward: z.number().min(0).max(999),
    commissionHelp: z.number().min(0).max(999),
  })
  .refine(({ firstPartyDay, lastPartyDay }) => firstPartyDay < lastPartyDay, {
    message: "La fecha de inicio debe ser menor que la de final.",
    path: ["firstPartyDay"],
  })
  .refine(
    ({ previousFirstPartyDay, previousLastPartyDay }) =>
      previousFirstPartyDay < previousLastPartyDay,
    {
      message: "La fecha de inicio debe ser menor que la de final.",
      path: ["previousFirstPartyDay"],
    }
  )
  .refine(
    ({ firstPartyDay, previousLastPartyDay }) =>
      firstPartyDay > previousLastPartyDay,
    {
      message:
        "La fecha de comienzo de fiestas debe ser mayor a la de final del año pasado.",
      path: ["firstPartyDay"],
    }
  );

type SettingsFormValues = z.infer<typeof formSchema>;

export default function SettingsForm({ initialData }: Props) {
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      year: initialData.year,
      newClientPrice: initialData.newClientPrice,
      previousAdults: initialData.previousAdults,
      previousChilds: initialData.previousChilds,
      firstPartyDay: initialData.firstPartyDay,
      lastPartyDay: initialData.lastPartyDay,
      previousFirstPartyDay:
        initialData.previousFirstPartyDay ?? initialData.firstPartyDay,
      previousLastPartyDay:
        initialData.previousLastPartyDay ?? initialData.lastPartyDay,
      unitFoodPrice: initialData.unitFoodPrice,
      previousYearWorkAmount: initialData.previousYearWorkAmount,
      awardsReward: initialData.awardsReward,
      commissionHelp: initialData.commissionHelp,
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
                      placeholder="Año con el que trabajar, de 4 cifras"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="newClientPrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cuota nuevos comparsistas</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        className="pr-6"
                        disabled={loading}
                        placeholder="Cantidad extra para nuevos comparsistas"
                        type="number"
                        onChange={(e) => {
                          const newValue = e.target.value;
                          field.onChange(newValue !== "" ? +newValue : null);
                        }}
                      />
                      <Euro className="w-4 h-4 absolute top-3 right-1" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="unitFoodPrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cuota comida</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        className="pr-6"
                        disabled={loading}
                        placeholder="Cantidad a pagar por comida o cena suelta"
                        type="number"
                        onChange={(e) => {
                          const newValue = e.target.value;
                          field.onChange(newValue !== "" ? +newValue : null);
                        }}
                      />
                      <Euro className="w-4 h-4 absolute top-3 right-1" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="previousAdults"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Adultos año anterior</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={loading}
                      placeholder="Número de adultos del año anterior"
                      type="number"
                      onChange={(e) => {
                        const newValue = e.target.value;
                        field.onChange(newValue !== "" ? +newValue : null);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="previousChilds"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Niños con cuota año anterior</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={loading}
                      placeholder="Número de niños del año anterior"
                      type="number"
                      onChange={(e) => {
                        const newValue = e.target.value;
                        field.onChange(newValue !== "" ? +newValue : null);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="firstPartyDay"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Comienzo fiestas</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "dd/MM/yyyy")
                          ) : (
                            <span>Selecciona una fecha</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date < new Date(`${initialData.year}-01-01`) ||
                          date > new Date(`${initialData.year}-12-31`)
                        }
                        initialFocus
                        defaultMonth={field.value}
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription>
                    Este día se usará para calcular cuantas noches de fiestas
                    hay.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastPartyDay"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Final fiestas</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "dd/MM/yyyy")
                          ) : (
                            <span>Selecciona una fecha</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date < new Date(`${initialData.year}-01-01`) ||
                          date > new Date(`${initialData.year}-12-31`)
                        }
                        initialFocus
                        defaultMonth={field.value}
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription>
                    Este día se usará para calcular cuantas noches de fiestas
                    hay.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="previousFirstPartyDay"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Comienzo fiestas</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "dd/MM/yyyy")
                          ) : (
                            <span>Selecciona una fecha</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date <
                            new Date(
                              `${initialData.previousFirstPartyDay?.getFullYear()}-01-01`
                            ) ||
                          date >
                            new Date(
                              `${initialData.previousFirstPartyDay?.getFullYear()}-12-31`
                            )
                        }
                        initialFocus
                        defaultMonth={field.value}
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription>
                    Este día se usará para calcular cuantas noches de fiestas
                    hay.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="previousLastPartyDay"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Final fiestas</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "dd/MM/yyyy")
                          ) : (
                            <span>Selecciona una fecha</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date <
                            new Date(
                              `${initialData.previousFirstPartyDay?.getFullYear()}-01-01`
                            ) ||
                          date >
                            new Date(
                              `${initialData.previousFirstPartyDay?.getFullYear()}-12-31`
                            )
                        }
                        initialFocus
                        defaultMonth={field.value}
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription>
                    Este día se usará para calcular cuantas noches de fiestas
                    hay.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="previousYearWorkAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Saldo año anterior</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        className="pr-6"
                        disabled={loading}
                        placeholder="Cantidad a pagar por comida o cena suelta"
                        type="number"
                        onChange={(e) => {
                          const newValue = e.target.value;
                          field.onChange(newValue !== "" ? +newValue : null);
                        }}
                      />
                      <Euro className="w-4 h-4 absolute top-3 right-1" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="awardsReward"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Premios</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        className="pr-6"
                        disabled={loading}
                        placeholder="Cantidad a pagar por comida o cena suelta"
                        type="number"
                        onChange={(e) => {
                          const newValue = e.target.value;
                          field.onChange(newValue !== "" ? +newValue : null);
                        }}
                      />
                      <Euro className="w-4 h-4 absolute top-3 right-1" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="commissionHelp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ayuda comisión</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        className="pr-6"
                        disabled={loading}
                        placeholder="Cantidad a pagar por comida o cena suelta"
                        type="number"
                        onChange={(e) => {
                          const newValue = e.target.value;
                          field.onChange(newValue !== "" ? +newValue : null);
                        }}
                      />
                      <Euro className="w-4 h-4 absolute top-3 right-1" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
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
