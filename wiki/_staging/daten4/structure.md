# Структура daten4

## Аннотированное дерево

```
daten4/
├── README.md                          # 2 строки: «dinamic planer … в одном файле HTML»
├── dynamic-planner (1).html           # 449 КБ — собранное React-приложение (Tailwind), итерация 1
├── dynamic-planner(8).html            # 452 КБ — итерация 8, самый «свежий» вариант конструктора
├── dynamic-planner-DEMO.html          # 459 КБ — версия с предзаполненными демо-данными (отпуск, блог и т.п.)
├── dynamic-planner-v2.html            # 245 КБ — «Планировщик v2.0», свой CSS (не Tailwind), меньший бандл
│
└── ai-planner/                        # MVP «AI-Powered Dynamic Planner» (добавлен PR #1, 26–28.01.2026)
    ├── README.md                      # архитектура, возможности, быстрый старт (частично не соответствует факту)
    ├── PROJECT_SUMMARY.md             # самоотчёт «что создано» — перепроверен в assessment.md
    ├── DEPLOYMENT.md                  # инструкция по коммиту/деплою (внутренний чек-лист сессии Claude)
    ├── docker-compose.yml             # ChromaDB + backend + Redis; ссылается на ОТСУТСТВУЮЩИЙ backend/Dockerfile
    ├── .gitignore                     # стандартный (node_modules, .env, dist, данные БД)
    │
    ├── .github/workflows/
    │   └── index-templates.yml        # 159 строк; авто-chunking шаблонов при push.
    │                                  # НЕ БУДЕТ РАБОТАТЬ: лежит не в корне репозитория
    ├── backend/
    │   ├── package.json               # express, @anthropic-ai/sdk, chromadb, helmet, rate-limit; jest в dev
    │   ├── .env.example               # ANTHROPIC_API_KEY, OPENAI_API_KEY, CHROMA_URL, лимиты
    │   └── src/
    │       ├── server.js              # Express: helmet, CORS, 2 rate-limiter'а, логирование, error handling
    │       ├── routes/api.js          # 220 строк; 7 endpoint'ов (chunk/index/search/ask/autofill/delete/health)
    │       └── services/
    │           ├── chunking-engine.js # 274 строки; разбиение шаблона на чанки ~500 строк с overlap 50
    │           └── rag-engine.js      # 456 строк; embeddings (OpenAI), ChromaDB, ответы Claude, автозаполнение
    ├── frontend/
    │   └── src/
    │       ├── components/AIAssistant.jsx  # 282 строки; плавающий чат-ассистент, быстрые вопросы, источники
    │       └── services/api.js             # 174 строки; клиент ко всем endpoint'ам backend
    │                                       # НЕТ package.json / index.html / App — проект не собирается
    ├── scripts/
    │   └── chunk-template.js          # 185 строк; CLI-обёртка над chunking-engine (--input/--output)
    │                                  # generate-embeddings.js из README — ОТСУТСТВУЕТ (404)
    ├── templates/examples/
    │   └── api-documentation.json     # 412 строк; пример шаблона «Документация API» (заявлено «5000+ строк»)
    └── docs/
        └── GETTING_STARTED.md         # 449 строк; установка dev/production, получение API-ключей, troubleshooting
```

## Ключевые файлы и модули

| Файл | Что делает |
|---|---|
| `dynamic-planner(8).html` | Наиболее развитая офлайн-версия конструктора планов: шаблоны (блог-пост, день рождения, мероприятие…), группы полей, статусы, приоритеты, сохранение в localStorage, импорт/экспорт |
| `dynamic-planner-DEMO.html` | Та же версия, но с предзаполненными демо-данными (план отпуска: бюджет, билеты, «Где останавливаемся?» и т.д.) — витрина возможностей |
| `dynamic-planner-v2.html` | Более ранняя/лёгкая ветка v2.0 с собственным CSS; редактор шаблонов с условной логикой («Если поле…», «Больше чем/Меньше чем») |
| `dynamic-planner (1).html` | Ещё одна итерация той же линейки (промежуточная) |
| `ai-planner/backend/src/services/chunking-engine.js` | Класс `ChunkingEngine`: режет шаблон по секциям на чанки ≤500 строк, крупные секции делит на под-чанки, считает статистику, строит индекс |
| `ai-planner/backend/src/services/rag-engine.js` | Класс `RAGEngine`: `indexChunks` (embeddings → ChromaDB), `searchChunks` (семантический поиск, topK), `answerQuestion` (RAG-промпт → Claude 3.5 Sonnet, источники + confidence), `autoFillField` (автозаполнение поля по контексту формы) |
| `ai-planner/backend/src/routes/api.js` | REST-обвязка над двумя движками; инициализация RAGEngine из env-переменных |
| `ai-planner/backend/src/server.js` | Точка входа backend: безопасность (helmet), CORS на `FRONTEND_URL`, rate limiting (100/15мин; 20 AI-запросов/мин), корневой самоописывающий endpoint |
| `ai-planner/frontend/src/components/AIAssistant.jsx` | React-компонент чата: быстрые вопросы («Какие поля обязательные?», «Помоги заполнить форму»), история, отображение уверенности и источников |
| `ai-planner/frontend/src/services/api.js` | Fetch-клиент: `chunkTemplate`, `indexChunks`, `searchChunks`, `askQuestion`, `autoFill`, `deleteIndex`; база `VITE_API_URL` |
| `ai-planner/scripts/chunk-template.js` | CLI: `node scripts/chunk-template.js --input file.json --output file.chunks.json` |
| `ai-planner/.github/workflows/index-templates.yml` | Задумка CI: при изменении `templates/**/*.json` — chunking, генерация embeddings, коммит результатов, комментарий в PR. Неактивен из-за расположения |
| `ai-planner/templates/examples/api-documentation.json` | Пример шаблона: 8 секций, 40+ полей, `aiHints` для автозаполнения, условная логика |

## Особенности организации кода

- **Два несвязанных слоя**: корневые HTML-файлы и `ai-planner` нигде не интегрированы друг с другом — HTML-версии не вызывают backend, а frontend `ai-planner` не содержит самого планировщика (только чат-компонент).
- **Версии как файлы**: итерации планировщика хранятся как отдельные файлы с «загрузочными» именами (`(1)`, `(8)`, `-DEMO`, `-v2`) вместо истории git — типичный след «Add files via upload». Имя с пробелом `dynamic-planner (1).html` неудобно для ссылок.
- **Исходников HTML-приложений нет**: в репозитории только минифицированные сборки; проект, из которого они собирались (React + Vite), не закоммичен.
- **`ai-planner` — результат одной сессии Claude Code**: об этом прямо говорят DEPLOYMENT.md (ветка `claude/review-repository-BWvEy`, пути `/home/user/daten4/…`) и авторство коммита. Документация написана «на вырост» и местами описывает файлы, которых нет.
