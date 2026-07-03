# Структура daten1

Репозиторий плоский: все 15 файлов лежат в корне, каталогов нет. Единственная «вложенная структура» — внутри zip-архива.

## Аннотированное дерево

```
daten1/
├── README.md                        # Заглушка: «# daten1 / Info nnnn» (2 строки)
│
│   ── Блокноты (одностраничные HTML-приложения, SQLite через sql.js/WASM) ──
├── notebook-2d.html                 # ~1100 строк. «Многопользовательский Блокнот + SQLite»:
│                                    #   таблицы users, notes; переключение локальных профилей
├── notebook-2.5d.html               # ~1000 строк. Тот же блокнот с 2.5D-оформлением (CSS-объём);
│                                    #   таблица notes; в истории коммитов — «критические баг-фиксы»
├── notebook-3d.html                 # ~970 строк. «3D Записная Книжка»: Three.js r128 + SQLite
├── notebook-2d-ultra.html           # ~1570 строк. «СУПЕР Блокнот»: + папки, история заметок
│                                    #   (note_history), избранное, корзина с восстановлением,
│                                    #   экспорт PDF/TXT/JSON/HTML (jsPDF, marked)
├── notebook-2d-mega.html            # ~3970 строк, 167 КБ. Флагман «МЕГА Блокнот — 100+ функций»:
│                                    #   5 таблиц (users, notes, folders, note_history, templates),
│                                    #   Markdown+GFM, wiki-ссылки [[...]], backlinks, TOC,
│                                    #   вложенные папки, drag&drop, bulk-операции, шаблоны,
│                                    #   дашборд (Chart.js), Mermaid, highlight.js, achievements,
│                                    #   напоминания/уведомления, тёмная тема, хоткеи, swipe, PWA
│
│   ── PWA-обвязка (только для mega-версии) ──
├── manifest.json                    # Web App Manifest: name «МЕГА Блокнот - 100+ Функций»,
│                                    #   start_url /notebook-2d-mega.html, SVG-emoji-иконки,
│                                    #   shortcuts «Новая заметка» и «Дашборд»
├── sw.js                            # Service Worker: cache-first, кэширует mega-HTML и
│                                    #   8 CDN-URL (6 библиотек: sql.js, marked, jsPDF,
│                                    #   Chart.js, highlight.js, mermaid) для офлайн-режима
│
│   ── Игры «Космический Защитник» (Canvas / Three.js) ──
├── space-shooter-game.html          # ~910 строк. 2D Canvas: счёт, уровни, 3 жизни,
│                                    #   клавиатура + touch-управление (свайп по canvas)
├── space-shooter-2.5d.html          # ~910 строк. 2.5D-версия (псевдообъём)
├── space-shooter-3d.html            # ~770 строк. 3D-версия на Three.js r128, HUD поверх сцены
│
│   ── Учебные материалы (Markdown, на русском) ──
├── browser-games-guide.md           # ~1000 строк. «Браузерные игры — полное руководство»:
│                                    #   Canvas, JS, WebGL; Phaser, Three.js, PixiJS, Babylon,
│                                    #   Kontra; полный код Arkanoid; звук, сохранения, мобильная
│                                    #   адаптация, публикация (GitHub Pages/Netlify/itch.io),
│                                    #   оптимизация, монетизация
├── computer-games-types.md          # ~115 строк. Таксономия жанров игр с примерами
├── minimal-game-development.md      # ~320 строк. «Что нужно для минимальной игры»:
│                                    #   Python/Pygame, JavaScript и др., готовые сниппеты
│
│   ── Архив-склад (тематически ближе к daten2 / meta4) ──
└── flower_shop_master_levels_v7.zip # 156 КБ, 114 файлов. «Flower Shop — 7 уровней (master v7)»:
    └── levels/
        ├── level1/  # PHP + SQLite: весь сайт в index.php + flowers.db + картинки
        ├── level2/  # Flask + SQLite + Jinja-шаблоны (app.py)
        ├── level3/  # Django + админка (models, views, admin)
        ├── level4/  # Node.js/Express + EJS-шаблоны (server.js)
        ├── level5/  # Python-API (backend/api.py) + React/Vite фронтенд
        ├── level6/  # Next.js + TypeScript: App Router, API-роуты, zustand-корзина,
        │            #   checkout, компонентная библиотека (40 файлов)
        └── level7/  # Enterprise-микросервисы: docker-compose, nginx-gateway,
                     #   product-service (Node), order-service (Python),
                     #   notification-worker, Postgres init.sql, RabbitMQ,
                     #   kubernetes/deployment.yaml + service.yaml
```

## Ключевые файлы и модули

| Файл | Роль | Что делает |
|---|---|---|
| `notebook-2d-mega.html` | Флагманское приложение | ~90 именованных JS-функций: CRUD заметок, папки-деревья, wiki-ссылки и backlinks, полнотекстовый и расширенный поиск, шаблоны заметок, экспорт (PDF/TXT/MD/HTML/JSON) и импорт (SQLite/текстовые файлы), дашборд со статистикой, achievements, мультипользовательские профили |
| `notebook-2d-ultra.html` | Предыдущая ступень флагмана | ~30 функций; ядро то же (тот же ключ localStorage `notebook_ultra_db`), без шаблонов/дашборда/wiki-ссылок |
| `notebook-2d.html` / `-2.5d` / `-3d` | Ранние варианты | Базовый CRUD заметок поверх sql.js; различаются подачей (плоско / 2.5D / сцена Three.js) |
| `manifest.json` + `sw.js` | PWA | Установка на домашний экран, офлайн-режим mega-блокнота |
| `space-shooter-*.html` | Игры | Одна и та же аркада в трёх измерениях; мобильное touch-управление |
| `browser-games-guide.md` | Документация-учебник | Самый содержательный md-файл репозитория |
| `flower_shop_master_levels_v7.zip` | Архив | Снапшот учебного проекта «7 уровней одного магазина» (перенос из чата 14.12.2025, по README архива) |

## Особенности организации кода

- **«Один файл — одно приложение»**: никакой сборки, никаких node_modules; открыл HTML — приложение работает. Плата за это — дублирование: базовый каркас (инициализация sql.js, saveDatabase, CRUD) скопирован между пятью блокнотами с расхождениями.
- **Ключи localStorage различаются по версиям** (`notebook2d_multiuser_db`, `notebook_sqlite_db`, `notebook3d_sqlite_db`, `notebook_ultra_db`), **но mega и ultra используют один и тот же ключ `notebook_ultra_db`** — при размещении на одном домене они читают/перезаписывают одну базу с разными схемами (см. [оценку](assessment.md)).
- **Абсолютные пути в PWA** (`/notebook-2d-mega.html`, `/sw.js`) — рассчитаны на хостинг в корне домена; на GitHub Pages проектного типа (`svend4.github.io/daten1/`) манифест и service worker в таком виде не заработают.
- Русскоязычный UI и комментарии во всех файлах.
- Игры и блокноты никак не связаны между собой — репозиторий фактически объединяет три независимые коллекции под одной крышей.
