# Структура info1

Дерево восстановлено по страницам GitHub и raw-файлам (клонирование недоступно). Показаны ключевые элементы; в корне помимо перечисленного лежит ещё ~50 md-отчётов и навигационных документов.

```
info1/
├── README.md                        # Главный обзор ИОС (805 строк): методология ⇑⇓↔, этапы, быстрый старт
├── РЕЗЮМЕ-ПРОЕКТА.md                # Однастраничное резюме (340 строк)
├── ПУТЕВОДИТЕЛЬ.md / ИНДЕКС-ДОКУМЕНТОВ.md / ДОКУМЕНТАЦИЯ.md   # Навигация по 74+ документам
├── МЕТОДОЛОГИЯ.md, МЕТА-АНАЛИЗ-МЕТОДОЛОГИИ.md, ЭВОЛЮЦИЯ-МЕТОДОЛОГИИ.md,
│   БУДУЩЕЕ-МЕТОДОЛОГИИ.md, МЕТРИКИ-ЗДОРОВЬЯ.md, ВЕРТИКАЛЬНАЯ-ТРАССИРУЕМОСТЬ.md
│                                    # Методологический слой (α=+1..+3)
├── ЭТАП-6-САМОСОВЕРШЕНСТВОВАНИЕ.md  # Отчёты «этапов»: 6 (самолечение), 7 (коллективный интеллект, проект),
├── ЭТАП-7-…, ЭТАП-8-…, ЭТАП-8-COMPLETION-REPORT.md
├── ЭТАП-9-ПЛАН.md … ЭТАП-9-ЗАВЕРШЁН.md   # AI-генератор: 4 фазы (rule-based → ML → multi-domain → LLM)
├── SCIENTIFIC-PAPER.md              # «Научная статья» о методологии (~8 500 слов)
├── PRESENTATION.md, TUTORIALS.md, FAQ.md, TROUBLESHOOTING.md, USER-GUIDE.md
├── QUICKSTART.md, ARCHITECTURE.md, DEPLOYMENT.md, КАРТА-СВЯЗЕЙ.md   # быстрый старт, архитектура, деплой, карта связей (проверено: существуют в корне)
├── ROADMAP.md, ROADMAP-2026.md, CHANGELOG.md, NEXT-STEPS.md, PROGRESS-SUMMARY.md
├── CONTRIBUTING.md, CODE_OF_CONDUCT.md, LICENSE (MIT)
│
├── 01-Концепция/                    # Философия, принципы, методология параллельного развития
├── 02-Информационная-система/       # Спецификации карточек, шаблоны, 40+ примеров карточек
├── 03-Принципы/  03-Робототехника-и-автоматизация/   # Концепция распределённых домашних роботов
├── 04-Бытовые-циклы-и-задания/      # Дневные/недельные/месячные/годовые циклы
├── 06-Исследования-и-аналитика/  07-Практические-примеры/
│
├── 08-Программная-реализация/       # === СЛОЙ 1: карточная система (реальный, рабочий код) ===
│   ├── card_system/
│   │   ├── card.py                  # 726 строк: Card + 7 подклассов, enum'ы типов/статусов/приоритетов, YAML
│   │   ├── card_manager.py          # 592 строки: CRUD, поиск, файловое хранилище
│   │   ├── cli.py                   # 429 строк: CLI-команды (card-cli create/list/…)
│   │   ├── automation.py            # 564 строки: напоминания, архивирование, backup, отчёты
│   │   ├── export_import.py, visualize_graph.py
│   │   ├── test_card_system.py      # 532 строки, 21 unittest-тест (импорты согласованы с кодом)
│   │   └── test_integration.py
│   ├── web/                         # SPA: index.html, app.js (~640 строк), styles.css (~580),
│   │   │                            #   ai-generator.html, ai_api.py, ai_api_production.py,
│   │   └── nginx.conf, Dockerfile, docker-compose.yml, PRODUCTION-DEPLOYMENT.md
│   ├── examples/                    # flask_api_example.py, Telegram-бот (~750 строк)
│   ├── requirements.txt             # Честный: базово — только stdlib; flask/telegram опциональны
│   └── setup.py, API-REFERENCE.md, EXAMPLES.md, DOCKER-README.md
│
├── tools/                           # === Инструменты методологии + СЛОЙ 2 ===
│   ├── health_metrics.py            # 807 строк: метрики CD, VT, CR, DB
│   ├── visualize_connections.py     # Граф связей: ASCII, GraphViz, HTML/D3, JSON
│   ├── dashboard.py, self_improvement.py (661), predictive_warnings.py,
│   │   adaptive_metrics.py, save_metrics.py, collective_intelligence.py,
│   │   knowledge_extractor.py, pattern_matcher.py
│   ├── project_template_generator.py # 2 275 строк: шаблоны 16 типов проектов
│   ├── ai_cli.py / ai_cli_v2.py     # 416 строк: NL-интерфейс генератора (ЭТАП 9)
│   ├── templates/, ci_templates/, tests/
│   └── ai_generator/                # === СЛОЙ 2: AI Generator Toolkit (ЭТАПЫ 10–17) ===
│       ├── classifier.py, ml_classifier.py (265 строк, TF-IDF+LogReg),
│       │   multi_label_classifier.py, nlp_parser.py, enhanced_parameter_extractor.py,
│       │   context_aware_adapter.py, template_composer.py, llm_content_generator.py,
│       │   training_dataset.json (240 примеров), github_integration.py, marketplace_cli.py …
│       ├── security/                # sso_integration.py (407), encryption_manager.py (470),
│       │   │                        #   compliance_automation.py, vulnerability_scanner.py,
│       │   └──                      #   secrets_manager.py, security_auditor.py  (Zero Trust — ЗАЯВЛЕН, НО ОТСУТСТВУЕТ)
│       ├── mlops/                   # model_registry, ab_testing, drift_detector, feature_store, auto_retraining
│       ├── code_generation/, distributed/, mobile/, ai_pair/, testing/, devops/,
│       │   enterprise/, platform/, analytics/, integrations/, models/,
│       │   developer_tools/, ai_enhancements/, examples/
│       └── README.md                # Заявляет 38 модулей, 23 368 LOC
│
├── tests/                           # Интеграционные тесты слоя 2 (НЕ импортируются — см. assessment)
│   ├── conftest.py (116 строк)
│   └── integration/
│       ├── test_security_integration.py   # 220 строк — импортирует несуществующие классы
│       ├── test_mlops_integration.py      # 287 строк — то же
│       └── test_remaining_modules_integration.py
│
├── benchmarks/                      # Бенчмарки 38 модулей (JSON/HTML отчёты)
├── collective_network/              # Каталог «коллективного интеллекта» (ЭТАП 7), верхний уровень
├── demo-projects/, visualizations/  # Демо-шаблоны; document_graph.html и др.
├── graph.dot, graph.json, graph_v2.json, graph.html, knowledge_export.json
├── adaptive_thresholds_report.txt, predictive_warnings_report.txt, self_improvement_report.txt
│
├── .github/workflows/tests.yml      # CI: pytest + cov + black/isort/flake8/bandit (|| true)
├── Dockerfile, docker-compose.yml, Makefile (162 строки, ~30 целей)
├── setup.py                         # Пакет «ai-generator-toolkit» v1.0.0 (URL-заглушка yourusername/info1)
├── pytest.ini                       # cov=tools/ai_generator, маркеры по доменам
└── requirements-dev.txt             # pytest, black, mypy, bandit, sphinx, hypothesis…
    (!) requirements.txt в КОРНЕ ОТСУТСТВУЕТ (404), хотя CI и Makefile его требуют
```

