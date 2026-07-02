# Структура daten20

## Аннотированное дерево каталогов

Дерево восстановлено по спискам файлов GitHub (полный рекурсивный обход ~400 файлов не выполнялся; клонирование недоступно). Состав корня и `src/` проверен по страницам репозитория, существование ключевых файлов — прямыми запросами к raw-контенту.

```text
daten20/
├── mSchablone                  # Исходный «мега-шаблон» планирования услуг перс. бюджета (рус., проверено)
├── README.md                   # Витрина проекта (433 строки, много завышенных заявлений)
├── ARCHITECTURE.md             # Архитектура исходной 6-модульной системы (рус.)
├── AUDIT_REPORT.md             # Самоаудит от 2026-01-11 (183 py-файла, 127 710 строк)
├── CHANGELOG.md                # Журнал изменений (v8–v10 «FULL», один день)
├── CONTRIBUTING.md             # Гайд контрибьютора (рус./англ.)
├── setup.py                    # Скрипт первичной установки (интерактивный, генерирует secrets)
├── requirements.txt            # РЕАЛЬНЫЕ зависимости: Flask, PyYAML, openpyxl, pytest, python-docx…
├── Makefile                    # install/test/lint/format/deploy (black, isort, flake8, mypy)
├── Dockerfile, docker-compose.yml, .env.example, .pre-commit-config.yaml
├── doc-processor.py            # CLI 1/16: парсинг, NER, классификация, экспорт
├── doc-comparator.py           # CLI: сравнение документов (cosine/Jaccard/Levenshtein)
├── doc-anonymizer.py           # CLI: GDPR-анонимизация PII
├── doc-quality.py              # CLI: 5 метрик качества документа
├── doc-dashboard.py            # CLI: веб-дашборд (Flask, :5000)
├── doc-master.py, doc-api-server.py, doc-batch-processor.py,
│   doc-search.py, doc-merger.py, doc-splitter.py,
│   doc-ocr.py, doc-translator.py, dms-admin.py,
│   enterprise-admin.py, locustfile.py        # остальные CLI (существование проверено выборочно)
├── .github/workflows/          # 13 workflow: tests, ci, e2e-tests, coverage-report,
│                               #   security, performance, release, auto-merge, cd-production…
├── src/                        # ~70 директорий — см. ниже
├── tests/                      # ~60 test_*.py + unit/ integration/ e2e/ performance/ fixtures/
├── docs/                       # 150+ md-документов: планы версий, гайды, self-репорты
│   ├── STATUS_OVERVIEW.md      #   мастер-статус (2026-01-19: 241 py-файла, ~140k строк)
│   ├── CHANGELOG.md            #   v8.0.0…v23.0.0 — ВСЕ датированы 2026-01-19
│   └── analysis/ api/ architecture/ sphinx/ tutorials/ user-guides/
├── k8s/                        # Kubernetes-манифесты
├── nginx/                      # конфигурация reverse-proxy
├── alembic/                    # миграции БД
├── mobile/, mobile_sdks/       # SDK Swift/Kotlin (дают 0,8 % не-Python языков)
├── sdks/, web/, tools/, scripts/, examples/, benchmarks/, config/, completions/
```

## Слои src/ (~70 директорий)

```text
src/
├── core/                # parser, validator, exporter, database, excel_export, pdf_exporter…
├── models/              # service, financial (ставки соцстрахования ФРГ, умлаги), template
├── utils/               # helpers, constants, formatting
├── template_analyzer.py, financial_calculator.py, document_generator.py,
│   interactive_editor.py, service_manager.py, web_app.py   # 6 исходных модулей
├── api/, api_v1.py, graphql_api.py, gateway/, microservices/   # сервисный слой
├── security/, compliance/, governance/, enterprise/, admin/     # enterprise-слой
├── ml/, ai/, analytics/, bi/, search/, integrations/            # прикладной AI/BI
├── federated/, explainable/, neurosymbolic/, qml/, quantum_ml/,
│   edge_ai/, multimodal_ai/, ai_safety/, ai_agents/,
│   human_ai_collab/, continual_learning/, world_models/,
│   self_improving/, bci/, robotics/, blockchain/, iot/,
│   network6g/…                                # версии v11–v24: «dual-version» Pure Python + NumPy
└── consciousness/, agi/, agi_universal/, asi_beyond_human/,
    emergent_intelligence/, cosmic_universal/, meta_reality/,
    absolute_singularity/, beyond_absolute/, the_void/   # v25–v30: концептуальные/арт-модули
```

