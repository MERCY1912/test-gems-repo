import { NextResponse, type NextRequest } from "next/server";

import { DEFAULT_LOCALE, isLocale } from "@/lib/i18n";

/**
 * Прокидывает локаль из URL в заголовок x-locale, чтобы корневой layout мог
 * выставить корректный <html lang> на /ru и /en.
 */
export function middleware(request: NextRequest) {
  const segments = request.nextUrl.pathname.split("/").filter(Boolean);
  const locale = isLocale(segments[0]) ? segments[0] : DEFAULT_LOCALE;

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-locale", locale);

  return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = {
  matcher: ["/((?!_next|favicon.ico).*)"],
};
