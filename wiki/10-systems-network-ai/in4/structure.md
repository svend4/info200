# Структура in4

## Дерево репозитория

Структура полностью плоская — все файлы в корне, папок нет.

```
in4/
├── README.md                            # Оглавление серии: 3 таблицы (части 0–7, гайды, части 8–11), темы, технологии, источники (65 строк)
│
│   ── Основная серия (части 0–7) ──
├── comparison.html                      # 0: Apple Silicon (Mac Mini M4) vs x86 PC для локального AI (21 КБ, 454 строки)
├── clustering.html                      # 1: Кластеризация — объединение компьютеров для AI (29 КБ)
├── clustering-part2.html                # 2: CXL, типы параллелизма (pipeline/tensor/PRP), бенчмарки (36 КБ)
├── clustering-part3.html                # 3: Практическое руководство по кластеризации (32 КБ)
├── high-bandwidth-minipc-ru.html        # 4: Высокоскоростные мини-ПК — AMD Strix Halo, NVIDIA DGX Spark (31 КБ)
├── sbc-clusters-guide-ru.html           # 5: Кластеры на одноплатниках — Raspberry Pi 5, Orange Pi 5 (42 КБ)
├── prima-cpp-minipc-guide-ru.html       # 6: prima.cpp — распределённый инференс для домашних кластеров (51 КБ)
├── favorites-prima-cpp-ru.html          # 7: Финальная переоценка всех «фаворитов» серии через prima.cpp (36 КБ)
│
│   ── Технические руководства ──
├── prima-cpp-vulkan-porting-guide.html  # Портирование prima.cpp на Vulkan: 14 глав, 18 <pre>-блоков кода (112 КБ, 1464 строки)
├── prima-vulkan-port.html               # Тот же Vulkan-порт, «альтернативное руководство»: 37 <pre>-блоков (107 КБ) — дубль по теме
├── tesla-zluda-vps-prima-cpp-ru.html    # Б/у Tesla GPU + ZLUDA (CUDA на AMD) + облачные VPS × prima.cpp (112 КБ, самый большой)
│
│   ── Расширенная серия (части 8–11, добавлены в PR #2) ──
├── networking-deep-dive-ru.html         # 8: Сети для AI-кластеров — RDMA/RoCE, 10–40GbE, Thunderbolt, тюнинг TCP (66 КБ)
├── model-quantization-guide-ru.html     # 9: Каталог моделей 2025–26, GGUF-квантизации, KV cache, speculative decoding (47 КБ)
├── production-deployment-ru.html        # 10: Продакшн 24/7 — llama-server, Ollama, API gateway, systemd, Docker, Prometheus+Grafana, Ansible, TCO (40 КБ)
└── cost-performance-calculator-ru.html  # 11: «Калькулятор» стоимости: формулы, электричество по странам, 15 конфигураций, ROI (93 КБ, статический, без JS)
```

## Ключевые файлы и их содержимое

| Файл | Роль | Что внутри (проверено по содержимому) |
|---|---|---|
| `README.md` | хаб-оглавление | Таблицы всех 15 страниц с нумерацией; списки тем, технологий (llama.cpp, prima.cpp, EXO, distributed-llama, Ollama; CUDA/Vulkan/Metal/ROCm) и источников (arXiv:2504.08791, arXiv:2511.07425, Jeff Geerling и др.); пометка «Данные актуальны на февраль 2026» |
| `comparison.html` | часть 0 | Конфигурации Mac Mini M4 с unified memory и bandwidth против сборок ПК; цветные теги/оценки best/mid/weak |
| `networking-deep-dive-ru.html` | часть 8 | Сравнительные таблицы каналов: Wi-Fi 7, 1G/2.5G/5G/10G/25G/40GbE — с реальной пропускной способностью, латентностью (мкс), поддержкой RoCE v2 и ценами на б/у свитчи и NIC |
| `model-quantization-guide-ru.html` | часть 9 | 13 разделов: каталог моделей, Dense vs MoE, справочник GGUF-квантизаций, формулы памяти и скорости, speculative decoding, KV cache, таблица «модель × железо (tok/s)» |
| `production-deployment-ru.html` | часть 10 | 14 разделов: архитектура, llama.cpp server, Ollama, распределённый prima.cpp, OpenAI-совместимый API, systemd, Docker Compose, Prometheus+Grafana, охлаждение/питание, безопасность, Ansible, типовые проблемы 24/7, TCO |
| `cost-performance-calculator-ru.html` | часть 11 | 15 разделов: формулы расчёта, электричество по странам, сводная таблица 15 конфигураций, сравнение с облачными API, метрики $/tok/s, $/ГБ, Вт/tok/s, б/у рынок, прогноз цен 2026–27, ROI. Ссылается на 10 других страниц серии |
| `prima-cpp-vulkan-porting-guide.html` | инженерный план | 14 глав: 4 уровня стека prima.cpp, анатомия Vulkan-бэкенда llama.cpp, словарь перевода CUDA→Vulkan, алгоритм Halda, совместимость PRP/mmap с Vulkan, 7 фаз портирования, бенчмарки, 12 подводных камней, «чеклист для хакатона час за часом» |
| `prima-vulkan-port.html` | дубль-альтернатива | Та же тема портирования, другая вёрстка (заголовки без id), больше кода (37 `<pre>`); README называет его «альтернативное руководство» |
| `tesla-zluda-vps-prima-cpp-ru.html` | гайд по бюджетным GPU | 3 сценария: б/у Tesla (P40 и т.п.), ZLUDA/не-NVIDIA (AMD, Intel Arc, Mali), аренда VPS; файл с наибольшим числом внешних ссылок (10 href, включая повторы) |

## Особенности организации

- **Каждая страница автономна**: свой полный `<style>` (одна тёмная тема, продублированная во всех 15 файлах с вариациями), никаких общих CSS/JS-файлов и зависимостей — страницы можно открывать локально по одной.
- **Нет ни одного `<script>`** во всех 15 файлах: интерактивности нет, «калькулятор» — это таблицы с заранее посчитанными значениями и формулами в тексте.
- **Перекрёстная навигация неравномерная**: внутренние ссылки на другие части серии есть в 11 из 15 файлов (calculator — 10, favorites — 7, networking — 6, sbc-clusters и model-quantization — по 4, ряд других — 2–3), но 4 страницы (comparison, clustering и оба Vulkan-гайда) вообще без ссылок; единого меню/индекса нет, «домой» с большинства страниц не уйти.
- **Внешние источники почти не линкованы**: `href="http…"` есть только в 3 файлах (prima-cpp-vulkan-porting-guide — 5, prima-vulkan-port — 3, tesla-zluda — 10 с повторами); в остальных 12 файлах внешних гиперссылок нет — источники упомянуты просто текстом.
- **Дублирование**: две страницы про Vulkan-порт покрывают одну тему (~219 КБ на двоих) — консолидация напрашивается.
- **Нет служебных файлов**: ни LICENSE, ни CLAUDE.md, ни index.html, ни .nojekyll, ни CI-конфигов (проверено запросами — 404).
