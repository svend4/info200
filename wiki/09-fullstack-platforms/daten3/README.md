# daten3 — туристический хаб TravelHub с партнёрскими программами

## Обзор

**daten3** — самый крупный и «продуктовый» репозиторий профиля svend4: полноценная платформа бронирования путешествий **TravelHub Ultimate** (отели, авиабилеты, автомобили) с развитой партнёрской (affiliate) программой. Описание репозитория: «travelhub ultimate / турист хаб / партнёрские программы». Основной язык — TypeScript (66,4%), плюс HTML (18,5%), JavaScript (10,7%), Shell, CSS и Python.

Репозиторий одновременно является «музеем эволюции» проекта: в нём лежат старый PHP-сайт турагентства (фреймы, партнёрка travelnow.com — стиль начала 2000-х), несколько промежуточных версий (travelhub-v1.0, v1.1, travelagency-1/2), ZIP-архивы исходников, Python-скрипты извлечения кода из истории чатов — и финальная версия **travelhub-ultimate** (React + Express + Prisma + PostgreSQL).

## Назначение и идея

Идея — агрегатор путешествий с монетизацией через партнёрские программы:

- **Для пользователя**: поиск и бронирование отелей, рейсов и автомобилей, избранное, ценовые алерты (price alerts), отзывы, программа лояльности, групповые бронирования.
- **Для партнёра (affiliate)**: реферальные ссылки, отслеживание кликов (AffiliateClick), комиссии (Commission), выплаты (Payout), партнёрский кабинет (AffiliateDashboard/Portal/Referrals/Payouts/Settings) и админ-панель управления программой.
- **Данные о турах** — через реальный внешний API **Travelpayouts** (autocomplete.travelpayouts.com, engine.hotellook.com, api.travelpayouts.com) с партнёрским маркером, т.е. монетизация встроена в сам источник данных.

Проект развивался итеративно через PR-ы Claude (в истории видны ветки `claude/...`, более 207 merged PR), с «фазами» 1–12: от базового CRUD до enterprise-инфраструктуры (очереди BullMQ, GraphQL, distributed tracing, multi-tenancy, service mesh).

## Как устроено (архитектура)

Ядро — монорепо `travelhub-ultimate/` из двух приложений:

- **Frontend** (`travelhub-ultimate/frontend`): React 18 + TypeScript + Vite + Tailwind CSS; состояние — Zustand + React Query; 34+ страницы (Home, HotelSearch, FlightSearch, Checkout, AdminPanel, 5 страниц Affiliate-кабинета и др.); тесты Vitest + Testing Library + Playwright.
- **Backend** (`travelhub-ultimate/backend`): Express 4 + TypeScript (ESM) + Prisma ORM 5 + PostgreSQL + Redis; 25 файлов маршрутов (auth, hotels, flights, cars, bookings, payment, affiliate, loyalty, tenant, gateway, serviceMesh, metrics...); десятки middleware (JWT-auth, RBAC, CSRF, rate limiting, helmet, i18n на 7 языков, distributed tracing, CDN, CSP, deduplication); Apollo GraphQL, Socket.io, SSE, BullMQ-очереди, cron-задачи, Prometheus-метрики, Swagger.
- **БД**: продуманная Prisma-схема с 12 моделями (User с RBAC/OAuth/верификацией email, Booking, Favorite, PriceAlert и 6 моделей партнёрской программы: Affiliate, Referral, Commission, Payout, AffiliateClick, AffiliateSettings).
- **Инфраструктура**: docker-compose (frontend + backend + PostgreSQL 15 + Redis 7 с healthchecks), blueprint `render.yaml` для Render (два web-сервиса + БД), следы деплоя на Railway; 6 GitHub Actions workflow (unit/integration/e2e/load-тесты).
- **Обвязка в корне**: легаси-PHP (index.php с frameset), архивы .zip, скрипты `extract_travelhub_code.py` / `merge_travelhub_versions.py` и ~19 отчётов-самоаудитов (AUDIT_REPORT.md, PROJECT_AUDIT_2025-12-22.md, FINAL_COMPREHENSIVE_REPORT.md и др.).

Подробнее: [structure.md](structure.md).

## Статус и активность

- **606 коммитов** в main, более **207 merged PR**; авторы — svend4 + Claude (итеративная разработка через Claude Code).
- Интенсивная активность в декабре 2025 (видимая история 25–31 декабря — деплой, CORS-фиксы, тёмная тема, русификация); **последний коммит 31.12.2025**.
- С января 2026 (на момент аудита 03.07.2026) новых коммитов нет — проект достиг заявленного состояния «Production Ready» (12 фаз завершены) и приостановлен.
- Issues: 0 открытых; 1 звезда, 0 форков.
- Внутренние отчёты заявляют работающий деплой (Railway/Render URL-ы) — работоспособность прод-инстансов на сегодня **не проверена** (см. [assessment.md](assessment.md)).

## Ключевые факты

| Параметр | Значение |
|---|---|
| Язык | TypeScript 66,4% (+ HTML, JS, Shell, CSS, Python) |
| Примерный размер | Сотни файлов; ядро travelhub-ultimate — ~180+ файлов кода, ~30–35 тыс. строк (по внутренним отчётам); плюс 7 ZIP-архивов и 8 каталогов старых версий |
| Коммиты | ~606 (207+ merged PR) |
| Последняя активность | 31.12.2025 |
| Статус | Завершённый (достиг milestone, полгода без коммитов) |
| Зрелость | 3/5 |
| Лицензия | Отсутствует |
| CI | 6 GitHub Actions workflow (тесты unit/integration/e2e/load) |

## Ссылки

- [Структура](structure.md)
- [Характеристика и оценка](assessment.md)
- [Рекомендации](recommendations.md)
- [Вопросы](questions.md)
- Репозиторий: https://github.com/svend4/daten3
