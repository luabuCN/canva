"use client";

import { SubscriptionsModal } from "@/app/features/subscriptions/components/subscriptions-modal";
import { useEffect, useState } from "react";

export const Modals = () => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) return null;
  return (
    <>
      <SubscriptionsModal />
    </>
  );
};
