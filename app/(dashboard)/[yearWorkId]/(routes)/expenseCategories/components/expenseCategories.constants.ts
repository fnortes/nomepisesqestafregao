import { ExpenseFamily } from "@prisma/client";

export const EXPENSE_FAMILY_LITERALS = {
  [ExpenseFamily.DRINK]: "Bebida",
  [ExpenseFamily.SHIRTS]: "Camisetas",
  [ExpenseFamily.FOODS]: "Comida",
  [ExpenseFamily.DECORATION]: "Decoración",
  [ExpenseFamily.EXTRA_EXPENSES]: "Gastos Extra",
  [ExpenseFamily.TOOLS]: "Herramientas",
  [ExpenseFamily.ICE_CUBES]: "Hielo",
  [ExpenseFamily.TABLES_AND_CHAIRS]: "Mesas y Sillas",
  [ExpenseFamily.MUSIC]: "Música",
  [ExpenseFamily.FLOWER_OFFERING]: "Ofrenda Flores",
  [ExpenseFamily.PLASTIC]: "Plástico",
  [ExpenseFamily.SUITS]: "Trajes",
  [ExpenseFamily.VEHICLES]: "Vehículos",
};
