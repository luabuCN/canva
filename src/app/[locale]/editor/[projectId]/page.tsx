"use client";

import { Editor } from "@/app/features/editor/components/editor";
import { useGetProject } from "@/app/features/projects/api/use-get-project";
import { Button } from "@/components/ui/button";
import { Link } from "@/navigation";
import { Loader, TriangleAlert } from "lucide-react";
import { useTranslations } from "next-intl";

interface EditorProps {
  params: {
    projectId: string;
  };
}

const EditorProjectIdPage = ({ params }: EditorProps) => {
  const { data, isLoading, isError } = useGetProject(params.projectId);
  const t = useTranslations("editor");
  if (isLoading || !data) {
    return (
      <div className="h-full flex flex-col items-center justify-center">
        <Loader className="size-6 animate-spin text-muted-foreground" />
      </div>
    );
  }
  if (isError) {
    return (
      <div className="h-full flex flex-col gap-y-5 items-center justify-center">
        <TriangleAlert className="size-6 text-muted-foreground" />
        <p className="text-muted-foreground text-sm">{t("failed")}</p>
        <Button asChild variant="secondary">
          <Link href="/">{t("back")}</Link>
        </Button>
      </div>
    );
  }
  return <Editor initialData={data} />;
};

export default EditorProjectIdPage;
