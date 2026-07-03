# Структура pro2

Дерево составлено по корневой странице GitHub, страницам папок и README (824 строки). Репозиторий большой (~90 K строк Python); ниже — проверенная структура с аннотациями.

```
pro2/
├── README.md                  # 824 строки; фактически ДВА склеенных README (см. «Особенности»)
├── setup.py                   # пакет yijing-transformer v0.50.0, 4 CLI entry points
├── conftest.py                # конфигурация pytest на уровне корня
├── .gitignore
│
├── yijing_transformer/        # ГЛАВНЫЙ ПАКЕТ (устанавливаемый)
│   ├── config/config.py       # YiJingConfig — 100+ параметров (519 строк, проверено)
│   ├── constants.py           # HEX_NAMES — имена 64 гексаграмм (17 строк)
│   ├── models/
│   │   ├── model.py           # YiJingGPT + PureGeometric/HybridGated/AdaptiveHybrid (2198 строк)
│   │   ├── variant3.py        # Variant3GPT: HexagramProjection → BianGuaAttention → TernaryGate (705 строк)
│   │   ├── hierarchical_moe.py# HierarchicalMoE: 4 уровня Q2→Q3→Q6, 6 MicroExperts (1160 строк)
│   │   ├── hierarchical_e2.py # E2 — 5-уровневая иерархия (Glyph→Core→Method→Theory→Philo)
│   │   ├── nautilus_yijing.py # NautilusYiJing — «камерная» организация с Q6-маршрутизацией
│   │   ├── baseline.py        # VanillaGPT — бейзлайн без геометрии
│   │   ├── lean_model.py      # LeanYiJingGPT — облегчённый вариант
│   │   ├── extensions.py, lora.py, diff_attn.py, prefix_tuning.py,
│   │   │   speculative.py, expert_choice.py, export.py, pseudo_rag.py
│   │   └── geometry/          # ЯДРО ПРОЕКТА (~316 КБ по README)
│   │       ├── core.py        # генерация триграмм/гексаграмм/E8-корней (587 строк, проверено)
│   │       ├── quantizers.py  # 12–13 квантизаторов: YiJing, Factored, Matryoshka, E8… (1222 строки)
│   │       ├── routing.py     # гейты, мосты, AbrialeBridgeMediator (PPL 1.24), интерлингва (1917 строк)
│   │       ├── attention.py   # 15+ паттернов: Palace, Heisenberg, FlowerOfLife, Möbius…
│   │       ├── q6_algebra.py  # алгебра Z₂⁶, bent-функции
│   │       ├── kasatkin_router.py  # маршрутизация через 3D-куб (6 осей = 6 доменов)
│   │       ├── interlingua_fixed.py # исправленная ArchetypalInterlingua (per-source proj)
│   │       ├── positional.py, equivariant.py, ffn.py, convergence.py,
│   │       └── nautilus.py, abriale.py, six_sources.py
│   ├── training/              # train.py (главный цикл), bridge.py, optim.py, ema.py,
│   │   │                      # distillation.py, ddp.py, utils_v12–v52 (43 файла утилит)
│   ├── inference/             # generate.py (top-k/top-p/beam), bridge_inference.py
│   ├── data_utils/            # TextDataset, WikiText, streaming, svend4_dataset (корпус профиля)
│   ├── tokenizer/             # CharTokenizer, BPE (bpe_tokenizer.model, 299 КБ), GlyphTokenizer (SOLAN)
│   ├── scripts/               # 50+ CLI-скриптов: train_model, wikitext_train, downstream_finetune…
│   ├── evaluation/, notebooks/, plots/
│   ├── tests/                 # 22 файла test_*.py (+__init__.py), ~1971 тест-функция (посчитано)
│   ├── CONCEPTUAL_STAGE.py, knowledge_system.py, paper_draft.md
│   └── *.json                 # десятки JSON-логов бенчмарков v53–v69
│
├── nautilus/                  # «Портал» экосистемы svend4 (не путать с репо nautilus!)
│   ├── portal.py              # движок портала (234 строки)
│   ├── nautilus.json          # реестр v1.1: адаптеры info1, pro2, meta, data2, data7…
│   ├── adapters/              # по адаптеру на репозиторий экосистемы
│   ├── passports/             # md-паспорта интегрированных репо
│   ├── glyph_adapter.py, index.html (GitHub Pages), README.md
│
├── experiments/               # 25 файлов: 10 train/validate-скриптов + 15 JSON-логов
│   ├── train_interlingua_fixed.py, train_kasatkin_router.py, xerox_test.py,
│   ├── validate_q4_q6.py, train_palace_block_sparse.py, train_solan_nautilus.py…
│   └── *_log.json, *_result.json # реальные логи экспериментов
│
├── docs/                      # 18 файлов документации
│   ├── ARCHITECTURE.md, MODELS.md, TRAINING.md, GEOMETRY.md, API.md,
│   ├── INFERENCE.md, QUICKSTART.md, CONTRIBUTING.md, CHANGELOG.md, INDEX.md,
│   ├── THEOREMS.md, THEORY_VS_PRACTICE.md, PORTAL.md,
│   ├── IMPLEMENTATION_STATUS.md   # САМОАУДИТ «код vs теория» (499 строк, 2026-03-24)
│   ├── FULL_AUDIT_REPORT.md       # САМОАУДИТ кодовой базы (318 строк: 89 981 строка Python)
│   └── v61-bridged-interlingua-methodology.md
│
├── tests/                     # корневые тесты (8 файлов): smoke, security, orchestrator…
├── passports/                 # метаданные моделей
├── pipeline_runs/, q6_evolution/, checkpoints/, data/  # артефакты обучения, корпус svend4
│
├── Корневые скрипты (~24 шт.):
│   ├── pipeline.py            # 3-фазный curriculum: nautilus → turbine → bench
│   ├── bench_all.py (536 стр.), bench_moe.py, bench_stability.py, eval_hmoe.py
│   ├── self_train.py (1065 стр.), self_train_v2/v3.py, self_train_hmoe*.py
│   ├── bidir_train*.py, bidir_turbine.py, figure8_turbine.py («Скарабей», TSP-обход Q6)
│   ├── nautilus_4agent.py, nautilus_15agent.py, roundabout.py, multi_salesman.py
│   ├── train_hmoe_curriculum.py, train_hmoe_staged.py, train_e2*.py
│   ├── e2_inference.py (451 стр.: --embed/--similar/--map/--generate)
│   ├── corpus_loader.py (8 источников), repo_corpus_loader.py (7 кластеров репо)
│   ├── federated_round.py, meta_bridge.py, meta_q6.py, graph_health.py
│
├── hmoe_*.pt                  # 13+ чекпоинтов ~19 МБ каждый ПРЯМО В GIT
│                              # (проверено: hmoe_curriculum.pt = 18 991 807 байт)
├── *.json (30+)               # логи бенчмарков bench_v1–v14, hmoe_*, federated…
└── Корневые md (15+): CONCEPTUAL_STAGE.md, KNOWLEDGE_FRAMEWORK.md, GERMES_NOTATION.md,
    PORTAL-PROTOCOL.md, PASSPORT.md, REPORT-v60-v61-status.md, CURRENT-STAGE.md,
    DEV-STATUS-REVIEW.md, FUTURE_TASKS.md, IMPLEMENTATION_ARTICLE.md, META-PRO2-BRIDGE.md…
```

