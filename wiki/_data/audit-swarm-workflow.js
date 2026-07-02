export const meta = {
  name: 'svend4-audit-swarm',
  description: 'Аудит-перепроверка 61 репозитория профиля svend4 роем агентов + таксономия тем',
  phases: [
    { title: 'Аудит', detail: 'один агент-аудитор на репозиторий, 5 вики-страниц в _staging' },
    { title: 'Перепроверка', detail: 'адверсариальный верификатор на каждый репозиторий' },
    { title: 'Добор', detail: 'повторный проход для упавших репозиториев' },
    { title: 'Таксономия', detail: 'кластеризация всех репозиториев по темам' },
  ],
}

const REPOS = [
  {n:'info200',d:'info (этот репозиторий — будущий хаб вики, почти пустой)',l:'',u:'2026-07-02'},
  {n:'daten40',d:'Info, блоки, рационал ос, IFOS',l:'Python',u:'2026-06-18'},
  {n:'data15',d:'info',l:'Python',u:'2026-06-16'},
  {n:'infon',d:'info, TVCP — Terminal Video Communication',l:'Go',u:'2026-06-15'},
  {n:'data70',d:'info, чат экспорт, много тем',l:'Python',u:'2026-06-07'},
  {n:'lorenzo',d:'info (монорепо: docs Svyazi 2.0 ~2815 md-файлов + docs-toolkit Python-пакет)',l:'Python',u:'2026-06-05'},
  {n:'daten2',d:'7 flowersshops - 7 level programm',l:'JavaScript',u:'2026-06-05'},
  {n:'robot',d:'info',l:'',u:'2026-05-13'},
  {n:'info10',d:'info, shop',l:'Python',u:'2026-05-11'},
  {n:'info150',d:'info med',l:'Python',u:'2026-05-04'},
  {n:'nautilus',d:'мета инфопортал протокол',l:'Python',u:'2026-04-27'},
  {n:'info40',d:'AI Agent Orchestration Platform, Production',l:'Python',u:'2026-04-26'},
  {n:'ingit',d:'InGit - Integrated Git Platform, offline',l:'Python',u:'2026-04-26'},
  {n:'info100',d:'info, лаборатория агентов',l:'Python',u:'2026-04-21'},
  {n:'pro2',d:'info ицзин трансформер',l:'Python',u:'2026-04-19'},
  {n:'data50',d:'info, аи аватары',l:'',u:'2026-04-18'},
  {n:'in4',d:'info, домашние AI-кластеры',l:'HTML',u:'2026-04-18'},
  {n:'info30',d:'info, Claude Code Knowledge System',l:'',u:'2026-04-18'},
  {n:'info20',d:'info, расширение возможностей Claude Code',l:'',u:'2026-04-18'},
  {n:'meta1',d:'info, Continuum — детерминированный рантайм',l:'TypeScript',u:'2026-04-18'},
  {n:'daten20',d:'info / Document Management System',l:'Python',u:'2026-04-13'},
  {n:'soz150',d:'info соц, writing os',l:'JavaScript',u:'2026-04-13'},
  {n:'info15',d:'info, ершам канал вики',l:'',u:'2026-04-11'},
  {n:'in4n',d:'info, динамический граф информационный',l:'HTML',u:'2026-03-29'},
  {n:'infom',d:'info, ГрафРАГ',l:'Python',u:'2026-03-29'},
  {n:'data7',d:'info, задача коммивояжера, оптимизация',l:'Python',u:'2026-03-14'},
  {n:'information',d:'info новости ньюз',l:'',u:'2026-03-11'},
  {n:'meta10',d:'info, grep-ast → ast-grep',l:'',u:'2026-03-05'},
  {n:'meta2',d:'info восстановление разорванных документов',l:'Python',u:'2026-02-28'},
  {n:'claudeai-test-project-k',d:'тесты, Claude AI тест, Desktop Commander',l:'Python',u:'2026-02-28'},
  {n:'meta4',d:'info, flower shop project',l:'',u:'2026-02-26'},
  {n:'data2',d:'info, ЕТД по Крюкову, и для робототехники так же',l:'Python',u:'2026-02-25'},
  {n:'meta',d:'info, meta — монорепо hex-проектов',l:'Python',u:'2026-02-23'},
  {n:'info7',d:'info, оркестратор и бот, плюс л аи',l:'TypeScript',u:'2026-02-07'},
  {n:'data10',d:'Dynamic Content Blocks System',l:'',u:'2026-02-05'},
  {n:'universal-file-storage-mcp',d:'Universal file storage server for Claude AI access across platforms',l:'TypeScript',u:'2026-01-29'},
  {n:'daten4',d:'dynamic planner, динамический планировщик',l:'HTML',u:'2026-01-28'},
  {n:'info4',d:'ИИ скиллы, база данных методов скилл',l:'Python',u:'2026-01-28'},
  {n:'info5',d:'4х-уровневая пирамида автоматизации',l:'Other',u:'2026-01-28'},
  {n:'info3',d:'info, гуманитарные формулы',l:'Python',u:'2026-01-26'},
  {n:'info',d:'info, параллели, соответствие предметов',l:'',u:'2026-01-25'},
  {n:'info2',d:'info, Тезаурус-Хаб программного кода',l:'JavaScript',u:'2026-01-25'},
  {n:'info1',d:'info, инфо система, шаблоны, алгоритмы',l:'Python',u:'2026-01-25'},
  {n:'data40',d:'info, интернет-магазин',l:'JavaScript',u:'2026-01-21'},
  {n:'data30',d:'info ос рационал программ',l:'HTML',u:'2026-01-18'},
  {n:'daten',d:'иос - инфо операцион система',l:'Python',u:'2026-01-12'},
  {n:'daten23',d:'info / интернет магазин',l:'',u:'2026-01-10'},
  {n:'daten30',d:'info app динамический хаб, микросервисы',l:'Python',u:'2026-01-09'},
  {n:'daten22',d:'Offline search app with SQLite FTS4',l:'Python',u:'2026-01-09'},
  {n:'data20',d:'info data, offline app, embedded back end',l:'Python',u:'2026-01-08'},
  {n:'daten1',d:'Info блокнот, игры',l:'HTML',u:'2026-01-03'},
  {n:'daten7',d:'Info обработка данных, раскладное меню',l:'',u:'2026-01-03'},
  {n:'daten14',d:'Программы интеграция решений',l:'',u:'2026-01-03'},
  {n:'daten12',d:'Info рационал инфо программ',l:'',u:'2026-01-03'},
  {n:'daten5',d:'info рационал инфо программ',l:'JavaScript',u:'2026-01-03'},
  {n:'daten3',d:'Tourist hub with partnership programs',l:'TypeScript',u:'2025-12-31'},
  {n:'daten11',d:'Info информация и метаданные 4 уровня',l:'Python',u:'2025-12-30'},
  {n:'daten6',d:'динамический каталог',l:'CSS',u:'2025-12-29'},
  {n:'daten8',d:'Programm мониторинг интернет обьявлений',l:'',u:'2025-12-28'},
  {n:'daten9',d:'Info меню, шаблоны, виджеты',l:'',u:'2025-12-28'},
  {n:'data4',d:'Soz соц апп - программ перс бюджет',l:'',u:'2025-12-28'},
]

