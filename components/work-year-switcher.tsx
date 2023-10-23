"use client";

import { YearWork } from "@prisma/client";
import {
  CalendarCheck,
  CalendarSearch,
  Check,
  ChevronsUpDown,
  PlusCircle,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

import { useWorkYearModal } from "@/hooks/use-work-year-modal";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "./ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

type PopoverTriggerProps = React.ComponentPropsWithoutRef<
  typeof PopoverTrigger
>;

interface Props extends PopoverTriggerProps {
  items: YearWork[];
}

export default function WorkYearSwitcher({ items = [], className }: Props) {
  const yearWorkModal = useWorkYearModal();
  const params = useParams();
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);

  const formattedItems = items.map(({ year, id }) => ({
    label: year,
    value: id,
  }));

  const currentItem = formattedItems.find(
    (item) => item.value === params.yearWorkId
  );

  const handleSelectWorkYear = (value: string) => {
    setOpen(false);
    console.log("value: ", value);
    router.push(`/${value}`);
  };

  return (
    <Popover onOpenChange={setOpen} open={open}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          role="combobox"
          aria-expanded={open}
          className={cn("w-[200px] justify-between", className)}
        >
          <CalendarSearch className="mr-2 h-4 w-4" />
          {currentItem?.label}
          <ChevronsUpDown className="ml-auto w-4 h-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandList>
            <CommandInput placeholder="Buscar año de trabajo" />
            <CommandEmpty>Año de trabajo no encontrado</CommandEmpty>
            <CommandGroup heading="Años de trabajo">
              {formattedItems.map(({ value, label }) => (
                <CommandItem
                  key={value}
                  onSelect={() => handleSelectWorkYear(value)}
                  className="text-sm"
                >
                  <CalendarCheck className="mr-2 h-4 w-4" />
                  {label}
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      currentItem?.value === value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
          <CommandSeparator />
          <CommandList>
            <CommandGroup>
              <CommandItem
                onSelect={() => {
                  setOpen(false);
                  yearWorkModal.onOpen();
                }}
              >
                <PlusCircle className="mr-2 w-5 h-5" />
                Nuevo año de trabajo
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
