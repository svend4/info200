# Структура lorenzo

Дерево составлено по README.md, CLAUDE.md и проверено выборочно по реальным страницам дерева GitHub и raw-файлам (списки папок GitHub обрезает на ~1000 элементов, поэтому точные счётчики файлов ниже — из самоотчётов репозитория, порядок величин подтверждён).

## Аннотированное дерево каталогов

```
lorenzo/
├── README.md                       # главный обзор монорепо (метрики, точки входа) — подтверждён
├── CLAUDE.md                       # контекст для Claude Code: карта скриптов и доков (частично устарел)
├── CHANGELOG.md                    # авто-changelog (improve_changelog_auto.py)
├── requirements.txt                # опциональные зависимости по «стадиям» (bs4, anthropic, mcp, fastapi…)
├── requirements-test.txt           # pytest, fastapi, httpx и пр. для CI
├── deep-research-report (1-4).md   # ОРИГИНАЛЫ исходных исследований — хранятся как есть
├── *.mhtml                         # ОРИГИНАЛЫ MHTML-выгрузок (вакансии Anthropic, Хабр-проекты и др.)
│
├── docs/                           # база знаний: ~2,5–2,8 тыс. md-файлов, ~2,9 млн слов
│   ├── 01-svyazi/                  # архитектура Svyazi 2.0, MVP (16 файлов)
│   ├── 02-anthropic-vacancies/     # 436 вакансий Anthropic, 12 кластеров (357 файлов)
│   ├── 03-technology-combinations/ # 40+ синергий технологий
│   ├── 04-ai-collaborations/       # 5 ансамблей OSS-проектов
│   ├── 05-habr-projects/           # 22 Habr-проекта (memory/, knowledge/)
│   ├── svyazi-2-0/                 # альтернативное представление Svyazi (59 файлов)
│   ├── nautilus/                   # NPP v1.1 RFC + 8 companion papers (255 файлов)
│   ├── lorenzo-agent/              # системный промпт Lorenzo Catalyst Agent (62 файла)
│   ├── anthropic-vacancies/        # детальные кластеры + profile-mapping (111 файлов)
│   ├── habr-unique-projects/       # детальные Habr-проекты (56 файлов)
│   ├── contacts/                   # 32 контакт-файла авторов (подготовлены, не отправлены)
│   ├── obsidian/                   # экспорт в Obsidian-формат (524 файла)
│   ├── glossary/, templates/       # словарь компонентов, 23 шаблона документов
│   ├── ROADMAP/                    # 6 доков, 35 идей развития: simple → medium → innovative → novel
│   ├── rfcs/                       # RFC-система (Draft→Proposed→Accepted, 3 Accepted)
│   ├── HEALTH.md, METRICS.md, SCORING.md, PROGRESS.md  # авто-метрики (99/100, 97.9/100, 96% GO, 64% MVP)
│   ├── search_index.json, semantic_index.json, CARD_GRAPH.json  # поисковые индексы и граф карточек
│   └── ~100 авто-отчётов           # TOPIC_MODEL, CITATION_INDEX, READING_TIME, feed.rss и т.д.
│
├── docs-toolkit/                   # ⭐ Python-пакет docs-toolkit v0.3.0 (PEP 621, MIT в pyproject)
│   ├── docstoolkit/                # ~490–500 подпакетов-модулей (листинг GitHub обрезан на 1000)
│   │   ├── rag/                    # ядро: pipeline.py (533 строки, ask() + RAGPipeline), presets, adaptive,
│   │   │                           #   hierarchical, mapreduce, counterfactual, clarifier, bandit_ask…
│   │   ├── agent/, workflow/       # ReAct-loop + planner; DAG-runner sync/async
│   │   ├── embeddings/, ingest/    # TF-IDF (stdlib) + sentence-transformers (опц.); md/pdf/mhtml/jupyter/web
│   │   ├── eval/, experiments/     # golden datasets P/R/F1, A/B-тесты, Wilson confidence
│   │   ├── auth/, budget/, prompts/# RBAC, бюджеты LLM, версионированные промпты
│   │   ├── telemetry/, serve.py    # OTel, Prometheus, FastAPI + SSE
│   │   ├── federation/, webhooks/  # NPP-федерация, HTTP-delivery с HMAC + DLQ
│   │   ├── knowledge_graph/        # TripleStore (SQLite WAL) + мини Query DSL
│   │   ├── self_rag/, debate/, got/, negotiation/, diffusion/, bandit/…  # advanced reasoning
│   │   ├── federated_eval/, private_search/  # Gaussian DP, secure aggregation
│   │   └── сотни микро-модулей     # доменные doc_* (doc_audit, doc_bookmark…), часто с _v2/_v3-вариантами
│   ├── tests/                      # 500+ файлов test_*.py (заявлено 538–546; десятки тысяч кейсов)
│   ├── bench/                      # бенчмарки с history.jsonl
│   ├── deploy/                     # Helm chart; рядом Dockerfile, Dockerfile.bge, docker-compose
│   ├── examples/                   # в т.ч. 8 composition-демо
│   ├── README.md, API.md, ARCHITECTURE.md (5 ADR), COOKBOOK.md, MIGRATING.md,
│   │   SECURITY.md, PLUGIN_CONTRACT.md, PROFILES.md, DEVELOPMENT_STATUS.md,
│   │   ROADMAP_EXECUTION.md, TEST_BASELINE.md, RELEASE.md, CONTRIBUTING.md, CHANGELOG.md
│   ├── pyproject.toml              # v0.3.0, dependencies = [] (stdlib-first), extras: mcp/llm/test
│   └── action.yml                  # интеграция как GitHub Action
│
├── scripts/                        # 187 batch-скриптов в 24 группах (в осн. improve_*.py)
│   ├── improve_run_all.py          # оркестратор (--smart/--fast/--group/--changed/--parallel)
│   ├── improve_recipe.py           # 22 именованных цепочки скриптов
│   ├── mcp_server.py               # MCP-сервер: 15+ инструментов (search/bm25/health/run_improve/cards…)
│   ├── gateway.py                  # OpenAI-compatible gateway (FastAPI, :8083, function calling + SSE)
│   ├── improve_card_promote.py     # lifecycle карточек raw→normalized→approved (1005 approved)
│   ├── improve_proposal_gen.py     # генератор интеграционных предложений (23 proposals)
│   ├── improve_semantic_*.py       # TF-IDF/ST-индексы, hybrid search, ANN (hnswlib)
│   └── … ещё ~170 скриптов         # quality/export/analytics/links/llm/reports/lifecycle/…
│
├── tests/                          # ~199 unit-тестов корневых скриптов
├── cards/, tasks/, packages/, sources/  # карточки знаний, task-манифесты, вспомогательные пакеты, исходники
├── .claude/skills/                 # 28 скиллов + _golden/ (search, dispatch, outreach-day, audit-corpus…)
└── .github/workflows/              # test.yml (6 джоб) + docs.yml (авто-PR метрик)
```

