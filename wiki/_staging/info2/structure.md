# Структура info2

Все размеры (в строках) получены прямым скачиванием файлов с raw.githubusercontent.com 2026-07-02.

## Аннотированное дерево

```
info2/
├── README.md                     # 381 стр. Главный питч: концепция, архитектура, CLI, бизнес-модель, roadmap
├── README-COMPLETE.md            # 637 стр. Расширенная «полная» версия README
├── PROJECT-SUMMARY.md            # ~330 стр. Самоотчёт о созданном (частично УСТАРЕЛ — см. assessment)
├── QUICK-START.md                # 396 стр. Инструкция запуска: Docker Compose / вручную
├── ADVANCED-FEATURES.md          # 579 стр. Описание продвинутых фич (ES, Redis, WebSocket, метрики)
├── 01-DEFINITIONS.md             # 104 стр. Определения: программа, приложение, Web 1.0–4.0
├── 02-COMMON-FUNCTIONS.md        # 428 стр. Анализ: 80-90% кода приложений — общие функции
├── 03-ARCHITECTURE.md            # 618 стр. 4-уровневая архитектура, 10 функциональных кластеров
├── 04-THUB-CONCEPT.md            # 1044 стр. Ядро концепции: CAS, дедупликация, граф зависимостей
├── 05-DATA-STRUCTURE.md          # 827 стр. Схема PostgreSQL, JSON Schema, REST/GraphQL, ES, Redis
├── 06-ROADMAP.md                 # 642 стр. Фазы 0–4, бюджет, риски, KPI (датировки 2024-2026 — фиктивные)
├── CONTRIBUTING.md               # 395 стр. Гайд контрибьютора
├── CODE_OF_CONDUCT.md            # 88 стр.  Кодекс поведения
│
├── Dockerfile                    # 44 стр.  Образ API-сервера
├── docker-compose.yml            # 197 стр. 8 сервисов: api, postgres, redis, elasticsearch,
│                                 #          minio, nginx, prometheus, grafana + volumes
├── docker-compose-full.yml       # 249 стр. Расширенный стек
│
├── .github/workflows/
│   └── ci.yml                    # 269 стр. lint → unit-тесты → integration (pg+redis services)
│                                 #          → npm audit/Snyk → docker build/push (ghcr.io)
│                                 #          → deploy staging/production (ЗАГЛУШКИ echo)
│                                 #          ⚠ требует prototype/package-lock.json — его НЕТ в репо
├── k8s/base/
│   ├── deployment.yaml           # Kubernetes deployment
│   └── ingress.yaml              # Kubernetes ingress
├── prometheus/
│   └── prometheus.yml            # Конфиг Prometheus
│
├── frontend/                     # Скелет веб-интерфейса (Next.js 14 + React 18 + MUI)
│   ├── package.json              # 43 стр.  next, react, mui, swr, react-query, zustand, recharts
│   └── src/
│       ├── pages/index.jsx       # 147 стр. Единственная страница: поиск + trending
│       ├── components/           # ComponentCard.jsx, StatsPanel.jsx, TrendingList.jsx
│       └── hooks/useComponents.js# Хук загрузки компонентов из API
│
└── prototype/                    # ОСНОВНОЙ КОД: Node.js-прототип T-Hub (@thub/core 0.1.0)
    ├── package.json              # bin: thub; scripts: start/dev/db:migrate/db:seed/test/lint
    │                             # ⚠ main: "index.js" — файла prototype/index.js НЕ существует
    ├── .env.example              # Все переменные окружения (DB, Redis, JWT, ES, S3/MinIO)
    ├── DATABASE-SETUP.md         # Инструкция установки PostgreSQL + миграции + сиды
    │
    ├── api/
    │   ├── server.js             # 683 стр. Express: helmet/cors/compression, winston,
    │   │                         #          auth-маршруты, CRUD компонентов, /health, Swagger UI
    │   ├── auth.js               # 306 стр. bcrypt, JWT, authenticate/authorize, rate-limit
    │   ├── advanced-routes.js    # 408 стр. ES-поиск, Redis-кэш, метрики (с graceful fallback)
    │   └── swagger.json          # 505 стр. OpenAPI-спецификация
    │
    ├── cli/index.js              # 376 стр. CLI thub: init, publish, search, install,
    │                             #          info, build, deduplicate, stats (commander+inquirer)
    ├── core/
    │   ├── deduplication.js      # 249 стр. SHA-256, нормализация кода, Jaccard-схожесть,
    │   │                         #          registerComponent(), auditDuplicates()
    │   └── dependency-resolver.js# 336 стр. semver, разрешение конфликтов версий,
    │                             #          обнаружение циклов, топологическая сортировка
    ├── db/
    │   ├── index.js              # 524 стр. Пул pg, транзакции, Component/UserRepository, migrate/seed
    │   ├── migrations/001_initial_schema.sql # 369 стр. users, components (content_hash UNIQUE),
    │   │                         #          dependencies, tags, downloads; триггеры, view, gin/pg_trgm
    │   └── seeds/001_sample_data.sql # 179 стр. 3 пользователя, 5 компонентов, метаданные
    ├── cache/redis.js            # 505 стр. Redis-кэш (стратегии TTL, инвалидация)
    ├── search/elasticsearch.js   # 523 стр. Индексация и поиск компонентов
    ├── realtime/
    │   ├── websocket.js          # 441 стр. WebSocket-сервер (события реестра)
    │   └── client.js             # 241 стр. Клиент для real-time обновлений
    ├── monitoring/metrics.js     # 349 стр. prom-client: счётчики, гистограммы, /metrics
    │
    ├── __tests__/
    │   ├── deduplication.test.js # 296 стр. Unit: hash, normalize, exact/normalized/semantic match
    │   └── api.integration.test.js # 245 стр. Integration-тесты API (supertest)
    │
    └── examples/
        ├── sample-app.thub.yaml  # 339 стр. Пример манифеста приложения из компонентов
        └── components/           # 4 эталонных компонента (в PROJECT-SUMMARY заявлено 4, сиды пишут 5)
            ├── auth/jwt-generator.js   # 189 стр.
            ├── api/rate-limiter.js     # 301 стр.
            ├── data/query-builder.js   # 406 стр.
            └── utils/validator.js      # 222 стр.
```

