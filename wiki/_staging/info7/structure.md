# Структура info7

## Аннотированное дерево каталогов

Дерево восстановлено по листингам GitHub и прямому скачиванию ~94 файлов кода (замеры строк — фактические, по curl + wc; покрытие практически полное).

```
info7/
├── package.json                  # корень монорепо: npm workspaces, скрипты build/test/lint по пакетам
├── pnpm-workspace.yaml           # параллельно объявлен pnpm-workspace (двойственность npm/pnpm)
├── tsconfig.json                 # общий strict-конфиг TS (ES2020, composite, decorators)
├── LICENSE                       # MIT
├── .gitignore
│
├── ~38 markdown-документов в корне, в т.ч.:
│   ├── README.md / README.ru.md          # витрина: «Production-Ready AI Platform, 99.5%»
│   ├── FINAL_STATUS.md                   # самоотчёт: «100%, PRODUCTION READY, ~31k LOC»
│   ├── SYSTEM_AUDIT.md                   # самоаудит: «92%, ~25k LOC» (противоречит FINAL_STATUS)
│   ├── QUICK_START_GUIDE.md              # быстрый старт (457 строк; велит npm install — не сработает)
│   ├── IMPORT_EXPORT_GUIDE.md            # 4003 строки: экспорт/импорт данных всех подсистем в JSON
│   ├── ARCHITECTURE.md / ARCHITECTURE_DIAGRAMS.md  # ASCII- и Mermaid-диаграммы трёх систем
│   ├── PROJECT_STRUCTURE.md              # карта файлов (устарела: описывает только доки, без packages/)
│   ├── LEONARDO_AI_DETAILED.md / LEONARDO_AI_PART2.md / LEONARDO_AI_RL_OPTIMIZATION.md
│   ├── PHILOSOPHICAL_ANALYSIS.md         # «Физики и лирики»: Дон Кихот vs Санчо Панса (2618 строк)
│   ├── OPENCLAW_VS_ORCHESTRATOR_DETAILED.md, PRACTICAL_COMPARISON_EXAMPLES.md,
│   │   PRACTITIONER_VS_THEORIST_ANALYSIS.md, FOUR_SYSTEMS_ANALYSIS_PART2/3.md
│   ├── IMPLEMENTATION_ROADMAP.md / _FINAL.md, ROADMAP_VISUAL.md (таймлайн 2022–2035),
│   │   CURRENT_DEVELOPMENT_STAGE.md, SESSION_SUMMARY_2026-02-07.md
│   ├── NEW_AGENTS_STRUCTURE.md, INTEGRATION_GUIDE.md, example-*.md (3 файла-примера агентов)
│   ├── FAQ.md, CONTRIBUTING.md, CODE_OF_CONDUCT.md, SECURITY.md, CHANGELOG.md, PULL_REQUEST.md
│   └── PROJECT_SUMMARY.md, QUICK_REFERENCE.md, EXECUTIVE_SUMMARY.md
│
├── .github/
│   ├── ISSUE_TEMPLATE/          # bug_report, feature_request, question
│   └── pull_request_template.md # CI-workflows НЕТ
│
├── packages/
│   ├── common/                  # @info7/common — общие утилиты (~2 350 строк)
│   │   └── src/
│   │       ├── config/config-manager.ts   (323)  # конфиг с валидацией zod, env
│   │       ├── logging/logger.ts          (315)  # обёртка winston
│   │       ├── errors/app-error.ts        (431)  # иерархия ошибок (AppError, ValidationError…)
│   │       ├── validation/validator.ts    (326)  # zod-валидаторы
│   │       ├── health/health-check.ts     (372)  # health-чеки
│   │       └── metrics/metrics-collector.ts (561) # счётчики/гистограммы в памяти
│   │
│   ├── info7/                   # «активная база знаний» (~2 940 строк)
│   │   │                        # !!! НЕТ package.json и tsconfig.json — пакет не собирается
│   │   └── src/
│   │       ├── knowledge-graph/
│   │       │   ├── types.ts                  (288)  # 9 типов узлов, 12 типов связей
│   │       │   └── knowledge-graph-engine.ts (1034) # граф в Map: CRUD, обход, пути, центральность,
│   │       │                                        # «семантический» поиск (embedding = заглушка
│   │       │                                        # из кодов символов, см. generateEmbedding)
│   │       ├── auto-update/
│   │       │   ├── types.ts               (237)
│   │       │   └── auto-update-system.ts  (656)  # 6 типов источников, разрешение конфликтов (симуляция)
│   │       └── knowledge-graph-example.ts (696)
│   │
│   ├── leonardo-ai/             # @info7/leonardo-ai v2.0.0 — «самообучающийся ИИ» (~10 270 строк)
│   │   ├── package.json         # deps: @tensorflow/tfjs-node, openai, pinecone, zod
│   │   ├── vitest.config.ts     # конфиг тестов есть, самих тестов — НОЛЬ
│   │   └── src/
│   │       ├── index.ts         # !!! экспортирует './example' — файла НЕТ, tsc упадёт
│   │       ├── rl/              (~2 350)  # RL: leonardo-rl-engine, policy-network и value-network
│   │       │                             # (реальные сети на TF.js), reward-calculator,
│   │       │                             # experience-buffer, exploration-strategy, example.ts
│   │       ├── rag/             (~1 850)  # rag-engine, embedding-service (реальный клиент OpenAI +
│   │       │                             # cohere/HF-заглушки), vector-store (Pinecone/in-memory),
│   │       │                             # document-processor, context-injector
│   │       ├── bridge/          (~860)   # integration-bridge (680): мост к Orchestrator/OpenClaw
│   │       ├── meta-learning/   (~1 180)  # meta-learner (662), learning-strategy (401): 5 стратегий
│   │       ├── consciousness/   (~1 220)  # consciousness.ts (968): рефлексия, объяснения решений
│   │       ├── corpus-callosum/ (~1 030)  # corpus-callosum.ts (772): синхронизация RAG ↔ граф знаний
│   │       └── *-example.ts     (~1 750)  # 4 демонстрационных сценария
│   │
│   ├── openclaw-meta-agents/    # @info7/openclaw-meta-agents (~4 930 строк)
│   │   └── src/
│   │       ├── types.ts                (387)
│   │       ├── core/task-manager.ts    (294)  # очередь задач, uuid
│   │       ├── core/base-agent.ts      (207)
│   │       ├── coordinator/meta-agent-coordinator.ts (443) # 5 стратегий координации
│   │       ├── coordinator/task-decomposer.ts        (337)
│   │       ├── coordinator/agent-selector.ts         (261)
│   │       ├── hierarchy/hierarchy-coordinator.ts    (806) # 5-уровневая иерархия агентов
│   │       ├── agents/legal|medical|finance-agent.ts (257/191/185) # правила + шаблонные ответы
│   │       └── example / integration-example / hierarchy-example (~1 240)
│   │
│   └── orchestrator-kit-enterprise/  # (~11 170 строк) — самый большой пакет
│       └── src/
│           ├── types.ts                       (513)
│           ├── multi-tenancy/tenant-manager.ts (490)  # тарифы, лимиты; всё in-memory
│           ├── multi-tenancy/user-manager.ts   (470)
│           ├── rbac/access-control.ts          (320)  # роли/права, декораторы RequirePermission
│           ├── audit/audit-logger.ts           (376)
│           ├── agents/                         # 10 «профессиональных агентов» в 8 доменах:
│           │   ├── legal/contract-lawyer.ts (564), immigration-specialist.ts (1004)
│           │   ├── social/benefits-calculator.ts (492)
│           │   ├── healthcare/medical-diagnosis-assistant.ts (703), mental-health-counselor.ts (855)
│           │   ├── financial/investment-advisor.ts (913)
│           │   ├── education/career-counselor.ts (1106)
│           │   ├── domestic/home-manager.ts (635), care/elderly-care.ts (597),
│           │   └── wellness/nutrition-advisor.ts (741)
│           └── example / integration-example / agents-example (~1 300)
│
└── openclaw-security/           # «инициатива безопасности OpenClaw»
    ├── README.md / README.ru.md # «230+ вредоносных скиллов, ущерб $2.3M» (данные не верифицируемы)
    ├── SECURITY_AUDIT.md        # каталог «угроз» по 5 категориям
    ├── SANDBOX_IMPLEMENTATION.md
    └── packages/sandbox/        # @openclaw/sandbox v0.1.0
        ├── package.json         # !!! зависимость vm2 ^3.9.19 — пакет vm2 официально
        │                        # заброшен из-за неустранимых sandbox-escape уязвимостей
        └── src/ (sandbox.ts, resource-monitor.ts, types.ts, index.ts)
```

