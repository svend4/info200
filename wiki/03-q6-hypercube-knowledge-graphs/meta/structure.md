# Структура meta

## Аннотированное дерево каталогов

```
meta/
├── libs/
│   ├── hexcore/                # ЯДРО: граф Q6 (64 вершины, 192 ребра), 333 строки,
│   │   ├── hexcore.py          #   ноль зависимостей: neighbors, hamming, flip,
│   │   ├── __init__.py         #   shortest_path, all_paths, gray_code, antipode,
│   │   └── README.md           #   ball/sphere, триграммы, орбиты, subcubes, render
│   └── q6ctl/                  # ОРКЕСТРАТОР (второй уровень системы)
│       ├── registry.py         #   реестр: 42 модуля, 8 кластеров K1–K8, 11 суперкластеров (566 строк)
│       ├── pipeline.py         #   исполнитель цепочек «модуль:команда», JSON-пайп stdout→stdin
│       ├── context.py          #   именованные контексты: сохранение результатов шагов
│       ├── q6cli.py            #   CLI: list / run SC-N / pipe / call / ctx / info
│       └── __init__.py
├── projects/                   # 48 ПРОЕКТОВ (README заявляет только 24!)
│   ├── hexnav/  hexca/  hexpath/  hexforth/  karnaugh6/  hexspec/   # «классические» 24:
│   ├── hexgraph/ hexvis/ hexcode/ hexlearn/ hexopt/ hexring/        #   графы, визуализация, коды,
│   ├── hexsym/  hexnet/  hexcrypt/ hexstat/ hexgeom/ hexdim/        #   ML, оптимизация, группы,
│   ├── hexalg/  hexphys/ hexgf/   hexmat/   hexbio/  hexlat/        #   сети, крипто, физика, GF(2^6)
│   ├── hexperms/ hexuniqgrp/ hexpack/ hextrimat/ hexphi/            # «германовская» волна (из PDF-статей)
│   ├── hexpowerxy/ hexellipse/ hexcrossrat/ hexbuffon/ hexmobius/   # золотое сечение, эллипсы, Бюффон…
│   ├── hexmatroot/ hexnumderiv/ hexpolyenum/ hexscrew/ hexhept/
│   ├── hexcubenets/ hextile/ hexintermed/
│   ├── hexglyph/               # ШРИФТ SOLAN: myFront4Solan3/4.ttf, viewer.html,
│   │                           #   hexglyph.py + ~65 модулей solan_*.py (КА, энтропия,
│   │                           #   Ляпунов, Фурье, сети, PCA/MDS — анализ глифов)
│   ├── hexiching/              # И-Цзин: king_wen.py, hexreading.py, hexoracle… (без README)
│   ├── hexintegration/         # 14 модулей-связок: hexdna, hexcalendar, hexnuclear,
│   │                           #   hexfuxi, hexwuxing, hexwalsh, yang_atlas…
│   └── hexboya/ hexkub/ hexliuxing/   # новые, НЕ входят в registry.py
├── tests/                      # 48 файлов, ~50 200 строк, ~8 500 тест-функций
│   ├── test_hexglyph.py        #   монстр: 30 491 строка, 5 511 тестов (генерированное покрытие)
│   ├── test_hexforth.py (949)  #   остальные — вручную написанные, по модулю на файл
│   ├── test_integration.py     #   межпроектные сценарии
│   ├── test_registry.py        #   целостность реестра (42 модуля, K1–K8)
│   └── test_q6ctl.py           #   context / pipeline / CLI оркестратора
├── docs/
│   ├── architecture.md         # архитектура монорепо, API hexcore, карта 24 проектов
│   ├── q6-math.md              # математические основы Q6
│   ├── projects-overview.md    # 939 строк: характеристика 24 проектов (устарел — их 48)
│   ├── papers-index.md         # индекс 33 PDF-статей Franz German (в корне их уже больше)
│   ├── superclusters.md        # уровень 3: SC-1 «Шифр Германа» … межкластерные пайплайны
│   ├── synergies_and_filter.md # фильтр новых модулей: 11 предложено → 3 достойны
│   └── analysis_herman_andreev.md  # разбор статей Ф. Германа и Г. Андреева → связь с модулями
├── scripts/                    # 12 shell-пайплайнов: sc1_herman_cipher.sh …
│   │                           #   tsc3_genomic_oracle.sh, q6_demo.sh
├── tools/
│   ├── smoke_test.py           # запуск всех CLI (покрывает только «старые» 24)
│   └── extract_papers.py       # извлечение текста из PDF-статей
├── .github/workflows/ci.yml    # CI: pytest (3.10/3.11/3.12) + smoke + lint
├── 2cb3bf_*.pdf  (×~70)        # ❗ статьи Franz German прямо в корне репо
├── 495653776/7-Михаил-Беляев-*.pdf/.txt   # ещё PDF в корне
├── !!!!SOLAN !Shrift!*.odt (×5)           # ❗ исходники шрифта Solan, «грязные» имена
├── .coverage                   # ❗ закоммиченный артефакт покрытия
├── flower_shop.py              # инородный демо-CLI «цветочный магазин» (PR #1)
├── Makefile                    # make test / demo / smoke / lint / clean
├── pytest.ini                  # testpaths = tests
├── CONTRIBUTING.md             # шаблон нового проекта (структура, минимальный модуль)
└── README.md                   # 323 строки, русскоязычный, частично устаревший
```

