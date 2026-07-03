# Структура daten5

Дерево проверено файл за файлом через raw.githubusercontent.com (HTTP-статусы) и страницы GitHub. Указаны реальные размеры ключевых файлов в строках.

```
daten5/
├── README.md                          # 2 строки: «# daten5 / info»
├── rationalization-proposal.md        # 455 строк, RU: манифест «Рационализация вместо инновации»,
│                                      #   4 фазы, roadmap Q1–Q4 2026, экономическая модель
└── rationalization-platform/          # прототип платформы (весь код — из PR #1, 01–03.01.2026)
    ├── README.md                      # обзор, ASCII-архитектура, roadmap; ЧАСТИЧНО НЕ СООТВЕТСТВУЕТ
    │                                  #   реальному дереву (см. «Особенности» ниже)
    ├── GETTING_STARTED.md             # быстрый старт: docker-compose, таблица портов, примеры curl/GraphQL
    ├── .env.example                   # полный шаблон окружения (БД, API-ключи, JWT, порты)
    ├── docker-compose.yml             # 488 строк, ~16 сервисов; ДЕФЕКТ: ключ api-gateway объявлен ДВАЖДЫ
    │                                  #   (стр. ~252 и ~335); монтирует несуществующие
    │                                  #   ./infrastructure/prometheus/… и ./infrastructure/grafana/…
    ├── docs/
    │   └── architecture/
    │       └── README.md              # 631 строка: подробная архитектура, слои, компоненты
    ├── backend/
    │   ├── catalog-api/               # ядро: универсальный каталог (Node.js 18, ESM)
    │   │   ├── package.json           # Express + Apollo Server 4; scripts migrate/seed → ФАЙЛОВ НЕТ
    │   │   ├── Dockerfile
    │   │   ├── schema.sql             # 604 строки: PostgreSQL, pgvector, pg_trgm; applications,
    │   │   │                          #   capabilities, blueprints, crawler_runs и др., индексы ivfflat
    │   │   ├── neo4j-schema.cypher    # 448 строк: узлы Application/Capability/Blueprint/UseCase…,
    │   │   │                          #   связи DEPENDS_ON, SIMILAR_TO и т.д.
    │   │   └── src/
    │   │       ├── index.js           # ~180+ строк: Express + Apollo, helmet, CORS, morgan, rate limit
    │   │       ├── db/init.js         # 227 строк: подключения PG/Neo4j/Redis/Elasticsearch + хелперы
    │   │       ├── graphql/
    │   │       │   ├── schema.js      # 585 строк typeDefs
    │   │       │   ├── resolvers.js   # 537 строк
    │   │       │   └── context.js     # 12 строк
    │   │       ├── routes/
    │   │       │   ├── applications.js  # 464 строки: CRUD + валидация
    │   │       │   ├── blueprints.js    # 229 строк
    │   │       │   ├── search.js        # 181 строка: поиск через ILIKE по PostgreSQL (НЕ Elasticsearch)
    │   │       │   ├── capabilities.js  # 121 строка
    │   │       │   └── health.js        # 81 строка
    │   │       ├── middleware/        # errorHandler.js, rateLimiter.js (76 строк)
    │   │       └── utils/logger.js    # 53 строки (winston)
    │   ├── github-crawler/            # Python-краулер GitHub
    │   │   ├── main.py                # 433 строки: PyGithub, языки/топики/README/зависимости
    │   │   │                          #   (package.json, requirements.txt, go.mod), upsert в PG,
    │   │   │                          #   запись графа в Neo4j, кэш Redis, учёт rate limit
    │   │   ├── requirements.txt       # версии закреплены; pytest в списке, но тестов нет
    │   │   └── Dockerfile
    │   ├── ai-classifier/             # Python FastAPI, 526 строк
    │   │   ├── main.py                # эмбеддинги: OpenAI ada-002 ЛИБО локальный
    │   │   │                          #   sentence-transformers (all-MiniLM-L6-v2);
    │   │   │                          #   классификация: GPT-3.5-turbo либо rule-based fallback
    │   │   ├── requirements.txt
    │   │   └── Dockerfile
    │   ├── api-gateway/               # Node.js, единая точка входа
    │   │   ├── package.json           # http-proxy-middleware, prom-client, JWT и др.
    │   │   └── src/
    │   │       ├── index.js           # 295 строк: маршрутизация на 3 сервиса, таймауты, ретраи
    │   │       ├── middleware/        # auth, cache, rateLimiter, metrics,
    │   │       │                      #   circuitBreaker.js (190 строк — собственная реализация)
    │   │       └── routes/            # aggregate.js (280 строк), transform.js, health.js
    │   ├── blueprint-engine/          # Node.js, исполнение workflow
    │   │   ├── package.json           # bull, pg-promise, ioredis…
    │   │   └── src/
    │   │       ├── index.js           # 157 строк
    │   │       ├── services/WorkflowExecutor.js  # 440 строк: шаги api_call/configure/validate/
    │   │       │                                 #   wait/conditional, прогресс, отмена
    │   │       ├── queue/executionQueue.js       # 10 строк — заглушка на Bull
    │   │       ├── routes/execution.js           # 20 строк; blueprints.js, health.js
    │   │       ├── middleware/errorHandler.js
    │   │       └── db/init.js                    # 18 строк
    │   ├── nl-interface/              # Python FastAPI, 302 строки: чат (OpenAI),
    │   │   │                          #   история в Redis, вызовы catalog-api
    │   │   ├── main.py / requirements.txt / Dockerfile
    │   ├── solution-composer/         # Python FastAPI, 173 строки: требования → capabilities →
    │       │                          #   подбор компонентов → workflow → генерация кода
    │       ├── main.py / requirements.txt / Dockerfile
    └── frontend/
        └── web-app/                   # Next.js 14 (App Router), TypeScript, Tailwind
            ├── package.json           # react-query, zustand, axios, lucide
            ├── Dockerfile, Dockerfile.dev, tailwind.config.ts, tsconfig.json
            ├── lib/api.ts             # 11 строк: два axios-клиента (gateway :8000, NL :8002)
            └── app/
                ├── layout.tsx, globals.css
                ├── page.tsx           # 33 строки: главная с 3 ссылками (в т.ч. на /blueprints —
                │                      #   такой страницы НЕТ)
                ├── applications/page.tsx  # 7 строк — ЗАГЛУШКА (только <h1>)
                └── chat/page.tsx          # 7 строк — ЗАГЛУШКА (только <h1>)
```