## Ключевые файлы и модули

| Файл/модуль | Строк | Что делает |
|---|---|---|
| `packages/info7/src/knowledge-graph/knowledge-graph-engine.ts` | 1034 | Ядро графа знаний: узлы/рёбра в Map, индексы по типу/тегу/метке, обход, поиск путей, центральность, кэш запросов. `generateEmbedding()` — заглушка: вектор из char-кодов текста («in production would use actual embedding model») |
| `packages/leonardo-ai/src/rl/leonardo-rl-engine.ts` | 384 | RL-цикл: policy/value-сети (TF.js), выбор действий, обучение на опыте |
| `packages/leonardo-ai/src/rag/embedding-service.ts` | 228 | Единственное место с реальным вызовом внешнего API (OpenAI embeddings); cohere/HF — ветки-заглушки |
| `packages/leonardo-ai/src/consciousness/consciousness.ts` | 968 | «Слой сознания»: рефлексия, калибровка уверенности, объяснения в 4 стилях — эвристики над метриками |
| `packages/leonardo-ai/src/corpus-callosum/corpus-callosum.ts` | 772 | Двусторонняя синхронизация «RAG-документы ↔ узлы графа знаний» |
| `packages/leonardo-ai/src/bridge/integration-bridge.ts` | 680 | Мост Leonardo ↔ Orchestrator/OpenClaw: обмен задачами и опытом |
| `packages/openclaw-meta-agents/src/hierarchy/hierarchy-coordinator.ts` | 806 | 5-уровневая иерархия: делегирование, эскалация, обнаружение «бутылочных горлышек» |
| `packages/orchestrator-kit-enterprise/src/agents/education/career-counselor.ts` | 1106 | Самый большой агент: карьерные рекомендации по захардкоженной таблице полей/навыков и if-правилам |
| `packages/orchestrator-kit-enterprise/src/multi-tenancy/tenant-manager.ts` | 490 | Аренды, тарифные планы, лимиты — всё in-memory, без БД |
| `packages/common/src/metrics/metrics-collector.ts` | 561 | Метрики (counters/gauges/histograms) в памяти |
| `openclaw-security/packages/sandbox/src/sandbox.ts` | — | Sandbox исполнения скиллов поверх vm2 (устаревшая, уязвимая библиотека) |
| `FINAL_STATUS.md`, `SYSTEM_AUDIT.md` | — | Самоотчёты со взаимно противоречивыми цифрами (100% vs 92%; 31k vs 25k LOC) |

## Особенности организации кода

- **Единый шаблон пакета**: `types.ts` (обширные интерфейсы) → движок/менеджеры → `index.ts` с реэкспортами → крупные example-файлы. Примеры суммарно ~5,7 тыс. строк (18% кода).
- **Ни одного тестового файла** при наличии vitest-конфигов и test-скриптов во всех package.json — проверено точечно по всем src-каталогам.
- **Всё in-memory**: ни одна подсистема не пишет на диск/в БД; персистентность делегирована ручному JSON-экспорту (IMPORT_EXPORT_GUIDE.md).
- **Смешение менеджеров пакетов**: npm workspaces в скриптах + pnpm-протокол `workspace:*` в зависимостях — `npm install` из README гарантированно падает (EUNSUPPORTEDPROTOCOL); работать может только pnpm.
- **Пакет-инвалид**: `packages/info7` без package.json/tsconfig — вероятно, забыли закоммитить; в корневых скриптах build:info7 тоже отсутствует.
- Документация в корне по объёму сопоставима с кодом и содержит несколько поколений самоописаний, не синхронизированных между собой (PROJECT_STRUCTURE.md вообще описывает репозиторий до появления кода).
