# Структура nautilus

## Аннотированное дерево каталогов

```
nautilus/
├── portal.py                  # Движок портала (668 строк): 14 адаптеров, консенсус,
│                              #   релевантность, Q6-соседи, текст/HTML-вывод, SPA-сервер :8000
├── api.py                     # REST API (394): 12 эндпоинтов на stdlib http.server,
│                              #   /metrics для Prometheus (кэш 30 с), CORS
├── annotations.py             # Система аннотаций (392): Protocol 3 «Double-Triangle»,
│                              #   SQLite (annotations.db) или in-memory, threading, visibility
├── bridge_registry.py         # Алгебра мостов v2.0 (316): парсит JSON-блоки из паспортов,
│                              #   invert / compose / transitive_closure / detect_conflicts
├── nautilus_sdk.py            # Python SDK для клиентов API (189)
├── nautilus.json              # Реестр: 13 записей-репозиториев, версия 1.2,
│                              #   consensus_threshold, ссылка на GitHub Pages
├── openapi.yaml               # Спецификация OpenAPI 3.1.0 (338 строк)
├── PORTAL-PROTOCOL.md         # Формальный протокол NPP v1.2 (~1000 строк, стиль RFC/BCP 14,
│                              #   17 разделов: PortalEntry, реестр, паспорта, Q6, консенсус,
│                              #   REST-семантика, кэширование, безопасность, версии)
├── INTEGRATION.md             # Руководство по подключению репо (637 строк)
├── README.md                  # Основной README с бейджами и метриками v1.1→v1.2
├── STATUS.md                  # Детальный самоотчёт v1.1 (2026-04-19)
│
├── adapters/                  # 22 файла — слой адаптеров
│   ├── base.py                # BaseAdapter (ABC: fetch/describe) + PortalEntry + fuzzy_match
│   ├── cache.py               # Дисковый кэш, TTL 24 ч, offline-режим (stale-кэш)
│   ├── info1.py, pro2.py,     # Адаптеры конкретных репо; pro2.py (347) содержит
│   │   meta.py, data2.py,     #   таблицу Q6-меток и читает локальные файлы репо,
│   │   data7.py               #   при их отсутствии — статический fallback
│   ├── infosystems.py,        # «Доменные» адаптеры (домены внутри pro2)
│   │   ai_agents.py
│   ├── graphrag.py, daten22.py, legal.py, continuum.py, ai_research.py  # новые в v1.2
│   ├── auto.py                # AutoAdapter: читает nautilus.json из чужого репо (raw GitHub)
│   ├── jsonl.py, obsidian.py, arxiv.py, github_topic.py, conversation.py  # универсальные
│   └── py.typed               # маркер типизации (mypy)
│
├── passports/                 # 12 паспортов репозиториев (md): формат, единица данных,
│   ├── info1.md … pro2.md     #   уровень совместимости 0–3, мосты к другим репо
│   │                          #   + секция «Bridges (machine-readable)» с JSON (всего 33 моста)
│
├── tests/                     # 60 тестов в 4 файлах (подтверждено пересчётом):
│   ├── test_adapters.py       #   27 тестов
│   ├── test_portal.py         #   15 тестов (консенсус, кросс-ссылки, регистрация адаптера)
│   ├── test_health_check.py   #   13 тестов
│   └── test_validate_links.py #   5 тестов
│
├── docs/                      # ~19 файлов документации
│   ├── STATUS_v1.2.md         # Технический статус v1.2 (метрики, адаптеры, API)
│   ├── CONCEPTUAL_STAGE.md    # Концептуальная зрелость
│   ├── BRIDGE_STATUS.md, BRIDGES_FORMALIZATION.md, ANNOTATION_SYSTEM.md
│   ├── ADAPTER_ROADMAP.md     # Дорожная карта адаптеров
│   ├── IMPLEMENTATION_STAGE_PART_1..4.md
│   ├── snapshot.md/.json, ecosystem_stats.json, ecosystem.mmd  # авто-снапшоты sync-бота
│   ├── sessions/              # экспортированные LLM-сессии (для ConversationAdapter)
│   └── «Вакансии в Anthropic по кластерам».{md,json,txt}  # ПОСТОРОННИЙ контент в docs/
│
├── tokenizer/                 # glyph_tokenizer.py — экспериментальный токенизатор
├── glyph_adapter.py           # ML-компонент (опционально torch) — вне ядра
├── snapshots/                 # исторические снапшоты
│
├── health_check.py            # Диагностика экосистемы: score 0–100, адаптеры, паспорта
├── validate_links.py          # Валидация кросс-ссылок (317 валидных, 0 битых)
├── gap_detection.py           # Пробелы Q6-покрытия (BFS по Хэммингу)
├── tfidf_search.py            # TF-IDF семантический поиск (207 документов)
├── cluster.py                 # Кластеризация по Q6-близости
├── diff_report.py             # Дельта с последней синхронизации
├── timeline.py                # Свежесть данных по адаптерам
├── snapshot.py                # Генерация snapshot.md/json для GitHub Pages
├── scan_repo.py               # Сканирование чужого репо → паспорт (для sync-бота)
├── generate_passport.py       # Генератор паспортов
├── visualize.py               # Mermaid-граф экосистемы
├── split_sessions.py          # Разрезание экспортов сессий
├── passport_schema.json       # JSON Schema паспорта
├── q6_map.html                # Интерактивная карта гиперкуба Q6 + тепловая карта (405 строк)
├── graph.html                 # D3.js-граф кросс-ссылок (300 строк)
├── index.html                 # SPA для GitHub Pages
│
├── health_report.txt          # Последний отчёт бота (2026-04-27): score 66/100
├── link_report.json           # Последний отчёт валидации: 317/317 ссылок валидны
├── snapshot.md / snapshot.json / ecosystem_stats.json   # авто-обновляемые ботом
│
├── .github/workflows/
│   ├── ci.yml                 # CI: pytest + validate_links --strict + health_check
│   ├── sync.yml               # Еженедельный sync (пн 03:00 UTC): рескан, снапшоты, коммит ботом
│   ├── auto_update.yml        # Авторегистрация репо по repository_dispatch (nautilus_register)
│   └── register_nautilus.yml  # Регистрация nautilus в другом репо
│
├── Dockerfile                 # python:3.11-slim, API на :8080
├── docker-compose.yml         # Сервисы: portal :8000, api :8080, health, snapshot (profiles)
├── requirements.txt           # ПУСТО по сути: stdlib only (опц. torch для glyph)
├── mypy.ini                   # Конфиг mypy
└── bootstrap.sh               # Скрипт начальной настройки
```

