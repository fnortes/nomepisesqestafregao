import { format } from "date-fns";

import { DATE_TIME_FORMAT } from "@/constants/date";
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
    where: { yearWorkId },
    orderBy: { createdAt: "desc" },
  });

  const formattedClients: ClientColumn[] = clients.map(
    ({
      ageGroup,
      comments,
      createdAt,
      email,
      firstName,
      gender,
      id,
      isNew,
      lastName,
      phone,
      priceTypeId,
      quotaPaid,
      shirtSize,
      updatedAt,
    }) => ({
      ageGroup,
      comments,
      createdAt: format(createdAt, DATE_TIME_FORMAT),
      email,
      firstName,
      gender,
      id,
      isNew,
      lastName,
      phone,
      priceTypeId,
      quotaPaid,
      shirtSize,
      updatedAt: format(updatedAt, DATE_TIME_FORMAT),
    })
  );

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ClientsClient clients={formattedClients} />
      </div>
    </div>
  );
}
