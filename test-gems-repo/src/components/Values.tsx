import type { Dictionary } from "../i18n";

export default function Values({ dict }: { dict: Dictionary }) {
  const d = dict.values;
  return (
    <section id="values" aria-labelledby="values-title" className="mx-auto max-w-6xl px-4 py-24">
      <p className="text-label text-gold-400">{d.eyebrow}</p>
      <h2 id="values-title" className="mt-3 text-h2 text-cloud-50">
        {d.heading}
      </h2>
      <h3 className="mt-10 text-h3 text-cloud-50">{d.principlesTitle}</h3>
      <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {d.principles.map((item, index) => (
          <li key={index} className="rounded-sm border border-ink-800 p-6">
            <p className="text-h3 text-cloud-50">{item.title}</p>
            <p className="mt-3 text-body text-cloud-300">{item.text}</p>
          </li>
        ))}
      </ul>
      <h3 className="mt-10 text-h3 text-cloud-50">{d.collectionsTitle}</h3>
      <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {d.collections.map((item, index) => (
          <li key={index} className="rounded-sm border border-ink-800 p-6">
            <p className="text-h3 text-violet-300">{item.name}</p>
            <p className="mt-3 text-body text-cloud-300">{item.text}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
