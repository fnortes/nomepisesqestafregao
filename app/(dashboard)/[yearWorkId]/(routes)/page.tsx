import prismadb from "@/lib/prismadb";

interface Props {
  params: { yearWorkId: string };
}

export default async function DashboardPage({ params }: Props) {
  const yearWork = await prismadb.yearWork.findFirst({
    where: { id: params.yearWorkId },
  });

  return <div>Año de trabajo activo: {yearWork?.year}</div>;
}
