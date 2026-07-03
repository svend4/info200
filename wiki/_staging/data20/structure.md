# Структура data20

## Аннотированное дерево каталогов

```
data20/
├── knowledge/                  # СОБСТВЕННО БАЗА ЗНАНИЙ (почти пустая: ~4-5 статей)
│   ├── computers/              # ИТ-категория
│   │   ├── index/INDEX.md
│   │   └── articles/
│   │       ├── ai/             # напр. llm-overview-2026.md (frontmatter повреждён — см. assessment)
│   │       └── programming/    # ровно 1 файл: python-patterns.md
│   ├── household/              # быт: refrigerator-buying-guide-2026.md и index
│   └── cooking/                # только index, «раздел в разработке»
│
├── inbox/                      # конвейер входящих материалов: raw/ → processing/ → processed/
├── archive/                    # архив устаревшего
│
├── tools/                      # 57 АВТОНОМНЫХ CLI-ИНСТРУМЕНТОВ (Python, без подпапок)
│   ├── update_indexes.py       # инкрементальная индексация: MD5+mtime, multiprocessing, SQLite
│   ├── validate.py             # валидация: schema, SEO, ссылки, severity critical..info
│   ├── build_graph.py, knowledge_graph_builder.py, network_analyzer.py   # графы знаний
│   ├── calculate_pagerank.py, citation_index.py, backlinks_generator.py  # ссылочный анализ
│   ├── search_index.py, advanced_search.py, faceted_search.py            # поиск
│   ├── build_glossary.py, build_concordance.py, build_thesaurus.py       # словари
│   ├── export_manager.py, sitemap_generator.py, statistics_dashboard.py  # экспорт/статистика
│   └── ... ещё ~40 (auto_tagger, duplicate_detector, marginalia, add_dewey, ...)
│
├── backend/                    # PRODUCTION-БЭКЕНД (FastAPI), ~1200+ строк ядра
│   ├── server.py               # FastAPI: REST + WebSocket, JWT, Prometheus, CORS (~350 строк)
│   ├── tool_registry.py        # автообнаружение инструментов через AST (~550 строк)
│   ├── tool_runner.py          # асинхронный запуск через subprocess, job-статусы (~300 строк)
│   ├── auth.py                 # JWT-аутентификация, роли (admin/user)
│   ├── models.py, database.py, database_v2.py, alembic/   # SQLAlchemy + миграции
│   ├── celery_app.py, celery_tasks.py, redis_client.py    # очередь задач (с fallback)
│   ├── logger.py, metrics.py, config.py
│   └── requirements.txt        # fastapi, uvicorn, sqlalchemy, alembic, celery, redis, psycopg2...
│
├── mobile-app/                 # ГЛАВНЫЙ ФРОНТЕНД: Flutter + embedded Python (Chaquopy)
│   ├── lib/                    # Dart: main.dart, screens/ (login, home, tool_detail, jobs...),
│   │   │                       #   services/ (api, auth, storage), models/, utils/theme.dart
│   ├── android/, ios/          # нативные обвязки
│   ├── build-android-embedded.sh, copy-tools-to-python.sh
│   └── 8 md-доков (PUBLISH_APK, KEYSTORE_SETUP, BUILD_MOBILE_EMBEDDED, оптимизации...)
│
├── mobile-app-lite/            # облегчённая версия: ThreadingHTTPServer + sqlite3, без tools/
├── mobile-app-versions/        # варианты сборок (v5-full и др. — см. workflows)
├── mobile-app-sandboxes/       # песочницы мобильных экспериментов        [не проверено детально]
├── desktop-app/                # Electron + React (Windows/macOS/Linux)
├── browser-extension/          # Phase 9.1: Pyodide (Python/WASM) в браузере, IndexedDB, без бэкенда
├── webapp/, webapp-react/      # веб-интерфейсы                            [не проверено детально]
├── static_site/                # генератор статического сайта (site_generator.py)
├── api/                        # доп. API-слой                             [не проверено детально]
│
├── tests/                      # ТЕСТЫ (pytest)
│   ├── conftest.py             # фикстуры: in-memory SQLite, TestClient, admin/user
│   ├── unit/                   # test_auth.py, test_tool_registry.py, test_tools_core.py
│   ├── integration/, performance/, fixtures/
│
├── .github/workflows/          # 12 файлов CI/CD: tests.yml (pytest+coverage+Codecov, Py 3.10/3.11),
│   │                           # knowledge-base-ci.yml (validate+indexes), 5 вариантов сборки APK,
│   │                           # release.yml, sync-versions.yml (падает), build-kb.yml
│
├── scripts/                    # generate_all.sh и пр. генерация outputs
├── monitoring/, sandbox/, backups/, exports/, catalogs/, .marginalia/   # служебные/сгенерированные
│
├── Dockerfile                  # multi-stage: builder (генерация KB) → FastAPI runtime
├── INDEX.md                    # главный индекс базы знаний
├── README.md                   # основной README (RU, подробный)
└── ~60+ md-файлов в корне      # авто-сгенерированные индексы (MASTER_INDEX, GLOSSARY, CONCORDANCE,
                                # PAGERANK, CITATION_INDEX...) + инструкции по релизам
                                # (ГДЕ_КНОПКА_RELEASE.md, SIMPLE_RELEASE.md, RELEASES_INDEX.md...)
```

