"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Trash } from "lucide-react";
import { useForm } from "react-hook-form";

import CheckboxListFormField from "@/components/form/checkbox-list-form-field";
import Heading from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { formSchema } from "./clients-search-form.constants";

import type { CommonFormFieldData } from "@/components/form/form.types";
import type { PriceType } from "@prisma/client";
import type { ClientSearchFormValues } from "./clients-search-form.types";
import { ClientColumn } from "./columns";
import TextFormField from "@/components/form/text-form-field";
import { ageGroupData } from "../[clientId]/components/client-form.constants";
import { useMemo } from "react";

interface Props {
  readonly priceTypes: PriceType[];
  readonly clients: ClientColumn[];
  readonly setTableData: (clients: ClientColumn[]) => void;
}

export default function ClientsSearchForm({
  clients,
  priceTypes,
  setTableData,
}: Props) {
  const form = useForm<ClientSearchFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ageGroups: ageGroupData.map((a) => a.value),
      firstName: "",
      priceTypeIds: priceTypes.map((p) => p.id),
    },
  });

  const priceTypesData: CommonFormFieldData = priceTypes.map(
    ({ id, name }) => ({
      value: id,
      label: name,
    })
  );

  const ageGroupOptionsData: CommonFormFieldData = useMemo(
    () => ageGroupData,
    []
  );

  const handleValid = async (values: ClientSearchFormValues) => {
    setTableData(
      clients.filter(
        (c) =>
          values.priceTypeIds.indexOf(c.priceType.id) !== -1 &&
          c.firstName.toLowerCase().indexOf(values.firstName.toLowerCase()) !==
            -1 &&
          values.ageGroups.indexOf(c.ageGroup) !== -1
      )
    );
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <h4 className="text-xl font-bold tracking-tight">
          Buscador de comparsistas
        </h4>
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
                placeholder: "Nombre del comparsista",
              }}
              label="Nombre"
              loading={false}
              name="firstName"
            />
            <h5 className="text-lg font-bold tracking-tight col-span-3">
              Tipos de cuota
            </h5>
            <CheckboxListFormField
              data={priceTypesData}
              form={form}
              loading={false}
              name="priceTypeIds"
            />
            <h5 className="text-lg font-bold tracking-tight col-span-3">
              Grupo de Edad
            </h5>
            <CheckboxListFormField
              data={ageGroupOptionsData}
              form={form}
              loading={false}
              name="ageGroups"
            />
          </div>
          <Button type="submit" className="ml-auto">
            Buscar
          </Button>
        </form>
      </Form>
    </>
  );
}
