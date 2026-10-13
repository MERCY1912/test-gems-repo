import { notFound } from "next/navigation";

import CrystalLogo from "@/components/CrystalLogo";
import { getDictionary, isLocale } from "@/lib/i18n";

export default async function LocalePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;

  if (!isLocale(raw)) {
    notFound();
  }

  const dict = getDictionary(raw);

  return (
    <>
      <section className="section relative overflow-hidden" id="hero">
        <div className="shell grid items-center gap-12 md:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
          <div className="flex flex-col items-start gap-6">
            <p className="eyebrow">{dict.hero.eyebrow}</p>
            <h1 className="text-5xl text-frost-50 sm:text-6xl lg:text-7xl">{dict.hero.title}</h1>
            <p className="max-w-xl text-lg text-frost-300">{dict.hero.tagline}</p>
            <div className="flex flex-wrap items-center gap-4">
              <a className="btn-primary" href="#contact">
                {dict.hero.primaryCta}
              </a>
              <a className="btn-ghost" href="#about">
                {dict.hero.secondaryCta}
              </a>
            </div>
          </div>

          <div className="justify-self-center md:justify-self-end">
            <CrystalLogo variant="hero" />
          </div>
        </div>
      </section>

      <section className="section border-t border-ice-300/10" id="about">
        <div className="shell grid gap-8 md:grid-cols-[minmax(0,0.45fr)_minmax(0,1fr)]">
          <div className="flex flex-col gap-3">
            <p className="section-label">01</p>
            <h2 className="text-3xl text-frost-50 sm:text-4xl">{dict.sections.about.title}</h2>
          </div>
          <p className="max-w-2xl text-base text-frost-300">{dict.sections.about.body}</p>
        </div>
      </section>

      <section className="section border-t border-ice-300/10" id="values">
        <div className="shell flex flex-col gap-10">
          <div className="flex flex-col gap-3">
            <p className="section-label">02</p>
            <h2 className="text-3xl text-frost-50 sm:text-4xl">{dict.sections.values.title}</h2>
            <p className="max-w-2xl text-frost-300">{dict.sections.values.intro}</p>
          </div>
          <ul className="grid gap-6 md:grid-cols-3">
            {dict.sections.values.items.map((item) => (
              <li className="panel flex flex-col gap-3 p-6" key={item.title}>
                <h3 className="text-xl text-ice-200">{item.title}</h3>
                <p className="text-sm text-frost-300">{item.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section border-t border-ice-300/10" id="craft">
        <div className="shell grid gap-8 md:grid-cols-[minmax(0,0.45fr)_minmax(0,1fr)]">
          <div className="flex flex-col gap-3">
            <p className="section-label">03</p>
            <h2 className="text-3xl text-frost-50 sm:text-4xl">{dict.sections.craft.title}</h2>
          </div>
          <p className="max-w-2xl text-base text-frost-300">{dict.sections.craft.body}</p>
        </div>
      </section>

      <section className="section border-t border-ice-300/10" id="audience">
        <div className="shell flex flex-col gap-8">
          <div className="flex flex-col gap-3">
            <p className="section-label">04</p>
            <h2 className="text-3xl text-frost-50 sm:text-4xl">{dict.sections.audience.title}</h2>
            <p className="max-w-2xl text-frost-300">{dict.sections.audience.intro}</p>
          </div>
          <ul className="flex flex-wrap gap-3">
            {dict.sections.audience.items.map((item) => (
              <li
                className="rounded-full border border-ice-300/25 px-4 py-2 text-sm text-frost-200"
                key={item}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section border-t border-ice-300/10" id="collection">
        <div className="shell grid gap-8 md:grid-cols-[minmax(0,0.45fr)_minmax(0,1fr)]">
          <div className="flex flex-col gap-3">
            <p className="section-label">05</p>
            <h2 className="text-3xl text-frost-50 sm:text-4xl">{dict.sections.collection.title}</h2>
          </div>
          <p className="max-w-2xl text-base text-frost-300">{dict.sections.collection.body}</p>
        </div>
      </section>

      <section
        aria-label={dict.aria.contactSection}
        className="section border-t border-ice-300/10"
        id="contact"
      >
        <div className="shell grid gap-10 md:grid-cols-2">
          <div className="flex flex-col gap-4">
            <p className="section-label">06</p>
            <h2 className="text-3xl text-frost-50 sm:text-4xl">{dict.contact.title}</h2>
            <p className="max-w-xl text-frost-300">{dict.contact.intro}</p>
            <p className="inline-flex w-fit items-center rounded-full border border-blush-300/40 px-4 py-1 text-xs uppercase tracking-[0.28em] text-blush-300">
              {dict.contact.testBadge}
            </p>
            <p className="max-w-md text-sm text-frost-400">{dict.contact.testNotice}</p>
          </div>

          <dl className="panel grid gap-6 p-6 sm:grid-cols-2">
            <div className="flex flex-col gap-1">
              <dt className="section-label">{dict.contact.emailLabel}</dt>
              <dd className="text-frost-100">{dict.contact.email}</dd>
            </div>
            <div className="flex flex-col gap-1">
              <dt className="section-label">{dict.contact.phoneLabel}</dt>
              <dd className="text-frost-100">{dict.contact.phone}</dd>
            </div>
            <div className="flex flex-col gap-1">
              <dt className="section-label">{dict.contact.telegramLabel}</dt>
              <dd className="text-frost-100">{dict.contact.telegram}</dd>
            </div>
          </dl>
        </div>
      </section>
    </>
  );
}
