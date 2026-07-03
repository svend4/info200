# Структура daten22

## Аннотированное дерево каталогов

```
daten22/
├── README.md                      # Главный индекс: руководство по 16 типам MBTI
│                                  # (устарел: не упоминает rag/, pseudorag/ и Android-приложение)
├── COMPLETION_REPORT.md           # Самоотчёт о создании 42 документов (статус «ВЫПОЛНЕНО»)
├── create_types.sh                # Bash-скрипт-генератор файлов типов (15 типов; INTJ создан отдельно)
│
├── docs/                          # 47 md-документов + 1 скрипт — ядро базы знаний
│   ├── 01-introduction.md         # Введение в MBTI (259 строк)
│   ├── 02-dichotomies.md          # Четыре дихотомии E/I, S/N, T/F, J/P
│   ├── 03-cognitive-functions.md  # Когнитивные функции
│   ├── 04-compatibility.md        # Совместимость типов
│   ├── 05-practical-use.md … 08-career.md      # Практика, тесты, развитие, карьера
│   ├── 09-compatibility-matrix.md # Полная матрица совместимости 16×16
│   ├── 10-socionics.md … 19-leadership.md      # Углублённые темы: соционика, подтипы A/T,
│   │                              # теневые функции, петли/грипы, отношения, семья, команды
│   ├── 20-negotiations-sales.md … 28-spirituality.md  # Практические темы (600–1200 строк каждый
│   │                              # в блоке 21–26; напр. 21-workplace-conflicts.md — 1044 строки)
│   ├── 29-finances-money.md … 42-travel-adventure.md  # Короткие прикладные обзоры (30–75 строк)
│   ├── 50-information-archetypes.md   # Теория 16 информационных архетипов (559 строк) — мост к pseudorag
│   ├── 51-interaction-matrix.md       # Матрица взаимодействия архетипов
│   ├── 52-expansion-algorithm.md      # Алгоритм расширения запросов
│   ├── 53-data-structuring-algorithm.md  # Алгоритм структурирования данных
│   ├── 54-pyramid-architecture.md     # 4-уровневая пирамидная архитектура знаний
│   └── create_remaining_docs.sh       # Скрипт-генератор заготовок документов
│
├── types/                         # 16 файлов — детальные портреты типов (~440–460 строк; INTJ.md короче — 372)
│   ├── INTJ.md  INTP.md  ENTJ.md  ENTP.md      # Аналитики (NT)
│   ├── INFJ.md  INFP.md  ENFJ.md  ENFP.md      # Дипломаты (NF)
│   ├── ISTJ.md  ISFJ.md  ESTJ.md  ESFJ.md      # Хранители (SJ)
│   └── ISTP.md  ISFP.md  ESTP.md  ESFP.md      # Искатели (SP)
│
├── rag/                           # RAG-система поиска по документации (Python)
│   ├── README.md                  # Подробная инструкция: установка, индексация, запросы
│   ├── config.py                  # Пути, эмбеддинг-модель, чанкинг (1000/200), промпты (RU)
│   ├── cli.py                     # CLI: интерактивный режим, разовый запрос, --no-llm, --stats
│   ├── requirements.txt           # langchain 0.1.0, chromadb 0.4.22, sentence-transformers,
│   │                              # streamlit 1.29, openai 1.7.2 (версии зафиксированы, но старые)
│   ├── .env.example               # Шаблон настроек (OPENAI_API_KEY опционален)
│   ├── setup.sh                   # Скрипт установки
│   ├── scripts/
│   │   ├── indexer.py             # Загрузка md из docs/ и types/ → чанки → ChromaDB
│   │   └── query_engine.py        # similarity_search + RetrievalQA (GPT-3.5 при наличии ключа)
│   └── app/
│       └── streamlit_app.py       # Веб-интерфейс (227 строк): поиск, история, метрики
│
├── pseudorag/                     # PseudoRAG — прототип структурирования знаний (Python)
│   ├── README.md                  # Концепция, API, 16 архетипов; упоминает templates/, tests/
│   │                              # и requirements.txt, которых В РЕПОЗИТОРИИ НЕТ
│   ├── main.py                    # Демонстрация: архетипы + расширение 3 запросов
│   ├── test_cities.py             # Демо-тест «Города Европы» (скрипт, не pytest)
│   ├── __init__.py
│   ├── __pycache__/               # ⚠ Закоммиченный кеш Python — мусор в репозитории
│   ├── core/
│   │   ├── archetypes.py          # 292 строки: 4 оси реальности, dataclass Archetype,
│   │   │                          # 16 определений (MSEO«Кристалл» … ADCF«Общество»)
│   │   ├── query_expander.py      # 374 строки: шаблоны вопросов по архетипам,
│   │   │                          # Question/QuestionTree, экспорт JSON и Markdown
│   │   └── __init__.py
│   └── examples/
│       ├── города_европы.json     # Готовый пример сгенерированного вопросника
│       └── города_европы.md
│
└── android-document-search/       # Android-приложение офлайн-поиска (Kotlin)
    ├── README.md                  # Подробная документация: установка, FTS4, архитектура
    ├── build.gradle.kts           # Корневой Gradle-конфиг
    ├── settings.gradle.kts
    ├── gradle/wrapper/
    ├── .gitignore
    └── app/
        ├── build.gradle.kts       # compileSdk 34, minSdk 24, Room 2.6.1 + KSP,
        │                          # PDFBox-Android, Apache POI, Material 1.11, Navigation
        └── src/main/
            ├── java/com/example/docsearch/
            │   ├── MainActivity.kt            # Главная активность
            │   ├── DocumentSearchApp.kt       # Application-класс
            │   ├── data/
            │   │   ├── database/              # DocumentDatabase, DocumentEntity (FTS4),
            │   │   │                          # DocumentDao (MATCH + snippet() подсветка)
            │   │   ├── repository/            # DocumentRepository
            │   │   └── model/                 # SearchResult
            │   ├── ui/
            │   │   ├── search/                # SearchFragment + SearchViewModel (MVVM)
            │   │   └── adapter/               # SearchResultAdapter
            │   └── utils/
            │       ├── TextExtractor.kt       # PDF→PDFBox, DOCX→POI, txt/md/log→чтение
            │       └── FileIndexer.kt         # Рекурсивный обход Documents, инкрементальная
            │                                  # индексация по mtime, пропуск файлов > 50 МБ
            └── res/                           # layouts, strings, drawables (Material 3)
```

