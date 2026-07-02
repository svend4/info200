# data15 — Multi-Agent Hybrid Orchestrator v5.0 (оркестрация AI-агентов)

## Обзор

Несмотря на невзрачное описание «info», data15 — один из самых содержательных кодовых репозиториев профиля svend4: это **Multi-Agent Hybrid Orchestrator v5.0** — система оркестрации нескольких AI-агентов с канбан-доской задач, workflow-движком, REST API и примерно тремя десятками встроенных модулей (метрики, SLA, аудит, шаблоны задач, cron, базы знаний и т.д.). Ядро — монолитный файл `orchestrator_v5.py` на **6 579 строк** (57 классов), написанный практически только на stdlib Python.

Репозиторий содержит также всю эволюцию проекта: `orchestrator.py` (v1, 860 строк) → `orchestrator_v4.py` (1 122 строки) → `hybrid_orchestrator.py` (прототип v3, 581 строка) → `orchestrator_v5.py`. Открыт PR #5 «feat: Orchestrator v6 improvements» (июнь 2026) с переходом на SQLite WAL, мульти-провайдерный LLM-слой, JWT-аутентификацию и Streamlit-интерфейс.

## Назначение и идея

Идея — «дирижёр» (Conductor/Mediator pattern), координирующий четырёх агентов/слоёв через единый CLI и REST API:

- **CAMEL Layer** — стратегический слой: декомпозиция цели на подзадачи;
- **Hermes** (Nous Research) — внутренний аналитический агент; при отсутствии CLI — fallback на MiniMax API (`hermes_llm.py`);
- **OpenClaw** — внешний агент-исполнитель (web-поиск, инструменты) через shell-обёртку `openclaw_runner.sh`;
- **Multica API** — внешняя доска задач (localhost:3000); fallback — внутренний `BoardManager` (JSON-канбан).

Ключевой архитектурный принцип — **«B+A Hybrid»**: скиллы (`orchestrator/skills/*.md`) документируют, КАК вызывать агента (описание, параметры, шаблон команды), а коннекторы (`WorkflowEngine._call_hermes_agent`, `_call_openclaw_agent`, `_call_multica_api`) реально ВЫПОЛНЯЮТ вызов через subprocess/HTTP с цепочками fallback.

## Как устроено (архитектура)

- **Ядро** (`orchestrator_v5.py`): `HybridOrchestrator` + `BoardManager` (канбан в `hybrid_board.json`, блокировки `fcntl.flock`, атомарная запись через `os.replace`), `CAMELLayer`, `WorkflowEngine` (шаги action/delay, подстановка `{goal}`/`{openclaw_result}`), `ConfigManager`, `CacheManager` (MD5+TTL), `EventBus` (pub/sub), `RateLimiter` (token bucket), `CircuitBreaker`, `RBACManager` (4 роли), `RetryHandler`.
- **~30 модулей-расширений** прикручиваются к `HybridOrchestrator` как property в `_add_orchestrator_extensions()`: Dashboard, TaskDependencyGraph, RecurringTasks, SLAMonitor, AuditTrail, KnowledgeBase, IntegrationHub (Slack/Email/Webhooks — частично заглушки), TaskScheduler, MetricsExporter (Prometheus text format) и др.
- **REST API** — на stdlib `http.server` (Flask НЕ нужен, вопреки README): `/api/health`, `/api/status`, `/api/tasks`, `/api/search`, `/api/metrics`, `/api/stats`, `/api/events`, `/api/workflows`.
- **CLI** — десятки команд вида `/board`, `/add`, `/analyze`, `/research`, `/both` (параллельный запуск Hermes+OpenClaw в двух потоках), `/camel`, `/workflow run`, `/skill list`, `/cron-add`, `/user-add` и т.д.
- **Рабочая директория** `orchestrator/`: `skills/` (5 md-скиллов), `state/` (17 JSON: workflows, users, config, cron...), `tasks/`, `cache/`, `logs/`.
- **Docker**: `Dockerfile` (python:3.11-slim) + `docker-compose.yml`.

## Статус и активность

- 43 коммита; вся основная разработка — **5–6 мая 2026** (initial commit 5 мая 2026, интенсивный спринт), затем пауза.
- **16 июня 2026** открыт PR #5 «Orchestrator v6 improvements» (SQLite-доска ~3200 оп/с, мульти-LLM: Anthropic/OpenAI/Ollama/MiniMax, JWT+RBAC, ChromaDB-база знаний, Streamlit WebUI) — не смёржен, проект живой.
- Issues: 0; звёзды/форки: 0. В истории есть коммит «SECURITY: remove hardcoded MiniMax API key» — ключ убран в переменную окружения (но, вероятно, остался в git-истории — не проверено).
- Судя по путям `/workspace/...` и файлам сессий в `user_input_files/`, проект родился в песочнице MiniMax/агентной среды и был выгружен на GitHub.

## Ключевые факты

| Параметр | Значение |
|---|---|
| Язык | Python 94% (Shell 5.7%, Dockerfile 0.2%) |
| Размер | ~33 файла кода/доков в корне + ~35 файлов в `orchestrator/` и `user_input_files/`; ~15 000 строк ключевых файлов, из них 6 579 — `orchestrator_v5.py` |
| Последняя активность | PR #5 от 16.06.2026 (последний коммит в main — 06.05.2026) |
| Статус | активный (открытый PR v6, но основной спринт был в мае 2026) |
| Зрелость | 3/5 |

## Ссылки

- [Структура](structure.md)
- [Характеристика и оценка](assessment.md)
- [Рекомендации](recommendations.md)
- [Вопросы](questions.md)
- Репозиторий: https://github.com/svend4/data15
