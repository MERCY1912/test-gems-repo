export const LOCALES = ["ru", "en"] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "ru";

export const LOCALE_LABELS: Record<Locale, string> = {
  ru: "RU",
  en: "EN",
};

export const LOCALE_NAMES: Record<Locale, string> = {
  ru: "Русский",
  en: "English",
};

export function isLocale(value: string | null | undefined): value is Locale {
  return value === "ru" || value === "en";
}

export function resolveLocale(value: string | null | undefined): Locale {
  return isLocale(value) ? value : DEFAULT_LOCALE;
}

export type ValueCard = {
  title: string;
  body: string;
};

export type Dictionary = {
  meta: {
    title: string;
    description: string;
  };
  nav: {
    brand: string;
    contact: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    tagline: string;
    primaryCta: string;
    secondaryCta: string;
  };
  sections: {
    about: { title: string; body: string };
    values: { title: string; intro: string; items: ValueCard[] };
    craft: { title: string; body: string };
    audience: { title: string; intro: string; items: string[] };
    collection: { title: string; body: string };
  };
  contact: {
    title: string;
    intro: string;
    testBadge: string;
    testNotice: string;
    emailLabel: string;
    phoneLabel: string;
    telegramLabel: string;
    email: string;
    phone: string;
    telegram: string;
  };
  footer: {
    tagline: string;
    note: string;
  };
  aria: {
    mainNav: string;
    languageSwitcher: string;
    contactSection: string;
    skipToContent: string;
  };
};

export const dictionaries: Record<Locale, Dictionary> = {
  ru: {
    meta: {
      title: "DIAMONDS — свет и геометрия кристалла",
      description:
        "Имиджевая страница бренда DIAMONDS: сдержанная премиальная подача, свет и точная геометрия кристалла.",
    },
    nav: {
      brand: "DIAMONDS",
      contact: "Связаться",
    },
    hero: {
      eyebrow: "Бренд",
      title: "DIAMONDS",
      tagline: "Свет, преломлённый в точной геометрии.",
      primaryCta: "Связаться",
      secondaryCta: "О бренде",
    },
    sections: {
      about: {
        title: "О бренде",
        body: "DIAMONDS — визуальный образ, построенный на кристалле: строгие грани, холодный свет и один тёплый блик по краю.",
      },
      values: {
        title: "Ценности",
        intro: "Три принципа, которые задают тон всей визуальной системе.",
        items: [
          {
            title: "Точность",
            body: "Геометрия кристалла — это про ясность формы и аккуратность линий.",
          },
          {
            title: "Свет",
            body: "Свет проходит через грани и меняется: от ледяного к тёплому.",
          },
          {
            title: "Сдержанность",
            body: "Никаких лишних деталей — только форма, свет и воздух.",
          },
        ],
      },
      craft: {
        title: "Мастерство света",
        body: "Многослойные градиенты передают преломление: холодное ядро, ледяные сколы и тёплый отблеск по краю.",
      },
      audience: {
        title: "Для кого",
        intro: "Страница говорит с теми, кто считывает сдержанную премиальность с первого экрана.",
        items: ["Частные клиенты", "Ювелирные партнёры", "Галереи и витрины"],
      },
      collection: {
        title: "Коллекция как направление",
        body: "Коллекция описана как направление в дизайне, а не как список изделий: без вымышленных товаров и обещаний.",
      },
    },
    contact: {
      title: "Связаться",
      intro: "Напишите нам, чтобы обсудить сотрудничество.",
      testBadge: "Тестовые данные",
      testNotice:
        "Это демонстрационная страница: контакты ниже вымышленные и приведены только как пример.",
      emailLabel: "Email",
      phoneLabel: "Телефон",
      telegramLabel: "Telegram",
      email: "hello@diamonds.test",
      phone: "+7 000 000-00-00",
      telegram: "@diamonds_test",
    },
    footer: {
      tagline: "DIAMONDS — свет и геометрия.",
      note: "Демонстрационная страница бренда. Все контакты тестовые.",
    },
    aria: {
      mainNav: "Основная навигация",
      languageSwitcher: "Выбор языка",
      contactSection: "Контакты",
      skipToContent: "Перейти к содержимому",
    },
  },
  en: {
    meta: {
      title: "DIAMONDS — light and crystal geometry",
      description:
        "Brand page for DIAMONDS: a restrained premium tone built on light and precise crystal geometry.",
    },
    nav: {
      brand: "DIAMONDS",
      contact: "Contact",
    },
    hero: {
      eyebrow: "Brand",
      title: "DIAMONDS",
      tagline: "Light refracted through precise geometry.",
      primaryCta: "Contact",
      secondaryCta: "About",
    },
    sections: {
      about: {
        title: "About the brand",
        body: "DIAMONDS is a visual idea built on a crystal: precise facets, cool light and a single warm glint along the edge.",
      },
      values: {
        title: "Values",
        intro: "Three principles that set the tone of the whole visual system.",
        items: [
          {
            title: "Precision",
            body: "Crystal geometry is about clear form and careful lines.",
          },
          {
            title: "Light",
            body: "Light travels through the facets and shifts from icy to warm.",
          },
          {
            title: "Restraint",
            body: "Nothing extra — only form, light and air.",
          },
        ],
      },
      craft: {
        title: "The craft of light",
        body: "Layered gradients mimic refraction: a cool core, icy splinters and a warm highlight along the edge.",
      },
      audience: {
        title: "Who it is for",
        intro: "The page speaks to people who read restrained premium quality from the first screen.",
        items: ["Private clients", "Jewellery partners", "Galleries and showrooms"],
      },
      collection: {
        title: "Collection as a direction",
        body: "The collection is described as a design direction, not a product list — with no invented items or promises.",
      },
    },
    contact: {
      title: "Contact",
      intro: "Write to us to discuss a collaboration.",
      testBadge: "Sample data",
      testNotice:
        "This is a demo page: the contact details below are fictional and shown as an example only.",
      emailLabel: "Email",
      phoneLabel: "Phone",
      telegramLabel: "Telegram",
      email: "hello@diamonds.test",
      phone: "+7 000 000-00-00",
      telegram: "@diamonds_test",
    },
    footer: {
      tagline: "DIAMONDS — light and geometry.",
      note: "Demo brand page. All contact details are sample data.",
    },
    aria: {
      mainNav: "Main navigation",
      languageSwitcher: "Language selection",
      contactSection: "Contact details",
      skipToContent: "Skip to content",
    },
  },
};

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