## Ключевые файлы и модули

| Файл/модуль | Что делает |
|---|---|
| `README.md` | Полное описание системы: структура, метаданные, методология, работа с AI, раздел про Android-приложение |
| `INDEX.md` | Главный индекс базы знаний: 3 категории, сервисные разделы |
| `tools/update_indexes.py` | Инкрементальное обновление индексов: MD5+mtime change-tracking, параллельная обработка, SQLite/JSON-бэкенды, авторемонт индексов (~722 строки) |
| `tools/validate.py` | Комплексная валидация: JSON Schema frontmatter, качество контента, SEO, ссылки, изображения, 5 уровней severity, отчёты JSON/HTML/MD (~722 строки) |
| `backend/server.py` | FastAPI-сервер «Phase 5.2.1»: регистрация/логин (JWT), запуск инструментов, WebSocket-прогресс, Prometheus `/metrics`, Celery с fallback |
| `backend/tool_registry.py` | Реестр инструментов: AST-парсинг файлов `tools/`, извлечение параметров/категорий/описаний, 10 категорий (analysis, graph, search...) |
| `backend/tool_runner.py` | Асинхронное исполнение инструментов subprocess-ами: job_id, статусы pending/running/completed/failed/cancelled, прогресс, psutil |
| `tests/conftest.py` | Инфраструктура тестов «Phase 5.5»: in-memory SQLite, override get_db, фикстуры admin/user |
| `.github/workflows/tests.yml` | CI: pytest unit+integration, coverage по backend и tools, Codecov, матрица Python 3.10/3.11. ВНИМАНИЕ: ставит `-r requirements.txt` из корня, которого в HEAD нет (404) |
| `mobile-app/lib/main.dart` + `services/api_service.dart` | Flutter-клиент к локальному API (127.0.0.1:8001) |
| `mobile-app/build-android-embedded.sh` | Сборка APK с embedded Python через Chaquopy |
| `Dockerfile` | Multi-stage: генерация всех outputs инструментами → лёгкий рантайм FastAPI |
| `ARCHITECTURE_ANALYSIS.md` | Самоанализ архитектуры (03.01.2026): «как использовать 55+ инструментов», обоснование выбора веб/API-надстройки |
| `RELEASE_NOTES.md` | Признание: APK в релиз v1.0.0 не включён, инструкция самостоятельной сборки |
| `CHANGELOG.md` / `CHANGELOG.json` | Авто-сгенерированный changelog (на 02.01: 42 коммита, отчёты «Tier N complete») |

## Особенности организации кода

- **Плоский `tools/`**: все 57 инструментов лежат одним списком без подпапок и без общего пакета — каждый скрипт самодостаточен (осознанное решение из ARCHITECTURE_ANALYSIS.md), но общий код (парсинг frontmatter, обход knowledge/) дублируется между ними.
- **«Фазовая» разработка**: в docstring-ах и коммитах — маркеры Phase 4.2, 5.2.1, 5.5, 9.1, Tier 1–5; репозиторий фактически является журналом недельного AI-спринта.
- **Множественные параллельные фронтенды**: 8+ вариантов клиента (mobile full/lite/versions/sandboxes, desktop, 2 webapp, extension, static site) — ни один не доведён до опубликованного дистрибутива.
- **Сгенерированные артефакты закоммичены**: индексы, кэши (`.index_cache.json`, `.reading_progress.json`), exports/, catalogs/, backups/ лежат в git рядом с исходниками.
- **Двуязычие**: код и доки смешивают русский (комментарии, README, инструкции по релизам с названиями вроде `ГДЕ_КНОПКА_RELEASE.md`) и английский (идентификаторы, часть доков).
