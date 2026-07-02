# Структура infom

## Дерево каталогов (аннотированное)

```
infom/
├── CLAUDE.md                    # Инструкции для Claude Code: архитектура, «ключевые числа», правила разработки
├── README.md                    # Заглушка (2 строки: «# infom / info») — реальная дока в CLAUDE.md и docs/
├── requirements.txt             # Ядро — stdlib only; все зависимости закомментированы, кроме pytest
├── config.py                    # Фабрика LLM-адаптеров: 10 провайдеров через env INFOM_PROVIDER, с fallback
├── main.py                      # Демонстрация: ручные эмбеддинги (геометрия) + индексация документа (304 стр.)
├── pipeline.py                  # InfoMPipeline — главный оркестратор уровней L0–L3 (253 стр.)
├── indexer.py                   # DocumentIndexer: текст → чанки → LLM NER → KnowledgeMap (307 стр.)
├── graphrag_query.py            # GraphRAGQuery: режимы local / global / hybrid (304 стр.)
├── llm_adapter.py               # Адаптеры: Mock, Ollama, OpenAI, Cohere, Groq, OpenRouter, Jina, Together (555 стр.)
├── semantic_sim.py              # SemanticAdapter: 32D словарные эмбеддинги + синтез ответов без LLM (560 стр.)
├── test_semantic.py             # Сравнение Mock vs Semantic: эмбеддинги, кластеризация, RAG (247 стр., без assert)
├── infom_mcp.py                 # MCP-сервер (JSON-RPC 2.0/stdio), 11 инструментов, снапшоты (725 стр.)
├── infom_api.py                 # REST API (FastAPI): 13 эндпоинтов, /webhook для Make.com/n8n/Zapier (318 стр.)
├── infom_graph.html             # Экспортированная интерактивная D3.js-визуализация графа (1669 стр.)
├── Dockerfile                   # python:3.11-slim, запуск infom_api.py на :8000
├── fly.toml / railway.toml / render.yaml   # Конфиги бесплатного деплоя (Fly.io Frankfurt / Railway / Render)
├── .mcp.json                    # Регистрация MCP-сервера (жёсткий путь /home/user/infom — непереносимо)
├── .gitignore
│
├── graph/                       # Структуры графа знаний
│   ├── node.py                  #   GraphNode, GraphEdge (48 стр.)
│   ├── hyper_edge.py            #   HyperEdge: кластеры 3–8 нод (133 стр.)
│   ├── community.py             #   Community, CommunityBorder (226 стр.)
│   └── knowledge_map.py         #   KnowledgeMap: build(), label propagation, PCA-lite power iteration (474 стр.)
│
├── signatures/                  # Геометрические сигнатуры
│   ├── hexsig.py                #   Q6: 6-битный гиперкуб, 64 ячейки, average-pool проекция (221 стр.)
│   ├── tangram.py               #   TangramSignature: форма сообщества (163 стр.)
│   ├── fractal.py               #   FractalSignature: box-counting размерность границы (297 стр.)
│   ├── heptagram.py             #   7-лучевой профиль (150 стр.)
│   └── octagram.py              #   8-лучевой «скелет» (192 стр.)
│
├── search/                      # Поисковые алгоритмы
│   ├── hnsw.py                  #   Двухэтапный поиск: Hamming ball → geometric rerank (347 стр.)
│   ├── multi_lsh.py             #   MultiProjectionQ6: 3 независимые ортогональные проекции (174 стр.)
│   ├── local.py / cluster.py / boundary.py / radial.py   # 4 вида поиска (66–91 стр. каждый)
│   └── benchmark.py             #   Recall-бенчмарк Multi-LSH (120 стр.)
│
├── archetypes/
│   └── query_expander.py        # 16 архетипов (4 бита: A/M × D/S × C/E × O/F), расширение запросов (285 стр.)
│
├── visualizer/
│   ├── ascii.py                 # ASCII-рендер графа и сообществ (335 стр.)
│   └── html.py                  # Экспорт в интерактивный D3.js HTML (709 стр.)
│
├── docs/
│   ├── architecture/
│   │   ├── genesis.md           # «Порядок Творения AI-инфраструктуры»: 13 слоёв Day 0–12 (527 стр.)
│   │   └── codex.md             # Таблица соответствий: слои ↔ репозитории svend4 ↔ изобретения из data70
│   └── integrations/
│       ├── make_com.md / n8n.md / zapier_activepieces.md   # Гайды подключения REST API к no-code платформам
│
├── skills/                      # Инструкции для агента (паттерн «мозг»)
│   ├── indexing.md              #   Правила чанкинга и порядка индексации
│   ├── querying.md              #   Как формулировать запросы к графу
│   └── reporting.md             #   Шаблон итогового отчёта
│
├── tasks/
│   └── current_task.md          # Активная задача агента: паттерн «brain repo + data repo»
│
├── results/
│   └── analysis_data70_2026-03-28.md   # Реальный отчёт: граф по data70 (46 нод, 8 рёбер, 6 сообществ)
│
├── graph_snapshots/
│   └── latest.json              # Персистентный снапшот графа (ноды + рёбра + эмбеддинги)
│
├── openclaw-skills/             # Скиллы для экосистемы OpenClaw/ClawHub
│   ├── infom-graphrag/SKILL.md  #   Обёртка GraphRAG API (заявлен Base URL infom-api.railway.app)
│   └── social-law-de/SKILL.md   #   Немецкое соцправо: Widerspruch/Klage, SGB IX/XII/V/II/III
│
├── .claude/skills/infom-analyze/SKILL.md   # Claude Code-скилл: шаблон анализа текста через InfoM
└── .github/workflows/
    └── infom-agent.yml          # GitHub Actions агент (claude-code-action@beta): cron 3:00 UTC + dispatch + push
```

