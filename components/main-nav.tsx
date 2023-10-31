"use client";

import { useParams, usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import Link from "next/link";

interface Props {}

export default function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();
  const params = useParams<{ yearWorkId: string }>();

  const routes = [
    {
      href: `/${params.yearWorkId}`,
      label: "General",
    },
    {
      href: `/${params.yearWorkId}/barGroups`,
      label: "Grupos de Barra",
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
