# Структура daten40

## Аннотированное дерево каталогов

```
daten40/
├── README.md                        # Главный README: что такое IFOS, 6 уровней, формат OS_PACK, Quality Ladder
├── README_IFOS_20260113.md          # Стратегия ведения репозитория (append-only, «вариант 2»)
├── FILES-INDEX.md                   # Январский индекс тестовых файлов Make.com-пайплайна (14 файлов)
├── FINAL-REPORT.md                  # Отчёт о 2 Make.com-инструментах (Text Saver / Binary Saver)
├── FINAL-THREE-TOOLS-REPORT.md      # Отчёт о 3-м инструменте (Binary Advanced: очистка «грязного» Base64)
├── generated_code.txt               # Артефакт генерации
├── .gitignore
│
├── blocks/                          # ЯДРО: 210 OS_PACK-блоков IFOS (~4225 файлов)
│   ├── _block_index.json            # Машинный индекс всех 210 блоков (слой, диапазон, число файлов/схем/стабов)
│   ├── index.html                   # «IFOS Wiki Navigator» — одностраничный навигатор с поиском/фильтрами
│   ├── 00_GENESIS/                  # 1 блок (шаги 1–14240): founding-документ, «ДНК» проекта
│   │   └── IFOS_00001_14240_concept_genesis/
│   ├── 01_FOUNDATION/               # 18 блоков (14241–22000): recipe OS, marketplace, компилятор, governance
│   │   └── IFOS_14441_14680_recipe/ # пример блока: md-концепт + JSON-схемы + Python-скелеты + стабы Make/n8n/WP
│   ├── 02_CORE_PLATFORM/            # 19 блоков (22001–30000): trust, installer, observability, data storage
│   ├── 03_DEVELOPER/                # 26 блоков (30001–40000): SDK, knowledge graph, identity, агенты
│   ├── 04_ADVANCED/                 # 58 блоков (40001–60000): UI, office suite, автоматизация, планирование
│   ├── 05_ENTERPRISE/               # 61 блок (60001–77600): governance, compliance, security, access
│   ├── 06_FINANCE_LEGAL/            # 27 блоков (77601–88800): tax, treasury, CPQ, audit, domain packs
│   ├── NEXT-17/ … NEXT-22/          # Legacy-формат января 2026: README/spec/manifest/checksums + pack_files
│   ├── TEST/, _TEMPLATE/            # Тестовый блок и шаблон блока
│   ├── IFOS_Master_Index_Filled_v26|v31.{csv,json,md}   # Старые версии заполненного мастер-индекса
│   └── IFOS_*_os_pack.zip, IFOS_step_*_bundle.zip       # Несколько ZIP-бандлов (75201–78400)
│
├── master_index/                    # «Позвоночник» проекта (версионируется по дате)
│   ├── IFOS_MASTER_INDEX_20260618.md    # Актуальный индекс: статистика, навигация по слоям, известные проблемы
│   ├── IFOS_MASTER_INDEX_20260618.json  # Машинная версия
│   └── DELTA_20260113_NEXT18|19|22_v1.md # Дельты январских блоков
│
├── tools/                           # Очереди и правила ведения
│   ├── NEXT_QUEUE_v1_20260618.md    # Актуальная очередь: DONE=88800, next 88801–89200, CRITICAL/HIGH/MEDIUM
│   ├── NEXT_QUEUE_20260113*.md      # Январские версии очереди (v1, v2, v5)
│   ├── BINARY_POLICY_APPEND_ONLY_20260113.md  # Политика: текст — источник истины, ZIP опционален
│   ├── WORKFLOW_VARIANT2_20260113.md
│   └── templates/
│
├── docs/                            # Документация январского Make.com-пайплайна
│   ├── DOCUMENTATION.md             # Обзор: 10+ файлов, 9 форматов, Claude AI + Make.com + GitHub API
│   ├── MAKE-INTEGRATION.md, TWO-TOOLS-GUIDE.md, THREE-TOOLS-COMPLETE.md
│   ├── SCENARIOS-COMPARISON.md, THREE-ADVANCED-SCENARIOS.md
│   └── .md                          # Файл с пустым именем — артефакт автогенерации
│
├── scripts/                         # Тестовые скрипты пайплайна
│   ├── test_generator.py            # Демонстрационный генератор тестовых данных (класс TestDataGenerator)
│   └── test-utils.js
├── config/                          # app-config.xml, application.yaml — тестовые конфиги
├── data/                            # test-data.json, employees.csv — тестовые данные
├── database/                        # test-schema.sql — тестовая схема БД
├── web/                             # index.html — тестовая адаптивная страница
├── archives/                        # Тестовые ZIP (test-archive.zip, test-binary-correct.zip и др.)
├── chatgpt-tests/                   # Тесты инструментов от 2026-01-12 (md + zip)
├── make_test/2026-01-12T.../        # Артефакт запуска Make-сценария
├── test/, test-notes/               # Прочие тестовые файлы (example-note.md и т.п.)
└── (releases/ — заявлена в README, но НЕ существует: tree/HEAD/releases → 404)
```