## Ключевые файлы и модули

| Файл/модуль | Что делает |
|---|---|
| `libs/hexcore/hexcore.py` | Ядро: все операции над Q6 (соседи, Хэмминг, BFS-пути, код Грея, шары, орбиты, ASCII-рендер гексаграмм). Единственная зависимость всех проектов |
| `libs/q6ctl/registry.py` | «База данных» системы: MODULES (42), CLUSTERS (K1–K8), SUPERCLUSTERS (11) с путями запуска, CLI-командами, флагом json_ready. ❗ Пути hexforth/hexpath — битые (файлов нет) |
| `libs/q6ctl/q6cli.py` | Главный CLI: `python -m libs.q6ctl.q6cli run SC-1`, `pipe hexpack:ring hexcrypt:sbox`, управление контекстами |
| `libs/q6ctl/pipeline.py` | Запуск шагов как subprocess, JSON-передача между шагами, dry-run |
| `projects/hexforth/interpreter.py`, `compiler.py` | Стековый язык в духе Forth поверх Q6; компиляция в Python |
| `projects/hexspec/verifier.py`, `generator.py` | Язык спецификации протоколов: верификация конечных автоматов (пример tcp.json), генерация тестовых сценариев (в т.ч. в hexforth) |
| `projects/hexcrypt/hexcrypt.py`, `sbox_glyphs.py` | S-блоки 6×6, DDT/LAT, сеть Фейстеля, лавинный эффект |
| `projects/hexglyph/hexglyph.py` | Шрифт Solan: битмапы глифов, рендер (quad/braille), кодирование текста ↔ вершины Q6, русская фонетика |
| `projects/hexglyph/solan_*.py` (~65 шт.) | Аналитическая лаборатория вокруг глифов: клеточные автоматы, энтропия, Фурье, Ляпунов, сети, PCA/MDS, transfer entropy |
| `projects/hexintegration/*` (14 шт.) | Связки Q6 с ДНК, календарём, «ядерными» и И-Цзин структурами (Фуси, у-син), функциями Уолша |
| `tools/smoke_test.py` | Дымовой тест: запуск 24 CLI с простыми аргументами, проверка кода возврата 0 |
| `docs/superclusters.md` | Идеология уровня 3: какие пары кластеров дают emergent-результат (например, SC-1 «Шифр Германа») |
| `flower_shop.py` | Не связан с Q6: учебный CLI-магазин из самого первого PR, оставлен в корне |

## Особенности организации кода

- **Радиальная архитектура**: все проекты зависят только от hexcore, друг от друга — никогда; интеграция вынесена на уровень q6ctl-пайплайнов (subprocess + JSON), а не импортов.
- **Импорт через sys.path-хак**: каждый модуль вставляет `sys.path.insert(0, '../../')` — нет упаковки (pyproject/setup), репозиторий не устанавливается как пакет.
- **Два поколения проектов**: «классические» 24 (описаны в README/docs, покрыты smoke-тестом) и «новая волна» из ~24 (glyph-серия, германовские модули, И-Цзин-интеграции) — документация за ней не успела.
- **Соглашение об именах glyph-модулей**: у новых модулей точка входа называется `*_glyphs.py` (sbox_glyphs, codon_glyphs, kmap_glyphs…) — фиксируется в registry.py.
- **Данные в корне**: ~75 PDF, 5 ODT и .coverage закоммичены в корень репозитория, что раздувает клон и засоряет листинг (index в docs/papers-index.md отстаёт: заявлено 33 PDF).
- **Тесты как метрика прогресса**: почти каждый коммит последнего дня — «+N tests, reaching M total»; покрытие наращивалось систематически, включая генерацию массового покрытия для hexglyph.
