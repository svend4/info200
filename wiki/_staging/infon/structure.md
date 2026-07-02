# Структура infon

## Аннотированное дерево каталогов

```
infon/
├── cmd/                        # 121 команда (авто-индекс: docs/COMMAND_INDEX.md)
│   ├── tvcp/                   # главный бинарь: call, send/receive, chat, share,
│   │                           #   group, avatar, synth, ai, contacts, yggdrasil...
│   ├── ai*/                    # 11 команд слоя tvcp-ai/1: aidraw, aicam, aicards,
│   │                           #   aiplay/aiturn (крестики-нолики), aiwordle, aiuno...
│   ├── arena*/                 # 10 команд «оригами-Warcraft»: арена тангram-юнитов,
│   │                           #   ИИ-командиры, трансляция по каналу с потерями (RS-коды)
│   ├── ray*/                   # ~45 команд ray/Q6/alife: rayexplore (ходьба по ИИ-миру),
│   │                           #   raymeet (общий мир на несколько человек), raytour (атлас
│   │                           #   64 миров), raylife/raydungeon/rayseasons (искусств. жизнь),
│   │                           #   raysound (мир как музыка), raypipe (мозг→провод→рендер),
│   │                           #   rayfleet (мониторинг техники, идея из info150), ray3d...
│   ├── sem*/                   # семантический видеокодек: semcall, semvideo, semcodec...
│   ├── brainserver/, planbrain/ # референсные tvcp-ai/1 серверы
│   └── glyph*/, fold*, paint/, pseudo*/ ... # глифы-QR, оригами-3D, псевдоизображения
├── pkg/                        # ~46 переиспользуемых пакетов
│   ├── raytrace/               # CPU path tracer: ~120 .go-файлов, из них ~55-60 тестов
│   │                           #   (bdpt, photon, restir, pssmlt, sdf, subsurface, bvh...)
│   ├── raydir/                 # «мир как данные»: Q6-гексаграммы, SceneVector, Quest,
│   │                           #   Ecosystem, Climate, аватары, presence (~126 файлов,
│   │                           #   больше половины — тесты)
│   ├── brain/                  # протокол tvcp-ai/1: типы, HTTP-клиент, референсный мозг
│   ├── scene/, sketch/, pseudo/ # draw-DSL и «псевдоизображения» для текстовых моделей
│   ├── semvideo/, deltastream/, dtn/ # смысл по проводу, дельты, deep-space доставка
│   ├── glyphqr/, microfont/, blazon/, arecibo/, lincos/ # само-декодируемые коды и языки
│   ├── tangram/, tangram7/, fold/, relief/ # тангram-фигуры, оригами-3D
│   ├── arena/, arenacast/, tournament/, session/, debate/ # игровые движки и ИИ-дебаты
│   ├── fleet/, planbrain/, acl/ # мониторинг флота, планировщик, Contract-Net переговоры
│   └── terminal/, color/, braille/, stream/, discovery/, registry/ ... # рендер и утилиты
├── internal/                   # 25 приватных пакетов — медиа-ядро TVCP
│   ├── audio/                  # ALSA (Linux) / CoreAudio (macOS) / WASAPI (Windows)
│   ├── video/, codec/          # захват, кодек .babe (ImageToFrame), H264/Opus
│   ├── network/, sfu/, stun/, yggdrasil/ # UDP-протокол, SFU, P2P-mesh
│   ├── avatar/                 # нейроаватар: ключевые точки лица, ~35 kbps
│   ├── aisource/, raysource/, vision/ # ИИ-камера, рендер-источник, детекция
│   └── recorder/, screen/, contacts/, group/, history/, i18n/, ui/ ...
├── ai/                         # спецификации и адаптеры слоя ИИ
│   ├── BRAIN_PROTOCOL.md, SPEC.md, IMPLEMENTED.md, SHOWCASE.md, showcase.html
│   ├── adapters/               # Python: anthropic_brain.py, ollama_brain.py,
│   │                           #   openai_brain.py + сайдкары (vision, restore, avatar)
│   └── schema/                 # JSON-схемы (rayscene.schema.json)
├── experimental/               # функции под build-тегом `experimental`
│   ├── games/ (board/cards/words), whiteboard/, breakout/, fileshare/,
│   │   recording/, screenshare/, security/, interactive/, features/
│   └── IDEAS.md, ROADMAP.md, GAMES_BOTS_AGENTS.md, DOCUMENTATION_REVIEW.md
├── docs/                       # 15 документов + adr/
│   ├── CONCEPT_MAP.md          # концепт-карта: 7 «миров», хабы переиспользования
│   ├── COMMANDS.md             # как запускать всё (go run ./cmd/...)
│   ├── COMMAND_INDEX.md        # автоген. индекс всех 121 команд
│   ├── Q6_INTEROP.md           # интероп с meta/pro2/info150 по 6-битной координате
│   ├── SHARED_WORLD.md, TVCP_AI_PROTOCOL.md, EXTERNAL_MODELS.md,
│   │   NEURAL_GRAPHICS_ROADMAP.md, SEMANTIC_RATEDISTORTION.md,
│   │   cross-pollination-analysis.md (TVCP × Doom-over-DNS), dns-peer-discovery.md ...
├── mobile/                     # заготовки iOS (Swift) и Android (Kotlin)
├── web/tangramcraft.html       # HTML-игрушка
├── scenes/, scripts/           # сцены draw-DSL; gen_command_index.go, qa.sh (smoke)
├── .github/workflows/          # ci.yml (3 ОС × Go 1.21/1.22, -race, coverage), release.yml
├── README.md + ~25 корневых md # GETTING_STARTED, DEMO, PREVIEW, NETWORK, AUDIO, CAMERAS,
│   │                           #   YGGDRASIL, BUILD_WINDOWS, TERMUX_ANDROID, PSEUDO_IMAGE,
│   │                           #   SCREEN_SHARING, RECORDING, TEXT_CHAT, ARCHITECTURE...
├── CHANGELOG.md                # Keep-a-Changelog, ведётся (посл. запись 2026-06-11)
├── tvcp-business-plan.md/.docx # русскоязычный бизнес-план v1.0 (февраль 2026)
├── nautilus.json               # манифест федерации nautilus/1 (роль: renderer)
├── go.mod / go.sum             # go 1.24.7; всего 2 внешние зависимости (alsa, opus)
├── Makefile, build.ps1, setup.ps1, config.example.yaml, .golangci.yml, LICENSE (MIT)
```

