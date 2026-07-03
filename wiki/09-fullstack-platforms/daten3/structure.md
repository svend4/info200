# Структура daten3

Репозиторий содержит **несколько поколений одного проекта** одновременно. Продуктовое ядро — `travelhub-ultimate/`; остальное — легаси, архивы и отчёты.

## Аннотированное дерево каталогов

```
daten3/
├── .github/workflows/            # CI: 6 workflow — backend-tests.yml, e2e.yml,
│                                 #   load-test.yml, test.yml, static.yml, jekyll-gh-pages.yml
│
├── travelhub-ultimate/           # ★ ГЛАВНЫЙ ПРОЕКТ (финальная версия)
│   ├── frontend/                 # React 18 + TS + Vite + Tailwind
│   │   └── src/
│   │       ├── pages/            # 34+ страницы (Home, HotelSearch, FlightSearch,
│   │       │                     #   Checkout, AdminPanel, Affiliate* x5, Login...)
│   │       ├── components/       # SEO/, admin/, booking/, common/, features/, layout/, ui/
│   │       ├── hooks/ store/ styles/ test/ types/ utils/
│   │       ├── App.tsx, main.tsx
│   ├── backend/                  # Express 4 + TS (ESM) + Prisma + PostgreSQL + Redis
│   │   ├── src/
│   │   │   ├── index.ts          # Точка входа: ~25 маршрутов, ~20 middleware, GraphQL
│   │   │   ├── routes/           # 25 файлов: auth, hotels, flights, cars, bookings,
│   │   │   │                     #   payment, affiliate, payout, loyalty, review,
│   │   │   │                     #   recommendations, tenant, gateway, serviceMesh, metrics...
│   │   │   ├── controllers/      # Бизнес-логика (auth на Prisma — реальная, не mock)
│   │   │   ├── services/         # travelpayouts, redis, cache, cron, websocket, sse,
│   │   │   │                     #   messageQueue (BullMQ), backgroundJobs...
│   │   │   ├── middleware/       # JWT auth, RBAC, CSRF, rateLimit, helmet, cors, i18n,
│   │   │   │                     #   distributedTracing, cdn, csp, multiTenancy, auditLog,
│   │   │   │                     #   featureFlags, apiKey, sanitization, timeout, metrics
│   │   │   ├── graphql/ gateway/ mesh/ jobs/ validators/ config/ lib/ types/ utils/
│   │   │   ├── templates/emails/
│   │   │   ├── __tests__/        # integration/, services/, validators/, setup.ts
│   │   │   └── extracted_code*.js{,on} # ⚠ 12 файлов-артефактов извлечения кода (11 .js + .json, мусор в src/)
│   │   ├── prisma/schema.prisma  # 12 моделей: User, Booking, Favorite, PriceAlert,
│   │   │                         #   Affiliate, Referral, Commission, Payout, AffiliateClick,
│   │   │                         #   AffiliateSettings, RefreshToken, PasswordResetToken
│   │   ├── tests/                # unit/, integration/, e2e/, load/ (k6-стиль), fixtures/
│   │   ├── Dockerfile (+ .backup, .dev, .simple), vitest*.config.ts, playwright.config.ts
│   │   └── ~15 md-доков (SECURITY.md, OBSERVABILITY.md, ALL_ENDPOINTS_RU.md...)
│   ├── docker-compose.yaml       # 4 сервиса: frontend, backend, postgres:15, redis:7
│   ├── nginx.conf, .env.example, .env.production.example
│   └── ~70 md-файлов             # README, TECHNICAL_STATE, FINAL_STATUS, CHANGELOG,
│                                 #   гайды по CORS/Render/PostgreSQL, тест-отчёты...
│
├── travelhub-v1.0/ travelhub-v1.1/       # Предыдущие версии (полные копии проекта)
├── travelagency-1/ travelagency-2/       # Ранние варианты «турагентства»
├── travelagency-organized/               # Организованная выгрузка файлов (Claude-сессия)
├── travelhub-data/ travelhub-extracted-organized/ travelhub-full-extracted/
│                                         # Данные и код, извлечённые из истории чатов
├── setup/  images/                       # Легаси-обвязка PHP-сайта
│
├── index.php, common.php, top.php,       # ★ ЛЕГАСИ: PHP-сайт на фреймах,
│   start.php, redirect.php, styles.css   #   партнёрка travelnow.com (стиль ~2000-х)
├── flower-shop (2).html                  # Посторонний файл (цветочный магазин)
│
├── extract_travelhub_code.py             # Извлечение кода из JSON-экспорта чатов
├── merge_travelhub_versions.py           # Слияние версий travelhub
│
├── *.zip (7 шт.)                         # Архивы: travelhub-complete.zip, travel1blue.zip,
│                                         #   daten-Travelagency (1).zip, выгрузка чатов...
├── СОСТАВ_АРХИВА.txt, README_v1.1.txt, README.html
│
├── render.yaml                           # Blueprint деплоя на Render (2 сервиса + PostgreSQL)
└── ~19 отчётов .md                       # AUDIT_REPORT, PROJECT_AUDIT_2025-12-22,
                                          #   FINAL_COMPREHENSIVE_REPORT, PHASE*_SUMMARY,
                                          #   SSL_SETUP_GUIDE, RENDER_* и др.
```

