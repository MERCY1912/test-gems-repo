import { describe, expect, it } from "vitest";
import {
  validateContact,
  hasErrors,
  NAME_MIN,
  NAME_MAX,
  EMAIL_MAX,
  MESSAGE_MIN,
  MESSAGE_MAX,
  type ContactPayload,
} from "../src/lib/validation";

const valid: ContactPayload = {
  name: "Иван Петров",
  email: "ivan@example.com",
  message: "Здравствуйте, хочу узнать о коллекции.",
};

describe("validateContact", () => {
  it("passes for a valid payload", () => {
    expect(validateContact(valid)).toEqual({});
    expect(hasErrors({})).toBe(false);
  });

  it("trims whitespace and still passes", () => {
    const payload = { name: "  Анна  ", email: " anna@mail.ru ", message: "   Привет, мир!  " };
    expect(validateContact(payload)).toEqual({});
  });

  it("reports required for empty fields", () => {
    const errors = validateContact({ name: "", email: "", message: "" });
    expect(errors.name).toEqual(["required"]);
    expect(errors.email).toEqual(["required"]);
    expect(errors.message).toEqual(["required"]);
  });

  it("reports short when below the minimum", () => {
    const errors = validateContact({ ...valid, name: "A", message: "коротко" });
    expect(errors.name).toEqual(["short"]);
    expect(errors.message).toEqual(["short"]);
  });

  it("reports long when above the maximum", () => {
    const errors = validateContact({
      name: "x".repeat(NAME_MAX + 1),
      email: `a@b.${"c".repeat(EMAIL_MAX)}`,
      message: "б".repeat(MESSAGE_MAX + 1),
    });
    expect(errors.name).toEqual(["long"]);
    expect(errors.email).toEqual(["long"]);
    expect(errors.message).toEqual(["long"]);
  });

  it("reports invalid email format", () => {
    expect(validateContact({ ...valid, email: "не-почта" }).email).toEqual(["invalid"]);
    expect(validateContact({ ...valid, email: "a@b" }).email).toEqual(["invalid"]);
    expect(validateContact({ ...valid, email: "a b@c.ru" }).email).toEqual(["invalid"]);
  });

  it("rejects non-string values as required", () => {
    const errors = validateContact({ name: 42, email: null, message: ["x"] } as unknown as ContactPayload);
    expect(errors.name).toEqual(["required"]);
    expect(errors.email).toEqual(["required"]);
    expect(errors.message).toEqual(["required"]);
  });

  it("marks aggregated errors via hasErrors", () => {
    expect(hasErrors(validateContact({ ...valid, name: "" }))).toBe(true);
  });
});