## Ключевые файлы и модули

| Файл/модуль | Что делает |
|---|---|
| `prototype/core/deduplication.js` | Ядро идеи: 3-уровневая дедупликация. Уровень 1 — SHA-256 точного содержимого; уровень 2 — SHA-256 нормализованного кода (regex-удаление комментариев/пробелов); уровень 3 — «семантическая» схожесть = Jaccard по множеству токенов (порог 0.85). Метод `registerComponent()` — публикация с проверкой, `auditDuplicates()` — аудит реестра |
| `prototype/core/dependency-resolver.js` | Разрешение зависимостей: подбор совместимой версии по множеству semver-ограничений, рекурсивное построение графа, обнаружение циклов (с понятной ошибкой-цепочкой), топологическая сортировка порядка сборки |
| `prototype/api/server.js` | REST API: регистрация/логин (bcrypt+JWT), CRUD `/api/v1/components`, `/search`, `/stats`, `/trending`, `/resolve`, health-check с проверкой БД, Swagger UI на `/api-docs`, winston-логирование в консоль и файлы |
| `prototype/api/advanced-routes.js` | «Продвинутые» маршруты: инициализирует Elasticsearch и Redis с try/catch — при недоступности сервисов деградирует до fallback-поиска (грамотный паттерн) |
| `prototype/db/index.js` | Класс Database: пул pg с таймаутами, логирование длительности запросов, транзакции, `migrate()`/`seed()`, репозитории ComponentRepository/UserRepository |
| `prototype/db/migrations/001_initial_schema.sql` | Продуманная схема: UUID PK, `content_hash UNIQUE` (ключ дедупликации), `UNIQUE(name, version)`, роли пользователей, типы зависимостей (runtime/dev/peer/optional), trigram-индексы для fuzzy-поиска |
| `prototype/cli/index.js` | CLI `thub` — 8 команд с интерактивными промптами; `init` создаёт манифест `thub.json` |
| `prototype/__tests__/` | Unit-тесты дедупликации на mock-реестре (паттерн AAA) + интеграционные тесты API |
| `.github/workflows/ci.yml` | 7-стадийный пайплайн; деплой-шаги — заглушки `echo`; закоммичен без lock-файла, от которого сам зависит |
| `docker-compose.yml` | Полный локальный стек из 8 сервисов с health-checks и volumes |
| `04-THUB-CONCEPT.md` | Самый большой документ (1044 строки): философия, CAS, версионирование, миграции, сборка приложений |

## Особенности организации кода

- **Двухэтажная структура**: корень = концепция/документация/DevOps, `prototype/` = весь исполняемый код. Фронтенд вынесен отдельно в `frontend/` (не внутри prototype).
- **Модули по инфраструктурным ролям** (`api/`, `core/`, `db/`, `cache/`, `search/`, `realtime/`, `monitoring/`) — чистое разделение, каждый модуль самодостаточен.
- **Двуязычие**: документация и комментарии в коде — по-русски, идентификаторы и API — по-английски.
- **Признаки AI-генерации за один проход**: 6 содержательных коммитов одним днём от автора «claude», равномерно «красивый» код с подробными JSDoc, но без lock-файлов, без файла LICENSE и с битой ссылкой `main: index.js` в package.json — то, что вскрылось бы при первом реальном запуске.
- **Нет `node_modules`, lock-файлов и артефактов запуска** — код никогда не собирался внутри этого репозитория (по крайней мере, следов нет).
