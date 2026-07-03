# Структура data30

## Аннотированное дерево каталогов

```
data30/
├── README.md                      # 1245 строк: склейка API-доков (англ.), планов (рус.), спецификаций
│                                  # макросов и рейтингов; содержит НЕРАЗРЕШЁННЫЕ конфликт-маркеры
│                                  # (строки 792–796 и 1182–1193, проверено при аудите)
├── FUNCTION_PASSPORT.md           # 766 строк: паспорт функции (поля, категории), MVP-словарь ~100 функций,
│                                  # 12 расширенных паспортов; разделы задвоены слияниями
├── system_framework.md            # «Метаслой решений»: миссия, аудитория, сущности, глоссарий 30–50 терминов
│                                  # (миссия и глоссарий повторены трижды — следы слияний)
├── functional_spec.md             # Объём MVP: перечни «50 → 58 → 61 функция», 20–23 сценария, 10 макросов,
│                                  # 20 приложений; критерии приёмки, владельцы сущностей
├── data_model.md                  # 561 строка: сущности Function/Module/UseCase/Macro/Review/Rating,
│                                  # связи, ограничения, JSON Schema-фрагменты, версионирование
├── recommendation-system-spec.md  # Система доверия: качество vs полезность, verified usage (90 дней),
│                                  # уровни зрелости, алгоритм ранжирования, анти-спам, объяснимость
├── integration_inventory.md       # 20 внешних систем (SendGrid, Twilio, Okta, S3, Slack, Jira, Salesforce…)
│                                  # — контакты, SLA и владельцы все «TBD»
├── risk-register.md               # 10 рисков R1–R10: владельцы, вероятность/влияние, триггеры, смягчение
│
├── catalog/                       # Каталог приложений
│   ├── apps.yaml                  # 1165 строк, 31 карточка приложений — БИТЫЙ YAML (ошибка на строке 133;
│   │                              # в карточке Slack дублированные ключи после неудачного слияния)
│   ├── app_function_mappings.md   # Привязка приложений к словарю функций
│   ├── audit.md                   # Аудит каталога
│   ├── catalog.md                 # 202 строки: назначение, поля карточки, MVP-каталог, матрицы связей
│   ├── compatibility.md / function-matrix.md / schema.md
│
├── data/                          # Эталонные данные модели
│   ├── mvp.json                   # Функции/модули/юзкейсы/макросы с version/revision/status — валидный JSON
│   └── recommendations.json       # Факторы объяснимости рекомендаций + шаблоны — валидный JSON
│
├── docs/                          # Основной корпус документации (18 файлов + 8 подпапок)
│   ├── api/openapi.yaml           # OpenAPI 3.0.3, 18 путей (functions/modules/use-cases/macros/reviews/
│   │                              # ratings + */history для rollback) — валидный YAML (проверено)
│   ├── architecture/
│   │   ├── overview.md            # Целевая архитектура: Web UI → API GW → Auth → Core → DB/Cache/Broker
│   │   │                          # (англ. и рус. версии склеены в одном файле)
│   │   ├── adr-0001-storage.md    # ADR: PostgreSQL vs графовая БД для модели связей (принят: PostgreSQL)
│   │   ├── operations.md          # Инфраструктура и DevOps-практики
│   │   └── diagrams/              # Mermaid-диаграммы (context-diagram.mmd, component-diagram.mmd)
│   ├── catalog/                   # 6 файлов: шаблон карточки, правила маппинга, чек-лист валидации
│   ├── design/                    # flows.md, verticals_pipelines.md
│   ├── macros/                    # spec.md (формат «триггер→шаги→условия→ошибки→результат», надёжность,
│   │                              # метрики качества), guide.md
│   ├── marketing/                 # 6 файлов: позиционирование, каналы, ценообразование, план запуска
│   ├── merge/                     # batch-merge.md, conflict-resolution.md — борьба с конфликтами слияний
│   ├── use-cases/cluster-maps.md  # Карты кластеров сценариев
│   ├── roadmap.md                 # Gantt (mermaid): MVP H2 2025 → Beta H1 2026 → Scale H2 2026, метрики
│   ├── kpi.md                     # TTFV, Precision@K, Recall@K, TTR + целевые значения MVP/Beta
│   ├── vertical-selection.md      # Скоринг вертикалей: Маркетинг 18, Поддержка 16, Продажи 14 → Маркетинг
│   ├── registry.md                # Реестр документов (устарел: помечает существующие доки как «не созданы»)
│   ├── security_plan.md, prd_brd.md, versioning.md, glossary.md, function-dictionary.md,
│   ├── metrics_plan.md, release_epics_stories.md, scenario_catalog.md, scenario_clusters.md,
│   └── segmentation.md, test_results.md, test_scenarios.md, verticals_one_pagers.md, macro_schema.json
│
├── migrations/                    # SQL (PostgreSQL-диалект)
│   ├── 001_create_audit_log_and_change_set.sql   # change_set + audit_log (before/after JSONB) + 3 индекса
│   └── 002_create_reviews_and_rating_aggregates.sql  # reviews (два рейтинга 1–5, verified) + агрегаты
│
├── plans/                         # 6 организационных планов: plan-raci.md, plan-dod.md, plan-roadmap.md,
│                                  # plan-prototype.md, plan-session.md, plan-timeline.md
│
├── prototype/                     # Статический макет UI (без JavaScript)
│   ├── index.html                 # 405 строк: экран «Поиск сценариев» — запрос, фильтры, рекомендации,
│   │                              # отзывы; секции задвоены слияниями (нумерация «1, 3, 2, 4, 3, 4, 5, 6, 7»)
│   └── styles.css                 # 386 строк оформления
│
├── qa/                            # Самоаудит качества (внутри датирован 2025-09-23)
│   ├── test-plan.md
│   ├── test-results.md            # Все 5 тест-ранов — Not Run: «нет кода приложения и инструкций запуска»
│   ├── signoff.md                 # QA sign-off ОТКЛОНЁН (честная фиксация)
│   ├── defects.md                 # 0 дефектов (потому что тест-раны не выполнялись)
│   └── ux-review.md
│
├── readmes/                       # Архив 12 исторических версий README.md (обход конфликтов слияния)
│   └── README-index.md            # Индекс «коммит → описание → файл» (11 версий + индекс; сверено: сходится)
│
├── schemas/macro.schema.json      # JSON Schema макроса (137 строк) — валидный JSON (проверено)
├── scripts/
│   ├── merge-branch.sh            # Хелпер слияния ветки с origin/main + автоправка README-конфликтов
│   └── resolve-readme-conflicts.sh # При конфликте README: main побеждает, версия ветки — в архив readmes/
├── src/ranking.py                 # 195 строк: алгоритм ранжирования ranking_v1 (чистый Python, stdlib)
├── templates/macros.yaml          # 1012 строк, 14 шаблонов макросов — валидный YAML (проверено)
└── tests/test_ranking.py          # 120 строк, 4 юнит-теста — ПРОХОДЯТ (перепроверено запуском при аудите)
```