## Ключевые файлы и модули

| Файл/модуль | Что делает |
|---|---|
| `cmd/tvcp/main.go` | точка входа продукта: ~25 подкоманд (call, group, chat, share, avatar, synth, ai, export...), версия 0.0.1-alpha |
| `pkg/raytrace` | полноценный CPU-рендерер: path tracing c NEE/MIS, BDPT, photon mapping, PSSMLT, ReSTIR, SDF, subsurface, объёмный туман, denoise, OBJ/MTL; плотно покрыт тестами (включая тесты несмещённости Монте-Карло) |
| `pkg/raydir` | «смысловой» слой: `Hexagram` (6-битный куб, GrayWalk), `SceneVector` (гексаграмма↔мир, словарь идентичен Python-стороне), `Quest` (лабиринт на кубе), `Ecosystem`/`Climate`/`SeasonalWorld` (alife), `AvatarFace`/`Pose`/`Presence` |
| `pkg/brain` + `ai/adapters/*.py` | протокол `tvcp-ai/1`: POST /v1/decide (move/draw/sketch/react), капабилити-переговоры; смена модели = смена URL (BRAIN_URL) |
| `internal/codec` (.babe) | блочный кодек Bi-Level Adaptive Block Encoding — основа терминального видео |
| `internal/yggdrasil`, `internal/network` | P2P-транспорт, NACK-ретрансмиссия, scene-delta |
| `cmd/raypipe` | доказательство тезиса: промпт → SceneSpec → байты UDP → рендер, печатает выигрыш «смысл vs пиксели» (~40×) |
| `docs/CONCEPT_MAP.md` | лучшая входная точка: карта 7 «миров», 4 опорных примитива (SceneVector, Hexagram, Quest, Ecosystem) и матрица переиспользования блоков A–L |
| `scripts/gen_command_index.go` | автогенерация индекса команд из doc-комментариев пакетов |
| `nautilus.json` | самоописание узла для межрепозиторной федерации Q6 (links: meta, pro2, info150) |

## Особенности организации кода

- **Монорепо трёх проектов**: медиа-ядро TVCP (`internal/`), ИИ-слой (`ai/`, `pkg/brain`), ray/Q6/alife-платформа (`pkg/raytrace`, `pkg/raydir`, `cmd/ray*`). Связаны общими примитивами (`terminal.Frame`, кодек .babe, транспорт).
- **Философия «каждая фича = композиция старых»** — явно задокументирована в CONCEPT_MAP: например, живое подземелье E = лабиринт D × экосистема B; куратор K = лабиринт D × модель зрителя C.
- **Build-теги**: экспериментальные функции (игры, whiteboard) собираются только с `-tags experimental` и не влияют на ядро.
- **Детерминизм от seed** повсюду — поэтому код тестируем и воспроизводим; офлайн-фоллбеки для всех ИИ-функций (референсный «мозг» без модели).
- **Минимум зависимостей**: 4 строки в go.sum. Рендер, кодеки, RS-коды, сеть — всё своё.
- **Внимание**: корневой `ARCHITECTURE.md` описывает *целевую* структуру (core/, server/, desktop/), которой в реальном дереве нет — фактическая структура другая (см. выше); документ частично аспирационный/устаревший.
