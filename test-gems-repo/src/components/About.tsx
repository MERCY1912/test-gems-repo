import type { Dictionary } from "../i18n";

export default function About({ dict }: { dict: Dictionary }) {
  const d = dict.about;
  return (
    <section id="about" aria-labelledby="about-title" className="mx-auto max-w-6xl px-4 py-24">
      <p className="text-label text-gold-400">{d.eyebrow}</p>
      <h2 id="about-title" className="mt-3 text-h2 text-cloud-50">
        {d.heading}
      </h2>
      <p className="mt-6 max-w-3xl text-lead text-cloud-300">{d.paragraph1}</p>
      <p className="mt-6 max-w-3xl text-body text-cloud-300">{d.paragraph2}</p>
      <blockquote className="mt-10 max-w-2xl border-l border-gold-400 pl-6 text-h3 text-ice-300">
        {d.quote}
      </blockquote>
    </section>
  );
}
