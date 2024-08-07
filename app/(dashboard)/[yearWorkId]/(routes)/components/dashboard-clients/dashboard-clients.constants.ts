import { AgeGroup, Gender } from "@prisma/client";

export const DashboardType = {
  MAN: "Hombres Adultos",
  WOMAN: "Mujeres Adultas",
  BOYS_TEEN: "Adolescentes chicos",
  GIRLS_TEEN: "Adolescentes chicas",
  BOYS_TEEN_HALF_PORTION: "Adolescentes chicos 50% Ración",
  GIRLS_TEEN_HALF_PORTION: "Adolescentes chicas 50% Ración",
  CHILDREN_WITH_QUOTA: "Niños con Cuota",
  GIRLS_WITH_QUOTA: "Niñas con Cuota",
  CHILDREN_HALF_PORTION_WITH_QUOTA: "Niños con Cuota 50% Ración",
  GIRLS_HALF_PORTION_WITH_QUOTA: "Niñas con Cuota 50% Ración",
  CHILDREN_WITHOUT_QUOTA: "Niños sin Cuota",
  GIRLS_WITHOUT_QUOTA: "Niñas sin Cuota",
  ALL: "Totales",
} as const;

export const clientMapperToDashboard = {
  [AgeGroup.ADULT]: {
    [Gender.MAN]: DashboardType.MAN,
    [Gender.WOMAN]: DashboardType.WOMAN,
  },
  [AgeGroup.TEEN]: {
    [Gender.MAN]: DashboardType.BOYS_TEEN,
    [Gender.WOMAN]: DashboardType.GIRLS_TEEN,
  },
  [AgeGroup.TEEN_HALF_PORTION]: {
    [Gender.MAN]: DashboardType.BOYS_TEEN_HALF_PORTION,
    [Gender.WOMAN]: DashboardType.GIRLS_TEEN_HALF_PORTION,
  },
  [AgeGroup.CHILD]: {
    [Gender.MAN]: DashboardType.CHILDREN_WITH_QUOTA,
    [Gender.WOMAN]: DashboardType.GIRLS_WITH_QUOTA,
  },
  [AgeGroup.CHILD_HALF_PORTION]: {
    [Gender.MAN]: DashboardType.CHILDREN_HALF_PORTION_WITH_QUOTA,
    [Gender.WOMAN]: DashboardType.GIRLS_HALF_PORTION_WITH_QUOTA,
  },
  [AgeGroup.BABY]: {
    [Gender.MAN]: DashboardType.CHILDREN_WITHOUT_QUOTA,
    [Gender.WOMAN]: DashboardType.GIRLS_WITHOUT_QUOTA,
  },
};
