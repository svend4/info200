# Структура daten30

Дерево составлено по данным GitHub (WebFetch страниц дерева) и проверке файлов через raw.githubusercontent.com; глубоко вложенные каталоги (android/, helm/, monitoring/, nginx/) просмотрены не полностью — помечено «не проверено детально».

## Аннотированное дерево каталогов

```
daten30/
├── README.md                        # Главный обзор: 3 сценария, архитектура, roadmap v1.0
├── PROJECT_STRUCTURE.md             # «Карта» всех сценариев (~34 КБ; частично УСТАРЕЛА — см. ниже)
├── DEVELOPER_GUIDE.md               # Методология разработчика, 1768 строк (проверено)
├── DYNAMIC_HUB_METHODOLOGY.md       # Методология динамического портала, 1556 строк (проверено)
├── STACK_COMPARISON.md              # Сравнение стеков и путь миграции, 642 строки
├── ECOMMERCE_ANALYSIS.md            # Анализ e-commerce функций, 541 строка
├── TECH_STACK_APPLICATIONS.md       # Применение технологий, 883 строки
├── TERMUX_SETUP_GUIDE.md            # Подробное руководство Termux, 696 строк
├── TERMUX_QUICK_START.md            # Быстрый старт с копипастой (~13 КБ)
├── CHEATSHEET.md                    # Шпаргалка команд, 588 строк
├── FLUTTER_APPS_COMPARISON.md       # Сравнение трёх Flutter-приложений, 506 строк
├── BUILD_HUB_APP.md                 # Быстрая сборка Hub-приложения, 304 строки
├── .gitignore
│
├── .github/workflows/               # CI/CD: 7 workflow + README
│   ├── build-flutter-apk.yml        # Сборка APK (universal + split), artifacts, release по тегу
│   ├── test-backend.yml             # «Тест» бэкенда: py_compile + запуск Registry + curl (smoke)
│   ├── auto-update-apk.yml          # Ночные автосборки APK
│   ├── deploy-hub-portal.yml        # Деплой Hub Portal на сервер
│   ├── deploy.yml / flutter-build.yml / release.yml
│   └── README.md                    # Описание всех workflow (по-русски)
│
├── hub-portal/                      # СЦЕНАРИЙ 2 (основной): динамический хаб
│   ├── README.md                    # Архитектура «скелет + плагины» (~12,5 КБ)
│   ├── USING_EXISTING_CODE.md       # Как переиспользовать код demo-app
│   ├── docs/QUICKSTART.md           # Быстрый старт (~5,5 КБ)
│   ├── infrastructure/
│   │   ├── registry-service/registry_service.py  # Service Registry: Flask+SQLite, ~10,4 КБ
│   │   └── message-bus/message_bus.py            # Pub/Sub Message Bus: Flask+SQLite, ~11,5 КБ
│   ├── microservices/               # 5 сервисов-плагинов (Flask, саморегистрация в Registry)
│   │   ├── product-service/product_service.py    # CRUD товаров + seed, SQLite, ~12,6 КБ
│   │   ├── weather-service/weather_service.py    # Погода (MOCK-данные), ~9,1 КБ
│   │   ├── crypto-service/crypto_service.py      # Крипто-котировки (MOCK), ~4,8 КБ
│   │   ├── news-service/news_service.py          # Новости (MOCK), ~3,2 КБ
│   │   └── task-service/task_service.py          # Задачи, ~4,5 КБ
│   ├── scripts/
│   │   ├── start-all.sh             # Последовательный запуск 7 сервисов через nohup, логи в ~/termux-backend/logs
│   │   ├── stop-all.sh
│   │   └── health-check.sh
│   └── flutter-hub/                 # Flutter-приложение «скелет»
│       ├── lib/main.dart            # ВСЁ приложение в одном файле, 731 строка:
│       │                            #   ServiceDiscovery, DynamicWidgetBuilder,
│       │                            #   автообновление раз в 30 с (Timer.periodic)
│       ├── pubspec.yaml             # Зависимости: только http + cupertino_icons
│       ├── android/                 # Платформенные файлы (не проверено детально)
│       ├── build-apk.sh, auto-build.sh, create-icons.sh, clean-cache.sh,
│       │   full-clean-rebuild.sh, apply-minimal-config.sh
│       └── 9 MD-файлов: README, BUILD_INSTRUCTIONS, а также следы борьбы со сборкой:
│           GRADLE_FIX.md, EMERGENCY_FIX.md, QUICK_FIX.md, DESUGARING_FIX.md,
│           IC_LAUNCHER_FIX.md, REBUILD_AFTER_FIX.md, AUTO_BUILD_README.md
│
├── demo-app/                        # СЦЕНАРИЙ 1 + «идеальный стек» (polyglot-витрина)
│   ├── README.md                    # Композиция/минимализм/специализация
│   ├── FINAL_SUMMARY.md             # САМООТЧЁТ: «5 вариантов завершены» (копия есть и в корне репозитория; перепроверен, см. assessment)
│   ├── IMPLEMENTATION_PLAN.md       # Детальный план (заявлено 1100+ строк)
│   ├── DEPLOYMENT_VARIANTS.md, VARIANT2_FRONTENDS.md, TERMUX_SETUP.md
│   ├── docker-compose.yml           # Локальный запуск всего стека (~3,2 КБ)
│   ├── seed-all.sh, nginx-multi-frontend.conf
│   ├── services/                    # 5 polyglot-микросервисов:
│   │   ├── user-service/app.py      # Flask + MongoDB + Redis-кэш (~5,4 КБ)
│   │   ├── product-service/         # Flask + MongoDB
│   │   ├── order-service/app.py     # Flask + PostgreSQL, ACID (~10,1 КБ)
│   │   ├── analytics-service/       # Go: Gin + gocql (Cassandra) + kafka-go (main.go, go.mod, Dockerfile)
│   │   └── notification-service/    # Node.js: Fastify (index.js, package.json, Dockerfile)
│   ├── frontend/index.html          # Alpine.js фронтенд (~16 КБ)
│   ├── frontend-svelte/             # Svelte (App.svelte ~2,7 КБ и др.)
│   ├── frontend-preact/  frontend-solidjs/
│   ├── mobile-flutter/              # Flutter-демо (lib/main.dart ~22,9 КБ, pubspec.yaml)
│   ├── kubernetes/                  # 15 yaml: namespace, configmap, 5 deployments,
│   │   │                            #   7 statefulsets (MongoDB, PostgreSQL, Redis, Cassandra,
│   │   │                            #   Elasticsearch, Zookeeper, Kafka), ingress + README
│   ├── helm/demo-app/               # Helm-чарт (не проверено детально)
│   ├── monitoring/                  # Prometheus/Grafana (не проверено детально)
│   └── nginx/                       # Конфигурация API-gateway (не проверено детально)
│
└── termux/                          # Упрощённый Flask-бэкенд для Termux
    ├── README.md                    # Инструкция (Termux из F-Droid и т.д.)
    ├── install.sh                   # Автоустановка (~1,7 КБ)
    ├── scripts/                     # Скрипты управления
    └── services/                    # user-service.py, product-service.py, order-service.py
```

