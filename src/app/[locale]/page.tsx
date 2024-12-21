import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { Link } from "@/navigation";
import { setRequestLocale } from "next-intl/server";

type Props = {
  params: {
    locale: string;
  };
};

export default function Home({ params: { locale } }: Props) {
  setRequestLocale(locale);
  const t = useTranslations();

  return (
    <div>
      <Button size="sm" variant="secondary">
        {t("file")}
      </Button>
      <Link href="/editor/123">跳转</Link>
      <div style={{ fontFamily: "阿里妈妈数黑体" }}>
        阿里妈妈字体张陈林大萨达大萨达湿哒哒大萨达手打
      </div>
    </div>
  );
}
