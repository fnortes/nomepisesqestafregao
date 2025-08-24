import MainNav from "./main-nav";
import WorkYearSwitcher from "./work-year-switcher";
import prismadb from "@/lib/prismadb";

export default async function Navbar() {
  const workYears = await prismadb.yearWork.findMany();

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <WorkYearSwitcher items={workYears} />
        <MainNav className="mx-6" />
      </div>
    </div>
  );
}
