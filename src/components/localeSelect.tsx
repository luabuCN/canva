"use client";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "@/navigation";
import { useParams } from "next/navigation";
import { useTransition } from "react";
import { ChevronDown } from "lucide-react";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  defaultValue: string;
  label: string;
};

export default function LocaleSelect({ children, defaultValue, label }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const params = useParams();

  function changeLocale(e: React.ChangeEvent<HTMLSelectElement>) {
    const locale = e.target.value;
    console.log(locale, "111111111111111111");

    startTransition(() => {
      router.replace(
        // @ts-ignore
        { pathname, params },
        { locale: locale }
      );
    });
  }

  return (
    <label
      className={cn(
        "relative text-gray-400",
        isPending && " transition-opacity [&:disabled]:opacity-30"
      )}
    >
      <p className="sr-only">{label}</p>
      <select
        className=" inline-flex appearance-none bg-transparent py-3 pl-2 pr-6"
        defaultValue={defaultValue}
        onChange={changeLocale}
        disabled={isPending}
      >
        {children}
      </select>
    </label>
  );
}
