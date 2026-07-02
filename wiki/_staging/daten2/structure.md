# Структура daten2

## Дерево ветки `main` (фактически — только «Уровень 5»)

```
daten2/  (main = уровень 5: React + Flask API + SQLite)
├── README.md              # Инструкция запуска уровня 5; отсылка к «структуре из чата 14.12.2025»
├── Dockerfile             # Multi-stage: Node 20 (сборка Vite) → Python 3.12-slim + gunicorn,
│                          #   порт 10000, фронтенд копируется в ./static (под Render)
├── backend/               # Flask API
│   ├── api.py             # Всё API (~60 строк): GET /api/products, POST /api/orders
│   ├── flowers.db         # Готовая SQLite-база, 28 КБ, БИНАРНИК в git (products, orders, order_items)
│   └── requirements.txt   # Flask>=3.0,<4.0; flask-cors>=4.0,<5.0 (2 зависимости)
└── frontend/              # React-приложение (Vite)
    ├── index.html         # Одна строка HTML: <div id="root"> + подключение /src/main.jsx
    ├── package.json       # react 18.3, react-dom, axios; dev: vite 5.4, @vitejs/plugin-react
    ├── vite.config.js     # порт 5173, host 0.0.0.0, allowedHosts: ['.onrender.com']
    └── src/
        ├── main.jsx       # Монтирование React в #root (5 строк)
        ├── App.jsx        # ВЕСЬ интерфейс (~90 строк): каталог, корзина, заказ;
        │                  #   на main жёстко: const API = 'http://127.0.0.1:5001'
        └── style.css      # ~20 строк: сетка карточек, корзина
```

## Другие ветки (важно: там живут другие уровни)

```
claude/level1-php-GBpVR/   (обновлена 05.06.2026 — «Уровень 1»)
├── index.php              # Весь сайт в одном PHP-файле
├── init_db.php            # Скрипт инициализации БД (на main аналога нет!)
├── flowers.db             # SQLite-база
├── images/                # Фото-заглушки цветов (rose/tulip/peony)
├── Dockerfile
└── README.md              # «Уровень 1 — PHP + SQLite (всё в одном файле)», запуск php -S

claude/level5-react-flask-GBpVR/   (обновлена 05.06.2026 — открытый PR #11)
└── backend/api.py         # ИСПРАВЛЕННАЯ версия: static_folder='static', маршруты '/' и
                           #   '/<path>' отдают собранный React (SPA-fallback на index.html)
    frontend/src/App.jsx   # ИСПРАВЛЕНО: const API = import.meta.env.VITE_API_URL || ''
```

Уровни 2 (Flask), 3 (Django), 4 (Express+EJS), 6 (Next.js+TS+Prisma+Tailwind), 7 (микросервисы) существуют **только в истории коммитов** от 24–25.12.2025 — их деревья были перезаписаны последующими слияниями.

## Ключевые файлы и модули

| Файл | Что делает |
|---|---|
| `backend/api.py` | Flask + CORS. `GET /api/products` — активные товары (`is_active = 1`), сортировка по id DESC. `POST /api/orders` — валидация name/items, вставка в `orders` и `order_items`, цена берётся из таблицы `products` (не от клиента), возврат `order_id`. Запросы параметризованы (SQL-инъекций нет). Dev-запуск: порт 5001, debug=True |
| `backend/flowers.db` | Заполненная SQLite-база (28 КБ). Таблицы (по коду): `products(id, name, description, price, is_active, …)`, `orders(customer_name, phone)`, `order_items(order_id, product_id, qty, price)`. Скрипта пересоздания на main нет |
| `frontend/src/App.jsx` | Единственный компонент: загрузка товаров через axios при монтировании, корзина в useState, итог через useMemo, оформление заказа POST-ом, alert с номером. Кнопка заказа задизейблена без имени/корзины |
| `Dockerfile` | Сборка фронтенда → образ Python + gunicorn (`api:app`, порт 10000); `chmod 666 flowers.db`; ссылается на `package-lock.json*` — lock-файла в репо нет (glob спасает от ошибки) |
| `frontend/vite.config.js` | Dev-сервер 5173, `allowedHosts: ['.onrender.com']` — след деплоя dev-сервера на Render (PR #7) |

## Особенности организации кода

- **«Один уровень = вся ветка»**: репозиторий эволюционировал так, что каждая ветка уровня *полностью заменяла* содержимое main (коммит «Flatten folder structure», PR #2), поэтому 7 уровней в репозитории одновременно не лежат. Это главный источник расхождения между описанием репо и содержимым.
- Минимализм: нет слоёв, ORM, роутинга на фронтенде, конфигов окружения — весь код читается за 10 минут; это осознанный учебный формат «как в чате».
- Активная работа через PR-процесс (12 PR за неделю), автор кода — `claude`, владелец `svend4` — мержил; два последних исправляющих PR (#11, #12 от 25.12.2025) так и не слиты.
- Бинарная БД в git — одновременно «данные из коробки» и антипаттерн (заказы в задеплоенном контейнере пишутся в эфемерный файл образа).
