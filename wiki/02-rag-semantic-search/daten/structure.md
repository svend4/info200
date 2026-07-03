# Структура daten

## Аннотированное дерево каталогов

```
daten/
├── README.md                     # УСТАРЕЛ: описывает удалённые JSON-экспорты и папку турагентства
├── Dockerfile                    # Режим bootstrap: сборка frontend (node:18) + python:3.11 + ios_bootstrap
├── Dockerfile.fullstack          # Полный режим: frontend + main_production.py со всеми сервисами
├── Procfile                      # web: uvicorn ios_bootstrap.main:app (для Heroku-совместимых платформ)
├── railway.json                  # Railway: сборка по Dockerfile.fullstack, старт start_fullstack.py
├── railway.toml                  # Railway TOML-вариант (healthcheck /health, рестарты ON_FAILURE)
├── railway.bootstrap.json        # Конфиг Railway для минимального bootstrap-режима
├── railway.fullstack.json        # Конфиг Railway для полного режима
├── start_fullstack.py            # Запуск полной архитектуры: env-дефолты + import main_production + uvicorn
├── TESTING_FULLSTACK.md          # Инструкция по переключению bootstrap ↔ fullstack
├── .gitignore
├── .github/workflows/
│   ├── ci.yml                    # CI: pytest + lint + docker build. СЛОМАН: пути «информационная-ОС» (каталог переименован)
│   ├── jekyll-gh-pages.yml       # Публикация GitHub Pages (Jekyll)
│   └── static.yml                # Публикация статики на GitHub Pages
├── notes/
│   └── claude-test.md            # Тестовая заметка из чата Claude через Make.com (последний коммит, 12.01.2026)
└── ios-system/                   # Бывш. «информационная-ОС» — весь проект IOS
    ├── README.md                 # Описание проекта: 182 сообщения → 1118 файлов, схема именования msgNNN_NNN
    ├── STATUS.md                 # Самоотчёт: Level 0 = 100%, Level 1–5 = 0% (на 13.12.2025)
    ├── AUDIT_ANALYSIS.md         # Анализ 7 внутренних аудитов: разрыв документация/код 65–75%
    ├── IMPLEMENTATION_PLAN.md    # План MVP на 4–8 недель (Phase 1: Foundation → …)
    ├── QUICKSTART.md             # Быстрый старт. УСТАРЕЛ: команды с cd информационная-ОС
    ├── BOOTSTRAP_GUIDE.md        # Детальное руководство по инкрементальной интеграции
    ├── DEPLOYMENT.md             # Руководство по развертыванию
    ├── RAILWAY_GUIDE.md          # Деплой на Railway
    ├── RAILWAY_VARIABLES.md      # Переменные окружения Railway
    ├── requirements.txt          # FastAPI, SQLAlchemy, asyncpg, Redis, Whoosh, Elasticsearch, JWT, pytest, locust…
    ├── .env.example              # Шаблон переменных окружения
    ├── ios_bootstrap/            # ЗАПУСКАЕМОЕ минимальное приложение (Level 0)
    │   ├── __init__.py
    │   ├── main.py               # FastAPI: /, /health, /api/status, docs, раздача React SPA; TODO: БД, Redis, Whoosh
    │   ├── config.py             # pydantic-settings: БД, Redis, JWT, CORS, фичефлаги (ES/ML/GPT/monitoring)
    │   └── test_basic.py         # 7 интеграционных тестов (endpoints + конфигурация)
    └── IOS-System/               # Архив из конверсации + «production»-каркас
        ├── main_production.py    # IOSApplication: EventBus, ServiceRegistry, БД, Redis, 5 сервисов, роутеры
        ├── INDEX.md              # Автогенерированный индекс 1118 извлечённых файлов по категориям
        ├── README.md             # Описание концепции IOS
        ├── benchmark.py, deploy.sh, run_tests.sh, run_load_tests.sh, pytest.ini
        ├── Dockerfile.production, docker-compose.production.yml, requirements-test.txt
        ├── core/                 # 55 файлов: ios_root.py, event_bus.py, service_registry.py, config.py + ~49 msg-файлов (py/kt/ts/js/sh/yaml)
        ├── services/             # Заявлено 375 файлов: 5 реальных сервисов-обёрток + msg-архив (вкл. недельные отчёты msg063…msg173)
        ├── api/                  # Заявлено 163 файла: routes.py (7 роутеров на демо-данных) + msg-архив
        ├── utils/                # Заявлено 214 файлов msg-архива
        ├── config/               # Заявлено 48 файлов (yaml/txt/sh)
        ├── docs/                 # ~20 md-файлов документации из конверсации
        ├── tests/                # 61 файл: test_backend_comprehensive.py, test_integration.py, test_performance.py, locustfile.py + msg-архив
        ├── scripts/              # Заявлено 187 файлов (скрипты развертывания из конверсации)
        ├── frontend/             # React 18 + Vite + TypeScript + Tailwind
        │   ├── package.json      # react-router, axios, react-query, zustand, react-hook-form, zod, recharts, vitest
        │   ├── Dockerfile, nginx.conf, vite.config.ts, tailwind.config.js, tsconfig*.json
        │   └── src/
        │       ├── App.tsx, main.tsx, index.css
        │       ├── components/, services/, store/
        │       └── pages/        # 7 базовых страниц + 9 разделов:
        │           ├── DashboardPage, LoginPage, SearchPage, SemanticSearchPage,
        │           ├── DocumentsPage, DocumentNewPage, SettingsPage
        │           └── admin/ ai/ analytics/ api/ collaboration/ documents/ graph/ search/ security/
        ├── database/             # connection.py — DatabaseManager (SQLAlchemy async)
        ├── cache/                # redis_client.py — RedisCache
        ├── middleware/           # error_handler, request_logger, rate_limiter, security_headers
        ├── monitoring/           # metrics.py, health_check.py (11 КБ — самый содержательный модуль слоя)
        ├── domains/, ui/, security/, nginx/, prometheus/  # Вспомогательные/архивные каталоги
```

