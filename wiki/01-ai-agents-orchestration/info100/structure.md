# Структура info100

## Аннотированное дерево каталогов

```
info100/
├── .github/
│   └── workflows/
│       └── evolve.yml                    # CI «Full Evolution Cycle (Variant C)»: 4 стадии
│                                         # (collect → synthesize → validate → report),
│                                         # cron 0 4 * * * + workflow_dispatch, коммиты от Evolution Bot
├── .github-workflow-example.yml          # упрощённый черновик workflow (только ingest), лежит в корне
├── .gitignore                            # игнор Python-артефактов, temp-файлов экспериментов, секретов
├── README.md                             # манифест «Эволюционной лаборатории агентов» (по-русски)
├── requirements.txt                      # requests, pyyaml, networkx, python-dotenv
├── test-info-mod.md                      # тестовый файл от 2026-04-21: проверка записи через Fine-grained PAT
│
├── agents/                               # ЭКОСИСТЕМА АГЕНТОВ (декларативная)
│   ├── README.md                         # жизненный цикл: core → evolved → tested/retired; формат генома
│   └── core/
│       └── base-collector.yaml           # единственный агент: базовый сборщик, fitness_score 1.0 (эталон)
│                                         # (заявленные evolved/ и variants/ ОТСУТСТВУЮТ)
│
├── pipelines/                            # ИСПОЛНЯЕМЫЙ КОД (6 скриптов)
│   ├── ingest/
│   │   ├── info1-collector.py            # сбор svend4/info1 через GitHub API: дерево, README,
│   │   │                                 # эвристическое извлечение «методологии» по заголовкам
│   │   └── data70-collector.py           # сбор svend4/data70: поиск проектов по ключевым словам
│   │                                     # (TetraDrone, WILOS, ...), обновление графа связей
│   ├── synthesize/
│   │   ├── skill-generator.py            # ранний генератор по шаблону; НЕ РАБОТАЕТ как задумано:
│   │   │                                 # string.Template ($-синтаксис) не подставляет {{ }}-плейсхолдеры
│   │   └── skill-synthesizer.py          # основной синтезатор: методология + граф → YAML-скилл + Python-код,
│   │                                     # лог в meta/evolution-log/
│   ├── validate/
│   │   └── skill-tester.py               # 3 теста (syntax/import/functional), fitness = взвешенная сумма,
│   │                                     # раскладка по tested/ | generated/ | retired/
│   └── report/
│       └── issue-reporter.py             # сводный отчёт об эволюции в GitHub Issue (создаёт/обновляет)
│
├── knowledge/                            # БАЗА ЗНАНИЙ (данные)
│   ├── README.md                         # заявлен поток raw/ → processed/ → methods/ → graph/
│   │                                     # (папки processed/ НЕТ)
│   ├── graph/
│   │   └── concepts.json                 # мини-граф: 5 узлов (методология, TetraDrone, WILOS, ...) и 4 ребра
│   ├── methods/
│   │   └── parallel-bidirectional.yaml   # единственная методология («параллельное двунаправленное
│   │                                     # развитие» из info1): 3 концепции, 2 паттерна
│   └── raw/
│       ├── info1/                        # результат info1-collector:
│       │   ├── .structure.json           #   дерево info1: 437 файлов + 97 папок = 534 объекта
│       │   ├── .methodology.json         #   4 найденные «концепции» (заголовки с «методолог»)
│       │   ├── .meta.yaml                #   метаданные сбора (2026-04-17)
│       │   └── README.md                 #   копия README info1
│       └── data70/                       # результат data70-collector:
│           ├── .meta.yaml                #   найденные проекты: TetraDrone, WILOS, drone, робот, AI
│           ├── .structure.json
│           └── content/                  #   17 файлов: MANIFEST, README, analysis_01..05,
│                                         #   analysis_1105_conversations, part10–part14, infom_*.json
│
├── skills/                               # АРТЕФАКТЫ СИНТЕЗА
│   ├── templates/
│   │   └── skill-template.yaml           # шаблон скилла с {{ }}-плейсхолдерами (Jinja-стиль)
│   ├── generated/                        # 2 скилла, каждый — пара .yaml + .py:
│   │   ├── parallel-agent-20260417.{yaml,py}
│   │   └── test-debug.{yaml,py}
│   └── tested/
│       └── test-agent-v1.yaml            # единственный «выживший»: fitness_score 1.0
│                                         # (упоминаемой retired/ в репозитории НЕТ — создаётся в рантайме)
│
├── experiments/                          # ДАТИРОВАННЫЕ ЭКСПЕРИМЕНТЫ
│   ├── init.py                           # (не __init__.py — имя нестандартное)
│   └── 20250417-info1-structure-analysis/
│       └── README.md                     # отчёт эксперимента 001; в имени папки опечатка года
│                                         # (2025 вместо 2026 — сам отчёт датирован 2026-04-17)
│
├── benchmarks/                           # БЕНЧМАРКИ
│   ├── run.py                            # раннер-ЗАГЛУШКА: «симуляция тестов», success_rate захардкожен 0.5
│   ├── tasks/
│   │   └── standard-tasks.yaml           # 3 задачи: parse-structure, extract-concepts, generate-skill
│   └── results/
│       └── test-run-20260417-214133.json # единственный реальный прогон skill-tester: 1 скилл, fitness 1.0
│
└── meta/                                 # МЕТА-ИНФОРМАЦИЯ ЭВОЛЮЦИИ
    ├── last-report.json                  # ссылка на Issue #1 (создан 2026-04-17)
    └── evolution-log/
        └── 20260417-synthesis.jsonl      # 4 события skill_synthesized (все от 2026-04-17)
```

