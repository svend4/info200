# Структура meta1

## Аннотированное дерево каталогов

```
meta1/
├── .claude/
│   ├── settings.json              # SessionStart-хук для Claude Code
│   └── hooks/
│       └── session-start.sh       # npm install при старте удалённой сессии (CLAUDE_CODE_REMOTE)
├── schemas/                       # 13 JSON-схем — контракты всех сущностей
│   ├── execution-plan.json        # схема плана исполнения (шаги, детерминизм, assertions)
│   ├── assertion.json             # проверки (file_exists, exit_code, http_response…)
│   ├── assertion-result.json
│   ├── dependency-fingerprint.json# слепок версий окружения (node, npm, deps)
│   ├── drift-vector.json          # описание обнаруженного дрейфа
│   ├── event.json                 # событие append-only журнала
│   ├── plan-lineage.json          # родословная поколений плана
│   ├── plan-signature.json
│   ├── protected-surface.json     # что LLM-ремонту запрещено трогать
│   ├── repair-request.json / repair-response.json  # контракт L3-ремонта через LLM
│   ├── run-summary.json           # итоговая сводка запуска
│   └── task-spec.json             # входная задача
├── scripts/
│   └── generate-types.js          # json-schema-to-typescript: схемы → src/types/generated
├── src/
│   ├── index.ts                   # публичный API (205 строк экспортов, помечены версиями v2.1…v4.4)
│   ├── core/                      # 117 модулей — всё ядро (см. таблицу ниже)
│   ├── cli/                       # 44 файла — команды CLI на commander, ~45 команд
│   │   └── index.ts               # точка входа `continuum`, .version('4.4.0')
│   ├── sandbox/
│   │   ├── types.ts               # интерфейс Sandbox (init/writeFile/readFile/exec)
│   │   ├── local.ts               # LocalSandbox — прямое исполнение на хосте
│   │   └── docker.ts              # DockerSandbox — изоляция через dockerode
│   ├── storage/
│   │   ├── events.ts              # append-only JSONL журнал событий
│   │   ├── runs.ts                # сохранение/загрузка RunSummary
│   │   └── query.ts               # выборки и статистика по запускам (v3.5)
│   └── types/                     # ручные типы + generated/ из схем
├── tests/                         # ~150 тест-файлов, vitest
│   ├── core/                      # 145 файлов *.test.ts — по тесту на модуль ядра
│   ├── sandbox/                   # docker.test.ts, local.test.ts
│   ├── storage/                   # тесты журнала/хранилища
│   ├── plan-cache.test.ts
│   └── planner.test.ts            # LLM мокается (vi.mock @anthropic-ai/sdk)
├── info                           # 1 строка: ссылка на первоисточник Asouei/continuum-runtime
├── README.md / README-ru.md       # двуязычный маркетинговый README (описывает v3.0!)
├── SCOPE.md                       # рамки MVP v2.1 — сильно устарел относительно кода
├── LICENSE                        # MIT
├── package.json                   # continuum-runtime@3.0.0 (не соответствует CLI v4.4.0)
├── package-lock.json
├── tsconfig.json                  # strict, ES2022, Node16 modules, declaration maps
└── vitest.config.ts               # globals: true, tests/**/*.test.ts
```

## Ключевые файлы и модули

