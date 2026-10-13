"use client";

import { useEffect, useState } from "react";
import { dictionaries, locales } from "../i18n";
import type { Locale } from "../i18n";

export default function LocaleSwitcher({ current }: { current: Locale }) {
  const [hash, setHash] = useState("");

  useEffect(() => {
    const onHashChange = () => setHash(window.location.hash);
    onHashChange();
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const active = dictionaries[current];

  return (
    <nav aria-label={active.a11y.languageLabel} className="flex items-center gap-1">
      <span aria-hidden="true" className="positive-400">
        ●
      </span>
      <ul className="flex items-center gap-1">
        {locales.map((locale) => {
          const label = dictionaries[locale].a11y.languageName;
          const isActive = locale === current;
          const className = [
            "rounded-sm px-3 py-2 text-label",
            isActive ? "text-ice-300" : "text-cloud-300 transition-colors hover:text-cloud-50",
          ].join(" ");
          return (
            <li key={locale}>
              <a
                href={`/${locale}${hash}`}
                aria-current={isActive ? "page" : undefined}
                aria-label={locale === current ? active.a11y.languageSwitchedTo(locale) : undefined}
                className={className}
                title={locale === current ? active.a11y.languageSwitchedTo(locale) : undefined}
              >
                {label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
