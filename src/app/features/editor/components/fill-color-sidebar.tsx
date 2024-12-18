import { cn } from "@/lib/utils";
import { FILL_COLOR, type ActiveTool, type Editor } from "../type";
import ToolSidebarHeader from "./tool-sidebar-header";
import { useTranslations } from "next-intl";
import ToolSidebarClose from "./tool-sidebar-close";
import { ScrollArea } from "@/components/ui/scroll-area";
import ColorPicker from "./color-picker";

interface FillColorProps {
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
  editor: Editor | undefined;
}
const FillColorSidebar = ({
  editor,
  activeTool,
  onChangeActiveTool,
}: FillColorProps) => {
  const t = useTranslations("editor");
  const value = editor?.getActiveFillColor() || FILL_COLOR;
  const onClose = () => {
    onChangeActiveTool("select");
  };

  const onChange = (value: string) => {
    editor?.changeFillColor(value);
  };
  return (
    <aside
      className={cn(
        "bg-white relative border-r z-[40] w-[360px] h-full flex flex-col",
        activeTool === "fill" ? "visible" : "hidden"
      )}
    >
      <ToolSidebarHeader title={t("color")} description={t("color-desc")} />

      <ScrollArea>
        <div className="p-4 space-y-6">
          <ColorPicker value={value} onChange={onChange} />
        </div>
      </ScrollArea>

      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
};

export default FillColorSidebar;
