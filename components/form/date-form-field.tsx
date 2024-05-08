import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { DATE_FORMAT } from "@/constants/date";
import { cn } from "@/lib/utils";

import type { CommonFieldProps } from "@/components/form/form.types";
import type { FieldValues } from "react-hook-form";

interface Props<T extends FieldValues> extends CommonFieldProps<T> {
  readonly description: string;
  readonly emptyText: string;
  readonly validateYear?: string;
}

export default function DateFormField<T extends FieldValues>({
  description,
  emptyText,
  form,
  label,
  loading,
  name,
  validateYear,
}: Props<T>) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>{label}</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  className={cn(
                    "pl-3 text-left font-normal",
                    !field.value && "text-muted-foreground"
                  )}
                  disabled={loading}
                  variant={"outline"}
                >
                  {field.value ? (
                    format(field.value as Date, DATE_FORMAT)
                  ) : (
                    <span>{emptyText}</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 h-96" align="start">
              <Calendar
                defaultMonth={field.value as Date}
                disabled={
                  validateYear
                    ? (date) =>
                        date < new Date(`${validateYear}-01-01`) ||
                        date > new Date(`${validateYear}-12-31`)
                    : false
                }
                initialFocus
                mode="single"
                onSelect={field.onChange}
                selected={field.value as Date}
              />
            </PopoverContent>
          </Popover>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
