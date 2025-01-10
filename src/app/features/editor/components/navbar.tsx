"use client";

import { Button } from "@/components/ui/button";
import { Logo } from "./logo";
import { BsCloudCheck, BsCloudSlash } from "react-icons/bs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ChevronDown,
  Download,
  File,
  Loader,
  MousePointerClick,
  Redo2,
  Undo2,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Hint } from "@/components/hint";
import { CiFileOn } from "react-icons/ci";
import LocaleSwitch from "@/components/localeSwitch";
import { useTranslations } from "next-intl";
import type { ActiveTool, Editor } from "../type";
import { cn } from "@/lib/utils";
import { useFilePicker } from "use-file-picker";
import UserButton from "../../auth/components/user-button";
import { useMutationState } from "@tanstack/react-query";

interface NavbarProps {
  id: string;
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

export const Navbar = ({
  id,
  activeTool,
  onChangeActiveTool,
  editor,
}: NavbarProps) => {
  const t = useTranslations("editor");
  const data = useMutationState({
    filters: {
      mutationKey: ["project", { id }],
      exact: true,
    },
    select: (mutation) => mutation.state.status,
  });
  const currentStatus = data[data.length - 1];
  const isError = currentStatus === "error";
  const isPending = currentStatus === "pending";
  const { openFilePicker } = useFilePicker({
    accept: ".json",
    onFilesSuccessfullySelected: ({ plainFiles }: any) => {
      if (plainFiles && plainFiles.length > 0) {
        console.log(plainFiles);

        const file = plainFiles[0];
        const reader = new FileReader();
        reader.readAsText(file, "UTF-8");
        console.log(reader);

        reader.onload = () => {
          editor?.loadJson(reader.result as string);
        };
      }
    },
  });
  return (
    <nav className="w-full flex items-center p-4 h-[68px] gap-x-8 border-b lg:pl-[34px]">
      <Logo />
      <div className="w-full flex items-center gap-x-1 h-full">
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button size="sm" variant="ghost">
              {t("file")}
              <ChevronDown className="size-4 ml-2" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="min-w-60">
            <DropdownMenuItem
              className="flex items-center gap-x-2"
              onClick={() => openFilePicker()}
            >
              <File className="size-8" />
              <div>
                <p>JSON</p>
                <p className="text-xs text-muted-foreground">
                  {t("json-desc")}
                </p>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Separator orientation="vertical" className="mx-2" />
        <Hint label={t("select")} side="bottom" sideOffset={10} align="center">
          <Button
            size="icon"
            variant="ghost"
            className={cn(activeTool === "select" && "bg-gray-100")}
            onClick={() => onChangeActiveTool("select")}
          >
            <MousePointerClick className="size-4" />
          </Button>
        </Hint>

        <Hint label={t("undo")} side="bottom" sideOffset={10} align="center">
          <Button
            size="icon"
            variant="ghost"
            className=""
            disabled={!editor?.canUndo()}
            onClick={() => editor?.onUndo()}
          >
            <Undo2 className="size-4" />
          </Button>
        </Hint>
        <Hint label={t("redo")} side="bottom" sideOffset={10} align="center">
          <Button
            size="icon"
            variant="ghost"
            className=""
            disabled={!editor?.canRedo()}
            onClick={() => editor?.onRedo()}
          >
            <Redo2 className="size-4" />
          </Button>
        </Hint>
        <Separator orientation="vertical" className="mx-2" />
        {isPending && (
          <div className=" flex items-center gap-x-2">
            <Loader className="size-[20px] animate-spin text-muted-foreground" />
            <div className=" text-xs">{t("saving")}</div>
          </div>
        )}
        {!isPending && isError && (
          <div className=" flex items-center gap-x-2">
            <BsCloudSlash className="size-[20px] text-muted-foreground" />
            <div className=" text-xs">{t("failed-save")}</div>
          </div>
        )}
        {!isPending && !isError && (
          <div className=" flex items-center gap-x-2">
            <BsCloudCheck className="size-[20px] text-muted-foreground" />
            <div className=" text-xs">{t("saved")}</div>
          </div>
        )}

        <div className="ml-auto flex items-center gap-x-4">
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button size="sm" variant="ghost">
                {t("export")}
                <Download className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-60">
              <DropdownMenuItem
                className="flex items-center gap-x-2"
                onClick={() => editor?.saveJson()}
              >
                <CiFileOn className="size-8" />
                <div>
                  <p>JSON</p>
                  <p className="text-xs text-muted-foreground">
                    {t("json-desc")}
                  </p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex items-center gap-x-2"
                onClick={() => editor?.savePng()}
              >
                <CiFileOn className="size-8" />
                <div>
                  <p>PNG</p>
                  <p className="text-xs text-muted-foreground">
                    {t("png-desc")}
                  </p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex items-center gap-x-2"
                onClick={() => editor?.saveJpg()}
              >
                <CiFileOn className="size-8" />
                <div>
                  <p>JPG</p>
                  <p className="text-xs text-muted-foreground">
                    {t("jpg-desc")}
                  </p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex items-center gap-x-2"
                onClick={() => editor?.saveSvg()}
              >
                <CiFileOn className="size-8" />
                <div>
                  <p>SVG</p>
                  <p className="text-xs text-muted-foreground">
                    {t("svg-desc")}
                  </p>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <LocaleSwitch />
          <UserButton />
        </div>
      </div>
    </nav>
  );
};
