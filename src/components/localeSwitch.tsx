import { useLocale, useTranslations } from "next-intl";
import LocaleSelect from "./localeSelect";
import { locales } from "@/config";

export default function LocaleSwitch() {
  const t = useTranslations();
  const locale = useLocale();
  return (
    <LocaleSelect defaultValue={locale} label={t("label")}>
      {locales.map((locale) => (
        <option key={locale} value={locale}>
          {locale === "en" ? "English" : "中文"}
        </option>
      ))}
    </LocaleSelect>
  );
}

// "use client";

// import { cn } from "@/lib/utils";
// import { usePathname, useRouter, useParams } from "next/navigation";
// import { useTransition } from "react";
// import { ChevronDown } from "lucide-react";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { useLocale, useTranslations } from "next-intl";
// import { locales } from "@/config";
// import { Button } from "./ui/button";

// const langIcon = (
//   <svg
//     viewBox="0 0 24 24"
//     focusable="false"
//     width="1em"
//     height="1em"
//     fill="currentColor"
//     aria-hidden="true"
//   >
//     <path d="M0 0h24v24H0z" fill="none" />
//     <path
//       d="M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z "
//       className="css-c4d79v"
//     />
//   </svg>
// );

// export default function LocaleSwitch() {
//   const currentLocale = useLocale();
//   const router = useRouter();
//   const pathname = usePathname();
//   const params = useParams();
//   const [isPending, startTransition] = useTransition();

//   const changeLocale = (locale: string) => {
//     console.log(locale, pathname, params, "111111111111111111");

//     router.replace(
//       // @ts-ignore
//       { pathname, params },
//       { locale: locale }
//     );
//   };

//   return (
//     <DropdownMenu>
//       <DropdownMenuTrigger asChild>{langIcon}</DropdownMenuTrigger>
//       <DropdownMenuContent className="w-44">
//         {Object.entries(LANG_MAP).map(([key, lang]) => (
//           <DropdownMenuItem
//             key={key}
//             onClick={() => changeLocale(key)}
//             className={cn(currentLocale === key && "font-bold")}
//           >
//             <div className="flex items-center">
//               <span className="mr-2">{lang.icon}</span>
//               <span>{lang.label}</span>
//             </div>
//           </DropdownMenuItem>
//         ))}
//       </DropdownMenuContent>
//     </DropdownMenu>
//   );
// }
