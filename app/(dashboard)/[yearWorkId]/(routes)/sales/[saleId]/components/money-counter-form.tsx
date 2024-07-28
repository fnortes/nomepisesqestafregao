"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import NumberFormField from "@/components/form/number-form-field";
import { Form } from "@/components/ui/form";
import { formSchema } from "./money-counter-form.constants";

import { formatCurrency } from "@/lib/utils";
import type { MoneyCounterFormValues } from "./money-counter-form.types";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Calculator } from "lucide-react";

export default function MoneyCounterForm() {
  const form = useForm<MoneyCounterFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      total1: 0,
      total2: 0,
      total3: 0,
      total4: 0,
      total5: 0,
      total6: 0,
      total7: 0,
      total8: 0,
      total9: 0,
      total10: 0,
      total11: 0,
      total12: 0,
      total13: 0,
    },
  });

  useEffect(() => {
    const subscription = form.watch((value, { name, type }) => {
      if (name && ["amount1"].indexOf(name) !== -1) {
        form.setValue("total1", (value.amount1 ?? 0) * 0.05);
      }
      if (name && ["amount2"].indexOf(name) !== -1) {
        form.setValue("total2", (value.amount2 ?? 0) * 0.1);
      }
      if (name && ["amount3"].indexOf(name) !== -1) {
        form.setValue("total3", (value.amount3 ?? 0) * 0.2);
      }
      if (name && ["amount4"].indexOf(name) !== -1) {
        form.setValue("total4", (value.amount4 ?? 0) * 0.5);
      }
      if (name && ["amount5"].indexOf(name) !== -1) {
        form.setValue("total5", (value.amount5 ?? 0) * 1);
      }
      if (name && ["amount6"].indexOf(name) !== -1) {
        form.setValue("total6", (value.amount6 ?? 0) * 2);
      }
      if (name && ["amount7"].indexOf(name) !== -1) {
        form.setValue("total7", (value.amount7 ?? 0) * 5);
      }
      if (name && ["amount8"].indexOf(name) !== -1) {
        form.setValue("total8", (value.amount8 ?? 0) * 10);
      }
      if (name && ["amount9"].indexOf(name) !== -1) {
        form.setValue("total9", (value.amount9 ?? 0) * 20);
      }
      if (name && ["amount10"].indexOf(name) !== -1) {
        form.setValue("total10", (value.amount10 ?? 0) * 50);
      }
      if (name && ["amount11"].indexOf(name) !== -1) {
        form.setValue("total11", (value.amount11 ?? 0) * 100);
      }
      if (name && ["amount12"].indexOf(name) !== -1) {
        form.setValue("total12", (value.amount12 ?? 0) * 200);
      }
      if (name && ["amount13"].indexOf(name) !== -1) {
        form.setValue("total13", (value.amount13 ?? 0) * 500);
      }
    });
    return () => subscription.unsubscribe();
  }, [form]);

  return (
    <Form {...form}>
      <form className="space-y-8 w-full">
        <h4 className="text-xl font-bold tracking-tight">
          Calculadora de monedas
        </h4>
        <div className="grid grid-cols-4 gap-8">
          <NumberFormField
            form={form}
            input={{
              placeholder: `Introduce la cantidad de monedas de ${formatCurrency(
                0.05
              )}.`,
            }}
            label={`Número monedas de ${formatCurrency(0.05)}`}
            loading={false}
            name="amount1"
          />
          <NumberFormField
            form={form}
            input={{
              disabled: true,
            }}
            label="Sumatorio"
            loading={false}
            name="total1"
            showCurrency
          />
          <NumberFormField
            form={form}
            input={{
              placeholder: `Introduce la cantidad de monedas de ${formatCurrency(
                0.1
              )}.`,
            }}
            label={`Número monedas de ${formatCurrency(0.1)}`}
            loading={false}
            name="amount2"
          />
          <NumberFormField
            form={form}
            input={{
              disabled: true,
            }}
            label="Sumatorio"
            loading={false}
            name="total2"
            showCurrency
          />
          <NumberFormField
            form={form}
            input={{
              placeholder: `Introduce la cantidad de monedas de ${formatCurrency(
                0.2
              )}.`,
            }}
            label={`Número monedas de ${formatCurrency(0.2)}`}
            loading={false}
            name="amount3"
          />
          <NumberFormField
            form={form}
            input={{
              disabled: true,
            }}
            label="Sumatorio"
            loading={false}
            name="total3"
            showCurrency
          />
          <NumberFormField
            form={form}
            input={{
              placeholder: `Introduce la cantidad de monedas de ${formatCurrency(
                0.5
              )}.`,
            }}
            label={`Número monedas de ${formatCurrency(0.5)}`}
            loading={false}
            name="amount4"
          />
          <NumberFormField
            form={form}
            input={{
              disabled: true,
            }}
            label="Sumatorio"
            loading={false}
            name="total4"
            showCurrency
          />
          <NumberFormField
            form={form}
            input={{
              placeholder: `Introduce la cantidad de monedas de ${formatCurrency(
                1
              )}.`,
            }}
            label={`Número monedas de ${formatCurrency(1)}`}
            loading={false}
            name="amount5"
          />
          <NumberFormField
            form={form}
            input={{
              disabled: true,
            }}
            label="Sumatorio"
            loading={false}
            name="total5"
            showCurrency
          />
          <NumberFormField
            form={form}
            input={{
              placeholder: `Introduce la cantidad de monedas de ${formatCurrency(
                2
              )}.`,
            }}
            label={`Número monedas de ${formatCurrency(2)}`}
            loading={false}
            name="amount6"
          />
          <NumberFormField
            form={form}
            input={{
              disabled: true,
            }}
            label="Sumatorio"
            loading={false}
            name="total6"
            showCurrency
          />
          <NumberFormField
            form={form}
            input={{
              placeholder: `Introduce la cantidad de billetes de ${formatCurrency(
                5
              )}.`,
            }}
            label={`Número billetes de ${formatCurrency(5)}`}
            loading={false}
            name="amount7"
          />
          <NumberFormField
            form={form}
            input={{
              disabled: true,
            }}
            label="Sumatorio"
            loading={false}
            name="total7"
            showCurrency
          />
          <NumberFormField
            form={form}
            input={{
              placeholder: `Introduce la cantidad de billetes de ${formatCurrency(
                10
              )}.`,
            }}
            label={`Número billetes de ${formatCurrency(10)}`}
            loading={false}
            name="amount8"
          />
          <NumberFormField
            form={form}
            input={{
              disabled: true,
            }}
            label="Sumatorio"
            loading={false}
            name="total8"
            showCurrency
          />
          <NumberFormField
            form={form}
            input={{
              placeholder: `Introduce la cantidad de billetes de ${formatCurrency(
                20
              )}.`,
            }}
            label={`Número billetes de ${formatCurrency(20)}`}
            loading={false}
            name="amount9"
          />
          <NumberFormField
            form={form}
            input={{
              disabled: true,
            }}
            label="Sumatorio"
            loading={false}
            name="total9"
            showCurrency
          />
          <NumberFormField
            form={form}
            input={{
              placeholder: `Introduce la cantidad de billetes de ${formatCurrency(
                50
              )}.`,
            }}
            label={`Número billetes de ${formatCurrency(50)}`}
            loading={false}
            name="amount10"
          />
          <NumberFormField
            form={form}
            input={{
              disabled: true,
            }}
            label="Sumatorio"
            loading={false}
            name="total10"
            showCurrency
          />
          <NumberFormField
            form={form}
            input={{
              placeholder: `Introduce la cantidad de billetes de ${formatCurrency(
                100
              )}.`,
            }}
            label={`Número billetes de ${formatCurrency(100)}`}
            loading={false}
            name="amount11"
          />
          <NumberFormField
            form={form}
            input={{
              disabled: true,
            }}
            label="Sumatorio"
            loading={false}
            name="total11"
            showCurrency
          />
          <NumberFormField
            form={form}
            input={{
              placeholder: `Introduce la cantidad de billetes de ${formatCurrency(
                200
              )}.`,
            }}
            label={`Número billetes de ${formatCurrency(200)}`}
            loading={false}
            name="amount12"
          />
          <NumberFormField
            form={form}
            input={{
              disabled: true,
            }}
            label="Sumatorio"
            loading={false}
            name="total12"
            showCurrency
          />
          <NumberFormField
            form={form}
            input={{
              placeholder: `Introduce la cantidad de billetes de ${formatCurrency(
                500
              )}.`,
            }}
            label={`Número billetes de ${formatCurrency(500)}`}
            loading={false}
            name="amount13"
          />
          <NumberFormField
            form={form}
            input={{
              disabled: true,
            }}
            label="Sumatorio"
            loading={false}
            name="total13"
            showCurrency
          />
          <Alert className="col-span-2">
            <Calculator className="h-4 w-4" />
            <AlertTitle className="text-orange-500">{`${
              form.getValues() !== null
                ? (form.getValues().total1 || 0) +
                  (form.getValues().total2 || 0) +
                  (form.getValues().total3 || 0) +
                  (form.getValues().total4 || 0) +
                  (form.getValues().total5 || 0) +
                  (form.getValues().total6 || 0) +
                  (form.getValues().total7 || 0) +
                  (form.getValues().total8 || 0) +
                  (form.getValues().total9 || 0) +
                  (form.getValues().total10 || 0) +
                  (form.getValues().total11 || 0) +
                  (form.getValues().total12 || 0) +
                  (form.getValues().total13 || 0)
                : 0
            } €`}</AlertTitle>
            <AlertDescription className="text-sm text-muted-foreground">
              Este es el sumatorio total.
            </AlertDescription>
          </Alert>
        </div>
      </form>
    </Form>
  );
}
