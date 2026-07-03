# Структура daten2

## Дерево ветки `main` (фактически — только «Уровень 5»)

```
daten2/  (main = уровень 5: React + Flask API + SQLite)
├── README.md              # Инструкция запуска уровня 5; отсылка к «структуре из чата 14.12.2025»
├── Dockerfile             # Multi-stage: Node 20 (сборка Vite) → Python 3.12-slim + gunicorn,
│                          #   порт 10000, фронтенд копируется в ./static (под Render)
├── backend/               # Flask API
│   ├── api.py             # Всё API (~47 строк): GET /api/products, POST /api/orders
│   ├── flowers.db         # Готовая SQLite-база, 28 КБ, БИНАРНИК в git (products, orders, order_items)
│   └── requirements.txt   # Flask>=3.0,<4.0; flask-cors>=4.0,<5.0 (2 зависимости)
└── frontend/              # React-приложение (Vite)
    ├── index.html         # Одна строка HTML: <div id="root"> + подключение /src/main.jsx
    ├── package.json       # react 18.3, react-dom, axios; dev: vite 5.4, @vitejs/plugin-react
    ├── vite.config.js     # порт 5173, host 0.0.0.0, allowedHosts: ['.onrender.com']
    └── src/
        ├── main.jsx       # Монтирование React в #root (5 строк)
        ├── App.jsx        # ВЕСЬ интерфейс (~79 строк): каталог, корзина, заказ;
        │                  #   на main жёстко: const API = 'http://127.0.0.1:5001'
        └── style.css      # ~15 строк: сетка карточек, корзина
```

## Ветки: все 7 уровней живут в отдельных ветках (главное уточнение)

Репозиторий содержит **9 веток**. Каждый уровень сохранён в собственной ветке, а не «только в истории коммитов»:

| Ветка | Что внутри | Обновлена |
|---|---|---|
| `main` | Уровень 5 (React + Flask + SQLite) | 25.12.2025 |
| `claude/level1-php-GBpVR` | Уровень 1: PHP + SQLite (`index.php`, `init_db.php`, `flowers.db`, `images/`, Dockerfile) | 05.06.2026 |
| `claude/level2-flask-GBpVR` | Уровень 2: Flask + SQLite + шаблоны (`app.py`, `templates/`, `static/`) | 25.12.2025 |
| `claude/level3-django-GBpVR` | Уровень 3: Django + админка (`manage.py`, `flower_shop/`, `shop/`) | 25.12.2025 |
| `claude/level4-express-GBpVR` | Уровень 4: Node.js Express + EJS (`server.js`, `views/`, `package.json`) | 25.12.2025 |
| `claude/level5-react-flask-GBpVR` | Уровень 5 с фиксом (открытый PR #11) | 05.06.2026 |
| `claude/level6-nextjs-GBpVR` | Уровень 6: Next.js + TS + PostgreSQL + Prisma + Tailwind | 24.12.2025 |
| `claude/level7-enterprise-GBpVR` | Уровень 7: микросервисы (nginx-шлюз, Postgres, RabbitMQ, product/order/notification-сервисы) | 24.12.2025 |
| `claude/flower-shop-seven-levels-GBpVR` | **Консолидированное дерево всех 7 уровней** в `flower_shop_levels/levels/` (папки `level1_flower_shop … level7_flower_shop_enterprise`) | 24.12.2025 |

Ветка уровня 1 (`claude/level1-php-GBpVR`) содержит `init_db.php` — скрипт инициализации БД, которого на `main` нет; весь сайт в одном `index.php` с параметризованными запросами; папку `images/` с заглушками (rose/tulip/peony).

Фикс уровня 5 (ветка `claude/level5-react-flask-GBpVR`, PR #11):
- `backend/api.py` — `static_folder='static'`, маршруты `/` и `/<path>` отдают собранный React (SPA-fallback на `index.html`);
- `frontend/src/App.jsx` — `const API = import.meta.env.VITE_API_URL || ''` вместо хардкода `http://127.0.0.1:5001`.

**Уточнение к аудиту:** уровни 2, 3, 4, 6, 7 существуют не «только в истории коммитов» — у каждого есть отдельная ветка, а в ветке `claude/flower-shop-seven-levels-GBpVR` все семь уровней уже лежат в одном дереве в подпапках. На `main` они просто не собраны вместе.

## Ключевые файлы и модули

| Файл | Что делает |
|---|---|
| `backend/api.py` | Flask + CORS. `GET /api/products` — активные товары (`is_active = 1`), сортировка по id DESC. `POST /api/orders` — валидация name/items, вставка в `orders` и `order_items`, цена берётся из таблицы `products` (не от клиента), возврат `order_id`. Запросы параметризованы (SQL-инъекций нет). Dev-запуск: порт 5001, debug=True |
| `backend/flowers.db` | Заполненная SQLite-база (28 КБ, реальный бинарник SQLite 3 — проинспектирован напрямую). **4 таблицы**: `categories(id, name)`; `products(id, name, description, price, image, category_id, stock, is_active)`; `orders(id, customer_name, phone, created_at, status)`; `order_items(id, order_id, product_id, qty, price)` — с FK и `ON DELETE CASCADE`. Засеяно 3 товара (Красная роза 7.9 €, Букет тюльпанов 19.9 €, Пион 9.5 €). Скрипта пересоздания на main нет |
| `frontend/src/App.jsx` | Единственный компонент: загрузка товаров через axios при монтировании, корзина в useState, итог через useMemo, оформление заказа POST-ом, alert с номером. Кнопка заказа задизейблена без имени/корзины |
| `Dockerfile` | Сборка фронтенда → образ Python + gunicorn (`api:app`, порт 10000); `chmod 666 flowers.db`; ссылается на `package-lock.json*` — lock-файла в репо нет (glob спасает от ошибки) |
| `frontend/vite.config.js` | Dev-сервер 5173, `allowedHosts: ['.onrender.com']` — след деплоя dev-сервера на Render (PR #7) |

## Особенности организации кода

- **«Один уровень = вся ветка»**: при слияниях каждая ветка уровня *полностью заменяла* содержимое main, поэтому **на `main`** семь уровней одновременно не лежат — только последний (уровень 5). Но сами уровни при этом не терялись: каждый остался в своей ветке, а в ветке `claude/flower-shop-seven-levels-GBpVR` все 7 уровней лежат вместе в подпапках `flower_shop_levels/levels/`. Это главный источник расхождения между описанием репо и содержимым именно `main`.
- Минимализм: нет слоёв, ORM, роутинга на фронтенде, конфигов окружения — весь код читается за 10 минут; это осознанный учебный формат «как в чате».
- Активная работа через PR-процесс (12 PR за неделю), автор кода — `claude`, владелец `svend4` — мержил; два последних исправляющих PR (#11, #12 от 25.12.2025) так и не слиты.
- Бинарная БД в git — одновременно «данные из коробки» и антипаттерн (заказы в задеплоенном контейнере пишутся в эфемерный файл образа).

---
**Навигация:** [Обзор](README.md) · [Структура](structure.md) · [Оценка](assessment.md) · [Рекомендации](recommendations.md) · [Вопросы](questions.md) · [Репозиторий на GitHub](https://github.com/svend4/daten2)
