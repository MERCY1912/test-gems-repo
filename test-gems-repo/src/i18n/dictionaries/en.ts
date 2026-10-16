import type { Dictionary } from "../types";

export const en: Dictionary = {
  meta: {
    title: "DIAMONDS — jewellery house of diamonds",
    description:
      "DIAMONDS — image website of a jewellery house: diamond collections, brand values and contacts.",
      wordmark: "DIAMONDS",
  },
  a11y: {
    skipToContent: "Skip to content",
    mainLabel: "Main content",
    crystalTitle: "Animated DIAMONDS crystal",
    navigationLabel: "Main navigation",
    languageLabel: "Language selection",
    languageName: "English",
    languageSwitchedTo: (locale) => (locale === "en" ? "Switched to English" : "Switched to Russian"),
  },
  nav: {
    about: "About",
    values: "Values",
    advantages: "Advantages",
    contacts: "Contacts",
  },
  hero: {
    title: "Light, born from stone",
    lead: "The DIAMONDS jewellery house creates diamond jewellery where cutting meets character.",
    ctaPrimary: "See collections",
    ctaSecondary: "Contact us",
  },
  about: {
    eyebrow: "About the brand",
    heading: "About the brand",
    paragraph1:
      "DIAMONDS is a jewellery house uniting cutters, gemologists and designers. Every piece starts with the stone: we study its light, proportions and character, then find an exact form for it.",
    paragraph2:
      "We work with independently certified diamonds and let the stone lead the story of the jewellery. The result is pieces that endure time and change meaning together with their owner.",
    quote: "A diamond is not decorated by a person — a person reveals a diamond.",
  },
  values: {
    eyebrow: "Values",
    heading: "Values",
    principlesTitle: "Principles",
    principles: [
      {
        title: "Transparency",
        text: "We openly share where our stones come from, the properties of each piece and the terms of our work.",
      },
      {
        title: "Craft",
        text: "Cutting, setting and polishing are done by hand by masters, not by a conveyor belt.",
      },
      {
        title: "Responsibility",
        text: "We follow responsible sourcing principles and respect the communities that carry stones to the jeweller.",
      },
    ],
    collectionsTitle: "Collections",
    collections: [
      {
        name: "Aurora",
        text: "A line of cold-glowdiamonds: rings and earrings built around the play of light.",
      },
      {
        name: "Meridian",
        text: "Architectural shapes and larger stones — jewellery for confident lines of a silhouette.",
      },
      {
        name: "Nocturne",
        text: "Compositions on contrast: deep backgrounds, point light and graphic geometry.",
      },
    ],
  },
  advantages: {
    eyebrow: "Advantages",
    heading: "Advantages",
    items: [
      {
        title: "In-house cutting",
        text: "Our own cutting and quality control at every step — you get a stone that knows its story.",
      },
      {
        title: "Certified stones",
        text: "Independent certification of every diamond and clear documentation for each piece.",
      },
      {
        title: "Lifetime care",
        text: "Lifetime support for every piece: setting checks, cleaning, storage advice.",
      },
      {
        title: "Made to order",
        text: "Design a piece from scratch with our designer — from sketch to stone setting.",
      },
    ],
  },
  contacts: {
    eyebrow: "Contacts",
    heading: "Contacts",
    intro: "The workshop and atelier are open by appointment.",
    addressLabel: "Address",
    address: "Moscow, Rubinskaya line, 12 — atelier and workshop",
    emailLabel: "Email",
    email: "hello@diamonds.example",
    phoneLabel: "Phone",
    phone: "+7 000 000-00-00",
    formNote: "We reply within one business day.",
  },
  form: {
    badge: "Test mode",
    badgeNote: "This form runs in test mode: no data is sent anywhere and nothing is stored.",
    heading: "Write to us",
    nameLabel: "Your name",
    namePlaceholder: "How may we address you",
    emailLabel: "Email",
    emailPlaceholder: "name@example.com",
    messageLabel: "Message",
    messagePlaceholder: "What would you like to talk about",
    required: "required field",
    submit: "Send",
    submitting: "Sending…",
    success: "Sent. Thank you! No data went anywhere — this is test mode.",
    networkError: "Network is unavailable or the server did not respond. Try again later.",
    serverError: "The server responded with an error. Check your data and try again.",
    errors: {
      nameRequired: "Please provide your name.",
      nameShort: "Name must be at least 2 characters long.",
      nameLong: "Name cannot exceed 120 characters.",
      emailRequired: "Please provide an email address.",
      emailInvalid: "Please check the email format.",
      emailLong: "Email cannot exceed 254 characters.",
      messageRequired: "Please write a message.",
      messageShort: "Message must be at least 10 characters long.",
      messageLong: "Message cannot exceed 2000 characters.",
    },
  },
  footer: {
    copyright: "© DIAMONDS, 2025",
    disclaimer: "The form runs in test mode: data is not sent and not stored.",
  },
};
