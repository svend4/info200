# Структура robot

## Дерево репозитория (корень, 17 файлов)

```text
robot/
├── README.md                                # 2 строки: «# robot / info» — ничего не объясняет
│
│  ── Документы концепции (копии из архива 1) ──
├── documentation-blueprint.md               # план документации ETD: 4 аудитории (руководство, OEM,
│                                            #   разработчики скилов, safety/compliance) и нужные доки
├── marketplace-architecture.md              # архитектура маркетплейса: индекс + политика + skill_store.py
│                                            #   + runtime-валидатор; «магазин не может обходить safety»
├── skill-economics-licensing.md             # 6 категорий дистрибуции: open-source, open model/dataset,
│                                            #   free proprietary, paid commercial, enterprise-certified, private OEM/factory
├── ip-protection-and-package-security.md    # threat model (10 угроз), что можно скрывать (веса, policy),
│                                            #   что обязано быть видимым (capabilities, safety, подпись)
├── store-governance-review-model.md         # роли магазина и уровни ревью 0–3 (reference → manual safety)
├── unitree-skill-marketplace-analysis.md    # анализ анонса Unitree: потребительский store vs ETD-индустриальный
│
│  ── Машиночитаемые артефакты ──
├── marketplace_policy.json                  # политика установки v0.1.0: installRequires / blockedIf / reviewLevels
├── skill_store_index.json                   # индекс 4 референс-пакетов (риск, сертификация, назначение)
├── report_summary.json                      # отчёт валидации (байт-в-байт = reports/ из архива 6) — ПРОВЕРЕНО
├── report_summary.md                        # то же кратко: overall_pass: True, 4 пакета level=A
│
│  ── Архивы прототипа (три поколения) ──
├── etd_proto_repo (6).zip                   # 44 КБ, 79 файлов, метки 2026-04-01 — самый ранний снапшот
├── etd_proto_repo (5).zip                   # 58 КБ, 112 файлов, 2026-05-11 12:37 — промежуточный
├── etd_proto_repo (1).zip                   # 156 КБ, 123 файла, 2026-05-11 13:01 — самый полный:
│                                            #   +40 доков, +marketplace-модуль, +лицензионные политики,
│                                            #   но с мусором __pycache__/*.pyc
│
│  ── Происхождение идеи (экспорт чата ChatGPT, 2026-04-01) ──
├── Роботы Hyundai (1).md                    # 122 КБ, диалог: Hyundai/Boston Dynamics → разбор data2 (ЕТД
│                                            #   Крюкова) → идея «скилы как приложения для ОС роботов»
├── Роботы Hyundai (1).json                  # 187 КБ, тот же диалог в сыром JSON-экспорте (с ID сессии)
└── Роботы Hyundai (2).txt                   # 112 КБ, тот же диалог в plain text
```

## Дерево прототипа внутри `etd_proto_repo (1).zip`

```text
etd_proto_repo/
├── README.md                        # настоящий README проекта: цель, quick start, границы безопасности
├── CHANGELOG.md                     # 8 секций с пересекающимися версиями (0.1.0…0.2.0-docs-marketplace)
├── LICENSE                          # MIT, но текст усечён («…granted, free of charge, …copy...»)
├── requirements.txt                 # единственная зависимость: PyYAML>=6.0
├── runtime_context.json             # контекст рантайма: класс робота, доступные сервисы
├── etd_reference_validator.py       # ЯДРО (~120 строк): schema/semantic/compatibility-проверки, уровни A–D
├── validate_examples.py             # smoke-прогон валидатора по всем examples/
├── etd_demo_runner.py               # демо-валидация одного пакета
├── schemas/                         # 5 JSON-схем — ЗАГЛУШКИ («type: object» без properties)
├── examples/                        # 4 референс-пакета скилов, каждый:
│   ├── etd.pickplace.basic/         #   manifest.yaml (метаданные, совместимость, etdMapping MVS/SVS/BVS/CHS,
│   │                                #   constraints, safety, telemetry), skill.json, chs_profiles.json,
│   │                                #   capabilities.json (read/write/forbidden), execution_contract.json,
│   │                                #   telemetry/events.json, tests/acceptance_tests.yaml,
│   │                                #   policies/chs_adapter.py (entrypoint)
│   ├── etd.assembly.precision/
│   ├── etd.inspect.vision/
│   └── etd.cobot.safeassist/
├── adapters/                        # generic_oem_adapter.py (режет запрещённые низкоуровневые команды),
│                                    #   orbit_event_bridge.py, station_profile_loader.py
├── station_profiles/                # 3 профиля рабочих ячеек (allowed_skill_families, max_payload_kg)
├── sim/                             # run_sim_demo, run_assembly_demo, scenario_runner, failure_scenarios,
│                                    #   report_runner (генерирует reports/), marketplace_demo,
│                                    #   mock_robot_state_generator, fake_middleware_endpoint, event_replay
├── marketplace/                     # skill_store.py (SkillStore: list/validate_for_install/entitlement),
│                                    #   skill_store_index.json v0.2.0 (license/pricing/entitlement-метаданные),
│                                    #   marketplace_policy.json, licensing_policy.json, license_policy.json,
│                                    #   license_profiles.json, commercial_policy.json, sample-листинги
├── scripts/release_package.py       # сборка release-zip'ов пакетов
├── release_out/                     # 4 собранных артефакта *-0.1.0.zip
├── reports/                         # report_summary.json / .md
├── docs/                            # 40 документов; ядро: architecture, package-format, roadmap-v0.2,
│                                    #   atlas-integration-notes, use-cases-automotive, funding-pitch-outline;
│                                    #   ~15 около-дублей на тему licensing/commercialization/IP-protection
└── .github/workflows/
    └── validate-examples.yml        # CI: pip install → validate_examples.py → report_runner.py
```

