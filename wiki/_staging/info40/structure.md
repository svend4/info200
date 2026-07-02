# Структура info40

Дерево проверено по факту (raw-файлы + листинги GitHub). Отмечены расхождения с «официальной» структурой из `PROJECT_SUMMARY.md`.

```
info40/
├── README.md                       # Главная витрина (~430 строк): обещания, quick start, архитектура
├── AI_AGENT_ORCHESTRATION.md       # Концепт-документ, 1 040 строк (в README заявлено «15 000+» — неверно)
├── ARCHITECTURE.md                 # 632 строки, Mermaid-диаграммы: компоненты, потоки, безопасность
├── PROJECT_SUMMARY.md              # Итоговая статистика проекта (частично не совпадает с реальностью)
├── CONTRIBUTING.md                 # 659 строк: setup, code style, PR-процесс
├── CHANGELOG.md                    # 230 строк, версия 1.0.0 от 31.01.2026
├── SECURITY.md                     # 258 строк, security policy
├── LICENSE                         # MIT
├── Makefile                        # 382 строки, 74 цели (install, docker-*, k8s-*, test, lint...)
│
├── api/                            # 4 FastAPI-сервиса — ВСЕ на in-memory хранилищах
│   ├── api_gateway/main.py         # 582 стр.: httpx-прокси, rate limiter в памяти, health
│   ├── registry_service/main.py    # 506 стр.: CRUD агентов, Pydantic-модели, mock-auth "user-123"
│   ├── marketplace_service/main.py # 712 стр.: поиск, контракты, отзывы; mock data stores
│   └── orchestrator_service/main.py# 761 стр.: эвристическая декомпозиция, DAG, назначение агентов
│
├── workers/
│   └── agent_worker.py             # 487 стр.: ABC AgentWorker + Prometheus-метрики;
│                                   #   примеры агентов имитируют работу asyncio.sleep
├── sdk/
│   ├── agent_platform_sdk/
│   │   ├── __init__.py             # 65 стр.
│   │   ├── client.py               # 233 стр.: async aiohttp-клиенты (marketplace, tasks, agents)
│   │   ├── models.py               # 113 стр.: dataclass-модели
│   │   └── exceptions.py           # 38 стр.
│   ├── setup.py                    # pip-пакет agent-platform-sdk 1.0.0 (url — вымышленный)
│   └── README.md                   # 195 стр.
│
├── cli/
│   ├── agent_platform_cli.py       # 556 стр.: Typer + Rich (agents/tasks/marketplace/contracts)
│   └── README.md                   # 268 стр.
│
├── examples/                       # 3 сквозных примера + README (325 стр.)
│   ├── 01_register_agent.py        # 267 стр.
│   ├── 02_orchestrate_task.py      # 541 стр.
│   └── 03_marketplace.py           # 630 стр.
│
├── database/
│   ├── schema.sql                  # 576 стр. (заявлено «~1 400»): 9 таблиц, GIN-индексы, триггеры, view
│   ├── seed.sql                    # 667 стр.: тестовые данные
│   └── README.md                   # 554 стр.
│
├── k8s/                            # 13 манифестов (в PROJECT_SUMMARY каталог назван «kubernetes/»)
│   ├── 01-namespace.yaml ... 13-monitoring.yaml
│   │                               # postgres, redis, rabbitmq, 3 сервиса, sandbox, ingress, мониторинг
│   └── README.md                   # 492 стр.
│
├── helm/agent-platform/
│   ├── Chart.yaml                  # v1.0.0
│   ├── values.yaml                 # 457 стр.
│   ├── values-production.yaml      # ЗАЯВЛЕН в PROJECT_SUMMARY, но ОТСУТСТВУЕТ (404)
│   └── templates/                  # 13 шаблонов: deployments, hpa, ingress, rbac, secrets...
│
├── docker/                         # (в PROJECT_SUMMARY описаны подкаталоги — на деле плоские файлы)
│   ├── Dockerfile.api-gateway / .registry-service / .marketplace-service
│   │   / .orchestrator-service / .agent-worker / .python-agent
│   ├── docker-compose.yaml         # 333 стр.: полный стек (PG, Redis, RabbitMQ, 4 сервиса, воркеры)
│   ├── docker-compose.monitoring.yml
│   ├── requirements/               # base/api-gateway/registry/marketplace/orchestrator/agent-worker.txt
│   └── README.md
│
├── tests/                          # ФАКТИЧЕСКИ 3 теста + load (в PROJECT_SUMMARY заявлено 7 файлов)
│   ├── unit/test_registry_service.py        # 325 стр. — НЕ соответствует реальному API сервиса
│   ├── integration/test_orchestration_workflow.py  # 484 стр.
│   ├── e2e/test_complete_platform.py
│   ├── load/locustfile.py          # 451 стр.: Locust-сценарии
│   ├── pytest.ini, requirements.txt, README.md
│
├── monitoring/
│   ├── prometheus/                 # prometheus.yml (246), alerts.yml (340), recording_rules.yml
│   ├── alertmanager/config.yml     # 106 стр.
│   ├── grafana-dashboards/         # 3 JSON: platform-overview, agent-performance, task-execution
│   └── README.md
│
├── scripts/
│   ├── deploy.sh                   # 325 стр.: автоматизированный деплой
│   ├── setup_db.sh                 # 66 стр.
│   └── check_health.sh             # 84 стр.
│
├── use-cases/                      # 5 художественно-детальных сценариев с вымышленными метриками
│   ├── 01_academic_research.md     # мета-анализ, «87% экономии»
│   ├── 02_startup_mvp.md           # FinTech MVP, «$500K seed»
│   ├── 03_content_marketing.md     # «2 300% ROI»
│   ├── 04_medical_research.md      # drug discovery, «2 патента»
│   └── 05_legal_contract_review.md # M&A due diligence, «$48M скрытых обязательств»
│
└── .github/
    ├── workflows/ci.yml            # 290 стр.: lint, тесты с PG/Redis, сборка — ссылается на несуществующий src/
    ├── ISSUE_TEMPLATE/
    └── PULL_REQUEST_TEMPLATE.md
```

