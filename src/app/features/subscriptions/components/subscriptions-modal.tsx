"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useSubscriptModal } from "../store/use-subscript-modal";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useTranslations } from "next-intl";
import { useCheckout } from "../api/use-checkout";

export const SubscriptionsModal = () => {
  const mutation = useCheckout();
  const { isOpen, onClose } = useSubscriptModal();
  const t = useTranslations("subscriptions");
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader className="flex items-center space-y-4">
          <Image src="/logo.svg" alt="Logo" width={36} height={36} />
          <DialogTitle className="text-center">{t("upgrade")}</DialogTitle>
          <DialogDescription className="text-center">
            {t("upgrade-desc")}
          </DialogDescription>
        </DialogHeader>
        <Separator />
        <ul className="space-y-2">
          <li className="flex items-center">
            <CheckCircle2 className="size-5 mr-2 fill-blue-500 text-white" />
            <p className="text-sm text-muted-foreground">{t("project")}</p>
          </li>
          <li className="flex items-center">
            <CheckCircle2 className="size-5 mr-2 fill-blue-500 text-white" />
            <p className="text-sm text-muted-foreground">{t("templates")}</p>
          </li>
          <li className="flex items-center">
            <CheckCircle2 className="size-5 mr-2 fill-blue-500 text-white" />
            <p className="text-sm text-muted-foreground">{t("ai-img")}</p>
          </li>
        </ul>
        <DialogFooter className="pt-2 mt-4 gap-y-2">
          <Button
            className="w-full"
            onClick={() => mutation.mutate()}
            disabled={mutation.isPending}
          >
            {t("up")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
