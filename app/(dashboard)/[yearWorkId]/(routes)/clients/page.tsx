import prismadb from "@/lib/prismadb";
import ClientsClient from "./components/clients-client";

import type { ClientColumn } from "./components/columns";

interface Props {
  readonly params: {
    yearWorkId: string;
  };
}

export default async function ClientPage({ params: { yearWorkId } }: Props) {
  const clients = await prismadb.client.findMany({
    include: {
      foods: { orderBy: { food: { date: "asc" } } },
      priceType: true,
      yearWork: true,
    },
    where: { yearWorkId },
    orderBy: { createdAt: "desc" },
  });

  const priceTypes = await prismadb.priceType.findMany({
    where: { yearWorkId },
    orderBy: { name: "asc" },
  });

  const formattedClients: ClientColumn[] = clients.map(
    ({
      ageGroup,
      allergiesComments,
      comments,
      email,
      firstName,
      foods,
      gender,
      id,
      isNew,
      lastName,
      phone,
      priceType,
      quotaModifier,
      quotaPaid,
      shirtSize,
      suitGroup,
      yearWork,
    }) => ({
      ageGroup,
      allergiesComments,
      comments,
      email,
      firstName,
      foods,
      gender,
      id,
      isNew,
      lastName,
      phone,
      priceType,
      quotaModifier,
      quotaPaid,
      shirtSize,
      suitGroup,
      yearWork,
    })
  );

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ClientsClient clients={formattedClients} priceTypes={priceTypes} />
      </div>
    </div>
  );
}
