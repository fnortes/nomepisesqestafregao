import {
  AgeGroup,
  BarGroup,
  Client,
  ClientsOnBarGroups,
  ClientsOnFoods,
  Expense,
  Food,
  PriceType,
  Suit,
  Turn,
} from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { year, yearFromRestore } = body;

    if (!year) {
      return new NextResponse("Year is required", { status: 400 });
    }

    const currentYearWork = await prismadb.yearWork.findFirst({
      where: {
        year,
      },
    });

    if (currentYearWork) {
      return NextResponse.json(
        {
          errorMessage:
            "El nuevo año de trabajo ya existe. Inténtalo de nuevo con otro año.",
        },
        { status: 400 }
      );
    }

    // Inicialización de variables para los datos calculados para el nuevo año de trabajo.
    let newClientPrice = 20, // Por defecto la cuota para los nuevos comparsistas es de 20€
      previousAdults = 0, // Por defecto el número de adultos del año anterior es cero.
      previousChields = 0, // Por defecto el número de niños del año anterior es cero.
      previousTeens = 0, // Por defecto el número de adolescentes del año anterior es cero.
      unitFoodPrice = 10, // Por defecto el precio por comida extra para los comparsistas o no comparsistas es de 10€
      previousYearWorkAmount = 0, // Por defecto la cantidad de dinero sobrante del año anterior es cero.
      awardsReward = 0, // Por defecto la cantidad de dinero obtenida de premios es cero.
      awardsRewardPaid = false, // Por defecto la cantidad de dinero obtenida de premios no se ha pagado.
      comments = null, // Por defecto los comentarios del año están vacíos.
      commissionHelp = 0, // Por defecto la cantidad de dinero recibida de la comisión es cero.
      commissionHelpPaid = false, // Por defecto la cantidad de dinero recibida de la comisión no se ha pagado.
      lastPartyDay = new Date(), // Por defecto el último día de fiestas es la fecha actual.
      firstPartyDay = new Date(), // Por defecto el primer día de fiestas es la fecha actual.
      priceTypes: PriceType[] = [],
      barGroups: BarGroup[] = [],
      turns: (Turn & { barGroup: BarGroup })[] = [],
      expenses: Expense[] = [],
      foods: Food[] = [],
      suits: Suit[] = [],
      clients: (Client & {
        priceType: PriceType;
        barGroups: (ClientsOnBarGroups & { barGroup: BarGroup })[];
        foods: (ClientsOnFoods & { food: Food })[];
      })[] = [];

    // Por defecto el último día de fiestas es el 16 de Agosto del nuevo año de trabajo.
    lastPartyDay.setFullYear(year);
    lastPartyDay.setMonth(7);
    lastPartyDay.setDate(16);

    // Por defecto el primer día de fiestas es el 11 de Agosto del nuevo año de trabajo.
    firstPartyDay.setFullYear(year);
    firstPartyDay.setMonth(7);
    firstPartyDay.setDate(11);

    // Si se ha seleccionado un año de trabajo previo desde el que copiar los datos.
    if (yearFromRestore) {
      const yearWorkFromRestore = await prismadb.yearWork.findFirst({
        where: {
          id: yearFromRestore,
        },
      });

      // Si se ha encontrado el año de trabajo a copiar en la BD.
      if (yearWorkFromRestore) {
        // Se hacen los cálculos para el nuevo año de trabajo.
        newClientPrice = yearWorkFromRestore.newClientPrice;
        firstPartyDay = new Date(
          yearWorkFromRestore.firstPartyDay.setFullYear(
            yearWorkFromRestore.firstPartyDay.getFullYear() + 1
          )
        );
        lastPartyDay = new Date(
          yearWorkFromRestore.lastPartyDay.setFullYear(
            yearWorkFromRestore.lastPartyDay.getFullYear() + 1
          )
        );
        unitFoodPrice = yearWorkFromRestore.unitFoodPrice;
        previousYearWorkAmount = yearWorkFromRestore.previousYearWorkAmount;
        awardsReward = yearWorkFromRestore.awardsReward;
        comments = yearWorkFromRestore.comments;
        commissionHelp = yearWorkFromRestore.commissionHelp;

        // Se obtiene de BD el listado de todos los clientes del año anterior.
        clients = await prismadb.client.findMany({
          where: {
            yearWorkId: yearFromRestore,
          },
          include: {
            priceType: true,
            barGroups: {
              include: {
                barGroup: true,
              },
            },
            foods: {
              include: {
                food: true,
              },
            },
          },
        });

        // Se calcula el número de adultos del año anterior
        previousAdults = clients.filter(
          (client) => client.ageGroup === AgeGroup.ADULT
        ).length;

        // Se calcula el número de adolescentes del año anterior
        previousTeens = clients.filter(
          (client) =>
            client.ageGroup === AgeGroup.TEEN ||
            client.ageGroup === AgeGroup.TEEN_HALF_PORTION
        ).length;

        // Se calcula el número de niños con cuota del año anterior
        previousChields = clients.filter(
          (client) =>
            client.ageGroup === AgeGroup.CHILD ||
            client.ageGroup === AgeGroup.CHILD_HALF_PORTION
        ).length;

        // Se obtiene de BD el listado de todas las cuotas del año anterior.
        priceTypes = await prismadb.priceType.findMany({
          where: {
            yearWorkId: yearFromRestore,
          },
        });

        // Se obtiene de BD el listado de todos los grupos de barra del año anterior.
        barGroups = await prismadb.barGroup.findMany({
          where: {
            yearWorkId: yearFromRestore,
          },
        });

        // Se obtiene de BD el listado de todos los grupos de barra del año anterior.
        turns = await prismadb.turn.findMany({
          where: {
            barGroup: {
              yearWorkId: yearFromRestore,
            },
          },
          include: {
            barGroup: true,
          },
        });

        // Se obtiene de BD el listado de todas las comidas del año anterior.
        foods = await prismadb.food.findMany({
          where: {
            yearWorkId: yearFromRestore,
          },
        });

        // Se obtiene de BD el listado de todos los gastos del año anterior.
        expenses = await prismadb.expense.findMany({
          where: {
            yearWorkId: yearFromRestore,
          },
        });

        // Se obtiene de BD el listado de trajes del año anterior.
        suits = await prismadb.suit.findMany({
          where: {
            yearWorkId: yearFromRestore,
          },
        });
      }
    }

    // Se da de alta el nuevo año de trabajo.
    const yearWork = await prismadb.yearWork.create({
      data: {
        awardsReward,
        awardsRewardPaid,
        comments,
        commissionHelp,
        commissionHelpPaid,
        firstPartyDay,
        lastPartyDay,
        newClientPrice,
        previousAdults,
        previousChilds: previousChields,
        previousTeens,
        previousYearWorkAmount,
        unitFoodPrice,
        year,
      },
    });

    // Si hay cuotas que copiar del año anterior.
    let newPriceTypes: PriceType[] = [];
    if (priceTypes.length > 0) {
      newPriceTypes = await prismadb.$transaction(
        priceTypes.map(
          ({ createdAt, id, updatedAt, yearWorkId, ...restOfPriceType }) =>
            prismadb.priceType.create({
              data: {
                ...restOfPriceType,
                yearWorkId: yearWork.id,
              },
            })
        )
      );
    }

    // Si hay grupos de barra que copiar del año anterior.
    let newBarGroups: BarGroup[] = [];
    if (barGroups.length > 0) {
      newBarGroups = await prismadb.$transaction(
        barGroups.map(
          ({ createdAt, id, updatedAt, yearWorkId, ...restOfBarGroup }) =>
            prismadb.barGroup.create({
              data: {
                ...restOfBarGroup,
                yearWorkId: yearWork.id,
              },
            })
        )
      );

      // Si hay turnos de barra que copiar del año anterior.
      if (turns.length > 0) {
        // Se crea una copia de los turnos del año anterior.
        await prismadb.turn.createMany({
          data: turns.map(
            ({
              barGroupId,
              createdAt,
              id,
              updatedAt,
              barGroup,
              ...restOfTurn
            }) => {
              // Para cada turno se calcula la nueva fecha de inicio y de fin sumándole 1 año.
              const endDate = restOfTurn.endDate;
              endDate.setFullYear(restOfTurn.endDate.getFullYear() + 1);
              const startDate = restOfTurn.startDate;
              startDate.setFullYear(restOfTurn.startDate.getFullYear() + 1);

              // Se monta el nuevo turno a crear, cambiando el id del grupo por el nuevo para el año actual.
              return {
                endDate,
                startDate,
                barGroupId: newBarGroups.find(
                  (nbg) => nbg.name === barGroup.name
                )?.id!,
              };
            }
          ),
        });
      }
    }

    // Si hay comidas que copiar del año anterior.
    let newFoods: Food[] = [];
    if (foods.length > 0) {
      newFoods = await prismadb.$transaction(
        foods.map(
          ({ createdAt, id, updatedAt, yearWorkId, paid, ...restOfFood }) => {
            const date = restOfFood.date;
            date.setFullYear(restOfFood.date.getFullYear() + 1);

            // Se monta la nueva comida a crear, cambiando el año y la fecha calculada a un año más.
            return prismadb.food.create({
              data: {
                ...restOfFood,
                yearWorkId: yearWork.id,
                date,
                paid: 0,
              },
            });
          }
        )
      );
    }

    // Si hay clientes que copiar del año anterior.
    if (clients.length > 0) {
      clients.forEach(
        async ({
          createdAt,
          id,
          isNew,
          priceTypeId,
          quotaPaid,
          updatedAt,
          yearWorkId,
          priceType,
          barGroups,
          foods,
          ...restOfClient
        }) => {
          // Se monta el nuevo cliente a crear con los siguientes cambios:
          //  - Cambiando el id del año.
          //  - Actualizando el valor de la cuota pagada a cero.
          //  - Actualizando que no es nuevo.
          //  - Cambiando el id del tipo de cuota por el nuevo generado para el año actual.
          const data = {
            ...restOfClient,
            yearWorkId: yearWork.id,
            priceTypeId: newPriceTypes.find((pt) => pt.name === priceType.name)
              ?.id!,
            quotaPaid: 0,
            isNew: false,
          };

          // Se crea el cliente en BD
          const newClient = await prismadb.client.create({
            data,
          });

          // Se le guardan al nuevo cliente sus asignaciones a las comidas igual que el año anterior.
          foods.map(async ({ food, quantity, attend }) => {
            await prismadb.clientsOnFoods.create({
              data: {
                foodId: newFoods.find(
                  (f) => f.title === food.title && f.comments === food.comments
                )?.id!,
                clientId: newClient.id,
                quantity,
                attend,
              },
            });
          });

          // Se le guardan al nuevo cliente sus asignaciones a los grupos de barra igual que el año anterior.
          barGroups.map(async ({ barGroup }) => {
            await prismadb.clientsOnBarGroups.create({
              data: {
                barGroupId: newBarGroups.find(
                  (nbg) => nbg.name === barGroup.name
                )?.id!,
                clientId: newClient.id,
              },
            });
          });
        }
      );
    }

    // Si hay gastos que copiar del año anterior.
    if (expenses.length > 0) {
      await prismadb.expense.createMany({
        data: expenses.map(
          ({
            createdAt,
            id,
            paid,
            updatedAt,
            yearWorkId,
            units,
            previousYearWorkUnits,
            estimatedUnits,
            ...restOfExpense
          }) => ({
            ...restOfExpense,
            yearWorkId: yearWork.id,
            paid: 0,
            units: 0,
            previousYearWorkUnits: units,
            estimatedUnits: units,
          })
        ),
      });
    }

    // Si hay trajes que copia del año pasado.
    if (suits.length > 0) {
      await prismadb.suit.createMany({
        data: suits.map(
          ({
            createdAt,
            id,
            paid,
            updatedAt,
            yearWorkId,
            ...restOfExpense
          }) => ({
            ...restOfExpense,
            yearWorkId: yearWork.id,
            paid: 0,
          })
        ),
      });
    }

    return NextResponse.json(yearWork);
  } catch (error) {
    console.log("[YEAR_WORK_POST]: ", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