Числа «заявлено N файлов» взяты из `INDEX.md`/`README.md` репозитория; выборочно подтверждены (например, существование `services/msg173_343.md`, `tests/` = 61 файл), но полный пересчёт без клона недоступен — помечено как частично проверенное.

## Ключевые файлы и модули

| Файл | Роль |
|---|---|
| `ios-system/ios_bootstrap/main.py` | Реально работающая точка входа (Level 0): FastAPI c /health, /api/status, Swagger, раздача собранного React SPA; подключение БД/Redis — TODO в коде |
| `ios-system/ios_bootstrap/config.py` | Конфигурация на pydantic-settings: DATABASE_URL, REDIS_URL, SECRET_KEY, CORS, фичефлаги ENABLE_ELASTICSEARCH/ML/GPT/MONITORING |
| `ios-system/ios_bootstrap/test_basic.py` | 7 интеграционных тестов bootstrap-приложения (корень, health, status, docs, openapi, настройки) — единственные тесты, которые с высокой вероятностью проходят |
| `ios-system/IOS-System/main_production.py` | «Полная» архитектура: класс IOSApplication, инициализация EventBus → БД → Redis → IOSRoot → 5 сервисов → мониторинг → подписки на события; lifespan FastAPI |
| `ios-system/IOS-System/api/routes.py` | 7 роутеров (auth, documents, search, graph, admin, ai, dashboard) на **in-memory демо-данных**: DEMO_USERS с открытыми паролями admin123/demo123, ACTIVE_SESSIONS в словаре, 3 демо-документа |
| `ios-system/IOS-System/services/search_service.py` | Заглушка: `search()` и `semantic_search()` возвращают пустой список; только логирование и публикация событий |
| `ios-system/IOS-System/core/ios_root.py` | Минимальный «корень ОС»: создаёт дерево каталогов /data/ios-root (documents, uploads, exports, cache, indices, temp) |
| `ios-system/IOS-System/monitoring/health_check.py` | Наиболее проработанный инфраструктурный модуль (11 КБ): проверки БД, Redis, сервисов |
| `start_fullstack.py` | Обёртка запуска полного режима: подставляет env-дефолты, импортирует `main_production.app`, запускает uvicorn на $PORT (Railway) |
| `Dockerfile` / `Dockerfile.fullstack` | Двухстадийные сборки: node:18-alpine (Vite build фронтенда) → python:3.11-slim; healthcheck по /health |
| `.github/workflows/ci.yml` | 4 джоба (test/lint/build/status) — **все нерабочие** из-за устаревших путей `информационная-ОС` |
| `ios-system/AUDIT_ANALYSIS.md` | Самоаудит: перечисляет 7 аудитов из конверсации, честно фиксирует, что ~65% функционала существует только в документации |
| `ios-system/STATUS.md` | Дорожная карта уровней 0–5 с чек-листами; Level 0 = 100%, остальные 0% |
| `ios-system/IOS-System/INDEX.md` | Автогенерированный каталог всех 1118 извлечённых файлов со статистикой по расширениям |

## Особенности организации кода

1. **Двухслойность**: «архив» (файлы `msgNNN_NNN.*` — след происхождения из сообщений конверсации) и «каркас» (файлы с осмысленными именами). Каркас архив почти не импортирует — вопреки декларации bootstrap-подхода («не переписываем, а интегрируем»), интеграция фактически не началась.
2. **Схема именования msg-файлов** — уникальная особенность: `msg047_043.py` = 43-й файл, извлечённый из сообщения №47. Позволяет проследить происхождение каждого фрагмента, но делает каталоги нечитаемыми без INDEX.md.
3. **Смесь языков в архиве**: Python, TypeScript, Kotlin (1,6% репозитория — фрагменты из обсуждений мобильного клиента), Shell, YAML — всё как в исходной конверсации.
4. **Два режима деплоя** (bootstrap / fullstack) с отдельными Dockerfile и railway-конфигами — аккуратное решение, но добавляет 6 конфигурационных файлов в корень.
5. **Документация как код**: в `services/` лежат «недельные отчёты» (Week 19–28) о якобы выполненной работе — это артефакты ролевой генерации из конверсации, а не история проекта; собственный AUDIT_ANALYSIS.md это прямо разоблачает.
