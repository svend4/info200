# Структура data30

## Аннотированное дерево каталогов

```
data30/
├── README.md                      # 1245 строк: агрегат из API-доков, планов, спецификаций макросов
│                                  # и рейтингов; содержит НЕРАЗРЕШЁННЫЕ конфликт-маркеры (стр. ~792, ~1182)
├── FUNCTION_PASSPORT.md           # Паспорт функции: поля, категории, MVP-словарь функций
├── system_framework.md            # «Метаслой решений»: миссия, аудитория, 10 ключевых сущностей, глоссарий
├── functional_spec.md             # Объём MVP: 50 функций, 20 сценариев, 10 макросов, 20 приложений; критерии приёма
├── data_model.md                  # Схема сущностей (Function/Module/UseCase/Macro/Review/Rating), версионирование
├── recommendation-system-spec.md  # Система доверия: качество vs полезность, verified_usage, зрелость, модерация
├── integration_inventory.md       # 20 внешних систем (SendGrid, Twilio, Okta, S3, Jira…) — контакты/SLA все TBD
├── risk-register.md               # 10 рисков (R1–R10) с владельцами, триггерами и планами смягчения
│
├── catalog/                       # Каталог приложений
│   ├── apps.yaml                  # 1165 строк, карточки приложений (Slack и др.) — БИТЫЙ YAML (ошибка на стр. 133,
│   │                              # следы неудачных слияний: дублированные ключи)
│   ├── app_function_mappings.md   # Привязка приложений к словарю функций
│   ├── audit.md / catalog.md / compatibility.md / function-matrix.md / schema.md
│
├── data/                          # Эталонные данные модели
│   ├── mvp.json                   # Функции/модули/юзкейсы с version/revision/status — валидный JSON (проверено)
│   └── recommendations.json       # Примеры данных рекомендаций — валидный JSON (проверено)
│
├── docs/                          # Основной корпус документации (18 файлов + 8 подпапок)
│   ├── api/openapi.yaml           # OpenAPI 3.0.3, 18 путей — валидный YAML (проверено)
│   ├── architecture/
│   │   ├── overview.md            # Целевая архитектура: Web UI → API GW → Auth → Core → DB/Cache/Broker
│   │   ├── adr-0001-storage.md    # ADR: выбор хранилища (граф vs реляционная БД) для модели связей
│   │   ├── operations.md          # Инфраструктура и DevOps-практики
│   │   └── diagrams/              # Mermaid-диаграммы (context, component)
│   ├── macros/                    # Спецификация формата макроса + руководство (spec.md, guide.md)
│   ├── merge/                     # batch-merge.md, conflict-resolution.md — инструкции по разруливанию слияний
│   ├── use-cases/cluster-maps.md  # Карты кластеров сценариев
│   ├── catalog/, design/, marketing/  # Правила каталога, дизайн, маркетинг-материалы
│   ├── roadmap.md                 # Gantt (mermaid): MVP H2 2025 → Beta H1 2026 → Scale H2 2026
│   ├── security_plan.md           # Угрозы, PII/PHI, RBAC, план соответствия
│   ├── function-dictionary.md, glossary.md, kpi.md, metrics_plan.md,
│   ├── prd_brd.md, registry.md, release_epics_stories.md, scenario_catalog.md,
│   ├── scenario_clusters.md, segmentation.md, test_results.md, test_scenarios.md,
│   └── versioning.md, vertical-selection.md, verticals_one_pagers.md
│
├── migrations/                    # SQL (PostgreSQL-диалект)
│   ├── 001_create_audit_log_and_change_set.sql   # audit_log + change_set + индексы (история/rollback)
│   └── 002_create_reviews_and_rating_aggregates.sql  # reviews (два рейтинга 1–5, verified) + агрегаты
│
├── plans/                         # 6 организационных планов: plan-raci.md, plan-dod.md, plan-roadmap.md,
│                                  # plan-prototype.md, plan-session.md, plan-timeline.md
│
├── prototype/                     # Кликабельный макет UI (без JS-логики)
│   ├── index.html                 # 405 строк: экран «Поиск сценариев» — запрос, фильтры, рекомендации;
│   │                              # есть задвоенные блоки («3. Фильтры» + «2. Фильтры») — следы слияний
│   └── styles.css                 # 386 строк оформления
│
├── qa/                            # Самоаудит качества (2025-09-23)
│   ├── test-plan.md / test-results.md   # Все тест-раны — Not Run: «нет кода приложения»
│   ├── signoff.md                 # QA sign-off ОТКЛОНЁН (честная фиксация)
│   ├── defects.md                 # 0 дефектов (т.к. тесты не выполнялись)
│   └── ux-review.md
│
├── readmes/                       # Архив 12 исторических версий README.md (обход конфликтов слияния)
│   └── README-index.md            # Индекс: коммит → описание → файл
│
├── schemas/macro.schema.json      # JSON Schema макроса, 12 обязательных полей — валидный JSON (проверено)
├── scripts/
│   ├── merge-branch.sh            # Хелпер массового слияния веток
│   └── resolve-readme-conflicts.sh # Разрешение конфликтов README: main побеждает, ветка — в архив readmes/
├── src/ranking.py                 # 195 строк: алгоритм ранжирования ranking_v1 (чистый Python, stdlib)
├── templates/macros.yaml          # 1012 строк, 14 шаблонов макросов — валидный YAML (проверено)
└── tests/test_ranking.py          # 120 строк, 4 юнит-теста — ПРОХОДЯТ (перепроверено при аудите)
```

