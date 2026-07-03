# data20 — система управления знаниями с embedded-бэкендом и 57 инструментами

## Обзор

**data20** — самый инженерно насыщенный «info»-репозиторий профиля svend4: персональная система управления знаниями (Knowledge Management System), вокруг которой за одну неделю января 2026 года (2–8 января, 374 коммита) была выстроена целая экосистема: 57 CLI-инструментов на Python, FastAPI-бэкенд с JWT/Celery/Redis/Prometheus, Flutter-приложение для Android со встроенным (embedded) Python-рантаймом для 100% офлайн-работы, Electron-приложение для десктопа, браузерное расширение на Pyodide (Python/WASM), тесты, CI/CD (477 запусков GitHub Actions) и релиз v1.0.0.

Парадокс проекта: при огромном объёме инфраструктуры сама база знаний почти пуста — в ней ровно 3 полноценные статьи в трёх категориях (компьютеры — 2, быт — 1, кулинария — 0), хотя README заявляет «5+». Это «завод по производству знаний», построенный до того, как появилось сырьё.

## Назначение и идея

Заявленная идея (README репозитория): структурированная база знаний на markdown-файлах с YAML-frontmatter (теги, категории, связи), иерархией `inbox → knowledge → archive`, перекрёстными ссылками и автоматизацией — «работает как с 10, так и с 10 000 документами», оптимизирована под AI-ассистентов (Claude, GPT).

Фактическая эволюция (видна по коммитам и документам): проект стартовал 2026-01-02 как markdown-база с парой скриптов, затем в режиме интенсивной AI-разработки (автор большинства коммитов — claude, svend4 делал merge) прошёл через «фазы»: расширение каждого инструмента в 2–3 раза (Tier 1–5), реестр и асинхронный запуск инструментов (Phase 4), production-бэкенд с аутентификацией и метриками (Phase 5), тестовая инфраструктура (Phase 5.5), мобильное приложение с Chaquopy (embedded Python 3.9 + FastAPI + SQLite на устройстве), lite-версия, desktop-версия, browser extension с WASM (Phase 9.1). Описание репозитория «info data, offline app, embedded back end» отражает именно эту офлайн-ориентацию.

## Как устроено (архитектура)

Четыре слоя:

1. **Данные** — `knowledge/` (категории computers/household/cooking, в каждой `index/INDEX.md` + `articles/`), `inbox/` (raw → processing → processed), `archive/`. Метаданные — YAML-frontmatter (title, date, tags, category, related...). Корень репозитория завален авто-сгенерированными индексами: `MASTER_INDEX.md`, `GLOSSARY.md`, `CONCORDANCE.md`, `PAGERANK.md`, `MASTER_BIBLIOGRAPHY.md`, `CITATION_INDEX.md` и ещё ~60 md-файлов.
2. **Инструменты** — `tools/` с 57 автономными CLI-скриптами: индексация (`update_indexes.py` — инкрементальные обновления, MD5-fingerprinting, multiprocessing), валидация (`validate.py` — schema/SEO/links/severity-уровни), графы знаний (`build_graph.py`, `calculate_pagerank.py`, `network_analyzer.py`), поиск (`search_index.py`, `faceted_search.py`, `advanced_search.py`), экспорт, статистика, глоссарии, конкордансы и пр.
3. **Бэкенд** — `backend/`: FastAPI-сервер (`server.py`) с JWT-аутентификацией (`auth.py`), SQLAlchemy + Alembic (`models.py`, `database.py`), Celery + Redis (очередь задач с fallback на прямое исполнение), Prometheus-метрики, structured logging, WebSocket. Ядро — `tool_registry.py` (автообнаружение инструментов через AST-парсинг, категории, параметры) и `tool_runner.py` (асинхронный запуск через subprocess с job-статусами и прогрессом).
4. **Фронтенды** — `mobile-app/` (Flutter + Chaquopy, embedded Python-бэкенд на 127.0.0.1:8001, APK ~100 МБ), `mobile-app-lite/` (ThreadingHTTPServer + sqlite3 вместо FastAPI, ~80–90 МБ), `mobile-app-versions/`, `mobile-app-sandboxes/`, `desktop-app/` (Electron + React), `browser-extension/` (Pyodide/WASM, без бэкенда вообще), `webapp/`, `webapp-react/`, `static_site/`, плюс `Dockerfile` (multi-stage: генерация outputs → FastAPI runtime).

CI/CD: 10 workflow в `.github/workflows/` — тесты с coverage (pytest, матрица Python 3.10/3.11, Codecov), валидация базы знаний, 5 вариантов сборки Android APK/мобильных клиентов (android-apk-auto-build, android-build, build-mobile-apk, build-v5-variants, mobile-parallel-build), release-автоматизация.

## Статус и активность

- **374 коммита**, все в интервале **2026-01-02 — 2026-01-08** (одна неделя интенсивной AI-разработки: большинство коммитов авторства claude, merge — svend4).
- **Релиз v1.0.0** (2026-01-04) — но **без APK**: RELEASE_NOTES.md честно признаёт, что из-за размера Android SDK APK не собран и в релиз не включён, пользователю предлагается собрать самому (10–20 мин, ~15 ГБ дискового места).
- **477 запусков GitHub Actions**: тесты и сборки на main проходили, workflow `sync-versions.yml` стабильно падал; осталась незавершённая ветка `claude/fix-apk-builds-fdMiG`.
- С **2026-01-08 активности нет** (~6 месяцев на момент аудита 2026-07-03) — проект остановлен на середине: мобильные сборки чинились, но так и не доведены до опубликованного APK.

## Ключевые факты

| Параметр | Значение |
|---|---|
| Язык | Python 87%, Dart 4.6%, JavaScript 3.8%, HTML 2.2%, Shell, Swift |
| Размер | ~25 каталогов верхнего уровня; 57 инструментов в `tools/` (многие по 500–700 строк); ~80 файлов в корне (60+ md-документов); суммарно сотни файлов, десятки тысяч строк кода |
| Контент базы знаний | всего 3 статьи в 3 категориях (почти пусто); README заявляет «5+» |
| Последняя активность | 2026-01-08 (374 коммита за неделю 02–08.01.2026) |
| Релизы | v1.0.0 (04.01.2026), без APK в ассетах |
| CI | 10 workflow, 477 запусков; тесты pytest + coverage + Codecov (в HEAD сломан: tests.yml ставит несуществующий корневой requirements.txt) |
| Лицензия | отсутствует (в README — «для личного использования») |
| Статус | заброшенный (остановлен на пике разработки) |
| Зрелость | 3/5 |

## Ссылки

- [Структура](structure.md)
- [Характеристика и оценка](assessment.md)
- [Рекомендации](recommendations.md)
- [Вопросы](questions.md)
- Репозиторий: https://github.com/svend4/data20
