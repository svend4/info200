# Структура info150

## Аннотированное дерево каталогов

```
info150/                                          ← монорепо, ~20 пакетов
├── README.md                                     ← ориентация: 3 слоя, карта чтения, установка
├── INSTALL.md                                    ← подробная установка всех пакетов (вкл. Windows без make)
├── DEMOS.md                                      ← что показывает демо каждого пакета + запуск Web UI
├── DOMAIN_ADAPTATIONS.md                         ← философия монорепо, каталог 14 адаптаций, политика извлечения (§7)
├── ARCHIVES.md                                   ← опись замороженных архивов и правила их (не)использования
├── V13_REUSE_MAP.md                              ← по-сиблинговая карта: что можно заимствовать из v13-архива
├── Branch · Branch · Branch · Обзор проекта svend4_meta2.{json,md,txt}
│                                                 ← дизайн-лог ChatGPT 2026-04-01 (477/429/396 КБ) — происхождение
│                                                    K3-матрицы и blueprint'а; read-only, сборкой не используется
├── triage4_repo_v13.zip                          ← альтернативный SaaS-вариант (84 модуля, ~4500 LOC, 17 React-страниц,
│                                                    SQLite-репозитории, auth/jobs) — read-only, отвергнут для флагмана
│
├── .github/workflows/
│   ├── ci.yml                                    ← флагман: Python 3.11+3.12, ruff, mypy, claims-lint, pytest,
│   │                                                полный бенчмарк + ~14 демо-скриптов как smoke-тесты
│   └── qa.yml                                    ← матрица 16 пакетов (make install-dev → make qa → make demo)
│                                                    + отдельный job portal (пилоты fish/bird/wild)
│                                                    ⚠ coast / desk / stroll в матрице ОТСУТСТВУЮТ
│
├── docs/adaptations/                             ← 14 доменных исследований: 01_wildlife_terrestrial …
│                                                    14_crowd_safety (по одному .md на сиблинга каталога)
│
├── triage4/                                      ← ФЛАГМАН — DARPA Triage Challenge стек
│   ├── triage4/                                  ← ~130 модулей: core/, perception/ (FrameSource, YOLO-адаптер),
│   │                                                signatures/ (эйлеровы виталии, дыхание, акустика, тепло, поза),
│   │                                                matching/ (score_combiner из meta2), triage_reasoning/
│   │                                                (score_fusion + MortalThresholds + Larrey baseline, байесовский
│   │                                                двойник), state_graph/, mission_coordination/, integrations/
│   │                                                (CRDT, marker_codec, мосты ROS2/MAVLink/Spot/Tello), ui/
│   ├── tests/                                    ← ~67 файлов test_*.py по вербатим-листингу (не 99; заявлено 759 тестов; gate1–4, hypothesis,
│   │                                                контрактные тесты мостов, end-to-end)
│   ├── docs/                                     ← 21 документ: STATUS, ROADMAP, ARCHITECTURE, API, REGULATORY,
│   │                                                SAFETY_CASE, RISK_REGISTER, CALIBRATION, EXPLAINABILITY,
│   │                                                DEPLOYMENT, MUTATION_TESTING, PHASE_10_* и др.
│   ├── examples/                                 ← 11+ скриптов: full_pipeline_benchmark, crdt_sync_demo,
│   │                                                bayesian_twin_demo, stress_benchmark, webcam/tello demo…
│   ├── web_ui/                                   ← React + Vite + TypeScript (многостраничный)
│   ├── scripts/claims_lint.py                    ← CI-линтер запрещённых формулировок
│   ├── LICENSES/                                 ← README.md + meta2.LICENSE (атрибуция upstream-кода из meta2)
│   ├── configs/, deploy/, third_party/
│   ├── Dockerfile, docker-compose.yml            ← slim-образ < 200 МБ; профили container/systemd/edge
│   └── Makefile, pyproject.toml, CHANGELOG.md, CONTRIBUTING.md
│
├── biocore/                                      ← замороженный слой утилит (извлечения при дублировании в ≥12 сиблингах)
│   └── biocore/{seeds,coords,text_guards,sms}.py ← crc32_seed, DECIMAL_PAIR_RE, claims-guard'ы, SMS-лимит
│
├── portal/                                       ← «Не слияние — совместимость» (по мотивам svend4/nautilus)
│   └── portal/{protocol,registry,coords,discovery,cli}.py
│                                                 ← PortalEntry, 6 видов Bridge (co-occurrence, escalation,
│                                                    domain/geographic neighbor, temporal correlate, analogy)
│
├── triage4-wild/  triage4-bird/  triage4-fish/   ← 01–03: дикая природа (суша/птицы/аквакультура);
│                                                    пилоты портала — у каждого <pkg>/portal_adapter.py
├── triage4-fit/                                  ← 04 фитнес: RapidFormEngine
├── triage4-clinic/                               ← 05 телемедицинский пре-скрининг: ClinicalPreTriageEngine
├── triage4-home/                                 ← 06 уход за пожилыми дома: HomeMonitoringEngine
├── triage4-site/                                 ← 07 промышленная безопасность: SiteSafetyEngine
├── triage4-pet/                                  ← 08 ветеринария: PetTriageEngine
├── triage4-rescue/                               ← 09 спасательные операции: StartProtocolEngine
│                                                    + multiuser/ (сессии, RBAC, аудит, async-jobs — первое
│                                                    заимствование идей из v13, copy-fork)
├── triage4-farm/                                 ← 10 животноводство: WelfareCheckEngine
├── triage4-aqua/                                 ← 11 бассейны/пляжи: PoolWatchEngine
├── triage4-sport/                                ← 12 спортивная производительность: SportPerformanceEngine
├── triage4-drive/                                ← 13 мониторинг водителя: DriverMonitoringEngine
├── triage4-crowd/                                ← 14 безопасность толпы: VenueMonitorEngine
│
├── triage4-coast/                                ← НОВЫЙ (вне каталога 01–14): безопасность береговой полосы
│                                                    (density / drowning-proxy / sun / lost-child)
│                                                    ⚠ README начинается текстом triage4-crowd — дрейф copy-форка
├── triage4-desk/                                 ← НОВЫЙ: wellness-ассистент для офисной работы
│                                                    ⚠ README — тоже копия fit-README (squat/pushup/deadlift)
│                                                    ⚠ STATUS.md утверждает «No UI/API», но web_ui/ существует
└── triage4-stroll/                               ← НОВЫЙ: ассистент дневных прогулок (pace/fatigue/hydration/sun)
                                                     ⚠ README — копия фитнес-README (squat/pushup/deadlift)
```