## Ключевые файлы и модули

| Файл / модуль | Что делает |
|---|---|
| `travelhub-ultimate/backend/src/index.ts` | Точка входа backend: монтирует ~25 групп маршрутов, ~20 middleware, Apollo GraphQL, WebSocket, SSE, cron, очереди; graceful shutdown |
| `travelhub-ultimate/backend/prisma/schema.prisma` | Схема БД: 12 моделей, enum-статусы, индексы, каскадные удаления; 6 моделей — партнёрская программа (включая AffiliateSettings) |
| `backend/src/controllers/auth.controller.ts` | Реальная регистрация/логин на Prisma + bcrypt + JWT (access 15 мин / refresh 7 дней), верификация email |
| `backend/src/services/travelpayouts.service.ts` | Интеграция с Travelpayouts/Hotellook API (реальные внешние данные + партнёрский маркер), кэширование |
| `backend/src/middleware/` | ~20-35 middleware: auth, RBAC-admin, CSRF, 4 уровня rate limiting, helmet+CSP, i18n (7 языков), tracing, multi-tenancy, audit log, feature flags |
| `frontend/src/pages/Affiliate*.tsx` (5 шт.) | Партнёрский кабинет: дашборд, рефералы, выплаты, настройки, портал |
| `frontend/src/pages/AdminPanel.tsx` | Админ-панель (5 вкладок управления партнёрской программой) |
| `travelhub-ultimate/docker-compose.yaml` | Локальный прод-стек: frontend+backend+PostgreSQL+Redis, healthchecks, зависимости |
| `render.yaml` (корень) | Деплой на Render: backend `daten3-1`, frontend `daten3`, БД travelhub-db (free plan), autoDeploy |
| `.github/workflows/test.yml`, `backend-tests.yml` | CI: unit-тесты на Node 18/20, integration-тесты с PostgreSQL-сервисом |
| `backend/tests/` | unit (cache/currency/analytics services), integration (auth), e2e (user-booking-flow), load (api-load/stress/spike) |
| `extract_travelhub_code.py` | Python-скрипт: парсит блоки кода из экспорта чат-истории и раскладывает в файлы — объясняет происхождение `extracted_code_v*.js` |
| `AUDIT_REPORT.md`, `PROJECT_AUDIT_2025-12-22.md`, `FINAL_COMPREHENSIVE_REPORT.md` | Самоаудиты проекта с оценками 8,3–8,4/10 (перепроверку см. в assessment.md) |

## Особенности организации кода

1. **Матрёшка версий**: в одном репозитории хранится минимум 8 копий/поколений проекта (PHP-сайт → travelagency-1/2 → travelhub-v1.0/v1.1 → extracted-варианты → ultimate) плюс те же версии ещё и в ZIP-архивах. Это делает репозиторий тяжёлым и запутанным, но документирует эволюцию.
2. **Документация превышает код по числу файлов**: ~19 отчётов в корне + ~70 md в travelhub-ultimate + ~15 md в backend. Значительная часть — операционные логи сессий («CORS починили», «деплой прошёл»), а не справочная документация.
3. **Артефакты генерации в src/**: `backend/src/extracted_code.js` … `extracted_code_v10.js` — сырые выгрузки кода из чатов лежат прямо в каталоге исходников.
4. **Русско-английское двуязычие**: доки и коммиты вперемешку на двух языках; интерфейс русифицировался в последних PR (#205–207).
5. **Деплой-ориентированность**: 4 варианта Dockerfile, 4 старт-скрипта (start.js, start-safe.mjs, start-render.mjs...), отдельные гайды под Render и Railway — следы долгой борьбы с реальным деплоем.
