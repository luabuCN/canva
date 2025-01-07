import LocaleSwitch from "@/components/localeSwitch";
import { getTranslations, setRequestLocale } from "next-intl/server";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({
    locale,
  });

  return {
    title: t("login.login"),
  };
}

export default function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  setRequestLocale(locale);
  return (
    <div className="bg-[url(/bg.jpg)] bg-top bg-cover h-full flex flex-col ">
      <div className="z-[4] h-full w-full flex flex-col items-center justify-center relative">
        <div className=" absolute right-5 top-5 pointer-events-auto">
          <LocaleSwitch />
        </div>
        <div className="h-full w-full md:h-auto md:w-[420px]">{children}</div>
      </div>
      <div className="fixed inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.4),rgba(0,0,0,.2),rgba(0,0,0,.4))] z-[1]" />
    </div>
  );
}
