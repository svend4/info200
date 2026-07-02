# Структура soz150

## Дерево репозитория (аннотированное)

```
soz150/
├── README.md                    # 2 строки: «# soz150 / info» — пустышка
├── WRITING_OS_HANDOFF (1).md    # 514 строк — передаточный документ по артефакту
│                                #   Writing OS Unified v1.4: архитектура CAGE,
│                                #   реестр всех функций, известные ограничения,
│                                #   дорожная карта, глоссарий. Дата: 13.04.2026
├── WritingOS (5).jsx            # 2043 строки, ~110 КБ — ВЕСЬ артефакт в одном файле:
│                                #   skills, роутер, песочница JS/Pyodide, стриминг,
│                                #   Legal Assertion Checker, UI-панели, гл. компонент
├── writing-os-v14.zip           # 21 КБ — архив, содержимое ИДЕНТИЧНО папке wos-v14/
│                                #   (проверено распаковкой: те же 4 файла)
└── wos-v14/                     # фрагмент ДРУГОГО, большого приложения
    └── src/
        ├── App.jsx              # 176 строк — оболочка «Writing OS v50, App.jsx v14»:
        │                        #   38 вкладок в 5 группах, lazy-загрузка панелей,
        │                        #   3 темы, hot-keys, PIN-lock, PWA, RAG-индексация
        └── panels/
            ├── BriefGeneratorPanel.jsx  # 375 строк — ИИ-генератор писем в органы:
            │                            #   8 типов (Sachstandsanfrage, Akteneinsicht
            │                            #   §25 SGB X, Mahnung §88 SGG, Beschwerde…)
            ├── GutachtenPanel.jsx       # 475 строк — трекер мед. заключений:
            │                            #   MDK/GdB/EGH/Gegengutachten + база типовых
            │                            #   ошибок MDK как аргументы для Widerspruch
            └── StatistikProPanel.jsx    # 393 строки — аналитика Recharts: KPI,
                                         #   воронки, тренды по делам/срокам/бюджету
```

**Важно:** `App.jsx` импортирует ~44 модуля (`./db`, `./store`, `./hooks`, `./components`, `./security/LockScreen`, `./security/crypto`, `./rag/embedder`, `./rag/vectorStore`, `./rag/SmartSearch` и 35 отсутствующих панелей) — **все они дают 404**, в репозитории их нет (проверено поштучно через raw.githubusercontent). Zip — не «полная версия», а тот же дельта-набор из 4 файлов. Нет и `package.json` / `vite.config.js` / `index.html` — приложение из этого репозитория собрать нельзя.

## Ключевые файлы и модули

| Файл / блок | Что делает |
|---|---|
| `WritingOS (5).jsx` → `SKILLS[]` | 10 встроенных skills: Deadline Calc, Court Analyzer, Template Generator, Persönliches Budget §29 SGB IX, SGB XII Expert, Eilantrag §86b, Code Sandbox, Data Analysis, Legal Research (BSG), Document Writer. У каждого: `id, name, cat, desc, triggers[], ctx` |
| → `routeTask()` (стр. ~65) | Семантический роутер: один вызов `api.anthropic.com` (claude-sonnet-4, 300 токенов) возвращает JSON с 1–3 выбранными skills и score |
| → `buildSysPrompt()` | Инжекция `skill.ctx` выбранных skills + переменных Python-сессии в system prompt |
| → `rawExecute` / `runJS` / `runPY` (стр. ~397) | Исполнение сгенерированного кода: JS через `new Function()`, Python через Pyodide 0.25.1 (WASM, CDN jsdelivr) с персистентным REPL-неймспейсом |
| → `executeWithRetry()` | Рекурсивный auto-fix: при ошибке код отправляется Claude на исправление, максимум `MAX_RETRIES = 2` |
| → `ASSERTION_RULES` / `runStructuralCheck()` (стр. 170–265) | L1-проверка документа: regex-правила по типам `widerspruch / eilantrag / klage / generic` (есть ли Az., Frist, Begründung, §§ SGG, дата, подпись), score 0–100 |
| → `streamSemanticCheck()` (стр. 317) | L2-проверка: стриминговый вызов Claude с построчным выводом `[✓]/[✗]/[⚠]` + итоговый JSON; финальный балл = 0.4·L1 + 0.6·L2, порог запуска L2 — L1 ≥ 60 |
| → `SkillComposer`, `extractSkillJSON`, `validateSkill` | Модальный конструктор новых skills диалогом с Claude; хранение в `localStorage` (`wos_custom_skills_v1`) |
| → Session-хелперы (`getSessionVars`, `buildRestoreScript`, `downloadJSON`) | Сохранение/восстановление Python-неймспейса; формат файла `.wos` (версия 1.1) |
| → `OutputPane`, `SessionPane`, `SkillsPane`, `AssertionPane`, `Msg`, `RetryMsg` | UI: чат + нижние вкладки `Output / Session / Skills / Checks`, score-кольцо, retry-цепочки |
| → `WritingOS()` (стр. 1457) | Главный компонент (~600 строк): state (14+ useState), пайплайн `send()`, обработчики |
| `wos-v14/src/App.jsx` | Оболочка большого приложения: карта из 38 панелей, навигация с Alt-хоткеями, темы dark/sepia/light, LockScreen по PIN c auto-lock, регистрация service worker, фоновая RAG-индексация документов из IndexedDB, deep-link `?panel=` |
| `BriefGeneratorPanel.jsx` | Генерация формальных писем: 8 пресетов с правовой основой (§25 SGB X, §17 SGB I, §88 SGG, §30 SGB IX…), стили тона, привязка к делу (`Cases`), вызов ИИ |
| `GutachtenPanel.jsx` | CRUD-трекер заключений в localStorage (`wos-gutachten`): тип (Pflegegrad/GdB/EGH/Facharzt/Gegengutachten), результат, врач; встроенная база типовых ошибок MDK по каждому типу — готовые аргументы для Widerspruch |
| `StatistikProPanel.jsx` | Сводная аналитика: агрегирует данные из IndexedDB (`Cases`, `Documents`) и 8 localStorage-хранилищ (`wos-fristen`, `wos-termine`, `wos-todos`, `wos-korrespondenz`, `wos-antraege`, `wos-haushalt`, `wos-gutachten`, `wos-rechtsmittel`); графики Recharts (Bar/Line/Pie/Funnel) |

## Особенности организации кода

- **Один файл = всё приложение** у артефакта: секции разделены ASCII-баннерами (`═══ SKILLS DATABASE ═══` и т.п.), что для формата claude.ai-артефакта осознанно, но исключает тесты и переиспользование.
- **Две несовместимые линии** «Writing OS» в одном репозитории: артефакт v1.4 (CAGE, монолит) и приложение v50/v14 (модульный PWA). Общего кода между ними нет — только домен и имя.
- Имена файлов с суффиксами браузерных загрузок — « (1)», « (5)» — репозиторий используется как файлообменник для передачи контекста между сессиями Claude, а не как рабочая ветка разработки.
- Дублирование: содержимое `wos-v14/` полностью повторяет `writing-os-v14.zip` (распаковано ботом Claude через PR #1).
- Мультиязычность: комментарии и UI — смесь русского, немецкого и английского; юридический контент — немецкий (Sie-form).
- Зависимости артефакта — только CDN (Pyodide, шрифты), npm-инфраструктуры нет вовсе; у `wos-v14` зависимости (react, recharts) не зафиксированы никаким манифестом.
