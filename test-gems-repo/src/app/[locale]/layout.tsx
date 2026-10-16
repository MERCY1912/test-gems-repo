import type { Metadata } from "next";
import { notFound } from "next/navigation";
import "../globals.css";
import { locales, isLocale } from "../../i18n/config";
import { getDictionary } from "../../i18n";
import SkipLink from "../../components/SkipLink";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const d = getDictionary(locale);
  return {
    title: d.meta.title,
    description: d.meta.description,
    alternates: {
      canonical: `/${locale}`,
      languages: { ru: "/ru", en: "/en" },
    },
    openGraph: {
      title: d.meta.title,
      description: d.meta.description,
      locale,
      type: "website",
    },
  };
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const d = getDictionary(locale);
  return (
    <html lang={locale}>
      <body>
        <SkipLink label={d.a11y.skipToContent} />
        <Header locale={locale} dict={d} />
        {children}
        <Footer dict={d} locale={locale} />
      </body>
    </html>
  );
}