const STAGING = '/home/user/info200/wiki/_staging'
const ALL_LINE = REPOS.map(r => r.n + ' (' + r.d + ')').join('; ')

const ACCESS = [
  'ДОСТУП К РЕПОЗИТОРИЮ (git clone, api.github.com и codeload.github.com ЗАБЛОКИРОВАНЫ прокси с 403 — НЕ пытайся, не трать время):',
  '1) Содержимое любого файла: Bash → curl -sS "https://raw.githubusercontent.com/svend4/<repo>/HEAD/<путь>" (HEAD сам резолвится в дефолтную ветку). Это основной канал — используй его максимально.',
  '2) Списки файлов и страницы: инструмент WebFetch (его схема отложенная — сначала выполни ToolSearch с query "select:WebFetch"). Полезные URL:',
  '   - https://github.com/svend4/<repo> — корень: описание, список файлов/папок, отрендеренный README, язык, число коммитов',
  '   - https://github.com/svend4/<repo>/tree/HEAD/<папка> — содержимое папки',
  '   - https://github.com/svend4/<repo>/commits — история коммитов (сколько, когда последние)',
  '3) curl НА github.com НЕ работает (403 от прокси) — HTML-страницы github.com читай ТОЛЬКО через WebFetch. raw.githubusercontent.com работает только через curl.',
].join('\n')

