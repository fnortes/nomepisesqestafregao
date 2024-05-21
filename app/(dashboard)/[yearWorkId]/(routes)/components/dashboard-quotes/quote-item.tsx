import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { formatCurrency } from "@/lib/utils";
import { AgeGroup } from "@prisma/client";
import { Wallet } from "lucide-react";
import { AGE_GROUPS_LITERALS } from "../../clients/clients.constants";

interface Props {
  readonly ageGroup: AgeGroup;
  readonly appetizersCost: number;
  readonly chairsCost: number;
  readonly commissionHelpPercentage: number;
  readonly drinkCost: number;
  readonly extraCosts: number;
  readonly launchAndDinnerCost: number;
  readonly plasticCost: number;
  readonly suitCost: number;
}

export default function QuoteItem({
  ageGroup,
  appetizersCost,
  chairsCost,
  commissionHelpPercentage,
  drinkCost,
  extraCosts,
  launchAndDinnerCost,
  plasticCost,
  suitCost,
}: Props) {
  const totalCosts =
    extraCosts +
    plasticCost +
    chairsCost +
    launchAndDinnerCost +
    appetizersCost +
    suitCost +
    drinkCost;

  return (
    <Alert>
      <Wallet className="h-4 w-4" />
      <AlertTitle className="text-gray-500">{`${
        AGE_GROUPS_LITERALS[ageGroup]
      }: ${formatCurrency(totalCosts)} - Desc. Comisión: ${formatCurrency(
        totalCosts * (1 - commissionHelpPercentage)
      )}`}</AlertTitle>
      <AlertDescription className="text-sm text-muted-foreground">
        <ul>
          <li>Gastos Extra: {formatCurrency(extraCosts)}</li>
          <li>Plástico: {formatCurrency(plasticCost)}</li>
          <li>Alquiler mesas y sillas: {formatCurrency(chairsCost)}</li>
          <li>Comidas y Cenas: {formatCurrency(launchAndDinnerCost)}</li>
          <li>Aperitivos: {formatCurrency(appetizersCost)}</li>
          <li>Traje: {formatCurrency(suitCost)}</li>
          <li>Bebida: {formatCurrency(drinkCost)}</li>
        </ul>
      </AlertDescription>
    </Alert>
  );
}
