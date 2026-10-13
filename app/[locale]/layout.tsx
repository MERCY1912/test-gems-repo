import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";

import CrystalLogo from "@/components/CrystalLogo";
import LanguageSwitcher, { type LanguageOption } from "@/components/LanguageSwitcher";
import { getLocaleParams, getSectionLinks, localePath } from "@/lib/content";
import {
  getDictionary,
  isLocale,
  LOCALE_LABELS,
  LOCALE_NAMES,
  LOCALES,
} from "@/lib/i18n";

export function generateStaticParams() {
  return getLocaleParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;

  if (!isLocale(raw)) {
    return {};
  }

  const dict = getDictionary(raw);

  return {
    title: dict.meta.title,
    description: dict.meta.description,
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;

  if (!isLocale(raw)) {
    notFound();
  }

  const locale = raw;
  const dict = getDictionary(locale);
  const links = getSectionLinks(dict);
  const languageOptions: LanguageOption[] = LOCALES.map((code) => ({
    code,
    label: LOCALE_LABELS[code],
    name: LOCALE_NAMES[code],
  }));

  return (
    <div lang={locale} className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-30 border-b border-ice-300/15 bg-night-950/85 backdrop-blur">
        <div className="shell flex h-16 items-center justify-between gap-4">
          <Link className="flex items-center gap-3" href={localePath(locale)}>
            <CrystalLogo variant="header" />
            <span className="font-display text-base tracking-[0.34em] text-frost-50">
              {dict.nav.brand}
            </span>
          </Link>

          <div className="flex items-center gap-5">
            <nav aria-label={dict.aria.mainNav} className="hidden md:block">
              <ul className="flex items-center gap-6 text-sm text-frost-300">
                {links.map((link) => (
                  <li key={link.id}>
                    <a
                      className="transition-colors hover:text-ice-300 focus-visible:text-ice-300"
                      href={`#${link.id}`}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <LanguageSwitcher
              label={dict.aria.languageSwitcher}
              locale={locale}
              options={languageOptions}
            />
          </div>
        </div>
      </header>

      <main className="flex-1" id="main">
        {children}
      </main>

      <footer className="border-t border-ice-300/15 py-10">
        <div className="shell flex flex-col gap-2 text-sm text-frost-400">
          <p>{dict.footer.tagline}</p>
          <p>{dict.footer.note}</p>
        </div>
      </footer>
    </div>
  );
}
