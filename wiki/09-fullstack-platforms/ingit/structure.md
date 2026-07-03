# Структура ingit

## Аннотированное дерево каталогов

```
ingit/
├── README.md                     # Главный манифест проекта (220 строк, RU): концепция,
│                                 #   roadmap, сравнение с GitHub/GitLab/Gitea/Fossil
├── QUICKSTART.md                 # «Быстрый старт за 5 минут»: хуки, backend, frontend, примеры
├── CHANGELOG.md                  # Keep a Changelog; версия 0.1.0 от 2026-02-01
│                                 #   (заявления частично не соответствуют коду — см. assessment)
├── CONTRIBUTING.md               # Гайд контрибьютора: окружение, code style, чек-лист PR
├── LICENSE                       # MIT (2026, InGit Development Team)
├── Makefile                      # ~35 целей: install, dev, test, lint, format, docker-*, migrate
├── docker-compose.yml            # Полный стек: postgres:15 + backend + frontend
├── docker-compose.monitoring.yml # Отдельный стек мониторинга
├── .env.example                  # Пример переменных окружения
├── .pre-commit-config.yaml       # pre-commit: black, isort, flake8, check-yaml, detect-private-key…
├── .gitignore
│
├── .github/workflows/
│   ├── ci.yml                    # CI: flake8, black, mypy, pytest+coverage (postgres-сервис),
│   │                             #   фронтенд-джоба; триггер на main/develop/claude/**
│   └── cd.yml                    # CD: публикация Docker-образов (не проверялось детально)
│
├── docs/                         # ЯДРО ПРОЕКТА: ~4 300 строк проектной документации
│   ├── METHODOLOGY.md            # 628 строк: методология, принципы, сравнительная матрица решений
│   ├── DATABASE_SPEC.md          # 933 строки: спецификация схемы БД
│   ├── IMPLEMENTATION_PLAN.md    # 614 строк: план разработки, фазы MVP→v1.0 (10–16 мес.)
│   ├── IDEAS_AND_PROPOSALS.md    # 671 строка: инновации (Metadata as Code, Hybrid Storage…)
│   ├── API_SPEC.md               # 516 строк: спецификация REST API
│   ├── UI_WIREFRAMES.md          # 424 строки: ASCII-wireframes интерфейса
│   └── DEPLOYMENT.md             # 558 строк: варианты развёртывания (desktop/NAS/гибрид)
│
├── backend/                      # Python-бэкенд (FastAPI), ~1 100 строк кода + ~400 строк тестов
│   ├── ingit/
│   │   ├── __init__.py           # __version__ = "0.1.0"
│   │   ├── main.py               # FastAPI-приложение: CORS, роутеры, глобальный error handler,
│   │   │                         #   рабочий корневой GET / (отдаёт имя/версию приложения)
│   │   ├── config.py             # pydantic-settings: БД, CORS, пути storage, SECRET_KEY…
│   │   ├── api/
│   │   │   ├── health.py         # /api/health, /api/ping — работающие эндпоинты (плюс корневой GET / в main.py)
│   │   │   ├── projects.py       # CRUD-стабы: TODO, возвращают []/501/404
│   │   │   ├── tasks.py          # CRUD-стабы + assign; всё TODO
│   │   │   └── documents.py      # CRUD-стабы; всё TODO
│   │   ├── cli/
│   │   │   └── main.py           # 349 строк, click: ingit init / task create / task list /
│   │   │                         #   report summary|weekly / doctor / version
│   │   │                         #   работает с YAML-файлами напрямую, БД не трогает
│   │   └── db/
│   │       ├── base.py           # engine, SessionLocal, get_db()
│   │       └── models.py         # 351 строка, 6+1 моделей; КРИТИЧЕСКИЙ БАГ: колонка `metadata`
│   │                             #   зарезервирована в SQLAlchemy → модуль не импортируется
│   ├── migrations/               # Alembic (env.py, script.py.mako)
│   ├── tests/
│   │   ├── conftest.py           # фикстуры: in-memory SQLite, TestClient, sample-данные
│   │   ├── test_models.py        # 202 строки, тесты моделей (падают на импорте models)
│   │   ├── test_api_projects.py  # тесты стабов projects
│   │   └── test_api_health.py    # ожидает "status":"ok" и /api/health/db — расходится с кодом
│   ├── alembic.ini, pytest.ini, pyproject.toml, setup.py
│   ├── requirements.txt          # fastapi, sqlalchemy 2.0.25, pygit2, pyotp, age, click, rich…
│   ├── requirements-dev.txt      # pylint, bandit, safety, mkdocs-material, ipython…
│   └── Dockerfile, .dockerignore, .env.example
│
├── frontend/                     # React + TypeScript + Vite (заглушка)
│   ├── src/
│   │   ├── App.tsx               # 40 строк: статическая страница «Coming Soon» с фичами
│   │   ├── main.tsx, App.css, index.css
│   │   └── (electron/main.js заявлен в package.json, но ОТСУТСТВУЕТ — 404)
│   ├── package.json              # Electron-билд, antd, redux-toolkit, monaco, recharts (не используются)
│   ├── vite.config.ts, tsconfig*.json, .eslintrc.cjs, .prettierrc
│   └── Dockerfile, nginx.conf, .dockerignore
│
├── monitoring/
│   ├── prometheus.yml            # Конфиг Prometheus
│   └── alerts/                   # Правила алертов
│                                 # (Grafana-дашборды и Loki из CHANGELOG в папке не видны)
│
├── scripts/
│   ├── generate-report.py        # 222 строки: отчёты (summary/tasks/finance) по YAML демо-проекта
│   ├── install-hooks.sh          # Копирует хуки в .git/hooks
│   ├── init-db.sql               # Инициализация PostgreSQL для docker-compose
│   └── hooks/
│       ├── pre-commit            # 186 строк, Python: валидация YAML, блок 00_inbox/, размер файлов
│       └── post-commit           # 80 строк: автозакрытие задач по commit message
│
└── examples/demo-project/        # Демо «E-Commerce Platform MVP» в структуре InGit
    ├── README.md                 # Описание структуры 00–90
    ├── 10_profile/project.yaml   # Метаданные проекта
    ├── 20_timeline/2026/…        # Журнал событий
    ├── 30_documents/contracts/…  # Договор в YAML
    ├── 40_finance/…              # Расход/доход в YAML
    ├── 70_tasks/…                # Задачи backlog/in-progress/done в YAML
    └── 80_wiki/…                 # База знаний
```