## Ключевые файлы и модули

| Файл | Что делает |
|---|---|
| `etd_reference_validator.py` (в архиве) | Ядро: обязательные файлы, схемы, 11 семантических проверок (уникальность CHS-профилей, entrypoint, lifecycle-события, `capability_safe` — запрет `command.servo_torque`, `command.emergency_stop_override` и др., payload в пределах `payloadKgMax`), совместимость (сервисы/класс робота/версия) → level A–D + score |
| `marketplace/skill_store.py` (в архиве) | Магазин: `StoreEntry` (лицензия, цена, доступность исходников, entitlement), `validate_for_install()` — отказ при level∉{A,B}, отказ коммерческому пакету без entitlement-токена |
| `examples/*/manifest.yaml` (в архиве) | Паспорт скила: совместимость, ограничения, `etdMapping` — проекция ЕТД-уровней MVS (тонкий контакт кисти) / SVS (траектория руки) / BVS (поза тела) / CHS (контекст задачи), safety-раздел `packageCanNotOverride` |
| `sim/report_runner.py` (в архиве) | Генерирует `reports/report_summary.json`: валидация 4 пакетов + негативный сценарий (missing service → level D) + список релизных артефактов |
| `skill_store_index.json` (корень) | Витрина: 4 пакета, риск low/medium, `certificationState: reference_validated` |
| `marketplace_policy.json` (корень) | Правила: установка требует schema_valid + capability_safe + level A/B + station_allowed; блок при forbidden_capability / safety_override_requested |
| `report_summary.json` (корень) | Отчёт «всё прошло» — идентичен отчёту из архива 6; воспроизведён запуском (см. assessment) |
| `Роботы Hyundai (1).md` (корень) | Полная история замысла: Hyundai AI Robotics Strategy (CES 2026), Atlas на заводе HMGMA, обзор data2, серия «Да»-итераций, в которых ChatGPT генерирует и пересобирает архивы прототипа |

## Особенности организации

1. **Код не распакован в git.** Весь исполняемый прототип живёт в трёх zip-архивах с браузерными суффиксами «(1) (5) (6)» — недиффабельно, неиндексируемо, CI не запускается. GitHub из-за этого не определяет язык репозитория.
2. **Три поколения архива не строго монотонны.** Апрельский (6) местами имеет более развитые версии файлов (валидатор 8,5 КБ против 7,1 КБ в майском), майский (1) добавляет маркетплейс, лицензирование и 30 документов. Канонической версии нет.
3. **Корень = витрина.** В корень выложены избранные документы и отчёты из архивов (копии подтверждены побайтовым сравнением), но без пояснения, что откуда.
4. **Следы чат-генерации.** ~15 документов в `docs/` — вариации одной темы (licensing/commercialization/protection); CHANGELOG содержит 8 пересекающихся записей версий не по порядку; в архив 1 попал `__pycache__`.
5. **Файлы с кириллицей, пробелами и скобками в именах** («Роботы Hyundai (1).json») — неудобно для скриптов и URL.