## Ключевые файлы и модули

| Файл/модуль | Что делает | Примечание |
|---|---|---|
| `mSchablone` | Мега-шаблон карточки соцуслуги с плейсхолдерами `{Название_услуги}` и т.п. | Смысловое ядро всего проекта |
| `src/models/financial.py` | Дата-классы финансов: ставки KV/PV/RV/AV/UV, умлаги U1/U2/U3, вариант Саксонии, Decimal-арифметика | Настоящая предметная логика, проверено чтением |
| `src/core/parser.py` | `TemplateParser` — парсинг мега-шаблона в структуру + generic-парсинг документов | Аккуратный код с типами и docstring |
| `doc-processor.py` | Главный CLI: парсинг → NER (spaCy) → классификация (TF-IDF+SVM) → граф знаний → экспорт | Импортирует `src.core.*`, `src.ml.*` |
| `tests/conftest.py` | Фикстуры: услуга «Test Service», брутто-ставка 25.00, рег. коэффициент 1.20 | Тесты ядра — предметные, не декоративные |
| `src/bci/bci_services.py` | 2 254 строки — совпадает с заявлением README «BCI 2,254 строки» | Проверено `wc -l`; docstring соседнего модуля честно: «mock/simplified DSP» |
| `src/consciousness/__init__.py` | «Вычислительные модели сознания», dual-version | Содержит честный дисклеймер: «НЕ создаёт феноменального сознания» |
| `src/the_void/void.py` | Класс `TheVoid`: `__repr__ = "∅"`, `transcend()` возвращает `None` | Финальный арт-модуль v30, ~40 строк |
| `.github/workflows/tests.yml` | CI: Python 3.9/3.10/3.11, но запускает **только** `pytest tests/test_doc_*.py` | Ключ к пониманию «зелёного» бейджа тестов |
| `AUDIT_REPORT.md` | Самоаудит: 183 py-файла, 89 176 строк Python, v21–30 — «концептуальные» | Противоречит README (399 файлов, 214k строк) |
| `docs/STATUS_OVERVIEW.md` | Третий самоотчёт: 241 py-файл, ~140k строк, «172/172 тестов» | Три документа — три разных набора цифр |

## Особенности организации кода

1. **Двухслойность**: узкое рабочее ядро (шаблон → калькуляция → генерация документа) обёрнуто в десятки «версионных» слоёв, добавлявшихся сериями по несколько «версий» в день.
2. **Dual-version паттерн**: значимая часть AI-модулей существует в двух реализациях — Pure Python (без зависимостей, упрощённая) и NumPy (полная). Отсюда парадокс README: «zero dependencies» при непустом `requirements.txt` (Flask и др. нужны веб/API-слою).
3. **Дублирование директорий**: пары вида `network6g`/`network_6g`, `quantum`/`quantum_ml`/`qml`, `explainable`/`explainable_ai`, `ai_agents`/`autonomous_agents`, `emotions`/`emotions_ai` — следы несогласованных генераций.
4. **Тесты внутри src/**: в `src/bci/` лежат `test_*.py` рядом с кодом, помимо основного `tests/` — тестовая база размазана.
5. **Документация как жанр**: 150+ файлов в `docs/` — в основном «PLAN» и «SESSION_REPORT» о самих себе, а не пользовательские руководства (хотя есть и guides).
