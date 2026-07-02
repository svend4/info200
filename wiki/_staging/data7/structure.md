# Структура data7

## Аннотированное дерево каталогов

Дерево восстановлено по листингам GitHub и точечному чтению файлов (полный клон недоступен, см. ограничения в [assessment.md](assessment.md)).

```
data7/
├── README.md                       # Витрина «MMO RPG Optimization Systems» (заявляет 95% и Production Ready)
├── README_MASTER.md                # «Интеллектуальная система управления научными знаниями» (рус., v2.0.0)
├── README_DISSERTATION_TSP.md      # README TSP-оптимизатора диссертаций
├── README_MVP.md                   # README MVP Meta-Orchestrator
├── QUICK_START.md / DEPLOYMENT_GUIDE.md / PRODUCTION_DEPLOYMENT_GUIDE.md
├── API_DOCUMENTATION.md            # Справочник API 5 игровых систем (~15 КБ)
├── CHANGELOG.md                    # История версий 1.0→4.5 (вся — за 04.02.2026)
│
│   # --- Подпроект 1: TSP-оптимизация диссертаций (рус.) ---
├── dissertation_tsp_theory.md      # 68 КБ теории: граф, когнитивная дистанция, теоремы
├── dissertation_optimizer.py       # 715 строк: жадный, 2-opt, simulated annealing, зависимости глав
├── dissertation_visualizer.py      # 444 строки: 6 типов графиков (matplotlib)
├── advanced_methods.py             # 725 строк: GA, NSGA-II, ML-интеграция (BERT/SBERT)
├── SALESMAN_GUIDE_RU.md / SALESMAN_PROJECT_SUMMARY.md / SUMMARY_ru.md
├── practical_guide_ru.md / case_studies_ru.md
│
│   # --- Подпроект 2: Трансформация знаний ---
├── knowledge_transformation_theory.md
├── knowledge_transformer.py        # 1287 строк: DissertationDecomposer, WikiAggregator, WikiDecomposer
├── KNOWLEDGE_SYSTEM_SUMMARY.md / KNOWLEDGE_SYSTEM_100_PERCENT_COMPLETE.md
│
│   # --- Подпроект 3: MMO RPG Optimization Systems ---
├── mmo_rpg_gamedesign_theory.md    # 45 КБ теории геймдизайна на TSP
├── mmo_rpg_mechanics.py            # 957 строк: SmartQuestLog, AIDirector, BurnoutDetector,
│                                   #   EconomyBalancer, SkillTreeOptimizer (без внешних зависимостей)
├── mmo_economy_simulation.py       # 652 строки: мультиагентная симуляция экономики (100 дней, 100 игроков)
├── extended_economy_analysis.py    # 304 строки: 10 прогонов, scale-тесты 50–500 игроков, 365 дней
├── simple_tsp_benchmark.py         # 190 строк: бенчмарки TSP (заявлено 900+ прогонов)
├── MMO_VALIDATION_REPORT.md / MMO_REAL_WORLD_ANALYSIS.md / MMO_REAL_WORLD_CASE_STUDIES.md
├── MMO_RPG_*_REPORT.md             # ~7 «финальных» отчётов (COMPLETION, FINAL, ULTIMATE, 100_PERCENT...)
│
│   # --- Подпроект 4: MMO AI Bridge ---
├── MMO_AS_AI_VISUAL_BRIDGE.md (+ PART2..PART4)   # концепция «третьего глаза» для LLM
├── mmo_ai_bridge_prototype.py      # 448 строк: TextToVisualTranslator
├── MMO_AI_BRIDGE_{50,75,85,95,100}_PERCENT_*.md  # серия процентных отчётов
├── MMO_AI_BRIDGE_COMPREHENSIVE_AUDIT.md / EXECUTIVE_SUMMARY.md / V1.1_RELEASE_SUMMARY.md
├── HABR_ARTICLE_RESPONSE.md        # публичный ответ на статью-критику NVIDIA (тема PR #2)
├── COMPETITIVE_ANALYSIS.md         # анализ 20+ конкурентов
├── DIFFUSION_LLM_INTEGRATION*.md / DIFFUSION_VFX_RENDERING*.md / DIFFUSION_META_ORCHESTRATOR*.md
├── mmo_ai_bridge_web/              # автономное мини-приложение
│   ├── server.py                   # 863 строки
│   ├── database.py / index.html / stats.html / animations.css
│   └── Dockerfile / docker-compose.yml / requirements.txt / README.md
│
│   # --- Подпроект 5: Meta-Orchestrator Switchboard (основной код) ---
├── TECHNICAL_SPEC_PART1..8*.md     # 8-частная спецификация: UML, API, схемы, события, 3D, roadmap
├── TECHNICAL_SPEC_PHASE4..8*.md    # спецификации фаз: WebSocket, Frontend, 3D, Advanced, Testing
├── PHASE_1..5_COMPLETE_SUMMARY.md / PHASE6..9_*.md  # отчёты по фазам
├── PROJECT_STATUS_CURRENT.md       # самоаудит: «48% Complete, TRL 4.0» (05.02.2026)
├── PROJECT_STATUS_v8.0.md          # самоаудит: «Concept & Design 95%, production code 0%» (04.02.2026)
├── PROJECT_STATUS_REPORT.md / PROJECT_COMPLETE_SUMMARY.md / COMPLETION_SUMMARY.md
├── backend/
│   ├── app/
│   │   ├── main.py                 # FastAPI: lifespan, CORS, Prometheus, Redis, 13+ роутеров
│   │   ├── api/                    # 15 модулей: agents, tasks, connections, graphs, optimization,
│   │   │                           #   analytics, alerts, reports, websocket, auth,
│   │   │                           #   tsp, multi_agent, knowledge, professional_simulator
│   │   ├── services/               # tsp_algorithms.py (1494 стр.: MultiDepot/Dynamic/Stochastic/
│   │   │                           #   Hierarchical TSP, 2-opt, SA, ACO, GA),
│   │   │                           #   multi_agent_coordinator.py (463), knowledge_mmo_integration.py (597),
│   │   │                           #   graph_optimizer, alert_manager, metrics_collector,
│   │   │                           #   multi_criteria_optimizer, report_generator, ai_knowledge_to_mmo
│   │   ├── simulators/             # base.py (476) + healthcare (1000), logistics, manufacturing,
│   │   │                           #   retail, social_domestic
│   │   ├── auth/ cache/ core/ domain/ infrastructure/ middleware/ schemas/ websocket/
│   ├── tests/
│   │   ├── unit/                   # 7 файлов: tsp_algorithms, multi_agent_coordinator, simulators...
│   │   ├── integration/ load/ websocket/ + conftest.py
│   ├── alembic/ + alembic.ini      # миграции PostgreSQL
│   ├── examples/                   # 9 файлов примеров API (tsp, multi_agent, симуляторы...)
│   ├── requirements.txt            # FastAPI 0.109, SQLAlchemy 2, asyncpg, Redis, Celery, sklearn, networkx
│   ├── requirements-test.txt / requirements-phase9.txt / pytest.ini / Dockerfile
│   └── API_EXAMPLES.md / DATABASE_SETUP.md / README.md
├── frontend/
│   ├── src/                        # api, components, context, hooks, pages, services, store,
│   │   │                           #   styles, types, websocket; App.tsx, main.tsx
│   ├── e2e/                        # Playwright
│   ├── package.json                # React 18, Zustand, Three.js/@react-three, Recharts, Vitest
│   └── Dockerfile / nginx.conf / vite.config.ts / tsconfig.json
│
│   # --- Инфраструктура ---
├── .github/workflows/ci-cd.yml    # линтеры, security-сканы, тесты с coverage, frontend-джоба
├── docker-compose.yml              # postgres:16 + backend + frontend (redis/celery закомментированы)
├── docker/docker-compose.yml
├── monitoring/                     # prometheus/, grafana/
├── scripts/                        # setup.sh, backup.sh, restore.sh, setup-backup-cron.sh
├── Makefile                        # build/up/down/logs/test-* через docker-compose
└── .env.example / .gitignore
```