## Ключевые файлы и модули

| Файл/модуль | Роль | Проверено |
|---|---|---|
| `yijing_transformer/models/geometry/core.py` | Генерация кодбуков: триграммы, гексаграммы, тетраграммы, тернарный куб 3⁶=729, 240 корней E8 | Да, код прочитан: чистый, с докстрингами |
| `yijing_transformer/models/geometry/routing.py` | 13+ классов маршрутизации; `AbrialeBridgeMediator` (лучший PPL 1.24), `ArchetypalInterlingua` (с задокументированным багом общего trit_proj) | 1917 строк, ссылки самоаудита (:946, :1818) укладываются |
| `yijing_transformer/models/model.py` | YiJingGPT — основная гибридная модель, геометрия через конфиг-флаги | 2198 строк |
| `yijing_transformer/config/config.py` | YiJingConfig, 100+ параметров (hex_strength, quantizer_type, use_rope, use_swiglu, use_amp, use_lora…) | 519 строк |
| `setup.py` | Пакетирование, v0.50.0, extras [data/viz/tracking/dev/all], 4 консольные команды | Да, прочитан целиком |
| `pipeline.py` | Автоматический 3-фазный пайплайн с LCI-метрикой; любопытная деталь: `OMP_NUM_THREADS=1` против 87-минутного зависания BLAS | Прочитан фрагмент |
| `docs/IMPLEMENTATION_STATUS.md` | Самоаудит «что в коде, что только в теории, что не используется» | Прочитан целиком, честный |
| `docs/FULL_AUDIT_REPORT.md` | Полный самоаудит: 89 981 строка, 11 моделей, 1957 тестов | Прочитано начало |
| `nautilus/portal.py` + `nautilus.json` | Портал-агрегатор экосистемы svend4 с адаптерами к 5+ репо | Прочитаны |
| `corpus_loader.py` | Загрузка обучающего корпуса из репозиториев профиля (заявлено 20 МБ данных svend4) | Существование подтверждено |

## Особенности организации кода

1. **Двойной README.** Файл README.md — это два полных README, склеенных подряд (строки 1–303: «YiJing-Transformer» v0.50.0, заканчивается «MIT License»; строки 304–824: «pro2 — YiJing Transformer: Variant 3»). Информация частично дублируется и местами расходится (например, таблица routing-классов повторена дважды с разными примечаниями).
2. **Чекпоинты и логи в git.** 13+ бинарных .pt по ~19 МБ и 45+ JSON-логов лежат в корне и в пакете; история git тяжёлая. Ни LFS, ни releases не используются.
3. **Версионная археология.** Именование `utils_v12…v52`, бенчмарки v53–v69, чекпоинты v2–v4 — эволюция сохранена в файлах, а не только в истории git. Это удобно для трассировки экспериментов, но замусоривает дерево.
4. **Два уровня тестов:** `yijing_transformer/tests/` (юнит/компонентные, ~1971 функция) и корневой `tests/` (smoke, security, integration — 8 файлов). Наборы файлов в самоаудитах от марта и фактическое дерево в апреле немного расходятся (появился `test_new_modules.py`, часть файлов переехала) — документация чуть отстаёт от кода.
5. **Разработка через PR из веток `claude/*`** — виден процесс работы с ИИ-ассистентом, ревью через merge-коммиты (#85, #86 и др.).