## Ключевые файлы и модули

| Файл | Что делает |
|---|---|
| `hub-portal/infrastructure/registry-service/registry_service.py` | Ядро системы. Flask + SQLite (`~/termux-backend/data/registry.db`). Таблицы `services` (id, port, ui_schema, category, статус) и `service_events`. Эндпоинты: `GET /api/services` (с фильтрами), `POST /api/services/register` (INSERT OR REPLACE), `unregister`, `/health`, `/api/stats`, `/api/events`, `/api/categories` |
| `hub-portal/infrastructure/message-bus/message_bus.py` | Pub/Sub: подписчики в памяти + персистентные подписки и история событий в SQLite; рассылка уведомлений по callback-URL |
| `hub-portal/microservices/product-service/product_service.py` | Эталонный «плагин»: CRUD товаров в SQLite, seed из 7 товаров, саморегистрация в Registry с подробной `ui_schema` (list + card-шаблон `{{name}}`, `{{price}} ₽`, фильтр по категории, поиск), публикация событий в Message Bus |
| `hub-portal/flutter-hub/lib/main.dart` | Всё Flutter-приложение (731 строка): `MicroService` (модель), `ServiceDiscovery` (registryUrl = `http://127.0.0.1:5000` — захардкожен), `HubHomeScreen` (сетка сервисов, автообновление 30 с), `DynamicServiceScreen` + `DynamicWidgetBuilder` (рендер UI из JSON-схемы) |
| `hub-portal/scripts/start-all.sh` | Запуск Registry → Message Bus → 5 сервисов через `nohup ... &` с паузами и логами; выводит карту портов 5000–5005, 5999 |
| `demo-app/services/analytics-service/main.go` | Go-сервис: Gin + Cassandra (gocql) + Kafka-consumer (segmentio/kafka-go) в горутине — реальный polyglot-код, не заглушка |
| `demo-app/services/user-service/app.py` | Flask + PyMongo + Redis-кэширование списка пользователей |
| `demo-app/docker-compose.yml` | Оркестрация локального стека demo-app |
| `.github/workflows/test-backend.yml` | Матрица Python 3.9–3.11, 4 job-а: `py_compile` всех сервисов; non-blocking `lint` (flake8/black/isort, не блокируют сборку); `integration-test` — поднимает Registry + Message Bus + product + weather и через `curl` проверяет саморегистрацию и эндпоинты; юнит-тестов нет — pytest ставится, но вызывается только `pytest --version`, тестовых файлов нет |
| `demo-app/FINAL_SUMMARY.md` | Самоотчёт о завершении 5 «вариантов» с таблицами статистики — перепроверен в assessment.md |

## Особенности организации кода

- **Три слабо связанных подпроекта в одном репозитории**: hub-portal (главный), demo-app (витрина polyglot-стека) и termux (упрощённый дубль demo-бэкенда). Между ними есть дублирование (три разных product-service, три Flutter-приложения).
- **Документация >> код**: около 30 markdown-документов только в корне (в дереве выше показаны основные — помимо методологий там десятки обзорных статей вида `flask-microframework-explained.md`, `four-philosophies-comparison.md`, `widgets-vs-containers-philosophy.md`) плюс по несколько MD на каждый компонент; корень репозитория — это фактически учебник.
- **Один файл — один сервис**: каждый микросервис — самодостаточный скрипт без общих библиотек; шаблонность осознанная (новый сервис = копия product_service.py).
- **Захардкоженные пути и адреса**: `~/termux-backend/data/*.db`, `127.0.0.1:5000/5999` — переменных окружения в hub-portal нет (в demo-app, наоборот, конфигурация через env).
- **Расхождения документации с реальностью** (важно): `demo-app/backend-flask/` из README и PROJECT_STRUCTURE.md **не существует** (404); `hub-portal/architecture/ARCHITECTURE.md` и `requirements.txt` в registry-service/message-bus, заявленные в hub-portal/README.md, **отсутствуют**; корневого `requirements.txt` (упомянут в инструкции установки) **нет**.
- Семь «FIX»-документов в flutter-hub — летопись реальной борьбы со сборкой APK (Gradle, desugaring, иконки), полезная как troubleshooting-база.
