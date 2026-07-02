# Структура meta2

Состав корня и дерева подтверждён по страницам GitHub и raw-файлам (июль 2026, ветка HEAD).

## Аннотированное дерево

```
meta2/
├── main.py                        # CLI-точка входа, 1553 строки, ~30 опций;
│                                  #   подкоманды compare / benchmark, batch-режим,
│                                  #   research-режим, --validators / --export-report
├── requirements.txt               # numpy, scipy, opencv-python, scikit-image,
│                                  #   shapely, matplotlib, networkx, Pillow, pytesseract
├── pyproject.toml                 # пакет puzzle-reconstruction v1.0.0, MIT (в метаданных),
│                                  #   Python>=3.11, extras: ocr/yaml/pdf/dev/api/geometry/graph/viz
├── setup.cfg                      # конфигурация pytest (testpaths=tests)
├── Makefile                       # install / lint / format / typecheck / test / profile /
│                                  #   benchmark / server / docker — с цветным help
├── Dockerfile                     # multi-stage: builder + slim runtime, непривилегированный юзер
├── docker-compose.yml             # сервисы: api (REST, healthcheck), cli, benchmark (профили)
├── .github/workflows/ci.yml       # 6 джобов: test (матрица 3.11/3.12), lint+mypy,
│                                  #   property-tests (Hypothesis), integration, benchmarks, build
│
├── README.md                      # 222 строки, по-русски: алгоритм, quick start, таблицы CLI
├── PUZZLE_RECONSTRUCTION.md       # 868 строк: полная теория с математикой и псевдокодом
├── INTEGRATION_ROADMAP.md         # 817 строк: карта интеграции «спящих» модулей, 7 фаз
├── ROADMAP.md                     # 1191 строка: план развития по 6 фазам
├── FUTURE_DEVELOPMENT_PLAN.md     # 844 строки: план + «инструкция для следующей AI-сессии»
├── STATUS.md / DEV_STATUS.md      # статусные самоотчёты (снимки 25 и 27 февраля 2026)
├── IMPLEMENTATION_STATUS.md       # самоотчёт от 25.02 (ещё под версией 0.4.0b1)
├── REPORT.md                      # отчёт о тестовом покрытии (снимок 25.02)
├── CHANGELOG.md                   # Keep a Changelog, подробные записи по дням
│
├── puzzle_reconstruction/         # основной пакет: 305+ модулей, ~93–105 тыс. строк
│   ├── models.py                  # dataclass-модели: Fragment, EdgeSignature,
│   │                              #   FractalSignature, TangramSignature, Assembly, ...
│   ├── pipeline.py                # класс Pipeline: 6 этапов, ThreadPoolExecutor,
│   │                              #   callback-хуки, PipelineResult, verify_suite()
│   ├── config.py                  # конфигурация (dataclass, JSON/YAML)
│   ├── export.py / clustering.py  # экспорт результатов; кластеризация фрагментов по документам
│   ├── preprocessing/  (38 мод.)  # segmentation (Otsu/Adaptive/GrabCut), contour+RDP,
│   │                              #   orientation, PreprocessingChain, 35 фильтров
│   ├── algorithms/     (42 мод.)  # tangram/ (hull, classifier, inscriber),
│   │                              #   fractal/ (box_counting, divider, ifs, css),
│   │                              #   synthesis.py — синтез EdgeSignature, bridge.py — реестр
│   ├── matching/       (26 мод.)  # pairwise (CSS+DTW+FD+TEXT), matcher_registry (@register),
│   │                              #   compat_matrix, dtw, icp, color_match, consensus, ...
│   ├── assembly/       (27 мод.)  # greedy, annealing, beam_search, gamma_optimizer,
│   │                              #   genetic, exhaustive, ant_colony, mcts, parallel (реестр)
│   ├── verification/   (21 мод.)  # suite.py (VerificationSuite, 21 валидатор), ocr.py
│   │                              #   (Tesseract), metrics (IoU, Kendall τ, RMSE), seam_analyzer
│   ├── scoring/        (12 мод.)  # нормализация score, выбор порога, consistency_checker
│   ├── io/              (3 мод.)  # image_loader, result_exporter, метаданные
│   ├── ui/              (1 мод.)  # интерактивный просмотрщик («Minority Report style»)
│   └── utils/         (130 мод.)  # геометрия, кэш, логгер, event_bus, визуализация, ...
│
├── tests/                         # 1000+ файлов (GitHub обрезает листинг на 1000, «93 omitted»):
│                                  #   test_*.py + парные *_extra.py + test_properties_*.py
│                                  #   (property-based, Hypothesis) + test_integration_*.py
├── benchmarks/                    # 12 файлов + results/: bench_assembly_methods, bench_memory,
│                                  #   bench_pipeline_e2e, bench_scalability, ... (pytest-совместимые)
└── tools/                         # 8 файлов: server.py (Flask REST API + OpenAPI),
                                   #   tear_generator.py (синтетические «рваные» данные),
                                   #   benchmark.py, evaluate.py, profile.py, mix_documents.py, registry.py
```

