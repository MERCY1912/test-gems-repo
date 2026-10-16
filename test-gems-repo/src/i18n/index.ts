import { ru } from "./dictionaries/ru";
import { en } from "./dictionaries/en";
import type { Locale } from "./config";

export const dictionaries = { ru, en } as const;

export function getDictionary(locale: Locale) {
  return dictionaries[locale];
}

export type { Locale } from "./config";
export { locales, defaultLocale, isLocale } from "./config";
export type { Dictionary } from "./types";
