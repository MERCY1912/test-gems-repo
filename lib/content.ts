import { LOCALES, type Dictionary, type Locale } from "./i18n";

export const SECTION_IDS = [
  "hero",
  "about",
  "values",
  "craft",
  "audience",
  "collection",
  "contact",
] as const;

export type SectionId = (typeof SECTION_IDS)[number];

export type SectionLink = {
  id: SectionId;
  label: string;
};

/** Пункты навигации строятся из словаря, чтобы в компонентах не было захардкоженных строк. */
export function getSectionLinks(dict: Dictionary): SectionLink[] {
  return [
    { id: "about", label: dict.sections.about.title },
    { id: "values", label: dict.sections.values.title },
    { id: "craft", label: dict.sections.craft.title },
    { id: "contact", label: dict.nav.contact },
  ];
}

export function localePath(locale: Locale, section?: SectionId): string {
  return section ? `/${locale}#${section}` : `/${locale}`;
}

export function getLocaleParams(): { locale: Locale }[] {
  return LOCALES.map((locale) => ({ locale }));
}
