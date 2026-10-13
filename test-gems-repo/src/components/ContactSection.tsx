import type { Dictionary } from "../i18n";
import ContactForm from "./ContactForm";

export default function ContactSection({ dict }: { dict: Dictionary }) {
  const d = dict.contacts;
  return (
    <section id="contacts" aria-labelledby="contacts-title" className="mx-auto max-w-6xl px-4 py-24">
      <p className="text-label text-gold-400">{d.eyebrow}</p>
      <h2 id="contacts-title" className="mt-3 text-h2 text-cloud-50">
        {d.heading}
      </h2>
      <p className="mt-6 max-w-2xl text-lead text-cloud-300">{d.intro}</p>
      <address className="mt-6 not-italic text-body text-cloud-300">
        <p>{d.address}</p>
        <a href={`mailto:${d.email}`} className="text-ice-300 underline">
          {d.email}
        </a>
        <br />
        <a href={`tel:${d.phone}`} className="text-ice-300 underline">
          {d.phone}
        </a>
      </address>
      <p className="mt-10 rounded-sm border border-amber-300 p-3 text-body text-amber-300">
        {d.formNote}
      </p>
      <ContactForm form={dict.form} />
    </section>
  );
}
