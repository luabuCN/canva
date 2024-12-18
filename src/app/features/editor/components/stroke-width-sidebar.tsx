import { cn } from "@/lib/utils";
import {
  FILL_COLOR,
  STROKE_DASH_ARRAY,
  STROKE_WIDTH,
  type ActiveTool,
  type Editor,
} from "../type";
import ToolSidebarHeader from "./tool-sidebar-header";
import { useTranslations } from "next-intl";
import ToolSidebarClose from "./tool-sidebar-close";
import { ScrollArea } from "@/components/ui/scroll-area";
import ColorPicker from "./color-picker";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useEffect, useState } from "react";

interface StrokeWidthProps {
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
  editor: Editor | undefined;
}
const StrokeWidthSidebar = ({
  editor,
  activeTool,
  onChangeActiveTool,
}: StrokeWidthProps) => {
  const t = useTranslations("editor");
  const widthValue = editor?.getActiveStrokeWidth() || STROKE_WIDTH;
  const [typeValue, setTypeValue] = useState<number[]>(
    editor?.getActiveStrokeDashArray() || STROKE_DASH_ARRAY
  );

  useEffect(() => {
    if (editor) {
      setTypeValue(editor.getActiveStrokeDashArray() || STROKE_DASH_ARRAY);
    }
  }, [editor]);

  const onClose = () => {
    onChangeActiveTool("select");
  };
  const onChangeStrokeWidth = (value: number) => {
    editor?.changeStrokeWidth(value);
  };
  const onChangeStrokeType = (value: number[]) => {
    editor?.changeStrokeDashArray(value);
  };
  return (
    <aside
      className={cn(
        "bg-white relative border-r z-[40] w-[360px] h-full flex flex-col",
        activeTool === "stroke-width" ? "visible" : "hidden"
      )}
    >
      <ToolSidebarHeader
        title={t("stroke-width")}
        description={t("stroke-width-desc")}
      />

      <ScrollArea>
        <div className="p-4 space-y-4 border-b">
          <Label className="text-sm">{t("stroke-width")}</Label>
          <Slider
            value={[widthValue]}
            onValueChange={(values) => onChangeStrokeWidth(values[0])}
          />
        </div>
        <div className="p-4 space-y-4 border-b">
          <Label className="text-sm">{t("stroke-type")}</Label>
          <Button
            onClick={() => onChangeStrokeType([])}
            variant="secondary"
            size="lg"
            className={cn(
              "w-full h-16 justify-start text-left",
              JSON.stringify(typeValue) === `[]` && "border-2 border-blue-500"
            )}
            style={{
              padding: "8px 16px",
            }}
          >
            <div className="w-full border-black rounded-full border-4" />
          </Button>
          <Button
            onClick={() => onChangeStrokeType([5, 5])}
            variant="secondary"
            size="lg"
            className={cn(
              "w-full h-16 justify-start text-left",
              JSON.stringify(typeValue) === `[5,5]` &&
                "border-2 border-blue-500"
            )}
            style={{
              padding: "8px 16px",
            }}
          >
            <div className="w-full border-black rounded-full border-4 border-dashed" />
          </Button>
        </div>
      </ScrollArea>
      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
};

export default StrokeWidthSidebar;