Каждый сиблинг имеет единообразную форму: `pyproject.toml` (MIT, Python ≥3.11, минимальные зависимости — обычно только numpy/scipy), `Makefile` (install-dev / qa / demo / ui), `README.md`, часто `STATUS.md`, `docs/PHILOSOPHY.md` (границы домена), пакет `<name>/`, `tests/`, `examples/`, `web_ui/` (React + Vite + TS, opt-in через extra `[ui]`).

## Ключевые файлы и модули

| Файл / модуль | Что делает |
|---|---|
| `README.md` (корень) | Карта монорепо: три слоя, правила («сиблинги не импортируют друг друга», biocore заморожен, portal read-only), таблица «что читать под какую цель» |
| `DOMAIN_ADAPTATIONS.md` | Стратегическая карта переноса пайплайна в 14 доменов: что переносится дословно, что переписывается (§7 — политика извлечения в biocore) |
| `V13_REUSE_MAP.md` | Верификация доменной нейтральности модулей v13-архива и по-сиблинговые рекомендации «брать/не брать» (auth, jobs, audit, diffing) |
| `ARCHIVES.md` | Опись архивов: дизайн-лог (96 сообщений, K3-матрица) и v13.zip (84 модуля); почему они не участвуют в сборке |
| `triage4/triage4/triage_reasoning/score_fusion.py` | Взвешенное слияние сигналов + `MortalThresholds`: override «смертельного признака» поверх скорингового слияния (закрытие «пробела Ларрея») |
| `triage4/tests/test_score_fusion.py` | Пример тестов-спецификаций: критический/доброкачественный кейсы, влияние весов, причины в выводе |
| `triage4/scripts/claims_lint.py` | CI-гейт против маркетинговых/медицинских формулировок в docs и коде |
| `triage4/docs/STATUS.md` | Честный самоаудит: что построено / технические плюсы / пробелы (нет реальных данных, mutmut не прогнан и т.д.) |
| `biocore/biocore/seeds.py` | `crc32_seed(*parts)` — детерминированные сиды RNG вместо нестабильного `hash()`; образец качества кода слоя |
| `portal/portal/protocol.py` | `PortalEntry`, `BridgeKind` (6 типов), канонический словарь уровней urgent/watch/steady; адаптеры переводят локальные словари на границе |
| `triage4-fish/triage4_fish/portal_adapter.py` | Эталонный адаптер портала: `adapt(PenReport) → Iterable[PortalEntry]`, единственная точка связи сиблинга с порталом |
| `.github/workflows/qa.yml` | Матричный CI 16 пакетов + job portal; демо каждого сиблинга гоняется как smoke-тест |

## Особенности организации кода

- **Copy-fork вместо общей абстракции.** Сознательное дублирование: сиблинги свободно расходятся, общее извлекается в biocore только после ≥12 буквальных повторов. Оборотная сторона видна на новых сиблингах: README coast/stroll и STATUS desk не переписаны после форка.
- **Словарь переименовывается на границе домена** (CasualtyNode → ExerciseSession, MedicHandoff → CoachBriefing и т.п.) — таблицы соответствий прямо в README сиблингов.
- **Ленивые импорты SDK.** Ни один robotics-SDK (rclpy, pymavlink, bosdyn) не импортируется при загрузке — только фабрики `build_*_bridge`; это проверяется тестом.
- **Детерминизм как принцип.** Все случайные компоненты сидированы; бенчмарк воспроизводим побайтово (заявление STATUS.md, не проверено запуском).
- **Документация как код.** 21 документ у флагмана, PHILOSOPHY.md у сиблингов, самоаудиты STATUS.md, и claims-lint, который держит формулировки в рамках.
