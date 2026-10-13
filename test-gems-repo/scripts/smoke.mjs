import { spawn } from "node:child_process";
import { setTimeout as sleep } from "node:timers/promises";

const PORT = 3100;
const BASE = `http://127.0.0.1:${PORT}`;
const failures = [];

function check(name, condition, details = "") {
  if (condition) {
    console.log(`ok - ${name}`);
  } else {
    console.error(`fail - ${name}${details ? ` (${details})` : ""}`);
    failures.push(name);
  }
}

const nextBin = new URL("../node_modules/next/dist/bin/next", import.meta.url).pathname;
const server = spawn(process.execPath, [nextBin, "start", "--hostname", "127.0.0.1", "--port", String(PORT)], {
  cwd: new URL("..", import.meta.url).pathname,
  stdio: "inherit",
  detached: true,
});

function stopServer() {
  if (server.pid === undefined) return;
  try {
    process.kill(-server.pid, "SIGTERM");
  } catch {
    server.kill("SIGTERM");
  }
}

try {
  let rootHtml = null;
  for (let attempt = 0; attempt < 60; attempt += 1) {
    try {
      const res = await fetch(`${BASE}/ru`);
      if (res.ok) {
        rootHtml = await res.text();
        break;
      }
    } catch {}
    await sleep(500);
  }
  check("server responds on /ru", rootHtml !== null);
  if (rootHtml) {
    check('"/ru" renders lang="ru"', /<html[^>]*lang="ru"/.test(rootHtml));
    check('"/ru" renders hero heading', /DIAMONDS/.test(rootHtml));
  }

  const enRes = await fetch(`${BASE}/en`);
  const enHtml = await enRes.text();
  check('"/en" responds 200 with lang="en"', enRes.ok && /<html[^>]*lang="en"/.test(enHtml));

  for (const locale of ["ru", "en"]) {
    const res = await fetch(`${BASE}/${locale}`);
    const html = await res.text();
    check(`"/${locale}" has crystal svg`, html.includes('class="crystal"'));
    check(`"/${locale}" has contact form`, html.includes('id="contact-form"'));
  }

  const rootRes = await fetch(`${BASE}/`, { redirect: "manual" });
  check("root redirects", [307, 308].includes(rootRes.status), `status ${rootRes.status}`);
  const location = rootRes.headers.get("location") ?? "";
  check("root redirects to /ru", location.includes("/ru"), `location ${location}`);

  const invalid = await fetch(`${BASE}/api/contact-test`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: "", email: "bad", message: "" }),
  });
  check("invalid contact payload returns 400", invalid.status === 400);

  const valid = await fetch(`${BASE}/api/contact-test`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: "Тест", email: "test@example.com", message: "Проверка тестовой формы" }),
  });
  const validJson = await valid.json();
  check("valid contact payload returns ok", valid.ok && validJson.ok === true && validJson.test === true);
} catch (error) {
  console.error("smoke script crashed", error);
  process.exitCode = 1;
} finally {
  stopServer();
  await sleep(500);
  if (failures.length > 0) {
    console.error(`smoke failed: ${failures.join(", ")}`);
    process.exitCode = 1;
  }
}