const META_SCHEMA = {
  type: 'object',
  required: ['repo','one_liner','sut','temy','tehnologii','yazyk','status','zrelost','razmer','silnoe','slaboe','otsutstvuet','idei_sochetanij','voprosy'],
  properties: {
    repo: {type:'string', description:'имя репозитория'},
    one_liner: {type:'string', description:'суть одной строкой, по-русски'},
    sut: {type:'string', description:'2-4 предложения: что это, зачем, как устроено'},
    temy: {type:'array', items:{type:'string'}, description:'1-3 тематических тега по-русски (например: ИИ-агенты, интернет-магазины, офлайн-приложения, базы знаний)'},
    tehnologii: {type:'array', items:{type:'string'}, description:'ключевые технологии/фреймворки'},
    yazyk: {type:'string', description:'основной язык программирования или "документы/markdown" или "пусто"'},
    status: {type:'string', enum:['активный','завершённый','экспериментальный','заброшенный','почти пустой']},
    zrelost: {type:'integer', minimum:1, maximum:5, description:'зрелость 1-5'},
    razmer: {type:'string', description:'примерный размер: число файлов/строк, словами'},
    silnoe: {type:'array', items:{type:'string'}, description:'сильные стороны, 2-6 пунктов'},
    slaboe: {type:'array', items:{type:'string'}, description:'слабые стороны, 2-6 пунктов'},
    otsutstvuet: {type:'array', items:{type:'string'}, description:'чего нет: тесты, CI, лицензия, доки и т.п.'},
    idei_sochetanij: {type:'array', items:{type:'object', required:['s_chem','chto_poluchitsya'], properties:{s_chem:{type:'string',description:'с какими репо профиля сочетать'}, chto_poluchitsya:{type:'string',description:'что уникальное/инновационное получится'}}}, description:'минимум 2 идеи'},
    voprosy: {type:'array', items:{type:'string'}, description:'топ-3 вопроса владельцу проекта'},
  },
}

const VERIFY_SCHEMA = JSON.parse(JSON.stringify(META_SCHEMA))
VERIFY_SCHEMA.properties.ispravleniya = {type:'array', items:{type:'string'}, description:'список внесённых исправлений, по-русски; пустой если всё было верно'}
VERIFY_SCHEMA.properties.verdikt = {type:'string', enum:['подтверждено','исправлено','существенно переработано']}
VERIFY_SCHEMA.required = VERIFY_SCHEMA.required.concat(['ispravleniya','verdikt'])

