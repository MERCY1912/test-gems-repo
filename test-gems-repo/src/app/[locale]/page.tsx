import { isLocale } from "../../i18n/config";
import { getDictionary } from "../../i18n";
import Crystal from "../../components/Crystal";
import About from "../../components/About";
import Values from "../../components/Values";
import Advantages from "../../components/Advantages";
import ContactSection from "../../components/ContactSection";

interface LocalePageProps {
  params: Promise<{ locale: string }>;
}

export default async function LocalePage({ params }: LocalePageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) return null;
  const d = getDictionary(locale);
  return (
    <main id="main" aria-label={d.a11y.mainLabel}>
      <section id="hero" aria-label={d.hero.lead} className="mx-auto grid max-w-6xl items-center gap-12 px-4 pt-16 pb-24 lg:grid-cols-2">
        <div>
          <Crystal title={d.a11y.crystalTitle} />
          <h1 className="mt-8 text-display text-cloud-50">{d.hero.title}</h1>
          <p className="mt-6 max-w-xl text-lead text-cloud-300">{d.hero.lead}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#values" className="btn-primary">{d.hero.ctaPrimary}</a>
            <a href="#contacts" className="btn-secondary">{d.hero.ctaSecondary}</a>
          </div>
        </div>
      </section>
      <About dict={d} />
      <Values dict={d} />
      <Advantages dict={d} />
      <ContactSection dict={d} />
    </main>
  );
}