## Ключевые файлы и модули

| Файл/модуль | Роль |
|---|---|
| `main.py` | CLI: одиночная и пакетная сборка, выбор из 8 методов (`--method`), research-режим с консенсусом, запуск валидаторов, экспорт отчётов в JSON/MD/HTML |
| `puzzle_reconstruction/pipeline.py` | Объектный конвейер из 6 этапов; параллельная предобработка фрагментов; `PipelineResult` с таймингами и `verification_report` |
| `puzzle_reconstruction/models.py` | Все структуры данных: `FractalSignature` (fd_box, fd_divider, IFS-коэффициенты, CSS, цепной код Фримана), `TangramSignature`, `EdgeSignature`, `Fragment`, `Assembly` |
| `algorithms/synthesis.py` | Ядро идеи: `B_virtual = α·B_tangram + (1−α)·B_fractal`, построение подписей всех краёв фрагмента |
| `matching/matcher_registry.py` | Реестр матчеров `MATCHER_REGISTRY` с декоратором `@register`; единый интерфейс `(EdgeSignature, EdgeSignature) → float [0..1]` |
| `matching/compat_matrix.py` | Матрица совместимости N×N всех краёв |
| `assembly/parallel.py` | Реестр 8 алгоритмов сборки, `run_all_methods()` / `run_selected()` / `pick_best()` |
| `verification/suite.py` | `VerificationSuite`: 21 валидатор (geometry, layout, seam, overlap, text_coherence, metrics, ...), отчёт с `to_json()/to_markdown()/to_html()` |
| `tools/server.py` | Flask REST API: `/api/reconstruct`, `/api/cluster`, `/api/report/<job_id>`, `/spec` (OpenAPI 3.0), фоновые задания |
| `tools/tear_generator.py` | Генератор тестовых данных: «рвёт» изображение на N фрагментов с реалистичными краями и шумом |
| `.github/workflows/ci.yml` | Полный CI: unit (c `-x` и таймаутами), интеграционные, property-based (обязательные), бенчмарки (smoke), coverage → Codecov, сборка wheel/sdist + twine check |

## Особенности организации кода

- **Реестровая архитектура**: три реестра (матчеры, алгоритмы сборки, валидаторы) с регистрацией через декоратор — новые компоненты подключаются без правки конвейера.
- **Двойная точка входа**: скриптовый `main.py` и класс `Pipeline` для программного использования; REST API поверх пайплайна.
- **Тесты рядом, но в одной плоской папке**: 1000+ файлов в `tests/` без подпапок; конвенция «`test_X.py` (базовые) + `test_X_extra.py` (расширенные) + `test_properties_X.py` (инварианты)».
- **Документация-как-журнал**: 6 статусных документов фиксируют состояние по дням спринта; `FUTURE_DEVELOPMENT_PLAN.md` содержит явную «инструкцию для следующей AI-сессии» — репозиторий спроектирован под продолжение разработки агентом.
- **Дисбаланс utils**: 130 из 305 модулей (~42%) лежат в `utils/` — признак быстрой генерации кода; часть модулей исторически была «спящей» и подключалась отдельной кампанией (см. INTEGRATION_ROADMAP.md).

*Ограничение покрытия аудита*: из 305+ модулей напрямую прочитано ~15 ключевых файлов + все основные документы; содержимое `utils/` и большинства тестов оценено по спискам и выборке.
