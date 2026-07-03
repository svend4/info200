# Структура info30

## Аннотированное дерево (фактическое состояние в git)

```
info30/
├── README.md                                   # 412 строк. Витрина проекта: что это, quick start,
│                                               #   таблицы содержимого, 3 метода использования,
│                                               #   инструкции по расширению, «статистика», бейджи
│                                               #   version 1.0.0 / MIT / docs complete
│
└── .claude-knowledge/                          # Вся база знаний (скрытая папка)
    ├── README.md                               # 512 строк. Главная документация: принципы
    │                                           #   («не всё встроено в нейросеть»), ЦЕЛЕВАЯ схема
    │                                           #   каталогов (шире фактической!), 6 типов знаний,
    │                                           #   стандарты форматирования файлов
    ├── QUICK-START.md                          # 457 строк. Быстрый старт за 15 минут,
    │                                           #   3 варианта подключения (прямое / memory / MCP)
    │
    ├── instructions/
    │   └── deployment/
    │       └── docker-setup.md                 # 536 строк. Эталонная инструкция: YAML frontmatter
    │                                           #   (difficulty, duration_minutes, success_criteria,
    │                                           #   related_files), шаги Dockerfile/compose/.dockerignore
    │
    ├── agents/
    │   └── custom-agents/
    │       └── code-reviewer.yml               # 545 строк. Эталонный агент v1.3.0: metadata,
    │                                           #   capabilities, параметры с валидацией (strictness,
    │                                           #   check_types, output_format), зависимости
    │                                           #   (pylint/eslint/mypy...), системные промпты, workflow
    │
    ├── skills/
    │   └── custom-skills/
    │       └── smart-refactor.md               # 521 строка. Эталонный скилл /refactor v1.1.0:
    │                                           #   параметры (type, aggressiveness, backup, dry-run),
    │                                           #   шаблонный промпт с подстановками ${target} и т.п.
    │
    ├── examples/
    │   └── use-cases/
    │       └── real-world-scenarios.md         # 830 строк. 5 сценариев: онбординг, стандартизация
    │                                           #   кода, автоматизация code review, документирование
    │                                           #   legacy, миграция стека — с bash-заготовками
    │
    └── documentation/
        ├── methodology/
        │   └── knowledge-formats.md            # 1325 строк (крупнейший файл). Сравнение форматов
        │                                       #   Markdown/YAML/JSON/код/гибриды, стандарты,
        │                                       #   рекомендации по выбору
        └── guides/
            └── mcp-integration.md              # 794 строки. MCP: что это, ASCII-диаграмма
                                                #   архитектуры, настройка server-filesystem,
                                                #   создание кастомных серверов, troubleshooting
```

**Итого: 9 файлов, ~5 930 строк, ~165 КБ.** Других файлов (LICENSE, CLAUDE.md, .gitignore, CI-конфигов) нет.

## Заявленная vs фактическая структура

Документация (`README.md` корня и `.claude-knowledge/README.md`) описывает более широкое дерево. Каталоги ниже **заявлены, но в git отсутствуют** (git не хранит пустые папки):

| Заявленный каталог | Фактически |
|---|---|
| `instructions/{coding, architecture, testing, best-practices}/` | нет (есть только `deployment/`) |
| `agents/agent-configs/`, `agents/agent-templates/` | нет |
| `skills/skill-templates/` | нет |
| `templates/` (code-/project-/documentation-templates) | нет полностью |
| `examples/working-examples/`, `examples/snippets/` | нет (есть только `use-cases/`) |
| `integrations/` (mcp-servers, api-connectors, tools) | нет полностью |
| `documentation/references/` | нет |

## Таблица ключевых файлов

| Файл | Строк | Что делает |
|---|---|---|
| `README.md` (корень) | 412 | Презентация системы, quick start, статистика, лицензия (заявленная) |
| `.claude-knowledge/README.md` | 512 | Архитектура, типы знаний, стандарты форматов инструкций/агентов/скиллов |
| `.claude-knowledge/QUICK-START.md` | 457 | Ускоренное введение, 3 метода подключения базы к Claude Code |
| `instructions/deployment/docker-setup.md` | 536 | Единственная инструкция: настройка Docker (Dockerfile, compose, .dockerignore) |
| `agents/custom-agents/code-reviewer.yml` | 545 | Единственный агент: декларативный code review c промптами и параметрами |
| `skills/custom-skills/smart-refactor.md` | 521 | Единственный скилл: команда `/refactor` с промптом-шаблоном |
| `examples/use-cases/real-world-scenarios.md` | 830 | 5 сценариев применения базы знаний в команде |
| `documentation/methodology/knowledge-formats.md` | 1325 | Методология выбора форматов хранения знаний |
| `documentation/guides/mcp-integration.md` | 794 | Руководство по подключению базы через MCP |

## Особенности организации

- **Всё в скрытой папке `.claude-knowledge/`** — задумано как «подселяемая» в любой проект база; на GitHub папка не бросается в глаза, и язык репозитория не определяется.
- **Единый шаблон оформления**: каждый файл имеет версию, дату (везде 2026-02-09), автора «Claude Knowledge System / Claude Code Architecture Team», двуязычные (рус/англ) заголовки, обильные эмодзи-маркеры.
- **Один эталон на категорию**: система спроектирована «вширь», но наполнена минимально — по одному образцу инструкции/агента/скилла/примера.
- **Перекрёстные ссылки** local-path-стиля; часть из них битая (см. [assessment.md](assessment.md)): `docker-setup.md` ссылается на несуществующие `templates/code-templates/Dockerfile.template` и `examples/working-examples/docker-compose-example.yml` (проверено — 404).
