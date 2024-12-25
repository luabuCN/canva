import { cn } from "@/lib/utils";
import {
  FILL_COLOR,
  STROKE_COLOR,
  STROKE_WIDTH,
  type ActiveTool,
  type Editor,
} from "../type";
import ToolSidebarHeader from "./tool-sidebar-header";
import { useTranslations } from "next-intl";
import ToolSidebarClose from "./tool-sidebar-close";
import { ScrollArea } from "@/components/ui/scroll-area";
import ColorPicker from "./color-picker";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

interface DrawProps {
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
  editor: Editor | undefined;
}
const DrawSidebar = ({ editor, activeTool, onChangeActiveTool }: DrawProps) => {
  const t = useTranslations("editor");
  const colorValue = editor?.getActiveStrokeColor() || STROKE_COLOR;
  const widthValue = editor?.getActiveStrokeWidth() || STROKE_WIDTH;
  const onClose = () => {
    editor?.disableDrawingMode();
    onChangeActiveTool("select");
  };

  const onColorChange = (value: string) => {
    editor?.changeStrokeColor(value);
  };
  const onWidthChange = (value: number) => {
    editor?.changeStrokeWidth(value);
  };
  return (
    <aside
      className={cn(
        "bg-white relative border-r z-[40] w-[360px] h-full flex flex-col",
        activeTool === "draw" ? "visible" : "hidden"
      )}
    >
      <ToolSidebarHeader title={t("draw")} description={t("draw-desc")} />

      <ScrollArea>
        <div className="p-4 space-y-6">
          <Label className="text-sm">{t("brush-width")}</Label>
          <Slider
            value={[widthValue]}
            onValueChange={(values) => onWidthChange(values[0])}
          />
        </div>
        <div className="p-4 space-y-6">
          <ColorPicker value={colorValue} onChange={onColorChange} />
        </div>
      </ScrollArea>

      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
};

export default DrawSidebar;
