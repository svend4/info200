# Структура data15

## Аннотированное дерево каталогов

```
data15/
├── orchestrator_v5.py            # ГЛАВНЫЙ ФАЙЛ: весь оркестратор v5 (6 579 строк, 57 классов)
├── orchestrator_v4.py            # Предыдущая версия v4 (1 122 строки, архив)
├── orchestrator.py               # Первая версия v1 (860 строк, архив)
├── hybrid_orchestrator.py        # Прототип v3: слои CAMEL/MULTICA/EXECUTION (581 строка)
├── orchestrate.py                # Ранний CLI-скрипт оркестрации (204 строки)
│
├── hermes_llm.py                 # Интеграция с MiniMax API (fallback для Hermes; ключ из env)
├── hermes_integration.py         # Hermes как внутренний агент (322 строки)
├── hermes_agent_v2.py            # Hermes-агент v2: режимы LOCAL/API/MINIMAX/SIMULATION (415 строк)
├── openclaw_integration.py       # OpenClawExecutor: вызов OpenClaw CLI через subprocess
├── openclaw_runner.sh            # Shell-обёртка вызова OpenClaw (NVM + Node.js)
├── monitor_daemon.py             # Демон мониторинга доски задач (watch/report/alert)
│
├── orchestrate.sh                # Shell-обёртки запуска разных версий
├── orchestrate_v4.sh             #
├── orchestrate_v5.sh             #
├── orchestrator.sh               #
│
├── test_full.py                  # «Полный системный тест» (subprocess-прогон CLI-команд)
├── deep_test.py                  # Глубокое тестирование/демонстрация всех модулей v5 (381 строка)
├── stress_test.py                # Нагрузочный тест: 50 потоков, задачи/сек, cache, rate limiter
├── perf_test.py                  # Тест производительности
├── test_hermes_complex.py        # Тесты Hermes-интеграции (66 строк)
│
├── requirements.txt              # flask>=2.3.0 + werkzeug>=2.3.0 (фактически не нужны: API на stdlib), остальное закомментировано
├── Dockerfile                    # python:3.11-slim, EXPOSE 5000, CMD api-server
├── docker-compose.yml            # Композиция для запуска
├── .gitignore                    # Содержит правила для cache/, logs/, tasks/, state/*.json — но runtime-файлы были закоммичены и остаются отслеживаемыми
│
├── README.md                     # Описание v5 (частично устарел: упоминает Flask и MIT)
├── ORCHESTRATOR_SUMMARY.md       # Отчёт о демо-прогоне: анализ новостей Tesla в режиме /both (454 строки)
├── PERFORMANCE_ANALYSIS.md       # Честный перф-анализ v5 vs v4: 47.9 задач/с, race conditions
├── QUICK_REFERENCE.txt           # Краткая шпаргалка по демо-прогону (Tesla)
├── orchestrator_competitive_matrix.md  # Артефакт демо-анализа
├── orchestrator_tesla_analysis.md      # Артефакт демо-анализа
├── cron_tasks.md                 # Описание scheduled-задач (daily standup, weekly report...)
│
├── docs/
│   ├── DOCUMENTATION.md          # Полная русская документация v5 (1 510 строк, 14 разделов)
│   └── PART2_PRODUCTION.md       # Production-роадмап: Hermes Agent, MCP Bridge (552 строки)
│
├── orchestrator/                 # РАБОЧАЯ директория оркестратора (закоммичена вместе с runtime-состоянием!)
│   ├── skills/                   # Скиллы агентов — md-документация «как вызывать» (принцип B)
│   │   ├── hermes_analyze.md     #   анализ через Hermes CLI / MiniMax fallback
│   │   ├── openclaw_web_search.md#   внешний поиск через OpenClaw
│   │   ├── camel_decompose.md    #   декомпозиция целей
│   │   ├── multica_manage.md     #   управление доской Multica
│   │   └── combine_results.md    #   объединение результатов агентов
│   ├── state/                    # 17 JSON-файлов состояния: workflows.json, users.json (RBAC,
│   │   └── ...                   #   хэши паролей!), config.json, cron_jobs.json, audit_trail.json,
│   │                             #   knowledge_base.json, sla_config.json, webhooks.json и др.
│   ├── tasks/                    # hybrid_board.json (канбан), история, комментарии, activity feed
│   ├── cache/                    # results_cache.json — кэш результатов анализа
│   └── logs/                     # Логи выполнения агентов
│
└── user_input_files/             # Входные материалы автора (10 файлов: сессии анализа, docx)
    ├── AI_Agents_Analysis.md
    ├── architecture_analysis_session.txt
    ├── Сравнение агентов Camel и Гермес.txt (+ вариант с подчёркиваниями)
    ├── Обзор возможностей.docx
    ├── info                      # безымянный служебный файл
    └── pasted-text-*.txt, session_analysis_*.txt  # следы работы в агентной песочнице (май 2026)
```

