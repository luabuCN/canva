import { cn } from "@/lib/utils";
import { type ActiveTool, type Editor } from "../type";
import ToolSidebarHeader from "./tool-sidebar-header";
import { useTranslations } from "next-intl";
import ToolSidebarClose from "./tool-sidebar-close";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useEffect, useMemo, useState } from "react";

interface OpacityProps {
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
  editor: Editor | undefined;
}
const OpacitySidebar = ({
  editor,
  activeTool,
  onChangeActiveTool,
}: OpacityProps) => {
  const t = useTranslations("editor");
  const initialValue = editor?.getActiveOpacity() || 1;
  const [opacity, setOpacity] = useState(initialValue);
  const selectedObject = useMemo(
    () => editor?.selectedObjects[0],
    [editor?.selectedObjects]
  );
  useEffect(() => {
    if (selectedObject) {
      setOpacity(selectedObject.get("opacity") || 1);
    }
  }, [selectedObject]);
  const onClose = () => {
    onChangeActiveTool("select");
  };
  const onChangeOpacity = (value: number) => {
    editor?.changeOpacity(value);
    setOpacity(value);
  };
  return (
    <aside
      className={cn(
        "bg-white relative border-r z-[40] w-[360px] h-full flex flex-col",
        activeTool === "opacity" ? "visible" : "hidden"
      )}
    >
      <ToolSidebarHeader title={t("opacity")} description={t("opacity-desc")} />

      <ScrollArea>
        <div className="p-4 space-y-4 border-b">
          <Label className="text-sm">{t("opacity")}</Label>
          <Slider
            value={[opacity]}
            onValueChange={(values) => onChangeOpacity(values[0])}
            max={1}
            min={0}
            step={0.01}
          />
        </div>
      </ScrollArea>
      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
};

export default OpacitySidebar;
