import { Link } from "@/navigation";
import { setRequestLocale } from "next-intl/server";
import { protectServer } from "@/app/features/auth/utils";
import { auth } from "@/auth";
import { Banner } from "./bannner";
import ProjectsSection from "./project-section";
import TemplatesSection from "./templates-section";
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
    <div className="flex flex-col space-y-6 max-w-screen-xl mx-auto pb-10">
      <Banner />
      <TemplatesSection />
      <ProjectsSection />
    </div>
  );
}
