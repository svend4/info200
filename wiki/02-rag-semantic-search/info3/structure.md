# Структура info3

## Аннотированное дерево каталогов

```
info3/
├── README.md                        # 2 строки («# info3 / info») — фактически пустой
├── ФОРМАТЫ-README.md                # 601 строка: анализ форматов хранения 4-уровневой
│                                    # системы (txt/md/JSON/YAML/XML/SQL/NoSQL) с примерами
├── .gitignore                       # аккуратный: Python, venv, IDE, *.db, *.pkl, demo-выводы
│
├── афоризмы/                        # ГЛАВНАЯ коллекция контента
│   ├── README.md                    # 1 897 строк: каталог ~437 тематических разделов;
│   │                                # заявлено 446 txt-файлов, ~90 000+ афоризмов
│   ├── философия/античная.txt       # реальные цитаты (Сократ, Платон, Аристотель…)
│   ├── житейская-мудрость/, любовь-и-отношения/, работа-и-карьера/ …
│   └── … сотни подпапок, в каждой 1–2 txt
│       (обычно «классические-и-современные.txt»)
│
├── бережливость-и-расточительность/ # ┐
├── верность-слову-и-вероломство/    # │ 21 корневая папка «пар качеств»
├── доверие-и-подозрительность/      # │ (сила-и-слабость, усердие-и-халатность,
├── …                                # │  чуткость-и-черствость и т.д.)
├── щедрость-и-скупость/             # ┘ в каждой — классические-и-современные.txt
│                                    #   (~260 строк коротких афоризмов)
│
├── machine-readable/                # ТЕХНИЧЕСКОЕ ЯДРО: 35 модулей, ~24 700 строк Python
│   ├── README.md                    # 351 стр.: API KnowledgeSystem, примеры
│   ├── ADVANCED-README.md           # 643 стр.: продвинутые сценарии
│   ├── RAG-QUICKSTART.md            # 559 стр.: быстрый старт RAG
│   ├── RAG-ARCHITECTURE-ANALYSIS.md # 563 стр.: варианты архитектур (6 уровней)
│   ├── IMPLEMENTATION-STATUS.md     # 3 810 стр.: САМОАУДИТ «26/26 = 100%»
│   ├── FUTURE-ROADMAP.md            # 1 766 стр.: дорожная карта уровней 1–6
│   ├── VISUAL-GUIDE.md              # 437 стр.: визуальные схемы
│   ├── requirements.txt             # fastapi, sentence-transformers, faiss, neo4j, redis…
│   ├── искусственный-интеллект.json # эталонная тема в 4 уровнях (валидный JSON, ~30 КБ)
│   ├── искусственный-интеллект.yaml # то же в YAML
│   └── *.py                         # 35 модулей (см. таблицу ниже)
│
└── frontend/                        # React-дашборд (без сборки, CDN)
    ├── README.md                    # 407 строк
    ├── index.html                   # 46 строк: React 18 + TailwindCSS + Chart.js c CDN
    ├── app.js                       # 872 строки: JWT-auth, поиск, WebSocket, графики
    ├── styles.css                   # 467 строк
    └── serve.py                     # 62 строки: простой статический сервер
```

## Ключевые модули machine-readable/ (по уровням «реальности»)

| Модуль (строк) | Что делает | Уровень |
|---|---|---|
| `micro_agent_simple.py` (414) | Микро-агент без зависимостей: keyword-поиск по txt-базе, выбор уровня, стратегия ответа. **Запуск проверен — работает** | 1 (реальное) |
| `advanced_micro_agent.py` (865) | Расширенная версия микро-агента (только стандартная библиотека): 15 типов «автономных решений» вместо 8, самообучение на истории, многоуровневый кэш (L1/L2), мета-анализ собственных решений, функции инфоброкера | 1–2 |
| `knowledge_system.py` (497) | Датаклассы Formula/Archetype/Algorithm/Theorem, загрузка JSON/YAML, поиск, генерация обучающих данных | 1 |
| `semantic_search_agent.py` (608) | Семантический поиск: sentence-transformers + FAISS, hybrid 70/30, graceful fallback на keyword | 1 |
| `persistent_storage.py` (711) | Хранилище SQLite/Redis/JSON с TTL, историей запросов, паттернами | 1 |
| `production_api.py` (730) | FastAPI: JWT-auth, rate limiting (slowapi), Prometheus-метрики, health checks | 1 |
| `rag_api_server.py` (537) | Более простой REST API для микро-агента | 1–2 |
| `websocket_server.py` (664) | Real-time двунаправленный канал; единственный файл с функциями `test_*` | 2 |
| `graph_knowledge_base.py` (929) | Графовая БЗ: Neo4j с fallback на networkx | 2 |
| `demo.py` (400), `integration_examples.py` (601), `rag_client_examples.py` (471), `ai_integration.py` (494) | Демонстрации и примеры интеграции | 1–2 |
| `multi_agent_system.py` (749), `active_learning.py` (812), `automated_extraction.py` (676), `adversarial_validation.py` (716), `federated_learning.py` (737), `meta_learning.py` (900), `knowledge_matrix.py` (733), `info_broker.py` (708) | «Экспериментальный/исследовательский» пласт: мульти-агентность, активное обучение, извлечение знаний | 3–4 |
| `cognitive_architecture.py` (647), `neural_symbolic_integration.py` (928), `self_evolving_kb.py` (1048), `emergent_synthesis.py` (773), `swarm_intelligence.py` (748), `multi_modal_knowledge.py` (701), `universal_translator.py` (971), `universal_knowledge.py` (649), `consciousness_agent.py` (832), `collective_consciousness.py` (632) | Спекулятивные симуляции когнитивных архитектур | 4–5 |
| `quantum_knowledge.py` (702), `time_traveling_knowledge.py` (759), `knowledge_telepathy.py` (741), `akashic_records.py` (596) | Научная фантастика: «квантовый поиск» (qiskit-заглушка), «телепатия», «хроники Акаши». В докстрингах честно: «Reality: 1%…20%» | 5–6 |

## Особенности организации кода

- **Все 35 модулей автономны**: каждый содержит `if __name__ == "__main__"` с демо-сценарием; синтаксис всех файлов корректен (проверено `py_compile`).
- **Паттерн graceful degradation**: тяжёлые зависимости (sentence-transformers, faiss, qiskit, neo4j, redis) импортируются через `try/except` с флагами `*_AVAILABLE` и запасными реализациями — код запускается и без них.
- **Двуязычие**: докстринги и вывод — по-русски, идентификаторы — по-английски; имена файлов контента и данных — кириллические (`искусственный-интеллект.json`), что может ломать инструменты на некоторых ОС/CI.
- **Нет пакета**: модули лежат плоско в `machine-readable/` без `__init__.py`, `setup.py`/`pyproject.toml`; импорт возможен только из этой папки.
- **Контент и код в одном репозитории**: сотни txt-папок в корне визуально «хоронят» техническую часть; корневой README (2 строки) никак не помогает навигации.