function auditPrompt(r) {
  const local = r.n === 'info200' ? '\nОСОБОЕ: этот репозиторий уже склонирован локально в /home/user/info200 (ветка main почти пуста: только README.md). Читай локально, веб не нужен. Он выбран площадкой для вики-энциклопедии профиля — отрази это в оценке и рекомендациях.\n' : ''
  return [
    'Ты — агент-аудитор в рое, проводящем полный аудит-перепроверку всех 61 репозиториев GitHub-профиля svend4.',
    'Твой объект: репозиторий svend4/' + r.n + ' (описание: «' + r.d + '», язык: ' + (r.l || 'не указан') + ', обновлён: ' + r.u + ').',
    local,
    ACCESS,
    '',
    'ЗАДАЧА — глубокий аудит и подробные вики-страницы НА РУССКОМ ЯЗЫКЕ:',
    '1. Исследуй репозиторий: корневая страница (WebFetch), дерево ключевых папок, затем прочитай через curl raw README.md, CLAUDE.md (если есть), основные доки и 8–25 ключевых файлов кода (точки входа, конфиги, главные модули, тесты). Для очень больших репозиториев — репрезентативная выборка, и честно укажи ограничение покрытия в assessment.md.',
    '2. Проверь активность: страница коммитов (примерное число, дата последних), наличие issues/веток если видно.',
    '3. Создай папку ' + STAGING + '/' + r.n + '/ и запиши в неё РОВНО 5 файлов (подробно, по-русски):',
    '',
    'README.md — заголовок «# ' + r.n + ' — <краткая суть>», затем разделы: «Обзор»; «Назначение и идея»; «Как устроено (архитектура)»; «Статус и активность»; «Ключевые факты» (markdown-таблица: язык, примерный размер/число файлов, последняя активность, статус, зрелость N/5); в конце — список ссылок: [Структура](structure.md), [Характеристика и оценка](assessment.md), [Рекомендации](recommendations.md), [Вопросы](questions.md) и прямая ссылка «Репозиторий: https://github.com/svend4/' + r.n + '».',
    '',
    'structure.md — «# Структура ' + r.n + '»: аннотированное дерево каталогов (в code-блоке, с комментариями); таблица ключевых файлов/модулей и что каждый делает; особенности организации кода.',
    '',
    'assessment.md — «# Характеристика и оценка ' + r.n + '»: разделы «Что есть» (что реально сделано/работает), «Чего нет» (отсутствует: тесты? CI? лицензия? документация? упаковка/установка? примеры? данные?), «Плюсы», «Минусы», «Качество кода и документации», «Зрелость: N/5» с обоснованием. Будь конкретен, ссылайся на реальные файлы и факты.',
    '',
    'recommendations.md — «# Рекомендации по ' + r.n + '»: «Быстрые улучшения» (конкретный список), «Серьёзные доработки», «Варианты продолжения» (МИНИМУМ 3 сценария развития, каждый с абзацем описания), «Сочетания с другими репозиториями профиля» — МИНИМУМ 2 идеи вида «обычное + обычное = новое уникальное»: с какими репо профиля скомбинировать и что инновационного получится.',
    '',
    'questions.md — «# Вопросы к ' + r.n + '»: 3–7 содержательных вопросов владельцу проекта; для КАЖДОГО вопроса — подраздел «Варианты ответов» (2–4 варианта) и «Варианты дальнейших действий» (что делать при каждом ответе).',
    '',
    'СПИСОК ВСЕХ РЕПОЗИТОРИЕВ ПРОФИЛЯ (для идей сочетаний): ' + ALL_LINE,
    '',
    '4. Если в репозитории уже есть самоаудиты/отчёты/статусы — упомяни их и перепроверь их заявления (это аудит-ПЕРЕПРОВЕРКА): совпадают ли заявленные цифры и статусы с реальностью.',
    '5. Верни метаданные через StructuredOutput. Текстовые поля по-русски (кроме repo и технических имён).',
    '',
    'Честность: ничего не выдумывай; что не смог проверить — помечай «не проверено». Если репозиторий пуст или почти пуст — так и напиши, но все 5 страниц всё равно создай.',
  ].join('\n')
}

function verifyPrompt(r, m) {
  return [
    'Ты — агент-перепроверки в рое аудита GitHub-профиля svend4. Агент-аудитор уже создал 5 вики-страниц по репозиторию svend4/' + r.n + ' в папке ' + STAGING + '/' + r.n + '/ (README.md, structure.md, assessment.md, recommendations.md, questions.md) и вернул метаданные:',
    JSON.stringify(m),
    '',
    ACCESS,
    '',
    'ЗАДАЧА — адверсариальная перепроверка (найди ошибки, не доверяй аудитору):',
    '1. Прочитай все 5 страниц (Read).',
    '2. Выборочно перепроверь фактические заявления против реального репозитория: существование упомянутых файлов и папок, язык, наличие/отсутствие тестов, CI, лицензии, ключевые утверждения «что есть/чего нет». Минимум 5 независимых проверок через curl raw и/или WebFetch. Особо проверяй цифры (число файлов, размеры) и громкие заявления.',
    '3. Исправь найденные ошибки ПРЯМО в файлах (Edit). Дозаполни пропущенные обязательные разделы. Проверь, что: относительные ссылки между 5 страницами корректны; есть ссылка на https://github.com/svend4/' + r.n + '; весь текст на русском; страницы подробные, не отписки.',
    '4. Убедись: в questions.md у КАЖДОГО вопроса есть «Варианты ответов» и «Варианты дальнейших действий»; в recommendations.md минимум 3 сценария продолжения и минимум 2 идеи сочетаний с другими репо профиля.',
    '5. Верни через StructuredOutput ИСПРАВЛЕННЫЕ метаданные (та же структура, обнови поля если аудитор ошибался) плюс поля: ispravleniya (список внесённых правок; пустой если всё было верно) и verdikt («подтверждено» | «исправлено» | «существенно переработано»).',
    'Правь только ошибки и пробелы, хороший текст аудитора сохраняй.',
  ].join('\n')
}

