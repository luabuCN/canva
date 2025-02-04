import { cn } from "@/lib/utils";
import { fonts, type ActiveTool, type Editor } from "../type";
import ToolSidebarHeader from "./tool-sidebar-header";
import { useTranslations } from "next-intl";
import ToolSidebarClose from "./tool-sidebar-close";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { useGetImages } from "../../images/api/user-get-images";
import { AlertTriangle, Crown, Loader } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { UploadButton } from "@/lib/uploadthing";
import {
  useGetTemplates,
  ResponseType,
} from "../../projects/api/use-get-templates";
import { useConfirm } from "@/hooks/use-confirm";
import { usePaywall } from "../../subscriptions/hooks/use-paywall";
interface TemplateProps {
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
  editor: Editor | undefined;
}
const TemplateSidebar = ({
  editor,
  activeTool,
  onChangeActiveTool,
}: TemplateProps) => {
  const t = useTranslations("editor");
  const t1 = useTranslations("home");
  const { shouldBlock, triggerPaywall } = usePaywall();
  const [ConfirmDialog, confirm] = useConfirm(t1("sure"), t("select-template"));

  const { data, isLoading, isError } = useGetTemplates({
    limit: "20",
    page: "1",
  });

  const onClose = () => {
    onChangeActiveTool("select");
  };

  const onClick = async (template: ResponseType["data"][0]) => {
    // if (template.isPro && shouldBlock) {
    //   triggerPaywall();
    //   return;
    // }
    const ok = await confirm();

    if (ok) {
      editor?.loadJson(template.json);
    }
  };
  return (
    <aside
      className={cn(
        "bg-white relative border-r z-[40] w-[360px] h-full flex flex-col",
        activeTool === "templates" ? "visible" : "hidden"
      )}
    >
      <ConfirmDialog />
      <ToolSidebarHeader
        title={t("template")}
        description={t("template-desc")}
      />
      {isLoading && (
        <div className="flex items-center justify-center flex-1">
          <Loader className="size-4 text-muted-foreground animate-spin" />
        </div>
      )}
      {isError && (
        <div className="flex flex-col gap-y-4 items-center justify-center flex-1">
          <AlertTriangle className="size-4 text-muted-foreground " />
          <p className=" text-muted-foreground text-xs">{t("template-err")}</p>
        </div>
      )}
      <ScrollArea>
        <div className="p-4">
          <div className="grid grid-cols-2 gap-4">
            {data &&
              data.map((template) => {
                return (
                  <button
                    style={{
                      aspectRatio: `${template.width}/${template.height}`,
                    }}
                    onClick={() => onClick(template)}
                    key={template.id}
                    className="relative w-full group hover:opacity-75 transition bg-muted rounded-sm overflow-hidden border"
                  >
                    <Image
                      fill
                      src={template.thumbnailUrl || ""}
                      alt={template.name || "Template"}
                      className="object-cover"
                    />
                    {template.isPro && (
                      <div className="absolute top-2 right-2 size-8 items-center flex justify-center bg-black/50 rounded-full">
                        <Crown className="size-4 fill-yellow-500 text-yellow-500" />
                      </div>
                    )}
                    <div className="opacity-0 group-hover:opacity-100 absolute left-0 bottom-0 w-full text-[10px] truncate text-white p-1 bg-black/50 text-left">
                      {template.name}
                    </div>
                  </button>
                );
              })}
          </div>
        </div>
      </ScrollArea>
      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
};

export default TemplateSidebar;
