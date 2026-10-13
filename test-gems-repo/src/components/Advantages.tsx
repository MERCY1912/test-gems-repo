import type { Dictionary } from "../i18n";

export default function Advantages({ dict }: { dict: Dictionary }) {
  const d = dict.advantages;
  return (
    <section id="advantages" aria-labelledby="advantages-title" className="mx-auto max-w-6xl px-4 py-24">
      <p className="text-label text-gold-400">{d.eyebrow}</p>
      <h2 id="advantages-title" className="mt-3 text-h2 text-cloud-50">
        {d.heading}
      </h2>
      <ul className="mt-10 grid gap-6 sm:grid-cols-2">
        {d.items.map((item, index) => (
          <li key={index} className="rounded-sm border border-ink-800 p-6">
            <h3 className="text-h3 text-ice-300">{item.title}</h3>
            <p className="mt-3 text-body text-cloud-300">{item.text}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
