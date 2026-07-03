# Структура universal-file-storage-mcp

Репозиторий компактный: **13 файлов, ~5 700 строк**, из них один-единственный файл кода (`src/index.ts`, 821 строка), один большой shell-скрипт установки и семь объёмных markdown-документов (~4 200 строк документации). По статистике GitHub: TypeScript 58,9 %, Shell 41,1 %.

## Аннотированное дерево каталогов

```
universal-file-storage-mcp/
├── src/
│   └── index.ts            # ВЕСЬ код сервера (821 строка): конфиг хранилищ,
│                           #   класс StorageAdapter, 4 MCP-инструмента, HTTP-сервер
├── package.json            # npm-манифест: MCP SDK, express, zod, webdav,
│                           #   tesseract.js, @aws-sdk/client-s3, dotenv
├── tsconfig.json           # TypeScript: ES2022, strict: true, outDir: dist
├── .env.example            # Шаблон переменных: пароли NAS/облака, AWS-ключи,
│                           #   языки OCR, лимиты, ADB-хост
├── .gitignore              # node_modules, dist, .env, логи, termux-артефакты
│
├── README.md               # Главная дока (678 строк, по-русски): возможности,
│                           #   установка, конфигурация под все платформы,
│                           #   подключение к Claude, безопасность, troubleshooting
├── ARCHITECTURE.md         # ASCII-схемы архитектуры (499 строк): поток данных,
│                           #   адаптеры, слои безопасности, roadmap v1.0–v3.0
├── QUICK_START.md          # «Запуск за 5 минут» (490 строк): примеры диалогов
│                           #   с Claude, практические сценарии
├── PLATFORM_SETUP.md       # Детальная настройка Windows/Linux/macOS/Android
│                           #   (671 строка): CIFS, systemd, ADB и т.п.
├── TERMUX_GUIDE.md         # Запуск сервера на Android-телефоне через Termux
│                           #   (848 строк): установка, автозапуск, доступ по сети
├── TERMUX_SCRIPTS.md       # Вспомогательные скрипты для Termux (432 строки)
├── GITHUB_GUIDE.md         # Мета-инструкция «как опубликовать этот проект
│                           #   на GitHub» (540 строк) — уже выполнена
└── install-termux.sh       # Автоустановщик для Termux (523 строки): проверки,
                            #   npm install, генерация .env и start/stop-скриптов
```

Отсутствуют: `LICENSE` (проверено — 404), `package-lock.json`, тесты, `.github/` (CI), `CLAUDE.md`, папка `dist/`.

## Ключевые файлы и модули

| Файл / фрагмент | Что делает |
|---|---|
| `src/index.ts`, `STORAGES` (стр. 44–96) | Захардкоженный в исходнике массив конфигураций 6 хранилищ (Windows-диск, Linux-домашняя папка, macOS, NAS `//192.168.1.5/shared`, WebDAV, Android). Настройка = правка исходника |
| `src/index.ts`, класс `StorageAdapter` (стр. 102–376) | Единый класс-адаптер с `switch` по типу хранилища: local (`fs/promises`), NAS (монтирование `sudo mount -t cifs` через `exec`), cloud (библиотека `webdav`), android (`adb shell ls/cat`); плюс OCR через `tesseract.js` (eng+rus) и наивный полнотекстовый поиск (чтение каждого файла целиком, `includes()`) |
| `src/index.ts`, инструмент `list_storages` (стр. 415) | MCP-tool: список сконфигурированных хранилищ |
| `src/index.ts`, инструмент `search_files` (стр. 489) | MCP-tool: полнотекстовый поиск по хранилищам с фильтром по расширениям и OCR изображений; ранжирование по числу совпавших строк |
| `src/index.ts`, инструмент `read_file` (стр. 625) | MCP-tool: чтение файла из любого хранилища, для картинок — OCR |
| `src/index.ts`, инструмент `list_files` (стр. 716) | MCP-tool: листинг директории; параметр `recursive` объявлен, но в реализации игнорируется |
| `src/index.ts`, HTTP-сервер (стр. 794–821) | Express + `StreamableHTTPServerTransport`; транспорт создаётся с несуществующими опциями `{ server, endpoint }`, ни одного express-роута не зарегистрировано — HTTP-обвязка нерабочая |
| `install-termux.sh` | Полный установщик под Termux: проверка окружения, `git clone` (с плейсхолдером `YOUR_USERNAME` — как есть не сработает), генерация `.env`, `termux-config.ts`, boot-скрипта автозапуска и start/stop/status-скриптов |
| `ARCHITECTURE.md` | Самое подробное описание замысла; содержит заявления, не подтверждённые кодом (кэширование, индексация, S3, path-traversal-защита — см. assessment.md) |

## Особенности организации кода

- **Монолит в один файл**: конфигурация, типы, все четыре адаптера и все четыре инструмента живут в `src/index.ts`. В `ARCHITECTURE.md` нарисованы отдельные `LocalAdapter`/`NasAdapter`/`CloudAdapter`/`AndroidAdapter` как подклассы — в коде это один класс со `switch`.
- **Документации в 5 раз больше, чем кода** (~4 200 строк md против 821 строки TS) — типичный «спроектированный, но не доведённый» проект.
- Инструменты обращаются к приватным членам адаптера через обход типизации: `adapter['config']`, `adapter['isImage']`, `adapter['extractTextFromImage']`.
- История git (9 коммитов за один день 2026-01-29) показывает, что проект был загружен архивом («Add files via upload») и затем распакован в корень тремя PR с участием бота claude — то есть код писался вне репозитория и версионной истории разработки нет.
- Roadmap в `ARCHITECTURE.md` датирован кварталами 2025 года, хотя репозиторий создан в январе 2026 — контент явно перенесён из более раннего чата/архива.

Ссылки: [Обзор](README.md) · [Характеристика и оценка](assessment.md) · [Рекомендации](recommendations.md) · [Вопросы](questions.md)