## Ключевые файлы и модули

| Файл/модуль | Что делает |
|---|---|
| `README.md` (корень) | Оглавление базы знаний MBTI со ссылками на docs/ и types/; структура проекта в нём устарела (только docs/ и types/) |
| `COMPLETION_REPORT.md` | Самоотчёт: 42 документа, ~967 КБ, построчная статистика; аудитом в основном подтверждён |
| `docs/01–42-*.md` | Энциклопедия MBTI: теория (01–09), углублённые темы (10–19), практика (20–28), короткие прикладные обзоры (29–42) |
| `docs/50–54-*.md` | Теоретическая база PseudoRAG: онтология 16 информационных архетипов и алгоритмы |
| `types/*.md` | 16 детальных портретов типов, единый формат (~440–460 строк каждый; INTJ.md короче — 372) |
| `rag/scripts/indexer.py` | Пайплайн индексации: DirectoryLoader → RecursiveCharacterTextSplitter → HuggingFaceEmbeddings → Chroma |
| `rag/scripts/query_engine.py` | Поиск (similarity_search / with_score) и RetrievalQA-цепочка c ChatOpenAI (опционально) |
| `rag/cli.py` | Консольный интерфейс с интерактивным режимом на русском |
| `rag/app/streamlit_app.py` | Веб-интерфейс поиска с историей и статистикой коллекции |
| `pseudorag/core/archetypes.py` | Онтология: 4 бинарные оси × 16 архетипов, с ключевыми словами RU/EN и приоритетами |
| `pseudorag/core/query_expander.py` | Превращение темы в дерево вопросов по шаблонам архетипов; экспорт JSON/Markdown |
| `android .../DocumentDao.kt` | Room DAO поверх FTS4: MATCH-поиск, ранжирование, snippet()-подсветка |
| `android .../FileIndexer.kt` | Индексатор файловой системы с инкрементальностью и лимитом размера |
| `create_types.sh`, `docs/create_remaining_docs.sh` | Bash-генераторы заготовок markdown-файлов |

## Особенности организации кода

- **Монорепозиторий из 4 слабо связанных частей**: контент (docs/, types/), два Python-прототипа и Android-проект. Связь между ними — концептуальная (число 16, тема поиска по знаниям), а не программная: rag/ читает docs/ и types/, pseudorag/ и Android-приложение автономны.
- **Числовая нумерация документов** (01–42, затем скачок к 50–54) — блоки 43–49 зарезервированы/пропущены; блок 50+ относится уже не к MBTI, а к архетипам PseudoRAG.
- **Генерация контента скриптами**: заготовки типов и документов создавались bash-скриптами, затем наполнялись.
- **Следы ИИ-разработки**: ветки `claude/review-repository-*`, `claude/android-document-search-*`, слитые через PR #1–#4.
- **Мусор в репозитории**: закоммичен `pseudorag/__pycache__/`; `.gitignore` есть только у Android-подпроекта, в корне отсутствует.
- **Рассинхронизация README**: корневой README не знает о трёх кодовых подпроектах; pseudorag/README.md упоминает несуществующие `templates/`, `tests/` и `requirements.txt`; android/README.md содержит placeholder `github.com/yourusername/daten22` и отсылку к уже слитой ветке.
