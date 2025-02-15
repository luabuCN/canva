import { Inter } from "next/font/google";
import "../globals.css";
import { Toaster } from "sonner";
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { locales } from "@/config";
import { Providers } from "@/components/providers";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import { Modals } from "@/components/modals";
const inter = Inter({ subsets: ["latin"] });

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({
    locale,
  });

  return {
    title: t("title"),
  };
}

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  setRequestLocale(locale);
  const messages = await getMessages();
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <html lang={locale}>
        <body className={inter.className}>
          <NextIntlClientProvider messages={messages}>
            <Providers>
              <Toaster />
              <Modals />
              {children}
            </Providers>
          </NextIntlClientProvider>
        </body>
      </html>
    </SessionProvider>
  );
}
