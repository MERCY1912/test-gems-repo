import type { Locale } from "../i18n";
import type { Dictionary } from "../i18n";
import LocaleSwitcher from "./LocaleSwitcher";

export default function Footer({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  return (
    <footer className="border-t border-ink-800/70 bg-ink-900/60">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-6">
        <p className="text-h3 text-cloud-50" aria-label={dict.meta.title}>
          {dict.meta.wordmark}
        </p>
        <div className="flex items-center gap-6">
          <LocaleSwitcher current={locale} />
          <span className="text-body text-cloud-300">{dict.footer.copyright}</span>
        </div>
      </div>
    </footer>
  );
}
