# DIAMONDS · core — WIP, не проверено

Статус: код написан, проверки НЕ выполнялись (инфраструктурный блокер sandbox).

- Задача: `core` (7e1e3dc6fd52c7691a617636), запуск a65f7639302441e0c3794523, роль frontend.
- База: 7d8caf8a4ad27e216705e37dd543b399db0891e4.
- SHA результата: не зафиксирован — git/exec недоступны в этом sandbox.

## Что не выполнялось

`npm ci`, `npm run lint`, `npm run build`, `npm run dev -- -H 0.0.0.0 -p 3000` и curl-проверки `/ru`, `/en` не прогонялись ни разу.

Причина (инфраструктура, не код):
- `POST http://runner:8090/sandboxes/7e1e3dc6fd52c7691a617636/resize` → HTTP 500;
- при `resource=build|test` — `psycopg.errors.NumericValueOutOfRange` (memory=3221225472 не влезает в integer).

## Что нужно для приёмки (в среде с рабочим shell)

1. `npm install` — сгенерировать `package-lock.json` (без него `npm ci` падает).
2. `npm ci && npm run lint && npm run build`.
3. `npm run dev -- -H 0.0.0.0 -p 3000`, затем curl-проверки `/ru` и `/en`.
4. Сверить токены в `tailwind.config.ts` и `app/globals.css` с DESIGN.md (SHA 2d33e86a…).
5. Удалить `.sandbox-probe`, `.sandbox-probe-2` и этот файл — в финальный результат они не входят.

## Известные отклонения от допущений

- `<html lang>` берётся из заголовка `x-locale` (middleware + `headers()` в корневом layout), поэтому `/ru` и `/en` рендерятся динамически, а не статически. Это единственное расхождение с допущением «статическая генерация»; альтернатива при обязательной статике — корневой layout внутри `app/[locale]/layout.tsx` и редирект из `middleware.ts`.
- Форма «Связаться» с валидацией относится к задаче `content` (в очереди); сейчас в секции контактов только тестовые контакты, пометка «Тестовые данные» и честное уведомление о демо-режиме.
