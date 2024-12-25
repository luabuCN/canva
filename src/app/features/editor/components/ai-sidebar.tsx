import { cn } from "@/lib/utils";
import { type ActiveTool, type Editor } from "../type";
import ToolSidebarHeader from "./tool-sidebar-header";
import { useTranslations } from "next-intl";
import ToolSidebarClose from "./tool-sidebar-close";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useGenerateImage } from "../../ai/api/use-gemerate-image";
import { useState } from "react";
import Image from "next/image";

interface AiProps {
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
  editor: Editor | undefined;
}

const AiSidebar = ({ editor, activeTool, onChangeActiveTool }: AiProps) => {
  const [value, setValue] = useState("");
  const t = useTranslations("editor");
  const mutation = useGenerateImage();
  const onClose = () => {
    onChangeActiveTool("select");
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    editor?.addImage(
      "https://sf-maas-uat-prod.oss-cn-shanghai.aliyuncs.com/outputs/467071e0-d59a-4936-a0fe-741f78f2b98c_0.png"
    );
    mutation.mutate(
      { prompt: value },
      {
        onSuccess: ({ data }) => {
          editor?.addImage(data.url);
        },
      }
    );
  };

  return (
    <aside
      className={cn(
        "bg-white relative border-r z-[40] w-[360px] h-full flex flex-col",
        activeTool === "ai" ? "visible" : "hidden"
      )}
    >
      <ToolSidebarHeader title="AI" description={t("ai-desc")} />

      <ScrollArea>
        <div className="p-2 space-y-4 border-b">
          <form className="p-4 space-y-6" onSubmit={onSubmit}>
            <Textarea
              disabled={mutation.isPending}
              placeholder={t("ai-prompt")}
              cols={30}
              rows={10}
              required
              minLength={3}
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            <Button
              disabled={mutation.isPending}
              type="submit"
              className="w-full"
            >
              {t("generate")}
            </Button>
          </form>
        </div>
      </ScrollArea>
      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
};

export default AiSidebar;
