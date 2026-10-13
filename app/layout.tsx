import type { Metadata } from "next";
import { headers } from "next/headers";
import type { ReactNode } from "react";

import { getDictionary, resolveLocale } from "@/lib/i18n";
import "./globals.css";

export const metadata: Metadata = {
  title: "DIAMONDS",
  description:
    "Имиджевая страница бренда DIAMONDS: свет, точная геометрия кристалла и сдержанная премиальная подача.",
};

/**
 * Корневой layout. Язык документа берётся из заголовка x-locale, который
 * проставляет middleware по первому сегменту URL, поэтому <html lang>
 * соответствует локали и на /ru, и на /en.
 */
export default async function RootLayout({ children }: { children: ReactNode }) {
  const requestHeaders = await headers();
  const locale = resolveLocale(requestHeaders.get("x-locale"));
  const dict = getDictionary(locale);

  return (
    <html lang={locale}>
      <body>
        <a className="skip-link" href="#main">
          {dict.aria.skipToContent}
        </a>
        {children}
      </body>
    </html>
  );
}
