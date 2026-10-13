import type { Dictionary } from "../i18n";
import type { Locale } from "../i18n";
import LocaleSwitcher from "./LocaleSwitcher";

export default function Header({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const links = [
    { href: `#about`, label: dict.nav.about },
    { href: `#values`, label: dict.nav.values },
    { href: `#advantages`, label: dict.nav.advantages },
    { href: `#contacts`, label: dict.nav.contacts },
  ];
  return (
    <header className="sticky top-0 z-10 border-b border-ink-800/70 bg-ink-950/90">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-4 gap-y-2 px-4 py-4">
        <a href={`/${locale}`} className="text-h3 text-cloud-50" aria-label={dict.meta.title}>
          {dict.meta.wordmark}
        </a>
        <div className="flex min-w-0 flex-1 flex-wrap items-center justify-between gap-x-4 gap-y-2">
          <nav aria-label={dict.a11y.navigationLabel} className="min-w-0">
            <ul className="flex flex-wrap items-center gap-x-4 gap-y-1">
              {links.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-label text-cloud-300 transition-colors hover:text-ice-300">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <LocaleSwitcher current={locale} />
        </div>
      </div>
    </header>
  );
}