## Ключевые файлы и модули

| Файл | Строк | Что делает |
|---|---|---|
| `api/orchestrator_service/main.py` | 761 | Ядро идеи: `decompose_task()` — эвристики разбиения (подзадача на capability, координация при >3 capabilities, подготовка данных для data/ML-задач), `build_execution_graph()` — DAG с уровнями, `assign_agents_to_subtasks()` — выбор по рейтингу из mock-пула |
| `api/marketplace_service/main.py` | 712 | Поиск агентов по capability/цене/рейтингу, контракты аренды, отзывы, топ-категории (mock) |
| `api/api_gateway/main.py` | 582 | Проксирование httpx с таймаутами, простой rate limiter в памяти, единая точка `/docs` |
| `api/registry_service/main.py` | 506 | Регистрация агентов: валидация ценообразования (commercial требует hourly_rate), статусы, health/ready |
| `cli/agent_platform_cli.py` | 556 | Полноценный CLI: таблицы Rich, JSON-режим, интерактивные подтверждения |
| `workers/agent_worker.py` | 487 | Базовый класс воркера: поллинг (заглушка), семафор конкурентности, Prometheus-метрики, `report_progress()` |
| `database/schema.sql` | 576 | 9 таблиц (users, api_keys, agents, tasks, subtasks, rental_contracts, reviews, transactions, audit_logs), GIN-индексы включая триграммный поиск по имени |
| `sdk/agent_platform_sdk/client.py` | 233 | `PlatformClient` — async context manager, суб-клиенты marketplace/tasks/agents |
| `tests/load/locustfile.py` | 451 | Сценарии нагрузки: заказчики, владельцы агентов, «браузеры» marketplace |
| `.github/workflows/ci.yml` | 290 | lint (black/isort/flake8/mypy), pytest с сервисами PG+Redis, сборка образов — конфиг не подогнан под фактическую структуру |

## Особенности организации кода

- **Монолитные main.py**: каждый сервис — один файл со всеми моделями, хранилищем и эндпоинтами; слоёв (repository/service/router) нет.
- **Дублирование моделей**: Pydantic-модели агентов/задач повторяются в каждом сервисе и в SDK независимо, без общего пакета — уже разошлись (тесты используют третью, несовместимую версию схемы).
- **Инфраструктура «на вырост»**: PostgreSQL/Redis/RabbitMQ присутствуют в схеме БД, docker-compose, k8s и Helm, но код сервисов к ним не подключён — хранение в словарях процесса.
- **Комментарии-маркеры**: код честно размечен «In production, this would…» — границы прототипа видны изнутри, хотя README их не признаёт.
- **Двуязычие**: документация и docstrings частично на русском, код и инфраструктура — на английском.
