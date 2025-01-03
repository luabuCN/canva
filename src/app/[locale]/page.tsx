import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { Link } from "@/navigation";
import { setRequestLocale } from "next-intl/server";
import { protectServer } from "@/app/features/auth/utils";
type Props = {
  params: {
    locale: string;
  };
};

export default async function Home({ params: { locale } }: Props) {
  setRequestLocale(locale);
  await protectServer();
  return (
    <div>
      <Link href="/editor/123">跳转</Link>
    </div>
  );
}
