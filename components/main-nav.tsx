"use client";

import { useParams, usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import Link from "next/link";

export default function MainNav({
  className,
  ...props
}: Readonly<React.HTMLAttributes<HTMLElement>>) {
  const pathname = usePathname();
  const params = useParams<{ yearWorkId: string }>();

  const routes = [
    {
      href: `/${params.yearWorkId}`,
      label: "General",
    },
    {
      href: `/${params.yearWorkId}/priceTypes`,
      label: "Cuotas",
    },
    {
      href: `/${params.yearWorkId}/barGroups`,
      label: "Grupos de Barra",
    },
    {
      href: `/${params.yearWorkId}/turns`,
      label: "Turnos de Barra",
    },
    {
      href: `/${params.yearWorkId}/foods`,
      label: "Comidas",
    },
    {
      href: `/${params.yearWorkId}/clients`,
      label: "Comparsistas",
    },
    {
      href: `/${params.yearWorkId}/expenseCategories`,
      label: "Categorías de Gastos",
    },
    {
      href: `/${params.yearWorkId}/expenses`,
      label: "Gastos",
    },
    {
      href: `/${params.yearWorkId}/settings`,
      label: "Configuración",
    },
  ];

  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)}>
      {routes.map(({ href, label }) => (
        <Link
          key={href}
          href={href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            href === pathname
              ? "text-black dark:text-white"
              : "text-muted-foreground"
          )}
        >
          {label}
        </Link>
      ))}
    </nav>
  );
}
