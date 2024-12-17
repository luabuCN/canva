import { cn } from "@/lib/utils";
import {
  FILL_COLOR,
  STROKE_COLOR,
  type ActiveTool,
  type Editor,
} from "../type";
import ToolSidebarHeader from "./tool-sidebar-header";
import { useTranslations } from "next-intl";
import ToolSidebarClose from "./tool-sidebar-close";
import { ScrollArea } from "@/components/ui/scroll-area";
import ColorPicker from "./color-picker";

interface StrokeColorProps {
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
  editor: Editor | undefined;
}
const StrokeColorSidebar = ({
  editor,
  activeTool,
  onChangeActiveTool,
}: StrokeColorProps) => {
  const t = useTranslations("editor");
  const value = editor?.getActiveStrokeColor() || STROKE_COLOR;
  const onClose = () => {
    onChangeActiveTool("select");
  };

  const onChange = (value: string) => {
    editor?.changeStrokeColor(value);
  };
  return (
    <aside
      className={cn(
        "bg-white relative border-r z-[40] w-[360px] h-full flex flex-col",
        activeTool === "stroke-color" ? "visible" : "hidden"
      )}
    >
      <ToolSidebarHeader
        title={t("stroke-color")}
        description={t("stroke-desc")}
      />

      <ScrollArea>
        <div className="p-4 space-y-6">
          <ColorPicker value={value} onChange={onChange} />
        </div>
      </ScrollArea>

      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
};

export default StrokeColorSidebar;
