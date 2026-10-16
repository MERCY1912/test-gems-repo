export type ContactErrorCode = "required" | "short" | "long" | "invalid";

export interface FieldErrors {
  name?: ContactErrorCode[];
  email?: ContactErrorCode[];
  message?: ContactErrorCode[];
}

export interface ContactPayload {
  name: unknown;
  email: unknown;
  message: unknown;
}

export const NAME_MIN = 2;
export const NAME_MAX = 100;
export const EMAIL_MAX = 254;
export const MESSAGE_MIN = 10;
export const MESSAGE_MAX = 2000;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function checkString(value: unknown, min: number, max: number): { value?: string; error?: ContactErrorCode } {
  if (typeof value !== "string") return { error: "required" };
  const trimmed = value.trim();
  if (trimmed.length < min) return { error: trimmed.length === 0 ? "required" : "short" };
  if (trimmed.length > max) return { error: "long" };
  return { value: trimmed };
}

export function validateContact(payload: ContactPayload): FieldErrors {
  const errors: FieldErrors = {};

  const name = checkString(payload.name, NAME_MIN, NAME_MAX);
  if (name.error) errors.name = [name.error];

  const email = checkString(payload.email, 1, EMAIL_MAX);
  if (email.error) {
    errors.email = [email.error === "required" ? "required" : email.error];
  } else if (!EMAIL_RE.test(email.value as string)) {
    errors.email = ["invalid"];
  }

  const message = checkString(payload.message, MESSAGE_MIN, MESSAGE_MAX);
  if (message.error) errors.message = [message.error];

  return errors;
}

export function hasErrors(errors: FieldErrors): boolean {
  return Object.values(errors).some((codes) => (codes ?? []).length > 0);
}
