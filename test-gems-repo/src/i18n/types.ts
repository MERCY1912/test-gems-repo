export interface DictionaryValidationError {
  [field: string]: string[];
}

export interface Dictionary {
  meta: { title: string; description: string; wordmark: string };
  a11y: {
    skipToContent: string;
    mainLabel: string;
    crystalTitle: string;
    languageName: string;
    navigationLabel: string;
    languageLabel: string;
    languageSwitchedTo: (locale: string) => string;
  };
  nav: {
    about: string;
    values: string;
    advantages: string;
    contacts: string;
  };
  hero: {
    title: string;
    lead: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
  about: {
    eyebrow: string;
    heading: string;
    paragraph1: string;
    paragraph2: string;
    quote: string;
  };
  values: {
    eyebrow: string;
    heading: string;
    principlesTitle: string;
    principles: { title: string; text: string }[];
    collectionsTitle: string;
    collections: { name: string; text: string }[];
  };
  advantages: {
    eyebrow: string;
    heading: string;
    items: { title: string; text: string }[];
  };
  contacts: {
    eyebrow: string;
    heading: string;
    intro: string;
    addressLabel: string;
    address: string;
    emailLabel: string;
    email: string;
    phoneLabel: string;
    phone: string;
    formNote: string;
  };
  form: {
    badge: string;
    badgeNote: string;
    heading: string;
    nameLabel: string;
    namePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    messageLabel: string;
    messagePlaceholder: string;
    required: string;
    submit: string;
    submitting: string;
    success: string;
    networkError: string;
    serverError: string;
    errors: {
      nameRequired: string;
      nameShort: string;
      nameLong: string;
      emailRequired: string;
      emailInvalid: string;
      emailLong: string;
      messageRequired: string;
      messageShort: string;
      messageLong: string;
    };
  };
  footer: {
    copyright: string;
    disclaimer: string;
  };
}
