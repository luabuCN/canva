import { useState } from "react";
import { FONT_SIZE, FONT_WEIGHT, type ActiveTool, type Editor } from "../type";
import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { BsBorderWidth } from "react-icons/bs";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  ArrowDown,
  ArrowUp,
  ChevronDown,
  Copy,
  Trash,
} from "lucide-react";
import { RxTransparencyGrid } from "react-icons/rx";
import { isTextType } from "../utils";
import { FaBold, FaItalic, FaStrikethrough, FaUnderline } from "react-icons/fa";
import FontSizeInput from "./font-size-input";
import { TbColorFilter } from "react-icons/tb";

interface ToolbarProps {
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
  editor: Editor | undefined;
}

export const Toolbar = ({
  activeTool,
  onChangeActiveTool,
  editor,
}: ToolbarProps) => {
  const t = useTranslations("editor");
  const initialFillColor = editor?.getActiveFillColor();
  const initialStrokeColor = editor?.getActiveStrokeColor();
  const selectedObjectType = editor?.selectedObjects[0]?.type;
  const isSelectText = isTextType(selectedObjectType);
  const isSelectImage = selectedObjectType === "image";
  const initialFontFamily = editor?.getActiveFontFamily();
  const initialFontWeight = editor?.getActiveFontWeight() || FONT_WEIGHT;
  const initialFontStyle = editor?.getActiveFontStyle();
  const initialFontLinethrough = editor?.getActiveFontLinethrough();
  const initialUnderline = editor?.getActiveFontUnderline();
  const initialTextAlign = editor?.getActiveTextAlign();
  const initialFontSize = editor?.getActiveFontSize() || FONT_SIZE;
  const [properties, setProperties] = useState({
    fillColor: initialFillColor,
    strokeColor: initialStrokeColor,
    fontWeight: initialFontWeight,
    fontFamily: initialFontFamily,
    fontStyle: initialFontStyle,
    fontLinethrough: initialFontLinethrough,
    fontUnderline: initialUnderline,
    textAlign: initialTextAlign,
    fontSize: initialFontSize,
  });
  const toggleBole = () => {
    const selectObject = editor?.selectedObjects[0];
    if (!selectObject) {
      return;
    }
    const newValue = properties.fontWeight > 500 ? 500 : 700;

    editor?.changeFontWeight(newValue);
    setProperties((current) => ({
      ...current,
      fontWeight: newValue,
    }));
  };

  const toggleItalic = () => {
    const selectObject = editor?.selectedObjects[0];
    if (!selectObject) {
      return;
    }
    const newValue = properties.fontStyle === "italic" ? "normal" : "italic";

    editor?.changeFontStyle(newValue);
    setProperties((current) => ({
      ...current,
      fontStyle: newValue,
    }));
  };

  const toggleLinethrough = () => {
    const selectObject = editor?.selectedObjects[0];
    if (!selectObject) {
      return;
    }
    const newValue = properties.fontLinethrough ? false : true;
    editor?.changeFontLinethrough(newValue);
    setProperties((current) => ({
      ...current,
      fontLinethrough: newValue,
    }));
  };

  const toggleUnderline = () => {
    const selectObject = editor?.selectedObjects[0];
    if (!selectObject) {
      return;
    }

    const newValue = properties.fontUnderline ? false : true;

    editor?.changeFontUnderline(newValue);
    setProperties((current) => ({
      ...current,
      fontUnderline: newValue,
    }));
  };
  const onChangeTextAlign = (value: string) => {
    const selectObject = editor?.selectedObjects[0];
    if (!selectObject) {
      return;
    }

    editor?.changeTextAlign(value);
    setProperties((current) => ({
      ...current,
      textAlign: value,
    }));
  };

  const onChangeFontSize = (value: number) => {
    const selectObject = editor?.selectedObjects[0];
    if (!selectObject) {
      return;
    }

    editor?.changeFontSize(value);
    setProperties((current) => ({
      ...current,
      fontSize: value,
    }));
  };
  if (editor?.selectedObjects.length === 0) {
    return (
      <div className="shrink-0 h-[56px] border-b bg-white w-full flex items-center overflow-x-auto z-[49] p-2 gap-x-2" />
    );
  }

  return (
    <div className=" shrink-0 h-[56px] border-b bg-white w-full flex items-center overflow-x-auto z-[49] p-2 gap-x-2">
      <div className="flex items-center h-full justify-center">
        {!isSelectImage && (
          <Hint label={t("color")} side="bottom" sideOffset={5}>
            <Button
              onClick={() => onChangeActiveTool("fill")}
              size="icon"
              variant="ghost"
              className={cn(activeTool === "fill" && "bg-gray-100")}
            >
              <div
                className=" rounded-sm size-4 border"
                style={{
                  backgroundColor: properties.fillColor,
                }}
              />
            </Button>
          </Hint>
        )}
      </div>
      {!isSelectText && (
        <div className="flex items-center h-full justify-center">
          <Hint label={t("stroke-color")} side="bottom" sideOffset={5}>
            <Button
              onClick={() => onChangeActiveTool("stroke-color")}
              size="icon"
              variant="ghost"
              className={cn(activeTool === "stroke-color" && "bg-gray-100")}
            >
              <div
                className=" rounded-sm size-4 border-2 bg-white"
                style={{
                  borderColor: properties.strokeColor,
                }}
              />
            </Button>
          </Hint>
        </div>
      )}
      {!isSelectText && (
        <div className="flex items-center h-full justify-center">
          <Hint label={t("stroke-width")} side="bottom" sideOffset={5}>
            <Button
              onClick={() => onChangeActiveTool("stroke-width")}
              size="icon"
              variant="ghost"
              className={cn(activeTool === "stroke-width" && "bg-gray-100")}
            >
              <BsBorderWidth className="size-4" />
            </Button>
          </Hint>
        </div>
      )}
      {isSelectText && (
        <div className="flex items-center h-full justify-center">
          <Hint label={t("font-family")} side="bottom" sideOffset={5}>
            <Button
              onClick={() => onChangeActiveTool("font")}
              size="icon"
              variant="ghost"
              className={cn(
                "w-auto px-2 text-sm",
                activeTool === "font" && "bg-gray-100"
              )}
            >
              <div className="max-w-[100px] truncate">
                {properties.fontFamily}
              </div>
              <ChevronDown className="size-4 ml-2 shrink-0" />
            </Button>
          </Hint>
        </div>
      )}
      {isSelectText && (
        <div className="flex items-center h-full justify-center">
          <Hint label={t("bold")} side="bottom" sideOffset={5}>
            <Button
              onClick={toggleBole}
              size="icon"
              variant="ghost"
              className={cn(properties.fontWeight > 500 && "bg-gray-100")}
            >
              <FaBold className="size-4" />
            </Button>
          </Hint>
        </div>
      )}
      {isSelectText && (
        <div className="flex items-center h-full justify-center">
          <Hint label={t("italic")} side="bottom" sideOffset={5}>
            <Button
              onClick={toggleItalic}
              size="icon"
              variant="ghost"
              className={cn(properties.fontStyle === "italic" && "bg-gray-100")}
            >
              <FaItalic className="size-4" />
            </Button>
          </Hint>
        </div>
      )}
      {isSelectText && (
        <div className="flex items-center h-full justify-center">
          <Hint label={t("underline")} side="bottom" sideOffset={5}>
            <Button
              onClick={toggleUnderline}
              size="icon"
              variant="ghost"
              className={cn(properties.fontUnderline && "bg-gray-100")}
            >
              <FaUnderline className="size-4" />
            </Button>
          </Hint>
        </div>
      )}
      {isSelectText && (
        <div className="flex items-center h-full justify-center">
          <Hint label={t("strike")} side="bottom" sideOffset={5}>
            <Button
              onClick={toggleLinethrough}
              size="icon"
              variant="ghost"
              className={cn(properties.fontLinethrough && "bg-gray-100")}
            >
              <FaStrikethrough className="size-4" />
            </Button>
          </Hint>
        </div>
      )}
      {isSelectText && (
        <div className="flex items-center h-full justify-center">
          <Hint label={t("align-left")} side="bottom" sideOffset={5}>
            <Button
              onClick={() => onChangeTextAlign("left")}
              size="icon"
              variant="ghost"
              className={cn(properties.textAlign === "left" && "bg-gray-100")}
            >
              <AlignLeft className="size-4" />
            </Button>
          </Hint>
        </div>
      )}
      {isSelectText && (
        <div className="flex items-center h-full justify-center">
          <Hint label={t("align-center")} side="bottom" sideOffset={5}>
            <Button
              onClick={() => onChangeTextAlign("center")}
              size="icon"
              variant="ghost"
              className={cn(properties.textAlign === "center" && "bg-gray-100")}
            >
              <AlignCenter className="size-4" />
            </Button>
          </Hint>
        </div>
      )}
      {isSelectText && (
        <div className="flex items-center h-full justify-center">
          <Hint label={t("align-right")} side="bottom" sideOffset={5}>
            <Button
              onClick={() => onChangeTextAlign("right")}
              size="icon"
              variant="ghost"
              className={cn(properties.textAlign === "right" && "bg-gray-100")}
            >
              <AlignRight className="size-4" />
            </Button>
          </Hint>
        </div>
      )}
      {isSelectImage && (
        <div className="flex items-center h-full justify-center">
          <Hint label={t("filter")} side="bottom" sideOffset={5}>
            <Button
              onClick={() => onChangeActiveTool("filter")}
              size="icon"
              variant="ghost"
              className={cn(activeTool === "filter" && "bg-gray-100")}
            >
              <TbColorFilter className="size-4" />
            </Button>
          </Hint>
        </div>
      )}
      {isSelectText && (
        <div className="flex items-center h-full justify-center">
          <FontSizeInput
            value={properties.fontSize!}
            onChange={onChangeFontSize}
          />
        </div>
      )}

      <div className="flex items-center h-full justify-center">
        <Hint label={t("bring-forward")} side="bottom" sideOffset={5}>
          <Button
            onClick={() => editor?.bringForward()}
            size="icon"
            variant="ghost"
          >
            <ArrowUp className="size-4" />
          </Button>
        </Hint>
      </div>
      <div className="flex items-center h-full justify-center">
        <Hint label={t("send-backward")} side="bottom" sideOffset={5}>
          <Button
            onClick={() => editor?.sendBackward()}
            size="icon"
            variant="ghost"
          >
            <ArrowDown className="size-4" />
          </Button>
        </Hint>
      </div>
      <div className="flex items-center h-full justify-center">
        <Hint label={t("opacity")} side="bottom" sideOffset={5}>
          <Button
            onClick={() => onChangeActiveTool("opacity")}
            size="icon"
            variant="ghost"
            className={cn(activeTool === "opacity" && "bg-gray-100")}
          >
            <RxTransparencyGrid className="size-4" />
          </Button>
        </Hint>
      </div>
      <div className="flex items-center h-full justify-center">
        <Hint label={t("duplicate")} side="bottom" sideOffset={5}>
          <Button
            onClick={() => {
              editor?.onCopy();
              editor?.onPaste();
            }}
            size="icon"
            variant="ghost"
          >
            <Copy className="size-4" />
          </Button>
        </Hint>
      </div>
      <div className="flex items-center h-full justify-center">
        <Hint label={t("delete")} side="bottom" sideOffset={5}>
          <Button onClick={() => editor?.delete()} size="icon" variant="ghost">
            <Trash className="size-4" />
          </Button>
        </Hint>
      </div>
    </div>
  );
};
