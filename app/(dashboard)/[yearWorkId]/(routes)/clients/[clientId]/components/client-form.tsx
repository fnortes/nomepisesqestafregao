"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { format } from "date-fns";
import { Calculator, Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import toast from "react-hot-toast";

import CheckboxFormField from "@/components/form/checkbox-form-field";
import CheckboxListFormField from "@/components/form/checkbox-list-form-field";
import NumberFormField from "@/components/form/number-form-field";
import SelectFormField from "@/components/form/select-form-field";
import TextFormField from "@/components/form/text-form-field";
import Heading from "@/components/heading";
import AlertModal from "@/components/modals/alert-modal";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import {
  ageGroupData,
  formSchema,
  genderOptionsData,
  shirtSizeOptionsData,
  suitGroupData,
} from "./client-form.constants";

import type { CommonFormFieldData } from "@/components/form/form.types";
import { DATE_FORMAT } from "@/constants/date";
import { calculateQuote, formatCurrency } from "@/lib/utils";
import type { BarGroup, Food, PriceType, YearWork } from "@prisma/client";
import type { ClientFormValues, CustomClient } from "./client-form.types";

interface Props {
  readonly barGroups: BarGroup[];
  readonly foods: Food[];
  readonly initialData: CustomClient | null;
  readonly priceTypes: PriceType[];
  readonly yearWork: YearWork;
}

export default function ClientForm({
  barGroups,
  foods,
  initialData,
  priceTypes,
  yearWork,
}: Props) {
  const router = useRouter();
  const params = useParams();
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [calculatedQuote, setCalculatedQuote] = useState<number>(
    initialData
      ? calculateQuote({
          ageGroup: initialData.ageGroup,
          isNew: initialData.isNew,
          yearWork,
          priceType: initialData.priceType,
          foodQuantities: initialData.foods.map((f) => f.quantity),
        })
      : 0
  );

  const [title, description, action, saveApiUrl, apiCall, toastMessage] =
    initialData
      ? [
          "Actualizar Comparsista",
          "Edita la información del comparsista seleccionado",
          "Guardar cambios",
          `/api/${params.yearWorkId}/clients/${initialData.id}`,
          axios.patch<PriceType>,
          "Comparsista actualizado.",
        ]
      : [
          "Crear nuevo Comparsista",
          "Inserta un nuevo comparsista apuntado en el año de trabajo seleccionado",
          "Crear",
          `/api/${params.yearWorkId}/clients`,
          axios.post<PriceType>,
          "Nuevo comparsista creado.",
        ];

  const form = useForm<ClientFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: initialData?.firstName,
      lastName: initialData?.lastName,
      phone: initialData?.phone,
      email: initialData?.email,
      gender: initialData?.gender,
      ageGroup: initialData?.ageGroup,
      isNew: initialData?.isNew ?? false,
      barGroups:
        initialData?.barGroups.map((barGroup) => barGroup.barGroupId) ?? [],
      foods: foods.map(({ id }) => {
        const initialFood = initialData?.foods.find((f) => f.foodId === id);

        return {
          attend: initialFood?.attend ?? false,
          foodId: id,
          quantity: initialFood?.quantity ?? 0,
        };
      }),
      priceTypeId: initialData?.priceTypeId ?? "",
      shirtSize: initialData?.shirtSize,
      quotaPaid: initialData?.quotaPaid ?? 0,
      comments: initialData?.comments,
      suitGroup: initialData?.suitGroup,
    },
  });

  const { fields } = useFieldArray({
    name: "foods",
    control: form.control,
  });

  const ageGroupOptionsData: CommonFormFieldData = useMemo(
    () => ageGroupData,
    []
  );

  const suitGroupOptionsData: CommonFormFieldData = useMemo(
    () => suitGroupData,
    []
  );

  const barGroupsData: CommonFormFieldData = barGroups.map(({ id, name }) => ({
    value: id,
    label: name,
  }));

  const priceTypesData: CommonFormFieldData = priceTypes.map(
    ({ id, name }) => ({
      value: id,
      label: name,
    })
  );

  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (
        name &&
        (["priceTypeId", "ageGroup", "isNew", "foods"].indexOf(name) !== -1 ||
          name.includes("quantity"))
      ) {
        const priceTypeSelected = priceTypes.find(
          (priceType) => priceType.id === value.priceTypeId
        );

        let newCalculatedQuote = 0;

        if (priceTypeSelected && value.ageGroup) {
          newCalculatedQuote = calculateQuote({
            ageGroup: value.ageGroup,
            isNew: value.isNew || false,
            yearWork,
            priceType: priceTypeSelected,
            foodQuantities: value.foods?.map((f) => f?.quantity ?? 0) ?? [],
          });
        }

        setCalculatedQuote(newCalculatedQuote);
      }
    });
    return () => subscription.unsubscribe();
  }, [form, ageGroupOptionsData, priceTypes, yearWork]);

  const handleValid = async (values: ClientFormValues) => {
    try {
      setLoading(true);
      await apiCall(saveApiUrl, values);

      router.refresh();
      router.push(`/${params.yearWorkId}/clients`);
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
      await axios.delete(
        `/api/${params.yearWorkId}/clients/${initialData?.id}`
      );

      router.refresh();
      router.push(`/${params.yearWorkId}/clients`);
      toast.success("Comparsista eliminado");
    } catch (error) {
      toast.error(
        "Asegúrate de que toda la información de este comparsista se haya eliminado previamente."
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
                placeholder: "Nombre del comparsista, máximo 50 caracteres",
              }}
              label="Nombre"
              loading={loading}
              name="firstName"
            />
            <TextFormField
              form={form}
              input={{
                placeholder: "Apellidos del comparsista, máximo 50 caracteres",
              }}
              label="Apellidos"
              loading={loading}
              name="lastName"
            />
            <TextFormField
              form={form}
              input={{
                placeholder: "Teléfono del comparsista",
              }}
              label="Teléfono"
              loading={loading}
              name="phone"
            />
            <TextFormField
              form={form}
              input={{
                placeholder: "Correo electrónico del comparsista",
              }}
              label="E-mail"
              loading={loading}
              name="email"
            />
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
              label="Grupo de traje"
              loading={loading}
              name="suitGroup"
              placeholder="Selecciona un grupo de traje"
            />
            <SelectFormField
              data={shirtSizeOptionsData}
              form={form}
              label="Talla de camiseta"
              loading={loading}
              name="shirtSize"
              placeholder="Selecciona la talla de camiseta"
            />
            <SelectFormField
              data={priceTypesData}
              form={form}
              label="Modalidad de cuota"
              loading={loading}
              name="priceTypeId"
              placeholder="Selecciona la modalidad de cuota"
            />
            <NumberFormField
              form={form}
              input={{
                placeholder: "Introduce la cantidad pagada por el comparsista",
              }}
              label="Cuota pagada en el año actual"
              loading={loading}
              name="quotaPaid"
              showCurrency
              description="Esta cantidad de cuota pagada por el comparsista nunca debe ser mayor a la cuota calculada para pagar en el año en curso"
            />
            <CheckboxFormField
              form={form}
              label="¿Es nuevo comparsista este año?"
              loading={loading}
              name="isNew"
            />
            <Alert className="col-span-2">
              <Calculator className="h-4 w-4" />
              <AlertTitle className="text-orange-500">{`${calculatedQuote} €`}</AlertTitle>
              <AlertDescription className="text-sm text-muted-foreground">
                Esta es la cuota calculada a pagar por el comparsista en base a
                su grupo de edad, modalidad de cuota y si es nuevo o no en la
                comparsa.
              </AlertDescription>
            </Alert>
          </div>
          <Separator />
          <h3 className="text-2xl font-bold tracking-tight">Grupos de barra</h3>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
            <CheckboxListFormField
              data={barGroupsData}
              form={form}
              loading={loading}
              name="barGroups"
            />
          </div>
          <Separator />
          <h3 className="text-2xl font-bold tracking-tight">
            Comidas (Precio comidas extra por persona:{" "}
            {formatCurrency(yearWork.unitFoodPrice)})
          </h3>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {fields.map((field, index) => {
              const foodExtraData = foods.find((f) => f.id === field.foodId)!;

              return (
                <Alert key={field.id} className="col-span-2">
                  <CheckboxFormField
                    form={form}
                    label={`${format(foodExtraData.date, DATE_FORMAT)} - ${
                      foodExtraData.title
                    }`}
                    loading={loading}
                    name={`foods.${index}.attend`}
                  />
                  <NumberFormField
                    form={form}
                    input={{
                      placeholder:
                        "Introduce la cantidad de comidas extra a pagar",
                    }}
                    label="Comidas extra a pagar"
                    loading={loading}
                    name={`foods.${index}.quantity`}
                    showCurrency
                    description="Esta es la cantidad de comidas extra a pagar por el comparsista para la comida en cuestión. Se utiliza cuando se invita a gente de fuera de la comparsa o cuando al comparsista no le entran las comidas, pero quiere venir a alguna suelta."
                  />
                </Alert>
              );
            })}
          </div>
          <Button type="submit" disabled={loading} className="ml-auto">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
}