## Ключевые файлы и модули

| Файл | Что делает |
| --- | --- |
| `src/ranking.py` | Единственный «боевой» код: `rank_search_results(items, scenario)` — ранжирование каталога по сценариям. 4 конфигурации весов (`default`, `automation_reports`, `modeling`, `data_analysis`), нормализация числа отзывов через log1p, порог `min_verified_reviews=3`, множитель свежести 0.7 при отзывах старше 12 мес., штраф за спам-риск. Версионирование алгоритма (`ranking_v1`). |
| `tests/test_ranking.py` | Тесты сценарных метрик, штрафа за давность, валидации обязательных полей, порога подтверждённых отзывов. Запуск: `python3 -m unittest discover -s tests` — все 4 проходят. |
| `docs/api/openapi.yaml` | Контракт REST API v1: 18 путей (functions, modules, use cases, macros, history/rollback, health). Bearer-аутентификация. |
| `schemas/macro.schema.json` | Схема макроса: обязательные `id, name, description, trigger, steps, conditions, errors, result, parameters, quality_metrics, reliability, version`. |
| `templates/macros.yaml` | 14 параметризуемых шаблонов макросов (автоответы, создание задач, SLA-эскалации и т.п.) под эту схему. |
| `migrations/001…sql` | Таблицы `change_set` и `audit_log` (before/after JSONB) + индексы — фундамент истории изменений и отката. |
| `migrations/002…sql` | Таблицы `reviews` (раздельные `quality_rating`/`usefulness_rating` 1–5, флаг `verified`) и `review_aggregates`. |
| `recommendation-system-spec.md` | Самая проработанная спецификация: правила verified-отзывов (90 дней), уровни зрелости, анти-фрод сигналы, статусы модерации. |
| `prototype/index.html` + `styles.css` | Статический макет экрана поиска: цель запроса, фильтры (стоимость/зрелость/совместимость), карточки рекомендаций, блок «почему рекомендовано». |
| `scripts/resolve-readme-conflicts.sh` | Симптоматичный артефакт процесса: при конфликте README берёт версию main, а версию ветки архивирует в `readmes/`. |

## Особенности организации кода

1. **Документация >> код.** Отношение примерно 60+ markdown-файлов к одному Python-модулю. Linguist-статистика GitHub (HTML 52.6%, Python 25.8%) вводит в заблуждение: markdown не учитывается, поэтому прототип и один модуль «доминируют».
2. **Следы агентного конвейера.** Ветки с именами `*-codex/*`, 106+ PR, 225 коммитов за один день. Параллельные ветки постоянно конфликтовали по README — отсюда уникальная подсистема «архив README» + скрипты + инструкции по слияниям. Проблема решена не до конца: конфликт-маркеры в README.md и битый `catalog/apps.yaml` остались на main.
3. **README как свалка-агрегат.** Вместо оглавления README содержит склейку разнородных документов (англ. API-доки, русские планы, спецификации макросов, рейтинги) — многие из них дублируют файлы в `docs/`.
4. **Двуязычие.** Часть документов на английском (API docs, Project Plan), большинство — на русском; в отдельных файлах языки перемешаны (docs/architecture/overview.md содержит и англ., и рус. версии подряд).
5. **Честный самоаудит.** Папка `qa/` — редкий для профиля пример: проект сам зафиксировал, что тестировать нечего, и отклонил sign-off.