## Ключевые файлы и модули

| Файл / класс | Что делает |
|---|---|
| `orchestrator_v5.py :: HybridOrchestrator` | Центральный «дирижёр»: команды CLI, состояние, вызовы агентов |
| `:: BoardManager` | Канбан-доска в `hybrid_board.json`; `fcntl.flock` + атомарный `os.replace` |
| `:: CAMELLayer` | Стратегическая декомпозиция цели на подзадачи |
| `:: WorkflowEngine` | Выполнение workflow-шагов; коннекторы `_call_hermes_agent` (hermes CLI → fallback `hermes_llm.py`), `_call_openclaw_agent`, `_call_multica_api` |
| `:: RestAPI` | REST API на stdlib `http.server` (без Flask): /api/health, /api/tasks, /api/metrics... |
| `:: MetricsCollector`, `MetricsExporter` | Метрики counter/gauge/histogram, экспорт в формате Prometheus |
| `:: CircuitBreaker`, `RateLimiter`, `RetryHandler` | Паттерны надёжности (CLOSED/OPEN/HALF_OPEN, token bucket, ретраи) |
| `:: RBACManager`, `UserRole` | 4 роли пользователей; users.json с хэшами паролей |
| `:: EventBus` | Pub/sub-шина событий (в тестах — 177 755 оп/с) |
| ~30 классов-модулей | StatisticsDashboard, TaskDependencyGraph, AsyncTaskExecutor, TaskTimeline, PriorityTaskQueue, NotificationManager, TagsManager, WebhookManager, RecurringTaskManager, ActivityFeed, BatchOperations, DataMigration, PerformanceMonitor, TaskTemplatesLibrary, TimeTracker, SLAMonitor, ResourceManager, AuditTrail, WebSocketManager, WorkflowEngine, KnowledgeBase, APIRateLimiter, HealthChecker, IntegrationHub, TaskScheduler, APIDocumentation, ReportGenerator, APIRouter |
| `_add_orchestrator_extensions()` | Monkey-patch: прикручивает все модули к `HybridOrchestrator` как property |
| `hermes_llm.py :: HermesLLM` | Реальный вызов MiniMax API (`MINIMAX_API_KEY` из окружения), перебор 3 эндпоинтов, логирование |
| `hermes_agent_v2.py` | Обёртка Hermes с режимами LOCAL / API / MINIMAX / SIMULATION |
| `openclaw_integration.py :: OpenClawExecutor` | Запуск OpenClaw CLI через `openclaw_runner.sh`, сохранение логов |
| `monitor_daemon.py :: MonitorDaemon` | Слежение за изменениями доски, алерты о сбоях |

## Особенности организации кода

1. **Монолит-одиночка**: почти вся функциональность v5 — в одном файле на 6,5 тыс. строк; модули подключаются через property-монки-патчинг, а не через пакеты/импорты. Это сознательное решение (удобно копировать в песочницу агента), но затрудняет тестирование и сопровождение.
2. **Версии хранятся рядом**: v1, v3 (hybrid), v4, v5 лежат в корне — история эволюции видна, но корень захламлён.
3. **Runtime-состояние в git**: каталоги `orchestrator/state/` (17 JSON), `tasks/`, `cache/`, `logs/` с рабочими JSON (включая `users.json` с хэшами паролей и тестовыми записями кэша) закоммичены. Парадокс: `.gitignore` уже содержит правила `cache/`, `logs/`, `tasks/`, `state/*.json`, но файлы попали в git раньше (или правила не срабатывают: шаблон `state/*.json` заякорен на корень и не покрывает `orchestrator/state/`) — git продолжает их отслеживать, нужен `git rm --cached`.
4. **Следы агентной песочницы**: жёсткие пути `/workspace/orchestrator` в вспомогательных файлах (`hermes_llm.py`, `monitor_daemon.py`, `stress_test.py`, `hybrid_orchestrator.py`, `openclaw_integration.py`, а также `perf_test.py` и `test_full.py`); сам `orchestrator_v5.py` уже переведён на относительные пути `Path(__file__).parent`.
5. **Скиллы как md-контракты**: каждый скилл — человекочитаемый документ с командой, параметрами и примером вызова из WorkflowEngine; код-коннектор дублирует эту логику в Python.

---

## Навигация

[Обзор (README)](README.md) · [Характеристика и оценка](assessment.md) · [Рекомендации](recommendations.md) · [Вопросы](questions.md) · [Репозиторий на GitHub](https://github.com/svend4/data15)