## Ключевые файлы и модули

| Файл/модуль | Что делает | Состояние |
|---|---|---|
| `rationalization-proposal.md` | Манифест: проблема плато данных, 4 проблемные области (WordPress, Zapier, GitHub, App Store), 4 фазы реализации, roadmap 2026, экономика | Завершённый документ |
| `backend/catalog-api` | REST + GraphQL API каталога приложений/capabilities/blueprints; подключается к 4 хранилищам | Наиболее проработан; migrate/seed-скрипты отсутствуют |
| `backend/catalog-api/schema.sql` | Схема PostgreSQL: pgvector-эмбеддинги (1536), триграммные и ivfflat-индексы, CHECK-ограничения | Полная, автоматически применяется init-скриптом контейнера PG |
| `backend/github-crawler/main.py` | Обход популярных репозиториев (JS/Python/TS/Go по 50), извлечение метаданных и зависимостей, запись в PG+Neo4j+Redis | Реалистичная рабочая логика; не запускался против живой БД (не проверено) |
| `backend/ai-classifier/main.py` | Эмбеддинги и классификация приложений; graceful fallback на локальную модель и правила без OpenAI-ключа | Логика полная |
| `backend/api-gateway` | Прокси с JWT-auth, Redis-кэшем, circuit breaker, Prometheus-метриками, агрегирующими маршрутами | Полный по структуре |
| `backend/blueprint-engine` | Исполнение blueprint-workflow по шагам с прогрессом и отменой | Ядро (WorkflowExecutor) есть, обвязка — заглушки |
| `backend/nl-interface`, `solution-composer` | Чат-ассистент и автокомпозиция решений | Компактные сервисы, зависят от OpenAI-ключа |
| `frontend/web-app` | UI: главная + 2 страницы-заглушки | Каркас, функциональности нет |
| `docker-compose.yml` | Вся инфраструктура одним файлом | Дублирование ключа `api-gateway`; ссылки на несуществующие каталоги |

## Особенности организации кода

- **Монорепозиторий по сервисам**: каждый backend-сервис самодостаточен (свой package.json/requirements.txt + Dockerfile), общих shared-библиотек нет.
- **Двуязычный стек**: Node.js (ESM, современный Express + Apollo 4) для API-слоя, Python (FastAPI) для ИИ-сервисов — соответствует манифесту.
- **README описывает желаемое, а не реальное**: в заявленном дереве значатся `frontend/cli`, `infrastructure/{docker,kubernetes,terraform}`, `docs/api`, `docs/guides`, `scripts/`, `backend/compatibility-engine`, файлы `LICENSE` и `CONTRIBUTING.md` — **ни одного из них в репозитории нет** (проверено по HTTP 404 на raw и 404 на страницах tree).
- Код внутри существующих файлов — аккуратный, с комментариями-секциями, обработкой ошибок и graceful shutdown; но глубина проработки резко падает от catalog-api (ядро) к периферии (frontend, очереди).

[← README](README.md) · [Оценка](assessment.md) · [Рекомендации](recommendations.md) · [Вопросы](questions.md)
