# Структура daten11

## Дерево каталогов (аннотировано)

```
daten11/
├── README.md                     # Главная дока: концепция 4 уровней, quick start, примеры команд
├── QUICKSTART_RENDER.md          # Деплой демо на Render.com «за 5 минут»
│                                 #   (содержит устаревшую инструкцию выбирать ветку
│                                 #    claude/add-file-metadata-support-93MCI)
├── Procfile                      # web: gunicorn --chdir web app:app (Heroku-стиль)
├── render.yaml                   # Render Blueprint: python-сервис, free plan,
│                                 #   DOCUMENTS_PATH=/opt/render/project/src/examples/sample_library,
│                                 #   healthCheckPath=/health; Meilisearch закомментирован
├── requirements.txt              # Flask 3.0.0, flask-cors 4.0.0, Werkzeug 3.0.1, gunicorn 21.2.0, python-dotenv;
│                                 #   12 опциональных зависимостей закомментированы (openai, anthropic,
│                                 #   spacy, elasticsearch, meilisearch, watchdog...)
├── runtime.txt                   # python-3.11.0
├── .gitignore                    # стандартный Python-шаблон
│
├── docs/                         # 6 руководств, ~3800 строк (большей частью — планы, не реализация)
│   ├── METHODOLOGY.md            # 276 стр.: полная методология 4 уровней, форматы, стандарты
│   ├── AI_AUTOMATION.md          # 828 стр.: как прикрутить OpenAI/Anthropic для генерации метаданных
│   ├── MIGRATION_GUIDE.md        # 576 стр.: применение системы к существующим коллекциям
│   ├── SEARCH_INTEGRATION.md     # 893 стр.: интеграция с Elasticsearch/Meilisearch
│   ├── WEB_INTERFACE.md          # 808 стр.: устройство веб-интерфейса
│   └── RENDER_DEPLOYMENT.md      # 423 стр.: подробный деплой на Render
│
├── schemas/                      # JSON Schema (draft-07) — формальные контракты метаданных
│   ├── folder-meta.schema.json   # 192 стр.: схема .folder-meta.json (name, category enum, tags,
│   │                             #   statistics, quickLinks...); $id содержит placeholder
│   │                             #   «yourusername/file-metadata-system»
│   └── file-meta.schema.json     # 296 стр.: схема *.meta.json (title, fileType, checksum...)
│
├── tools/                        # CLI-утилиты (чистый Python, stdlib)
│   ├── metadata_manager.py       # 422 стр.: класс MetadataManager + argparse-CLI
│   ├── crawler.py                # 418 стр.: класс FileCrawler, JSON/HTML-отчёты
│   └── search.py                 # 265 стр.: класс MetadataSearch + CLI.
│                                 #   БАГ: «import os» только в __main__/main(),
│                                 #   при импорте модуля build_index падает с NameError
│
├── scripts/
│   └── auto_metadata.sh          # 157 стр.: пакетная генерация метаданных;
│                                 #   вызывает ../tools/metadata_manager.py относительно CWD —
│                                 #   работает только при запуске из подпапки репозитория
│
├── examples/
│   ├── README.md                 # Как тестировать утилиты на демо-библиотеке
│   └── sample_library/           # Демо-библиотека
│       ├── .folder-meta.json     # Заявляет 3 подраздела (physics, mathematics, computer_science),
│       │                         #   реально существует только physics
│       ├── .folder-readme.md
│       └── physics/
│           ├── .folder-meta.json
│           ├── quantum_intro.txt          # Единственный «документ» коллекции
│           ├── quantum_intro.meta.json    # Полный пример метаданных файла
│           ├── quantum_intro.summary.md   # Пример краткого содержания
│           └── quantum_intro.toc.md       # Пример расширенного оглавления
│
└── web/                          # Flask-приложение (production-вариант для Render)
    ├── app.py                    # 257 стр.: ~9 эндпоинтов (/, /api/search, /api/facets,
    │                             #   /api/folders, /api/folder/<path>, /api/file/<path>,
    │                             #   /download/<path>, /api/stats, /health)
    ├── tools/
    │   └── search.py             # ПОЛНЫЙ ДУБЛИКАТ tools/search.py (265 стр., тот же баг с os)
    ├── templates/
    │   └── index.html            # 293 стр.: SPA-каркас, тёмная/светлая тема, Google Fonts (Inter)
    └── static/
        ├── css/main.css          # 994 стр.: полноценный дизайн с CSS-переменными
        └── js/main.js            # 645 стр.: фронтенд-логика, fetch к /api/*
```

## Ключевые файлы и модули

| Файл | Что делает | Замечания |
|---|---|---|
| `tools/metadata_manager.py` | CRUD метаданных: init-folder, init-file, read, update; статистика папок, MD5/SHA256, определение типа файла по расширению, генерация summary/toc | Самый качественный модуль; работает автономно на stdlib |
| `tools/crawler.py` | Рекурсивное сканирование ФС, поиск файлов без метаданных, генерация scan_report.json и красивого HTML-отчёта | Баг: `file.suffix == '.meta.json'` никогда не истинно (suffix = `.json`), meta-файлы попадают в отчёт как обычные |
| `tools/search.py` | Индекс по `*.meta.json` и `.folder-meta.json`; поиск по тексту/тегам/категории/типу/автору/датам; фасеты | Критический баг с `import os`; в `print_results` для файлов печатается путь из переменной `folder` (утечка из чужого цикла) |
| `web/app.py` | JSON API + отдача SPA; DOCUMENTS_PATH из env, дефолт `web/examples/sample_library` (не существует — examples лежит в корне) | `/api/search`, `/api/facets` падают из-за бага search.py; `/download` и `/api/file` без проверки выхода за пределы корня (потенциальный path traversal) |
| `web/static/js/main.js` | Загрузка фасетов, поиск, карточки файлов, модалки, статистика, переключение темы | Обращается именно к падающим /api/search и /api/facets — поиск в демо не работает |
| `scripts/auto_metadata.sh` | Обходит папки/файлы, создаёт базовые метаданные через metadata_manager | Относительный путь `../tools/...` ломает пример запуска из README |
| `schemas/*.schema.json` | Формальные схемы метаданных | Нигде программно не используются (нет валидации по схеме в коде) |
| `render.yaml`, `Procfile`, `runtime.txt` | Инфраструктура деплоя на Render/Heroku-совместимые платформы | render.yaml корректно задаёт DOCUMENTS_PATH — на Render дефолт-баг app.py не проявляется |

## Особенности организации кода

- **Три слоя разной зрелости**: методология и схемы (продуманы) → CLI-утилиты (в основном работают) → веб и деплой (собраны наспех, с дублированием и багами).
- **Дублирование**: `web/tools/search.py` — байт-в-байт копия `tools/search.py` вместо пакета/импорта; исправления придётся вносить дважды.
- **Нет пакета**: ни `pyproject.toml`, ни `setup.py`; утилиты запускаются как скрипты по путям, отсюда хрупкие относительные пути в shell-скрипте и sys.path-хаки в app.py.
- **Документация опережает код**: 4 из 6 руководств (AI, поиск, миграция, веб) описывают функциональность, которой в коде нет или которая есть лишь частично.
- **Всё на русском**, включая docstrings и CLI-справку — целостно, но сужает аудиторию.
