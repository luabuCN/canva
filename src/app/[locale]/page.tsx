import { Link } from "@/navigation";
import { setRequestLocale } from "next-intl/server";
import { protectServer } from "@/app/features/auth/utils";
import { auth } from "@/auth";
type Props = {
  params: {
    locale: string;
  };
};

export default async function Home({ params: { locale } }: Props) {
  setRequestLocale(locale);
  await protectServer();
  const session = await auth();
  return (
    <div>
      <Link href="/editor/123">跳转</Link>
      {JSON.stringify(session)}
    </div>
  );
}
