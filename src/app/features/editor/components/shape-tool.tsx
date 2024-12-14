import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import type { IconType } from "react-icons";

interface ShapeToolProps {
  onClick: () => void;
  icon: LucideIcon | IconType;
  iconClassName?: string;
}

const ShapeTool = ({ onClick, icon: Icon, iconClassName }: ShapeToolProps) => {
  return (
    <button className=" aspect-square border rounded-md p-5" onClick={onClick}>
      <Icon className={cn("w-full h-full", iconClassName)} />
    </button>
  );
};

export default ShapeTool;
