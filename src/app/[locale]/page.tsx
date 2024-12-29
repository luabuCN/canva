import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { Link } from "@/navigation";
import { setRequestLocale } from "next-intl/server";
import { auth } from "@/auth";

type Props = {
  params: {
    locale: string;
  };
};

export default async function Home({ params: { locale } }: Props) {
  setRequestLocale(locale);
  const t = useTranslations();
  const session = await auth();
  return (
    <div>
      <Button size="sm" variant="secondary">
        {t("file")}
      </Button>
      <Link href="/editor/123">跳转</Link>
    </div>
  );
}