## Ключевые файлы и модули

| Файл/модуль | Что делает |
|---|---|
| `08-Программная-реализация/card_system/card.py` | Датаклассы Card + 7 типов карточек (Task, Medicine, Recipe, Shopping, Contact, Appointment, Note), YAML-сериализация, генерация ID |
| `card_system/card_manager.py` | CRUD-операции, поиск по тексту/тегам/типу/датам, файловое хранилище |
| `card_system/automation.py` | Напоминания, автоархивирование, backup/restore, отчёты |
| `card_system/cli.py` | Командный интерфейс `card-cli` |
| `08-…/web/app.js` + `index.html` | SPA-интерфейс карточек: фильтры, статистика, адаптивная вёрстка |
| `tools/health_metrics.py` | Метрики здоровья документации: Code Density, Vertical Traceability, Connectivity Ratio, Documentation Balance |
| `tools/self_improvement.py` | Самодиагностика: находит проблемы метрик и генерирует шаги «лечения» |
| `tools/project_template_generator.py` | Генерация структуры проекта для 16 доменов (software, healthcare, legal, finance…) |
| `tools/ai_cli_v2.py` | Естественно-языковой ввод → классификация типа проекта → композиция шаблонов → генерация контента |
| `tools/ai_generator/ml_classifier.py` | TF-IDF + LogisticRegression классификатор описаний проектов (sklearn опционален) |
| `tools/ai_generator/security/encryption_manager.py` | Шифрование: AES-GCM/ChaCha20 через `cryptography`, НО с небезопасным XOR-fallback и «AES-CBC», который на деле XOR (см. assessment) |
| `tests/integration/*.py` | Интеграционные тесты слоя 2 — написаны под API, которого нет в коде |
| `.github/workflows/tests.yml` | CI: тесты + линтеры; падает на `pip install -r requirements.txt` |

## Особенности организации кода

- **Двухслойность**: аккуратный самодостаточный «домашний» слой (stdlib-only) и наспех сгенерированный «enterprise»-слой; они почти не связаны между собой (pytest.ini и setup.py уже полностью «смотрят» на слой 2, забыв про слой 1).
- **α-разметка**: каждый документ и модуль помечен уровнем абстракции (α=+4…−4) и «вертикальными связями» на документы выше — необычная, последовательно проведённая практика.
- **Русско-английская смесь**: имена файлов и документация — по-русски, код и слой 2 — по-английски.
- **Самоотчётность**: десятки файлов «ЭТАП-N-ЗАВЕРШЁН.md» и отчётов о метриках; репозиторий документирует собственное развитие, но эти отчёты требуют перепроверки (см. assessment).