## Ключевые файлы и модули

| Файл/модуль | Что делает |
|---|---|
| `portal.py :: NautilusPortal` | Ядро: словарь из 14 адаптеров, `query()` с ранжированием (`_relevance_score`), консенсус (real vs fallback покрытие), `q6_neighbors()` (BFS по Хэммингу), автозагрузка auto/jsonl-адаптеров из `nautilus.json`, HTML-рендер с экранированием XSS |
| `adapters/base.py` | Контракт протокола: `PortalEntry` (id, title, source, format_type, content, metadata, links, is_fallback) и ABC `BaseAdapter` (fetch/describe, «не бросать исключения — вернуть пустой список») |
| `adapters/auto.py` | Подключение чужого репо без кода: чтение `nautilus.json` с raw.githubusercontent (main/master), 3-уровневая стратегия: свежий кэш → сеть (с GITHUB_TOKEN) → stale-кэш офлайн |
| `adapters/pro2.py` | Типичный «репо-адаптер»: ищет локальные файлы репо pro2 (`bidir_train_v2_log.json` и др.), парсит метрики регэкспами; при отсутствии — большая вшитая таблица Q6-меток как fallback |
| `bridge_registry.py` | Извлекает мосты из паспортов регэкспом по секции `## Bridges (machine-readable)`; алгебра: инверсия направления, композиция (произведение confidence), транзитивное замыкание, детекция Q6-конфликтов (`BridgeConflict`, severity info/warning/error) |
| `annotations.py` | `AnnotationStore` — SQLite/in-memory; аннотации с автором (человек/адаптер-агент/assistant), видимостью, тегами и threading; автофлаги `needs_review` |
| `api.py` | 12 эндпоинтов: `/api/query`, `/api/health`, `/api/links`, `/api/describe`, `/api/neighbors`, `/api/bridge`, `/api/bridge_conflicts`, `/api/bridge_summary`, `/api/annotations` (GET/POST), `/api/flags`, `/metrics` |
| `health_check.py` | Сводный score 0–100: доступность адаптеров, доля real/fallback записей, полнота паспортов, консенсус по контрольным запросам |
| `validate_links.py` | Собирает записи по 10 «широким» запросам, проверяет каждый `entry.links` на существование цели; `--strict` для CI |
| `nautilus_sdk.py` | Мини-клиент REST API для внешних скриптов |

## Особенности организации кода

- **Zero-dependency дисциплина**: всё ядро — чистая стандартная библиотека (включая HTTP-сервер и SQLite), что делает проект максимально переносимым; единственная опциональная зависимость (torch) вынесена в изолированный glyph-компонент.
- **Данные как документация**: паспорта — это markdown для человека + JSON-блок для машины; реестр — JSON; протокол — RFC-подобный документ. Тройное представление одной модели.
- **Fallback-паттерн**: каждый репо-адаптер несёт в себе статический слепок данных своего репозитория, поэтому портал работает даже без доступа к самим репо — но тогда отдаёт устаревшие вшитые данные (это честно помечается `is_fallback=True` и штрафуется в ранжировании и консенсусе).
- **Самонаблюдение**: репозиторий хранит собственные авто-отчёты (`health_report.txt`, `link_report.json`, `snapshot.md`, `ecosystem_stats.json`), которые еженедельно перегенерировал бот — редкий для профиля пример работающей автоматизации.
- Небольшой мусор: в `docs/` лежат посторонние файлы («Вакансии в Anthropic по кластерам» в трёх форматах), не относящиеся к порталу.
