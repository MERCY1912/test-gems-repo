import { describe, expect, it } from "vitest";
import { POST } from "../src/app/api/contact-test/route";

function post(body: string, contentType = "application/json") {
  return new Request("http://localhost:3000/api/contact-test", {
    method: "POST",
    headers: { "content-type": contentType },
    body,
  });
}

const validPayload = {
  name: "Тест Тестов",
  email: "test@example.com",
  message: "Сообщение для локального тестирования формы.",
};

describe("POST /api/contact-test", () => {
  it("returns 400 with test confirmation text for a valid payload", async () => {
    const res = await POST(new Request("http://localhost:3000/api/contact-test", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(validPayload),
    }));
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.ok).toBe(true);
    expect(data.test).toBe(true);
    expect(String(data.message)).toContain("Тестовый режим");
  });

  it("returns 400 with per-field errors for an empty payload", async () => {
    const res = await POST(post(JSON.stringify({ name: "", email: "", message: "" })));
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.ok).toBe(false);
    expect(data.errors.name).toEqual(["required"]);
    expect(data.errors.email).toEqual(["required"]);
    expect(data.errors.message).toEqual(["required"]);
  });

  it("returns 400 for a non-object payload (string, array or null)", async () => {
    for (const body of [JSON.stringify("name"), JSON.stringify([validPayload]), JSON.stringify(null)]) {
      const res = await POST(post(body));
      expect(res.status).toBe(400);
      const data = await res.json();
      expect(data.ok).toBe(false);
      expect(data.errors).toEqual({});
      expect(data.error).toBeTruthy();
    }
  });

  it("returns 400 for malformed JSON", async () => {
    const res = await POST(post("{not json"));
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.ok).toBe(false);
  });

  it("returns 400 for a non-JSON body regardless of content type", async () => {
    const res = await POST(post("name=test", "application/x-www-form-urlencoded"));
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.ok).toBe(false);
  });

  it("validates email format and message length server-side", async () => {
    const res = await POST(post(JSON.stringify({ ...validPayload, email: "bad", message: "коротко" })));
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.errors.email).toEqual(["invalid"]);
    expect(data.errors.message).toEqual(["short"]);
  });
});
