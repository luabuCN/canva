import { getTranslations, setRequestLocale } from "next-intl/server";
import Navbar from "./navbar";
import Sidebar from "./sidebar";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({
    locale,
  });

  return {
    title: t("home.home"),
  };
}

const DashboardLayout = ({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) => {
  setRequestLocale(locale);
  return (
    <div className="bg-muted h-full ">
      <Sidebar />
      <div className="lg:pl-[300px] flex flex-col h-full">
        <Navbar />
        <main className="bg-white flex-1 overflow-auto p-8 lg:rounded-tl-2xl">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