## Ключевые файлы и модули

| Файл/модуль | Строк | Что делает |
|---|---|---|
| `backend/app/main.py` | ~150 | Точка входа FastAPI «Art Deco Switchboard»: lifespan (БД, Redis), Prometheus-middleware, подключение всех роутеров |
| `backend/app/services/tsp_algorithms.py` | 1494 | Библиотека TSP: multi-depot, динамический, стохастический, иерархический TSP; 2-opt, simulated annealing, муравьиный, генетический алгоритмы |
| `backend/app/api/tsp.py` | 410 | REST-обёртка над TSP-библиотекой (Pydantic-модели запросов/ответов) |
| `backend/app/services/multi_agent_coordinator.py` | 463 | Координация мультиагентных сценариев |
| `backend/app/services/knowledge_mmo_integration.py` | 597 | Мост «научные знания → игровые представления» |
| `backend/app/simulators/healthcare_simulator.py` | 1000 | Крупнейший из 5 профессиональных симуляторов (Paradigm 2) |
| `knowledge_transformer.py` | 1287 | Декомпозиция диссертаций → сегменты → агрегация в вики-статьи (PageRank по графу концептов) и обратный синтез идей |
| `mmo_rpg_mechanics.py` | 957 | 5 игровых систем; чистый Python без зависимостей, импортирует dissertation_optimizer |
| `dissertation_optimizer.py` | 715 | TSP-оптимизация порядка глав: жадный, 2-opt, SA, поддержка зависимостей, экспорт JSON |
| `advanced_methods.py` | 725 | GA, многокритериальная NSGA-II, ML-эмбеддинги |
| `mmo_economy_simulation.py` | 652 | Мультиагентная симуляция игровой экономики (источник заявленных цифр валидации) |
| `mmo_ai_bridge_web/server.py` | 863 | Веб-сервер прототипа MMO AI Bridge (с собственной БД и Docker) |
| `.github/workflows/ci-cd.yml` | ~200+ | CI: postgres-сервис, black/isort/flake8/mypy, bandit/safety, pytest unit+integration+coverage, фронтенд-джоба |

## Особенности организации кода

1. **Монорепо без разделения на пакеты в корне**: корневые прототипы лежат плоско рядом с ~90 отчётами, из-за чего корень репозитория трудночитаем; «настоящая» инженерия спрятана в `backend/` и `frontend/`.
2. **Документация многократно превышает код по числу файлов**: на каждый этап — отдельный отчёт (часто по 2–5 «финальных» на один подпроект), плюс 8-частные техспецификации.
3. **Три поколения кода**: (а) автономные прототипы без зависимостей, (б) веб-мини-приложение `mmo_ai_bridge_web`, (в) production-стиль FastAPI со слоями api/services/domain/infrastructure, DI, Alembic и тестами.
4. **Взаимные импорты подпроектов**: `mmo_rpg_mechanics.py` пытается импортировать `dissertation_optimizer` (try/except), а сервис `knowledge_mmo_integration.py` связывает трансформатор знаний с MMO-представлением — сквозная идея прослеживается и в коде.
5. **Двуязычие**: теория и гайды по диссертациям — на русском; MMO- и backend-часть — на английском.
6. **Названия-метафоры**: «Art Deco Switchboard» (телефонная станция 1920-х) как визуальная метафора мультиагентного оркестратора, вплоть до цветовой темы (Gold #D4AF37, Bronze #CD7F32).
