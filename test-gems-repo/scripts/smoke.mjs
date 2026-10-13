import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { setTimeout as sleep } from "node:timers/promises";

const PORT = 3100;
const BASE = `http://127.0.0.1:${PORT}`;
const REQUEST_TIMEOUT_MS = 10_000;
const READY_TIMEOUT_MS = 60_000;
const STOP_TIMEOUT_MS = 10_000;
const HARD_TIMEOUT_MS = 120_000;

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const failures = [];

function check(name, condition, details = "") {
  if (condition) {
    console.log(`ok - ${name}`);
  } else {
    console.error(`fail - ${name}${details ? ` (${details})` : ""}`);
    failures.push(name);
  }
}

if (!existsSync(path.join(rootDir, ".next", "BUILD_ID"))) {
  console.error("fail - production build missing (.next/BUILD_ID): run `npm run build` before `npm run smoke`");
  process.exit(1);
}

const nextBin = path.join(rootDir, "node_modules", "next", "dist", "bin", "next");
const server = spawn(process.execPath, [nextBin, "start", "--hostname", "127.0.0.1", "--port", String(PORT)], {
  cwd: rootDir,
  stdio: "inherit",
  detached: true,
});

let serverExited = false;
let serverExitInfo = null;
server.on("exit", (code, signal) => {
  serverExited = true;
  serverExitInfo = code === null ? `signal ${signal}` : `exit code ${code}`;
});

function killServer(signal) {
  if (!server.pid || serverExited) return;
  try {
    process.kill(-server.pid, signal);
  } catch {
    try {
      server.kill(signal);
    } catch {}
  }
}

async function stopServer() {
  if (!server.pid || serverExited) return;
  killServer("SIGTERM");
  const termDeadline = Date.now() + STOP_TIMEOUT_MS;
  while (!serverExited && Date.now() < termDeadline) await sleep(100);
  killServer("SIGKILL");
  const killDeadline = Date.now() + STOP_TIMEOUT_MS;
  while (!serverExited && Date.now() < killDeadline) await sleep(50);
}

// Hard watchdog: emit a real exit code and kill the spawned server even if
// fetch/undici leaves a dangling handle and the event loop never drains.
const hardTimer = setTimeout(() => {
  console.error(`smoke hard timeout after ${HARD_TIMEOUT_MS}ms: aborting with exit code 1`);
  killServer("SIGKILL");
  process.exit(1);
}, HARD_TIMEOUT_MS);
hardTimer.unref();

async function request(pathname, init = {}) {
  return fetch(`${BASE}${pathname}`, {
    ...init,
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
  });
}

try {
  let ruHtml = null;
  let serverDiedDuringStartup = false;
  const readyDeadline = Date.now() + READY_TIMEOUT_MS;
  // Connection refused while the port is not bound yet is expected during
  // startup, so every fetch error is retried until the deadline.
  while (Date.now() < readyDeadline) {
    if (serverExited) {
      serverDiedDuringStartup = true;
      break;
    }
    try {
      const res = await request("/ru");
      if (res.ok) {
        ruHtml = await res.text();
        break;
      }
    } catch {}
    await sleep(500);
  }
  check("server process stays alive during startup", !serverDiedDuringStartup, serverDiedDuringStartup ? `next start terminated: ${serverExitInfo}` : "");
  check("server responds on /ru", ruHtml !== null, serverDiedDuringStartup ? "server died during startup" : `not ready within ${READY_TIMEOUT_MS / 1000}s`);
  if (ruHtml === null) {
    // Fail fast with a single root-cause failure instead of cascading
    // misleading errors from checks that cannot possibly pass.
    await stopServer();
    process.exit(1);
  }
  check('"/ru" renders lang="ru"', /<html[^>]*lang="ru"/.test(ruHtml));
  check('"/ru" renders hero heading', /DIAMONDS/.test(ruHtml));

  const enRes = await request("/en");
  const enHtml = await enRes.text();
  check('"/en" responds 200 with lang="en"', enRes.ok && /<html[^>]*lang="en"/.test(enHtml), `status ${enRes.status}`);

  for (const locale of ["ru", "en"]) {
    const res = await request(`/${locale}`);
    const html = await res.text();
    check(`"/${locale}" has crystal svg`, html.includes('class="crystal"'));
    check(`"/${locale}" has contact form`, html.includes('id="contact-form"'));
  }

  const rootRes = await request("/", { redirect: "manual" });
  check("root redirects", [307, 308].includes(rootRes.status), `status ${rootRes.status}`);
  const location = rootRes.headers.get("location") ?? "";
  check("root redirects to /ru", location.includes("/ru"), `location ${location}`);

  const invalid = await request("/api/contact-test", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: "", email: "bad", message: "" }),
  });
  check("invalid contact payload returns 400", invalid.status === 400, `status ${invalid.status}`);

  const valid = await request("/api/contact-test", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: "Тест", email: "test@example.com", message: "Проверка тестовой формы" }),
  });
  const validJson = await valid.json();
  check("valid contact payload returns ok", valid.ok && validJson.ok === true && validJson.test === true);
} catch (error) {
  check("smoke script ran without crash", false, error instanceof Error ? `${error.name}: ${error.message}` : String(error));
} finally {
  clearTimeout(hardTimer);
  await stopServer();
  if (failures.length > 0) {
    console.error(`smoke failed: ${failures.length} check(s) failed:\n- ${failures.join("\n- ")}`);
  }
  // Explicit exit guarantees a real non-zero code on failures; plain drain below
  // only happens when all checks passed and no handles are left.
  process.exit(failures.length > 0 ? 1 : 0);
}
