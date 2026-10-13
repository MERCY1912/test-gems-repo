import { NextResponse } from "next/server";
import { validateContact, hasErrors, type ContactPayload } from "../../../lib/validation";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, test: true, errors: {} }, { status: 400 });
  }

  // Only JSON objects are accepted; strings, numbers, arrays and null get an actionable 400 instead of a 500 crash.
  if (payload === null || typeof payload !== "object" || Array.isArray(payload)) {
    return NextResponse.json(
      { ok: false, test: true, errors: {}, error: "invalid_payload" },
      { status: 400 },
    );
  }

  const errors = validateContact(payload as ContactPayload);
  if (hasErrors(errors)) {
    return NextResponse.json({ ok: false, test: true, errors }, { status: 400 });
  }

  return NextResponse.json(
    {
      ok: true,
      test: true,
      message: "Тестовый режим: данные не сохраняются и никуда не отправляются.",
    },
    { status: 200 },
  );
}