## Ключевые файлы и модули

| Файл / модуль | Что делает |
|---|---|
| `docs-toolkit/docstoolkit/rag/pipeline.py` | Центральная точка композиции: `ask()` + `RAGPipeline` (retrieve → assemble → answer), 17 ортогональных kwargs, трассировка TraceEvent; код с подробными докстрингами и ссылками на спринты — проверено чтением |
| `docs-toolkit/docstoolkit/__init__.py` | `__version__ = "0.3.0"`, автозагрузка плагинов через entry-points — проверено |
| `docs-toolkit/pyproject.toml` | PEP 621, `dependencies = []`, extras (mcp/llm/test), CLI `docstoolkit` — проверено |
| `docs-toolkit/DEVELOPMENT_STATUS.md` | Детальный статус фаз с хешами коммитов и exit-критериями; честно помечены пропущенные/отложенные фазы |
| `scripts/mcp_server.py` | MCP-сервер для Claude Desktop: поиск по индексу, BM25, решения, контакты, запуск скриптов/рецептов — проверено чтением |
| `scripts/gateway.py` | OpenAI-совместимый REST-gateway к базе (2461 карточка, hybrid-поиск, write-back карточек) — проверено чтением |
| `scripts/improve_run_all.py` | Оркестратор всех 187 скриптов по группам |
| `docs/PROGRESS.md` | Прогресс MVP 64% (7/11 milestones); следующий шаг — отправка контактов авторам |
| `docs/ROADMAP/00…05` | ~2700 строк планов: 7 простых, 8 средних, 10 frontier, 10 «novel» идей + приоритизация |
| `.github/workflows/test.yml` | 6 джоб: syntax, pytest (двумя прогонами: tests/ и docs-toolkit/tests/ с таймаутами и артефактами), MCP-smoke, валидация шаблонов и task-манифестов, catalog-fresh — проверено чтением |
| `docs-toolkit/tests/test_access_control.py` | Пример теста: настоящий pytest с фикстурами по RBAC (Role/Permission/Policy) — проверено чтением |

## Особенности организации кода

- **Спринтовая генерация модулей.** Кодовая база росла «спринтами» (220+), из-за чего в `docstoolkit/` сотни узких микро-пакетов, включая версии-дубликаты (`access_log` / `access_log_v2`, `circuit_breaker` / `circuit_breaker_v2`, семейство `doc_audit`…`doc_audit_v3`) — ширина явно опережает консолидацию.
- **Всё документировано и измерено.** Почти каждый скрипт порождает markdown-отчёт; метрики HEALTH/METRICS/SCORING пересчитываются автоматически, CI открывает PR с обновлениями.
- **Local-first / stdlib-first.** Базовая функциональность без внешних зависимостей; ML, LLM, MCP, FastAPI — опциональные extras.
- **Оригиналы неприкосновенны.** Исходные отчёты и MHTML хранятся в корне как есть; производные знания «разделены, а не сжаты» по тематическим папкам с README в каждой.
