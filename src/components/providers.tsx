"use client";

import QueryProviders from "./query-provider";

interface ProvidersProps {
  children: React.ReactNode;
}

export const Providers = ({ children }: ProvidersProps) => {
  return <QueryProviders>{children}</QueryProviders>;
};