const results = await pipeline(
  REPOS,
  (r) => agent(auditPrompt(r), {label: 'audit:' + r.n, phase: 'Аудит', schema: META_SCHEMA}),
  (m, r) => m
    ? agent(verifyPrompt(r, m), {label: 'verify:' + r.n, phase: 'Перепроверка', schema: VERIFY_SCHEMA})
        .then(v => v || Object.assign({}, m, {ispravleniya: [], verdikt: 'не перепроверено'}))
    : null
)

const finalByRepo = {}
results.forEach((res, i) => { if (res) finalByRepo[REPOS[i].n] = res })

phase('Добор')
const missed = REPOS.filter(r => !finalByRepo[r.n])
log('Добор: повтор для ' + missed.length + ' репозиториев: ' + missed.map(r => r.n).join(', '))
for (const r of missed) {
  const m = await agent(auditPrompt(r), {label: 'audit2:' + r.n, phase: 'Добор', schema: META_SCHEMA})
  if (m) {
    const v = await agent(verifyPrompt(r, m), {label: 'verify2:' + r.n, phase: 'Добор', schema: VERIFY_SCHEMA})
    finalByRepo[r.n] = v || Object.assign({}, m, {ispravleniya: [], verdikt: 'не перепроверено'})
  }
}

phase('Таксономия')
const compact = Object.values(finalByRepo).map(m => ({
  repo: m.repo, one_liner: m.one_liner, temy: m.temy, tehnologii: m.tehnologii,
  yazyk: m.yazyk, status: m.status, zrelost: m.zrelost,
}))
const TAX_SCHEMA = {
  type: 'object', required: ['topics'],
  properties: {
    topics: {type:'array', items:{type:'object', required:['slug','nazvanie','opisanie','repos'], properties:{
      slug: {type:'string', description:'формат NN-latin-kebab, NN от 01 до 20, по порядку важности темы'},
      nazvanie: {type:'string', description:'название темы по-русски'},
      opisanie: {type:'string', description:'2-3 предложения: что объединяет репозитории темы'},
      repos: {type:'array', items:{type:'string'}},
    }}},
  },
}
const tax = await agent([
  'Ты — таксономист роя аудита GitHub-профиля svend4. Ниже метаданные всех проаудированных репозиториев (JSON).',
  'Построй тематическую таксономию для вики-энциклопедии: от 8 до 14 тем; КАЖДЫЙ репозиторий ровно в ОДНОЙ теме (наиболее подходящей); темы осмысленные и сбалансированные (не «прочее» на 20 репо; если нужна тема «эксперименты и заготовки» — можно, но постарайся распределить содержательно).',
  'slug: NN-latin-kebab (NN с 01, по убыванию важности/зрелости темы, например 01-ai-agents-orchestration). Название и описание по-русски.',
  'Проверь себя: суммарное число репо по темам должно равняться числу входных репо, без дублей и пропусков. Верни через StructuredOutput.',
  '',
  JSON.stringify(compact),
].join('\n'), {label: 'taxonomy', schema: TAX_SCHEMA, effort: 'high'})

const covered = new Set()
;(tax ? tax.topics : []).forEach(t => t.repos.forEach(x => covered.add(x)))
const uncovered = Object.keys(finalByRepo).filter(x => !covered.has(x))
log('Аудировано: ' + Object.keys(finalByRepo).length + '/61; тем: ' + (tax ? tax.topics.length : 0) + '; вне таксономии: ' + (uncovered.join(', ') || 'нет'))

return { metadata: finalByRepo, taxonomy: tax, uncovered, missedAfterRetry: REPOS.filter(r => !finalByRepo[r.n]).map(r => r.n) }