## Ключевые файлы и модули

| Файл | Что делает |
|---|---|
| `.github/workflows/evolve.yml` | Оркестратор всего цикла: 4 job'а с передачей артефактов, автокоммиты `[auto-collect]` / `[auto-synthesize]` / `[auto-evolution]`, пост отчёта в Issues. Ежедневный cron 4:00 UTC (фактически не срабатывает с 21.04.2026). |
| `pipelines/ingest/info1-collector.py` (~160 строк) | Класс `Info1Collector`: тянет дерево репо `svend4/info1` через GitHub API (`git/trees/...?recursive=1`), классифицирует файлы (md/код/прочее), скачивает README, эвристикой ищет заголовки со словом «методолог», пишет `.structure.json`, `.methodology.json`, `.meta.yaml`. |
| `pipelines/ingest/data70-collector.py` (~215 строк) | Класс `Data70Collector`: аналогичный сбор `svend4/data70`, поиск упоминаний проектов по списку ключевых слов, сводки первых 50 строк файлов, обновление `knowledge/graph/concepts.json`. |
| `pipelines/synthesize/skill-synthesizer.py` (~235 строк) | Класс `SkillSynthesizer`: методология + связанные узлы графа → YAML-манифест скилла (genome, interface, implementation) + сгенерированный Python-класс `<Имя>Skill` с методами `process()`/`validate()`; логирует событие в JSONL. |
| `pipelines/synthesize/skill-generator.py` (~80 строк) | Ранняя версия того же (класс тоже назван `SkillSynthesizer` — конфликт имён); заполняет `skill-template.yaml` через `string.Template`, что несовместимо с `{{ }}`-плейсхолдерами шаблона — подстановка не происходит. |
| `pipelines/validate/skill-tester.py` (~280 строк) | Класс `SkillTester`: тесты синтаксиса (compile), импорта (importlib) и функциональный (вызов `process({"action": "test"})`); fitness = 0.3·syntax + 0.3·import + 0.4·functional (+0.1 бонус за скорость <100 мс); перемещает YAML между `generated/`, `tested/`, `retired/`; пишет отчёт в `benchmarks/results/`. |
| `pipelines/report/issue-reporter.py` (~225 строк) | Класс `IssueReporter`: собирает статистику скиллов и лог эволюции, генерирует markdown-отчёт, создаёт/обновляет Issue с меткой `evolution-report`, сохраняет `meta/last-report.json`. |
| `benchmarks/run.py` (~75 строк) | `BenchmarkRunner` — заглушка: «тестирует» скиллы симуляцией (tasks_completed = половина задач, success_rate = 0.5). Реальную работу выполняет skill-tester, а не этот раннер. |
| `knowledge/methods/parallel-bidirectional.yaml` | Единственная «перегнанная» методология: параллельное двунаправленное развитие (макро/микро, top-down + bottom-up), источник — info1; статус `extracted`. |
| `skills/tested/test-agent-v1.yaml` | Полный «геном» протестированного скилла: происхождение, мутации, результаты тестов, встроенный Python-код. Заметен баг: `test_results.functional.passed: "default"` — строка вместо булева значения. |

## Особенности организации кода

- **Данные и код в одном репо**: `knowledge/`, `skills/`, `experiments/`, `benchmarks/results/`, `meta/` — это генерируемые артефакты, которые бот коммитит обратно в репозиторий; собственно исходный код — только `pipelines/` (+ конфиги агентов).
- **Всё скриптовое, без пакета**: нет `setup.py`/`pyproject.toml`, нет пакетной структуры (`__init__.py` отсутствуют; в `experiments/` лежит файл `init.py` без подчёркиваний); скрипты рассчитаны на запуск из корня репозитория (пути типа `Path("knowledge/methods")` захардкожены относительными).
- **Дублирование**: `skill-generator.py` и `skill-synthesizer.py` решают одну задачу, оба содержат класс `SkillSynthesizer`; README ссылается на устаревший `skill-generator.py`.
- **Сборщики не универсальны**: имена репозиториев (`info1`, `data70`) и эвристики захардкожены в отдельных скриптах, хотя `agents/core/base-collector.yaml` декларирует параметризуемого универсального сборщика.
- **Русскоязычные комментарии и документация** при английских идентификаторах — единый стиль всего профиля svend4.

---

## См. также

- [Обзор (README)](README.md)
- [Характеристика и оценка](assessment.md)
- [Рекомендации](recommendations.md)
- [Вопросы](questions.md)
- Репозиторий: https://github.com/svend4/info100