## Ключевые файлы и модули

| Файл/модуль | Что делает | Состояние |
|---|---|---|
| `docs/METHODOLOGY.md` | Методология, принципы, сравнительный анализ с Git/GitLab/Gitea/Fossil | Готово, качественно |
| `docs/DATABASE_SPEC.md` | Полная спецификация схемы БД (источник для models.py) | Готово |
| `docs/IMPLEMENTATION_PLAN.md` | Roadmap 4 фаз до v1.0 (10–16 мес.) | Готово |
| `backend/ingit/main.py` | Точка входа FastAPI, подключение роутеров | Работает как каркас |
| `backend/ingit/db/models.py` | 6 ORM-моделей + Commit по DATABASE_SPEC | **Не импортируется** (колонка `metadata` зарезервирована) |
| `backend/ingit/api/*.py` | REST-эндпоинты projects/tasks/documents | Стабы (TODO/501/404); реально работают только корневой /, /health и /ping |
| `backend/ingit/cli/main.py` | CLI: init (структура 00–90), task create/list, report summary/weekly, doctor, version | Автономен от БД, выглядит работоспособным (не запускался — не проверено) |
| `scripts/hooks/pre-commit` | Валидация YAML-метаданных, запрет 00_inbox/, лимит размера | Самодостаточный Python-скрипт |
| `scripts/generate-report.py` | Markdown-отчёты по YAML задачам/финансам | Самодостаточный |
| `backend/tests/*` | ~20+ тест-кейсов (модели, API) | Не проходят: падают на импорте models; health-тесты написаны под другую версию API |
| `.github/workflows/ci.yml` | Линт + тесты + coverage | Джоба backend-tests гарантированно красная |
| `frontend/src/App.tsx` | Заглушка «Coming Soon» | Статическая страница |
| `examples/demo-project/` | Живой пример структуры InGit-репозитория | Полезно как иллюстрация концепции |

## Особенности организации кода

- **Документация первична, код вторичен**: docs/ вдвое больше всего Python-кода и является реальным продуктом репозитория.
- Код бэкенда строго следует спецификациям из docs/ (models.py прямо ссылается на DATABASE_SPEC.md), но **писался «по спецификации», а не «по запуску»**: тесты и реализация расходятся между собой, а модели содержат ошибку, обнаруживаемую при первом же импорте.
- CLI и git-хуки — независимый «файловый» контур (YAML + папки), который не зависит от БД/API и представляет самую жизнеспособную часть кода.
- Инфраструктурный слой (Docker, CI, monitoring, Makefile) сделан «на вырост» — существенно опережает зрелость приложения.

*Ограничение покрытия аудита*: файлы docs/ прочитаны выборочно (начала METHODOLOGY и IDEAS_AND_PROPOSALS, размеры остальных); `cd.yml`, содержимое `migrations/`, `monitoring/alerts/`, YAML демо-проекта и хвост `cli/main.py` (команды report/doctor) детально не читались.
