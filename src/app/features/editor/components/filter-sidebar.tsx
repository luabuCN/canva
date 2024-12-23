import { cn } from "@/lib/utils";
import { type ActiveTool, type Editor } from "../type";
import ToolSidebarHeader from "./tool-sidebar-header";
import { useTranslations } from "next-intl";
import ToolSidebarClose from "./tool-sidebar-close";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

interface FilterProps {
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
  editor: Editor | undefined;
}

const FilterSidebar = ({
  editor,
  activeTool,
  onChangeActiveTool,
}: FilterProps) => {
  const t = useTranslations("editor");
  const filters = [
    { value: "none", label: t("none") },
    { value: "polaroid", label: t("polaroid") },
    { value: "sepia", label: t("sepia") },
    { value: "kodachrome", label: t("kodachrome") },
    { value: "contrast", label: t("contrast") },
    { value: "brightness", label: t("brightness") },
    { value: "greyscale", label: t("greyscale") },
    { value: "brownie", label: t("brownie") },
    { value: "vintage", label: t("vintage") },
    { value: "technicolor", label: t("technicolor") },
    { value: "pixelate", label: t("pixelate") },
    { value: "invert", label: t("invert") },
    { value: "blur", label: t("blur") },
    { value: "sharpen", label: t("sharpen") },
    { value: "emboss", label: t("emboss") },
    { value: "removecolor", label: t("removecolor") },
    { value: "blacknwhite", label: t("blacknwhite") },
    { value: "vibrance", label: t("vibrance") },
    { value: "blendcolor", label: t("blendcolor") },
    { value: "huerotate", label: t("huerotate") },
    { value: "resize", label: t("resize") },
    { value: "saturation", label: t("saturation") },
    { value: "gamma", label: t("gamma") },
  ];
  const onClose = () => {
    onChangeActiveTool("select");
  };

  return (
    <aside
      className={cn(
        "bg-white relative border-r z-[40] w-[360px] h-full flex flex-col",
        activeTool === "filter" ? "visible" : "hidden"
      )}
    >
      <ToolSidebarHeader title={t("filter")} description={t("filter-desc")} />

      <ScrollArea>
        <div className="p-4 space-y-4 border-b">
          <div className="p-4 space-y-1 border-b">
            {filters.map((filter) => (
              <Button
                key={filter.value}
                variant="secondary"
                size="lg"
                className="w-full h-16 justify-start text-left"
                onClick={() => editor?.changeImageFilter(filter.value)}
              >
                {filter.label}
              </Button>
            ))}
          </div>
        </div>
      </ScrollArea>
      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
};

export default FilterSidebar;
