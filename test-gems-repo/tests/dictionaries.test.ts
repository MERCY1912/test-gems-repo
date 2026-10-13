import { describe, expect, it } from "vitest";
import { dictionaries, locales, defaultLocale, isLocale } from "../src/i18n";
import type { Dictionary } from "../src/i18n/types";

function flatKeys(value: unknown, prefix = ""): string[] {
  if (typeof value === "string") return [prefix];
  if (Array.isArray(value)) {
    return [...new Set(value.flatMap((item) => flatKeys(item, `${prefix}`)))];
  }
  return Object.keys(value as Record<string, unknown>).flatMap((key) => flatKeys((value as Record<string, unknown>)[key], `${prefix}${prefix ? "." : ""}${key}`));
}

describe("i18n dictionaries", () => {
  it("covers exactly ru and en with ru as default", () => {
    expect(locales).toEqual(["ru", "en"]);
    expect(defaultLocale).toBe("ru");
    expect(Object.keys(dictionaries).sort()).toEqual(["en", "ru"]);
  });

  it("isLocale accepts only configured locales", () => {
    expect(isLocale("ru")).toBe(true);
    expect(isLocale("en")).toBe(true);
    expect(isLocale("de")).toBe(false);
    expect(isLocale("")).toBe(false);
  });

  it("ru and en dictionaries expose the same shape", () => {
    const ruKeys = flatKeys(dictionaries.ru).sort();
    const enKeys = flatKeys(dictionaries.en).sort();
    expect(enKeys).toEqual(ruKeys);
    expect(ruKeys.length).toBeGreaterThan(10);
  });

  it("translation strings differ between locales", () => {
    expect(dictionaries.ru.meta.title).not.toBe(dictionaries.en.meta.title);
    expect(dictionaries.ru.hero.title).not.toBe(dictionaries.en.hero.title);
    expect(dictionaries.ru.contacts.heading).not.toBe(dictionaries.en.contacts.heading);
  });

  it("keeps required accessibility and contact labels in every locale", () => {
    for (const locale of locales) {
      const dict: Dictionary = dictionaries[locale];
      expect(dict.a11y.skipToContent).toBeTruthy();
      expect(dict.a11y.crystalTitle).toBeTruthy();
      expect(dict.a11y.mainLabel).toBeTruthy();
      expect(dict.contacts.email).toMatch(/@/);
      expect(dict.contacts.phone).toBeTruthy();
      expect(dict.form.errors.nameRequired).toBeTruthy();
      expect(dict.form.errors.emailInvalid).toBeTruthy();
    }
  });
});