| Файл/модуль | Что делает |
|---|---|
| `src/core/planner.ts` | Обращается к Anthropic API с жёстким системным промптом («Continuum Runtime Planner v3.0»), получает JSON-план; хэш промпта входит в ключ кэша и `planner_signature` |
| `src/core/plan-cache.ts` | Кэш планов: `hash(prompt+context)` → план без повторного вызова LLM, TTL |
| `src/core/executor.ts` (676 строк) | Исполняет шаги плана в песочнице; DAG-граф зависимостей, параллельное исполнение, таймауты шагов, хуки прогресса |
| `src/core/replayer.ts` (384 строки) | «Сердце» системы: повторное исполнение + сравнение sha256-хэшей артефактов; вердикты identical / benign_drift / drifted / healed / repair_failed |
| `src/core/asserter.ts` | Семантические проверки (файлы, exit-коды, HTTP-ответы) со стабильностью stable/flaky |
| `src/core/drift-detector.ts` | Обнаружение дрейфа окружения/зависимостей/артефактов/assertions и его классификация |
| `src/core/repair-cascade.ts` (283 строки) | Каскад починки L1 retry → L2 deterministic → L3 LLM → L4 manual |
| `src/core/repair-strategies.ts`, `repair-retry.ts`, `repair-compiler.ts` | Конкретные стратегии L2, повтор flaky-проверок, LLM-ремонт одного файла |
| `src/core/lineage.ts` | Поколения плана: original → benign_drift → deterministic repair → llm repair → manual edit |
| `src/core/hasher.ts`, `canonical-json.ts` | sha256-хэширование строк/буферов/объектов, канонический JSON |
| `src/core/validator.ts`, `deep-validate.ts`, `lint.ts`, `lint-engine.ts` | Валидация планов по схемам + расширяемый линтер (правила: пустой план, дубли step_id, unsafe-команды…) |
| `src/core/forensics.ts`, `forensics-diff.ts` | Запись HTTP/FS-активности шагов и сравнение «улик» между запусками |
| `src/core/config.ts`, `init.ts`, `doctor.ts`, `preflight.ts` | Конфиг-файл с профилями, инициализация проекта, самодиагностика, предполётные проверки (v3.1–v3.4) |
| `src/core/checkpoint.ts`, `run-snapshot.ts`, `workspace-snapshot.ts` | Чекпоинты исполнения, снапшоты запусков и воркспейса с откатом (v3.7–v4.4) |
| `src/core/run-queue.ts`, `rate-limiter.ts`, `resource-limiter.ts`, `run-isolation.ts` | Очередь запусков с приоритетами, ограничители, изолированные воркспейсы (v4.1–v4.3) |
| `src/core/access-control.ts` (272 строки) | RBAC: роли admin/operator/viewer/analyst, ACL, проверки прав (v4.4) |
| `src/core/plugin.ts`, `middleware.ts`, `event-bus.ts`, `webhook.ts` | Точки расширения: плагины before/after plan/step, middleware-конвейер, шина событий, вебхуки |
| `src/core/metrics.ts`, `timeline.ts`, `profiler.ts`, `cost-estimator.ts`, `narrative.ts` | Наблюдаемость: агрегированные метрики, таймлайн, профилирование ресурсов, оценка стоимости, «человеческий» пересказ запуска |
| `src/cli/index.ts` | Регистрация ~45 команд: run, execute, replay, explain, inspect, diff, list, freeze, cache, history, forensics, approve-drift, edit, bundle, graph, validate, cleanup, plan-diff, doctor, init, compose, status, lint, compare, search, metrics, timeline, export, archive, tag, deep-validate, audit, narrative, optimize, snapshot, workspace-diff, queue, version, template, estimate, env, merge, resolve-deps… |

## Особенности организации кода

1. **Schema-first**: JSON-схемы — источник истины, типы генерируются (`npm run generate-types`), рантайм-валидация через ajv. Это редкая для «инфо»-репозиториев профиля инженерная дисциплина.
2. **Версионная летопись прямо в коде**: `src/index.ts` сгруппирован комментариями `// v3.1: …`, `// v4.4: …` — по ним читается вся история фич; каждый коммит Claude добавлял ровно одну «пятёрку фич».
3. **Паттерн «модуль + тест»**: почти каждому из 117 модулей ядра соответствует свой файл в `tests/core/` (145 тестов), LLM и Docker мокируются.
4. **Строгий TypeScript**: `strict: true`, `noUnusedLocals/Parameters`, ESM (`type: module`, Node16 resolution), декларации и sourcemaps для публикации.
5. **Двойная песочница**: интерфейс `Sandbox` позволяет один и тот же план гонять локально (тесты) и в Docker (продакшен-изоляция).
6. **Рассинхронизация слоёв**: `package.json` = 3.0.0, CLI = 4.4.0, README описывает 10 команд из ~45, `SCOPE.md` — вообще MVP v2.1 и объявляет «вне рамок» то, что уже реализовано (параллельное исполнение шагов). Код убежал далеко вперёд документации.
