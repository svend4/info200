# lorenzo — исследовательский монорепо Svyazi 2.0 + Python-фреймворк docs-toolkit

## Обзор

**lorenzo** — самый крупный и зрелый репозиторий профиля svend4: монорепозиторий, объединяющий два больших актива.

1. **`docs/`** — исследовательская база знаний по проекту **Svyazi 2.0** (локальная community-intelligence-платформа / «Knowledge OS»): ~2,5–2,8 тыс. markdown-файлов, ~2,9 млн слов. Включает анализ 436 вакансий Anthropic, 22 проектов с Хабра, 40+ комбинаций технологий, 5 «ансамблей» OSS-проектов, RFC-документы Nautilus, контакт-файлы авторов и обширный ROADMAP из 35 идей развития.
2. **`docs-toolkit/`** — универсальный Python-пакет (v0.3.0, лицензия MIT в pyproject): RAG / agent / workflow / eval / federation / observability фреймворк для markdown-монорепозиториев. Порядка 500 модулей-подпакетов, 500+ тестовых файлов, десятки тысяч тест-кейсов, принцип «stdlib-first» (`dependencies = []` в pyproject.toml — базовая установка без внешних зависимостей).

Вокруг них — инфраструктура: **187 batch-скриптов** (`scripts/improve_*.py`) в 24 группах, **MCP-сервер** для Claude Desktop (`scripts/mcp_server.py`), **OpenAI-совместимый HTTP-gateway** на FastAPI (`scripts/gateway.py`, порт 8083), **~199 unit-тестов** корневых скриптов, **28 Claude-скиллов** в `.claude/skills/` и рабочий CI (два workflow, 6+ джоб).

## Назначение и идея

Идея проекта двухслойная:

- **Исследовательский слой.** Собрать и систематизировать лучшие OSS-проекты (в первую очередь с Хабра) в единую архитектуру «Knowledge OS» для Svyazi 2.0, установить контакты с авторами (32 контакт-файла подготовлены, но не отправлены — прогресс MVP 64%, 7/11 milestones по `docs/PROGRESS.md`), а также проработать карьерный трек (кластеризация 436 вакансий Anthropic с profile-mapping).
- **Инженерный слой.** Из практики обработки этого корпуса «выкристаллизовался» переиспользуемый пакет `docs-toolkit`: локальный RAG (keyword/BM25/semantic/hybrid RRF/adaptive multi-hop), ReAct-агент с планировщиком, DAG-workflow, A/B-эксперименты и golden-datasets-eval, RBAC/бюджеты, OTel/Prometheus-телеметрия, knowledge graph с мини-DSL запросов, differential privacy, federation (NPP), Docker/Helm-деплой. Управление функциями — через единую функцию `ask()` с 17 ортогональными kwargs и 6 пресетами.

Фактически репозиторий — это «фабрика знаний, которая построила себе фабрику инструментов»: документы улучшаются скриптами, скрипты покрыты тестами, метрики (HEALTH/METRICS/SCORING) пересчитываются автоматически, CI открывает PR с обновлёнными метриками.

## Как устроено (архитектура)

- **Корень**: README, CLAUDE.md (контекст для Claude Code), CHANGELOG, оригиналы исходных исследований (deep-research-report 1–4, MHTML-выгрузки) — принцип «ничего не удалено».
- **docs/** — тематические разделы (01-svyazi … 05-habr-projects, nautilus, anthropic-vacancies, obsidian-экспорт, glossary, templates, ROADMAP) плюс 100+ автогенерируемых аналитических отчётов (HEALTH.md, METRICS.md, SCORING.md, TOPIC_MODEL.md, CARD_GRAPH и т.д.).
- **docs-toolkit/** — pip-устанавливаемый пакет (PEP 621, entry-point CLI `docstoolkit`), слои: ingest → retrieval → reasoning → orchestration → memory → eval → governance → observability → integration; 14 сопроводительных доков (API.md, ARCHITECTURE.md с 5 ADR, COOKBOOK.md, MIGRATING.md с маппингом из LangChain/LlamaIndex, SECURITY.md, PLUGIN_CONTRACT.md и др.), Dockerfile + docker-compose + Helm chart в `deploy/`, bench-система с историей замеров.
- **scripts/** — конвейер обработки корпуса: оркестратор `improve_run_all.py` (--smart/--group/--parallel), система «рецептов» (22 именованных цепочки), lifecycle-карточки raw→normalized→approved (1005 approved), RFC-система, PageRank-граф карточек, MCP-сервер (15+ инструментов) и gateway.
- **CI**: `.github/workflows/test.yml` (python-syntax, unit-tests с таймаутами и артефактами, mcp-smoke, validate-templates, validate-tasks, catalog-fresh) и `docs.yml` (авто-PR с метриками; три таких бот-PR открыты на момент аудита).

Подробнее — в [structure.md](structure.md).

## Статус и активность

- **971 коммит** в ветке `main`; последний коммит **2026-06-05** (менее месяца до даты аудита) — проект активный.
- 32 закрытых PR, 4 открытых (3 — бот-дубликаты «auto-update metrics», 1 — draft от Copilot про пиннинг SHA в docs.yml).
- Разработка идёт «фазами»: Phases I–IX закрыты 2026-05-15 (18 выполнено, 3 отложено, 3 пропущено — честно задокументировано в `docs-toolkit/DEVELOPMENT_STATUS.md`), Phases X–XIX реализованы коммитом 2026-05-29 (fencing, DLQ replay, SPRT, PSI drift, tiered memory, GraphQL-lite, tool composer, OpenAI-compat gateway).
- 1 звезда, 0 форков — внешней аудитории пока нет; пакет не опубликован на PyPI.
- Перепроверка самоотчётов: масштаб подтверждён, но конкретные цифры в разных доках расходятся (2815 vs 2484 файлов; 489 vs 498 модулей; 546 vs 538 тестовых файлов; устаревшие баллы в CLAUDE.md) — детали в [assessment.md](assessment.md).

## Ключевые факты

| Параметр | Значение |
|---|---|
| Язык | Python (100% по GitHub linguist) + огромный markdown-корпус |
| Примерный размер | ~2,5–2,8 тыс. md-файлов (~2,9 млн слов); ~500 подпакетов docs-toolkit (~169 тыс. строк кода — заявлено); 187 скриптов; 500+ тестовых файлов; 971 коммит |
| Последняя активность | 2026-06-05 (merge PR #30/#34, фиксы CI) |
| Статус | Активный |
| Зрелость | 4/5 |
| Лицензия | MIT заявлена в pyproject, **файла LICENSE нет** (проверено: 404) |
| CI | Да: test.yml (6 джоб) + docs.yml (авто-PR метрик) |

## Ссылки

- [Структура](structure.md)
- [Характеристика и оценка](assessment.md)
- [Рекомендации](recommendations.md)
- [Вопросы](questions.md)
- Репозиторий: https://github.com/svend4/lorenzo
