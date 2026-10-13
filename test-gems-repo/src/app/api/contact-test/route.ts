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

  const errors = validateContact(payload as ContactPayload);
  if (hasErrors(errors)) {
    return NextResponse.json({ ok: false, test: true, errors }, { status: 400 });
  }

  const form = payload as { name?: unknown; email?: unknown; message?: unknown };
  return NextResponse.json(
    {
      ok: true,
      test: true,
      message: "Тестовый режим: данные не сохраняются и никуда не отправляются.",
    },
    { status: 200 },
  );
}
