"use client";

import { useState } from "react";
import type { Dictionary } from "../i18n";
import { validateContact, type FieldErrors } from "../lib/validation";

type FormDict = Dictionary["form"];

type ContactPayload = { name: string; email: string; message: string };

type FieldKey = keyof FieldErrors;
type FieldCode = NonNullable<Required<FieldErrors>[FieldKey]>[number];

function codeKey(field: FieldKey, code: FieldCode) {
  return `${field}${code.charAt(0).toUpperCase()}${code.slice(1)}` as keyof FormDict["errors"];
}

export default function ContactForm({ form: f }: { form: FormDict }) {
  const [values, setValues] = useState<ContactPayload>({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [serverErrors, setServerErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "network" | "server" | "invalid">("idle");

  const allErrors: Record<string, string[]> = { ...serverErrors };
  for (const [field, codes] of Object.entries(errors)) {
    allErrors[field] = (codes ?? []).map((code: FieldCode) => f.errors[codeKey(field as FieldKey, code as FieldCode)]);
  }

  function set(field: keyof ContactPayload, value: string) {
    setValues((prev) => ({ ...prev, [field]: value }));
    if (errors[field] || serverErrors[field]) {
      setErrors((prev) => { const next = { ...prev }; delete next[field]; return next; });
      setServerErrors((prev) => { const next = { ...prev }; delete next[field]; return next; });
    }
    if (status !== "idle" && status !== "submitting") setStatus("idle");
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setServerErrors({});
    const localErrors = validateContact(values);
    setErrors(localErrors);
    if (Object.keys(localErrors).length > 0) {
      setStatus("idle");
      const firstField = Object.keys(localErrors)[0];
      document.getElementById(`contact-${firstField}`)?.focus();
      return;
    }
    setStatus("submitting");
    try {
      const res = await fetch("/api/contact-test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (res.ok) {
        setStatus("success");
        setValues({ name: "", email: "", message: "" });
        setErrors({});
        return;
      }
      if (res.status === 400) {
        const data = (await res.json().catch(() => null)) as { errors?: FieldErrors } | null;
        if (data?.errors && Object.keys(data.errors).length > 0) {
          setServerErrors(data.errors);
          setStatus("server");
        } else {
          setStatus("invalid");
        }
        return;
      }
      setStatus("server");
    } catch {
      setStatus("network");
    }
  }

  const fields: { name: keyof ContactPayload; label: string; placeholder: string; type: string; required: boolean }[] = [
    { name: "name", label: f.nameLabel, placeholder: f.namePlaceholder, type: "text", required: true },
    { name: "email", label: f.emailLabel, placeholder: f.emailPlaceholder, type: "email", required: true },
  ];

  return (
    <form id="contact-form" noValidate onSubmit={onSubmit} className="mt-6 max-w-xl space-y-5">
      <p className="badge badge-test" data-testid="test-badge">{f.badge}</p>
      <p className="text-body text-cloud-300">{f.badgeNote}</p>

      {fields.map((field) => {
        const messages = allErrors[field.name] ?? [];
        const invalid = messages.length > 0;
        return (
          <div key={field.name}>
            <label htmlFor={`contact-${field.name}`} className="text-label text-cloud-300">
              {field.label} <span className="text-gold-400">*<span className="sr-only"> {f.required}</span></span>
            </label>
            <input
              id={`contact-${field.name}`}
              name={field.name}
              type={field.type}
              value={values[field.name]}
              onChange={(e) => set(field.name, e.target.value)}
              placeholder={field.placeholder}
              required={field.required}
              aria-invalid={invalid || undefined}
              aria-describedby={invalid ? `error-${field.name}` : undefined}
              className={invalid ? "input input-error" : "input"}
            />
            {invalid && (
              <p id={`error-${field.name}`} role="alert" className="mt-1 text-small text-negative-400">
                {messages.join(" ")}
              </p>
            )}
          </div>
        );
      })}

      <div>
        <label htmlFor="contact-message" className="text-label text-cloud-300">
          {f.messageLabel} <span className="text-gold-400">*<span className="sr-only"> {f.required}</span></span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={4}
          value={values.message}
          onChange={(e) => set("message", e.target.value)}
          placeholder={f.messagePlaceholder}
          required
          aria-invalid={(allErrors.message?.length ?? 0) > 0 || undefined}
          aria-describedby={(allErrors.message?.length ?? 0) > 0 ? "error-message" : undefined}
          className={(allErrors.message?.length ?? 0) > 0 ? "input input-error" : "input"}
        />
        {(allErrors.message?.length ?? 0) > 0 && (
          <p id="error-message" role="alert" className="mt-1 text-small text-negative-400">
            {allErrors.message.join(" ")}
          </p>
        )}
      </div>

      <button type="submit" disabled={status === "submitting"} className="btn-primary disabled:opacity-60">
        {status === "submitting" ? f.submitting : f.submit}
      </button>

      <p aria-live="polite" role="status" className="text-body">
        {status === "success" && <span className="text-positive-400">{f.success}</span>}
        {status === "network" && <span className="text-negative-400">{f.networkError}</span>}
        {status === "server" && <span className="text-negative-400">{f.serverError}</span>}
        {status === "invalid" && <span className="text-negative-400">{f.errors.requestInvalid}</span>}
      </p>
    </form>
  );
}
