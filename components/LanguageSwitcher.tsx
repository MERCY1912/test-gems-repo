"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export type LanguageOption = {
  code: string;
  label: string;
  name: string;
};

export type LanguageSwitcherProps = {
  /** Код активного языка. */
  locale: string;
  /** Локализованный aria-label для группы ссылок. */
  label: string;
  options: LanguageOption[];
  className?: string;
};

const LOCALE_PREFIX = /^\/(ru|en)(?=\/|$)/;

export default function LanguageSwitcher({
  locale,
  label,
  options,
  className,
}: LanguageSwitcherProps) {
  const pathname = usePathname();
  const [hash, setHash] = useState("");

  // Ссылки остаются рабочими без JS; хэш восстанавливается после гидратации,
  // чтобы переключение языка сохраняло текущую секцию.
  useEffect(() => {
    const syncHash = () => setHash(window.location.hash);
    syncHash();
    window.addEventListener("hashchange", syncHash);
    return () => window.removeEventListener("hashchange", syncHash);
  }, []);

  const rest = pathname ? pathname.replace(LOCALE_PREFIX, "") : "";

  return (
    <nav aria-label={label} className={className}>
      <ul className="flex items-center gap-1 rounded-full border border-ice-300/20 p-1">
        {options.map((option) => {
          const isActive = option.code === locale;
          return (
            <li key={option.code}>
              <Link
                aria-current={isActive ? "true" : undefined}
                className={
                  isActive
                    ? "block rounded-full bg-ice-400/15 px-3 py-1 text-xs font-semibold tracking-[0.18em] text-ice-200"
                    : "block rounded-full px-3 py-1 text-xs font-semibold tracking-[0.18em] text-frost-400 transition-colors hover:text-ice-200"
                }
                href={`/${option.code}${rest}${hash}`}
                hrefLang={option.code}
                title={option.name}
              >
                {option.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
