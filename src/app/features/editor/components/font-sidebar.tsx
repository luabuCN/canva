import { cn } from "@/lib/utils";
import { fonts, type ActiveTool, type Editor } from "../type";
import ToolSidebarHeader from "./tool-sidebar-header";
import { useTranslations } from "next-intl";
import ToolSidebarClose from "./tool-sidebar-close";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

interface FontProps {
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
  editor: Editor | undefined;
}
const FontSidebar = ({ editor, activeTool, onChangeActiveTool }: FontProps) => {
  const t = useTranslations("editor");
  const value = editor?.getActiveFontFamily();
  const onClose = () => {
    onChangeActiveTool("select");
  };

  return (
    <aside
      className={cn(
        "bg-white relative border-r z-[40] w-[360px] h-full flex flex-col",
        activeTool === "font" ? "visible" : "hidden"
      )}
    >
      <ToolSidebarHeader
        title={t("font-family")}
        description={t("font-family-desc")}
      />

      <ScrollArea>
        <div className="p-4 space-y-4 border-b">
          {fonts.map((font) => (
            <Button
              key={font}
              onClick={() => editor?.changeFontFamily(font)}
              variant="secondary"
              size="lg"
              className={cn(
                "w-full h-16 justify-start text-left",
                value === font && "border-2 border-blue-500"
              )}
              style={{
                fontFamily: font,
                fontSize: "16px",
                padding: "8px 16px",
              }}
            >
              {font}
            </Button>
          ))}
        </div>
      </ScrollArea>
      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
};

export default FontSidebar;