## Ключевые файлы и модули

| Файл/модуль | Роль |
|---|---|
| `pipeline.py` → `InfoMPipeline` | Главный фасад: add_node/add_edge/build/query, объединяет граф, поиск, сигнатуры, LLM |
| `indexer.py` → `DocumentIndexer` | Полный конвейер индексации: chunk → extract (LLM JSON) → embed → classify → build |
| `graphrag_query.py` → `GraphRAGQuery` | RAG-ответы: local (окрестность ноды), global (MapReduce по сообществам), hybrid (+HNSW rerank) |
| `llm_adapter.py` | Единый интерфейс `complete()`/`embed()`; всё через urllib (без SDK-зависимостей) |
| `semantic_sim.py` → `SemanticAdapter` | «Оффлайн-LLM»: словарь ~сотен понятий с ручными 32D-векторами по 32 семантическим осям |
| `config.py` → `create_llm_adapter()` | Выбор провайдера по `INFOM_PROVIDER`, graceful fallback на SemanticAdapter |
| `graph/knowledge_map.py` | Сборка сообществ (label propagation), гиперрёбер, границ; PCA-lite для 2D-координат |
| `signatures/hexsig.py` | `embed_to_q6`: average-pool N→6 → 6-битный адрес; семантика битов (material/dynamic/complex/…) |
| `search/hnsw.py` + `search/multi_lsh.py` | Stage 1: объединение Hamming-шаров трёх LSH-проекций; Stage 2: точный rerank |
| `infom_mcp.py` | 11 MCP-инструментов: index, query, visualize, stats, add_node, add_edge, build, reset, benchmark, save, load |
| `infom_api.py` | 13 REST-эндпоинтов: /, /index, /query, /stats, /visualize, /reset, /build, /save, /load, /node, /edge, /webhook, /batch/index |
| `docs/architecture/genesis.md` + `codex.md` | Концептуальная рамка: 13 слоёв AI-инфраструктуры и место каждого репозитория svend4 в ней |

## Особенности организации кода

- **Stdlib-only ядро**: ни numpy, ни networkx — вся линейная алгебра (PCA power iteration, Gram-Schmidt для ортогональных матриц, косинусы) написана вручную на списках. Это осознанное решение (комментарий в `requirements.txt`: «как в meta/hexcore»).
- **Двойная документация**: README пуст, но `CLAUDE.md` — полноценная карта проекта с правилами разработки («эмбеддинги всегда нормированы», «LP threshold = 1.5×», «Q6 через average-pool»).
- **Репозиторий = агент**: помимо библиотеки, репо содержит операционный контур — задачи (`tasks/`), навыки (`skills/`), результаты (`results/`), расписание (workflow) — т.е. спроектирован как «мозг» автономного агента.
- **Русскоязычный код**: docstrings, промпты, комментарии и даже демо-данные — на русском; сам семантический словарь `semantic_sim.py` заточен под русские понятия.
- **Три уровня доступа** к одной и той же логике: Python-API → MCP → REST, все обёртки тонкие и переиспользуют `_state`/`tool_*` из `infom_mcp.py`.
