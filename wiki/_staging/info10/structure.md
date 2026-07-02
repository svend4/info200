# Структура info10

## Дерево репозитория (полное — репозиторий маленький, покрытие 100%)

```
info10/
├── README.md                        # 2 строки: «# info10 / info» — заглушка
├── SESSION_SUMMARY.md               # Протокол чат-сессии Grok + Lorenzo DAF (11.05.2026, по-русски)
├── test/                            # Тестовая папка (проверка записи через GitHub API, 10.05.2026)
│   ├── hello.txt                    # «Привет! Это тестовая папка…»
│   ├── hello1.txt                   # Тестовый текст
│   └── hello2.txt                   # «AI-помощник успешно создал папку…»
└── daf-gateway/                     # ЕДИНСТВЕННЫЙ содержательный подпроект — DAF-шлюз
    ├── README.md                    # Описание подпроекта, quick start (docker compose up)
    ├── lorenzo_pro_gateway.py       # Главный шлюз DAF v3.1 (75 строк): chat, git_write, download, health
    ├── l orenzo_pro_gateway.py      # ДУБЛИКАТ главного файла с ПРОБЕЛОМ в имени (отличие — 1 строка докстринга)
    ├── web_mcp_gateway.py           # «Лёгкий» вариант (16 строк): POST /api/ask, порт 8081
    ├── web_mcp_gateway_medium.py    # «Средний» вариант (23 строки): /v1/chat/completions в формате OpenAI, порт 8082
    ├── requirements.txt             # fastapi, uvicorn[standard], structlog, pydantic (docstoolkit ОТСУТСТВУЕТ!)
    ├── Dockerfile                   # python:3.12-slim + git, CMD python lorenzo_pro_gateway.py, порт 8083
    ├── docker-compose.yml           # Сервисы: gateway (8083) + redis:7-alpine (Redis кодом не используется)
    ├── .env.example                 # LORENZO_API_KEY, GITHUB_TOKEN (ключ API в коде нигде не проверяется)
    └── docs/
        └── DAF_FULL_DOCUMENTATION.md  # Полная русскоязычная документация DAF: концепция, этапы, деплой
```

## Ключевые файлы и что каждый делает

| Файл | Назначение | Факты |
|---|---|---|
| `daf-gateway/lorenzo_pro_gateway.py` | Главный шлюз DAF v3.1 | FastAPI, порт 8083. `POST /v1/chat/completions` → `clean_voice_query` → `docstoolkit.rag.ask(..., method="adaptive", top_k=15)`; ответ `{"answer", "cleaned_query", "daf"}` — формат НЕ OpenAI-совместимый, вопреки докстрингу. `POST /api/git/write` — пишет файл и делает `git add/commit/push` с токеном в URL на `svend4/info10 main`. `POST /api/download` — отдаёт файл из `/app`. `GET /api/health`. Импортированы, но не используются `Depends, Header` — следы удалённой авторизации |
| `daf-gateway/l orenzo_pro_gateway.py` | Случайный дубликат | Байт-в-байт совпадает с главным, кроме одной строки докстринга; имя с пробелом — артефакт загрузки |
| `daf-gateway/web_mcp_gateway.py` | Лёгкий шлюз | Один эндпоинт `POST /api/ask(query, mode)` → `ask(..., top_k=10)`, порт 8081 |
| `daf-gateway/web_mcp_gateway_medium.py` | Средний шлюз | `POST /v1/chat/completions`, ответ в схеме OpenAI chat.completion (id/choices/finish_reason захардкожены), порт 8082. Заявленные в докстринге Tool Calling и rate limiting НЕ реализованы |
| `daf-gateway/requirements.txt` | Зависимости | 4 пакета; критическая зависимость `docstoolkit` (RAG-пакет из репо lorenzo) не указана и не вендорится |
| `daf-gateway/Dockerfile` | Образ | `COPY . .` копирует только daf-gateway → в контейнере не будет ни docstoolkit, ни git-репозитория для push |
| `daf-gateway/docker-compose.yml` | Оркестрация | gateway + redis; volume `.:/app`; Redis никаким кодом не используется |
| `daf-gateway/.env.example` | Секреты | `LORENZO_API_KEY=lorenzo-pro-key-2026` (нигде не проверяется), `GITHUB_TOKEN=ghp_ВАШ_ТОКЕН_ЗДЕСЬ` |
| `daf-gateway/docs/DAF_FULL_DOCUMENTATION.md` | Документация | Концепция DAF, 5 этапов эволюции, системный промпт для нейросети, инструкции деплоя (локально/Render.com), статус «Полностью готово» |
| `SESSION_SUMMARY.md` | Самоотчёт сессии | Краткая сводка: что выгружено, дата 11.05.2026 |
| `test/hello*.txt` | Тестовые файлы | Проверка создания файлов через GitHub API, к DAF не относятся |

## Особенности организации кода

- **Монорепозиторийная задумка**: `daf-gateway/` оформлен как самостоятельный подпроект («standalone sub-project inside the info10 repository») со своим README, Docker и docs — при этом корень репозитория остался пустой заглушкой.
- **Три версии одного сервиса рядом** (лёгкая/средняя/pro) — история эволюции в одной папке вместо git-истории; версии не переиспользуют общий код.
- **Артефакты чат-происхождения**: дубликат с пробелом в имени файла, захардкоженные значения (`chatcmpl-123`, `created: 1234567890`), самоотчёты вместо тестов.
- Нет пакетов/модулей Python (плоские скрипты), нет `pyproject.toml`, нет тестов (папка `test/` — это текстовые hello-файлы, а не тесты кода).