Итого: ~85 файлов в 14 каталогах верхнего уровня (точное число не проверено — листинги GitHub обрезают длинные списки).

## Ключевые файлы и модули

| Файл | Что делает |
| --- | --- |
| `src/ranking.py` | Единственный «боевой» код: `rank_search_results(items, scenario)` — ранжирование каталога по сценариям. 4 конфигурации весов (`default`, `automation_reports`, `modeling`, `data_analysis`), лог-нормализация числа отзывов, порог `min_verified_reviews=3` (иначе score 0), множитель свежести 0.7 при отзывах старше 12 мес., штраф `0.2 × spam_risk`, версия алгоритма `ranking_v1`. |
| `tests/test_ranking.py` | 4 теста: сценарные метрики, штраф за давность, валидация обязательных полей, порог подтверждённых отзывов. Запуск: `python3 -m unittest discover -s tests` — все проходят. |
| `docs/api/openapi.yaml` | Контракт REST API v1 (731 строка): CRUD functions/modules/use-cases/macros/reviews/ratings + эндпоинты `/{id}/history` для истории и отката. Bearer-аутентификация. |
| `schemas/macro.schema.json` | Схема макроса: id, name, trigger, steps, conditions, errors, result, parameters, метрики качества, версия. |
| `templates/macros.yaml` | 14 параметризуемых шаблонов макросов (триаж тикетов, автоответ на письмо, создание задачи из письма, SLA-эскалации и т.п.). |
| `migrations/001…sql` | Таблицы `change_set` и `audit_log` (before/after JSONB) + индексы — фундамент истории изменений и rollback. |
| `migrations/002…sql` | Таблицы отзывов с раздельными `quality_rating`/`usefulness_rating` и агрегаты рейтингов. |
| `recommendation-system-spec.md` | Самая проработанная спецификация: verified-отзывы (90 дней), уровни зрелости, анти-фрод-сигналы, объяснимость рекомендаций, метрики мониторинга. |
| `FUNCTION_PASSPORT.md` | Словарь функций: схема паспорта, категории, MVP-список ~100 функций, 12 полных паспортов, правила нормализации терминов. |
| `prototype/index.html` + `styles.css` | Статический макет экрана поиска: цель запроса, фильтры (стоимость/зрелость/совместимость), карточки рекомендаций, блок «почему рекомендовано», отзывы. |
| `scripts/resolve-readme-conflicts.sh` | Симптоматичный артефакт процесса: при конфликте README берёт версию main, версию ветки архивирует в `readmes/`. |
| `docs/vertical-selection.md` | Скоринг шести вертикалей по 4 критериям; выбран Маркетинг (18/20). |
| `risk-register.md` | 10 рисков с владельцами (Data Owner, QA Lead и т.д.), триггерами и буферами; статус — «ожидает согласования». |

## Особенности организации кода

1. **Документация ≫ код.** Порядка 70 markdown-файлов против одного Python-модуля. Linguist-статистика GitHub (HTML 52.6 %, Python 25.8 %) вводит в заблуждение: markdown не учитывается, поэтому «доминируют» прототип и один модуль.
2. **Следы агентного конвейера.** Ветки `*-codex/*`, 118 PR (91 закрыт, 27 открыты), 225 коммитов — содержательный массив создан за один день 09.01.2026. Параллельные ветки хронически конфликтовали по README — отсюда уникальная подсистема «архив README» + скрипты + инструкции `docs/merge/`. Проблема решена не до конца: конфликт-маркеры в README.md и битый `catalog/apps.yaml` остались на main.
3. **README как агрегат-свалка.** Вместо оглавления — склейка разнородных документов (англ. API-доки с base URL `api.example.com`, русские планы, спецификации макросов, рейтинги), дублирующая файлы в `docs/`.
4. **Дубли внутри документов.** `system_framework.md` содержит миссию и глоссарий в трёх версиях подряд; `functional_spec.md` — три перечня функций (50, 58, 61); `FUNCTION_PASSPORT.md` — MVP-словарь дважды. Это результат стратегии «при конфликте сохранить обе версии».
5. **Двуязычие.** Часть документов на английском (API docs, PRD), большинство на русском; в отдельных файлах языки перемешаны (`docs/architecture/overview.md` содержит обе версии подряд).
6. **Честный самоаудит.** Папка `qa/` — редкий пример: проект сам зафиксировал, что тестировать нечего, и отклонил sign-off.
