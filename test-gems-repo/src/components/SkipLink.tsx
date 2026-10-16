import type { Dictionary } from "../i18n";

export default function SkipLink({ label }: { label: string }) {
  return (
    <a href="#main" className="sr-only focus:not-sr-only">
      {label}
    </a>
  );
}