## Ключевые файлы и модули

| Файл / модуль | Что делает |
|---|---|
| `README.md` | Точка входа: концепция IFOS, 6-уровневая архитектура, формат OS_PACK, Quality Ladder L0–L5 |
| `blocks/_block_index.json` | Машинный реестр 210 блоков: слой, диапазон шагов, главный md, число файлов/схем/стабов (итого 4225 файлов, 1466 JSON-схем, 139 OpenAPI, 546 py-стабов — проверено пересчётом) |
| `blocks/index.html` | «IFOS Wiki Navigator»: статистика по 7 слоям, таблица всех блоков с поиском и фильтром (вся разметка и данные зашиты в один файл) |
| `master_index/IFOS_MASTER_INDEX_20260618.md` | Актуальный мастер-индекс: статистика проекта, точки входа, структура блока, известные проблемы (битый ZIP, дубль диапазона 35601–36000, citation-артефакты) |
| `blocks/00_GENESIS/.../IFOS_concept_genesis_os_00001_14240_v1.md` | Founding-документ: постановка проблемы («данные заканчиваются» → рационализация), обоснование через Oslo Manual/рекомбинантные инновации, ТЗ-вопросы |
| `blocks/01_FOUNDATION/IFOS_14441_14680_recipe/` | Показательный блок «Recipe-OS»: концепт рецептов-микромакросов, `IFOS_recipe_schema_v1.json` (JSON Schema 2020-12), `IFOS_recipe_compiler_skeleton_v1.py` (CLI-скелет компиляции рецепта в стабы Make/n8n/WP), примеры workflow-стабов |
| `tools/NEXT_QUEUE_v1_20260618.md` | Операционная очередь: последний DONE-шаг 88800, следующий блок 88801–89200 (Gov Domain Packs), критические задачи (регенерация битого ZIP 14241–14440 и 5 потерянных блоков) |
| `tools/BINARY_POLICY_APPEND_ONLY_20260113.md` | Политика публикации: текст — источник истины; ZIP только при стабильной доставке; иначе распакованная структура `pack_files_YYYYMMDD/` |
| `FINAL-THREE-TOOLS-REPORT.md` | Самоотчёт о трёх Make.com-инструментах записи в GitHub (Text Saver #8462455, Binary Saver #8462970, Binary Advanced #8463093) с таблицами сравнения |
| `blocks/IFOS_Master_Index_Filled_v26/v31.*` | Исторические версии заполненного индекса (январь 2026): Range/Slug/Priority/Status/Depends on/Pack |

## Особенности организации

1. **Append-only версионирование именами файлов**: вместо git-веток и перезаписи — дата/версия в имени (`NEXT_QUEUE_20260113_v5.md`, `IFOS_MASTER_INDEX_20260618.md`). Источник истины — последний по дате Master Index.
2. **Двухслойная история**: январский слой (полигон Make.com/Claude-пайплайна + первые блоки NEXT-XX) и июньский слой (массовая заливка 210 распакованных блоков — сотни коммитов «Add IFOS_…» по одному файлу, характерный след загрузки через GitHub Contents API).
3. **Единый формат блока**: `IFOS_NNNNN_NNNNN_topic/` → главный `*_v1.md` + `*_schema_v1.json` (1–21 шт.) + `*_api_v1.yaml` + `*_examples_v1.json` + `*_stub_v1.py` (1–8 шт.).
4. **Известные дыры в нумерации** (подтверждены индексом): отсутствуют блоки 14241–14440 (битый ZIP), 21201–22000, 26001–26400, 30401–30800, 31201–31600; диапазон 35601–36000 задублирован двумя разными блоками (developer_platform и identity_profiles).
5. **Несоответствия README реальности**: заявленная папка `releases/` не существует; `README_IFOS_20260113.md` называет папку `master-index/` (через дефис), фактически она `master_index/`; ссылки мастер-индекса на `./00_GENESIS/README.md` и другие README слоёв битые (файлов нет).
