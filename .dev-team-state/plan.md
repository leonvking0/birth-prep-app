# Architect Plan — Birth Prep Study App

## Current Scaffold Findings

- `src/App.jsx` and `src/App.css` are still the default Vite starter.
- There is no router, no state layer, no PWA wiring, no test runner, and no lesson rendering yet.
- The source content already exists in `src/data/lesson-01.md` and `src/data/lesson-02.md`; those should remain the source-of-truth lesson notes.

## Architecture Decisions

1. Keep the app in JavaScript/JSX instead of migrating the scaffold to TypeScript during MVP.
2. Keep lesson prose in markdown, but manually curate flashcards into a structured JS module instead of doing brittle runtime extraction.
3. Use `HashRouter` so the app can be deployed as a static PWA without server-side rewrite rules.
4. Use React context + reducer + localStorage for all persisted study state; no external state library.
5. Use vanilla CSS Modules plus global design tokens in `src/index.css`; no Tailwind.
6. Implement PWA with an explicit manifest file plus a small custom service worker so the install/offline surface is visible in-repo.

## File-By-File Implementation Plan

| Path | Action | Responsibility |
| --- | --- | --- |
| `package.json` | Modify | Add runtime deps: `react-router-dom`, `react-markdown`. Add dev deps: `vitest`, `@testing-library/react`, `@testing-library/user-event`, `jsdom`. Add scripts: `test`, `test:watch`. |
| `vite.config.js` | Modify | Keep React plugin, set `base: './'` for static subpath safety, and add Vitest config (`test.environment = 'jsdom'`, setup file). |
| `index.html` | Modify | Replace title/meta, add manifest link, theme-color metadata, apple-touch-icon metadata, and a tiny pre-hydration theme bootstrap script that reads localStorage. |
| `public/manifest.webmanifest` | Add | PWA metadata: name, short name, description, `display: standalone`, `start_url: '.'`, theme/background colors, icons. |
| `public/service-worker.js` | Add | Cache app shell and static assets, provide offline shell fallback, and version caches for future updates. |
| `public/apple-touch-icon.png` | Add | iOS home-screen icon (180x180). |
| `public/pwa-192.png` | Add | Android/PWA icon (192x192). |
| `public/pwa-512.png` | Add | Android/PWA icon (512x512). |
| `public/maskable-512.png` | Add | Maskable install icon for Android launchers. |
| `src/main.jsx` | Modify | Mount providers + router, import global styles, and register the service worker on production builds. |
| `src/App.jsx` | Rewrite | Replace starter content with route shell composition. |
| `src/index.css` | Rewrite | Global reset, CSS custom properties, light/dark tokens, mobile-first spacing scale, typography, reusable utility classes. |
| `src/app/routes.jsx` | Add | Centralize route declarations for Home, Lessons, Lesson Detail, Study, and Quick Reference. |
| `src/providers/ThemeProvider.jsx` | Add | Manage `light` / `dark` / `system`, sync with localStorage, and apply `data-theme` to the root element. |
| `src/providers/StudyProvider.jsx` | Add | Reducer-backed app state for review queue, card progress, lesson progress, and persistence. |
| `src/lib/storage.js` | Add | LocalStorage keys, schema version guards, serialization, hydration defaults, and reset helpers. |
| `src/lib/spacedRepetition.js` | Add | Leitner intervals, queue ordering, mastery helpers, and card promotion/demotion rules. |
| `src/lib/pwa/registerServiceWorker.js` | Add | Safe browser registration, update detection, and callback wiring for an install/update banner. |
| `src/data/lessons.js` | Add | Import `lesson-01.md?raw` and `lesson-02.md?raw`, define lesson metadata, section anchors, summaries, and related-card IDs. |
| `src/data/cards.js` | Add | Curated bilingual flashcard dataset from both lesson files using the normalized card model below. |
| `src/data/quickReference.js` | Add | Assemble cheat-sheet sections from card IDs plus fixed lists like the hospital bag checklist. |
| `src/components/layout/AppShell.jsx` | Add | Shared frame with top summary, route outlet, bottom nav, and install/update banner slot. |
| `src/components/layout/AppShell.module.css` | Add | Layout shell styles sized for 375px primary and 768px max content width. |
| `src/components/navigation/BottomNav.jsx` | Add | Thumb-friendly mobile nav with icons/labels for Home, Lessons, Study, Quick Ref. |
| `src/components/navigation/BottomNav.module.css` | Add | Bottom-nav styling and active-state treatment. |
| `src/components/lesson/LessonMarkdown.jsx` | Add | `react-markdown` renderer with custom heading/list/blockquote components and anchor IDs. |
| `src/components/lesson/SectionJumpNav.jsx` | Add | Sticky jump navigation for lesson sections on mobile. |
| `src/components/flashcards/FlipCard.jsx` | Add | Front/back presentation for all categories, bilingual content, and flip interaction. |
| `src/components/flashcards/FlipCard.module.css` | Add | Card layout, flip animation, and category color treatments. |
| `src/components/flashcards/ReviewControls.jsx` | Add | `Again` / `Got It` controls, due metadata, and lesson/category badges. |
| `src/components/progress/ProgressRing.jsx` | Add | Category mastery visualization for dashboard cards. |
| `src/components/pwa/InstallBanner.jsx` | Add | Optional install CTA when `beforeinstallprompt` is available. |
| `src/pages/HomePage.jsx` | Add | Dashboard with today’s due count, category progress, next lesson links, and install prompt. |
| `src/pages/HomePage.module.css` | Add | Dashboard-specific layout styles. |
| `src/pages/LessonsPage.jsx` | Add | Lesson list cards with summaries and progress badges. |
| `src/pages/LessonDetailPage.jsx` | Add | Full lesson reading view with section nav and related-card shortcuts. |
| `src/pages/LessonDetailPage.module.css` | Add | Lesson reading styles. |
| `src/pages/StudyPage.jsx` | Add | Review queue filters, current flashcard, review controls, and empty-state guidance. |
| `src/pages/StudyPage.module.css` | Add | Study-mode layout styles. |
| `src/pages/QuickReferencePage.jsx` | Add | Fast emergency view for rules, warning signs, partner actions, and hospital bag checklist. |
| `src/pages/QuickReferencePage.module.css` | Add | Quick-reference page styles with pinned alert cards. |
| `src/test/setup.js` | Add | RTL setup, localStorage cleanup, and service-worker stubs. |
| `src/lib/spacedRepetition.test.js` | Add | Verify box promotion/demotion, interval math, and due-card ordering. |
| `src/lib/storage.test.js` | Add | Verify schema load, bad JSON fallback, and version-safe migrations. |
| `src/data/cards.test.js` | Add | Verify unique IDs, bilingual completeness, valid categories, and source lesson coverage. |
| `src/pages/StudyPage.test.jsx` | Add | Verify flip/review flow updates queue + progress + localStorage. |
| `src/pages/QuickReferencePage.test.jsx` | Add | Verify warning signs and emergency rules render in the correct priority order. |
| `src/App.css` | Remove or stop importing | Delete starter-only styles once module styles are in place. |
| `src/assets/hero.png` | Remove | Unused starter asset. |
| `src/assets/react.svg` | Remove | Unused starter asset. |
| `src/assets/vite.svg` | Remove | Unused starter asset. |

## Component Tree

```text
App
└─ AppShell
   ├─ TopBar
   │  ├─ BrandBlock
   │  ├─ DueTodaySummary
   │  └─ ThemeToggle
   ├─ RouteOutlet
   │  ├─ HomePage
   │  │  ├─ InstallBanner
   │  │  ├─ TodayReviewCard
   │  │  ├─ CategoryProgressGrid
   │  │  │  └─ ProgressRing
   │  │  └─ QuickLinks
   │  ├─ LessonsPage
   │  │  └─ LessonCard[]
   │  ├─ LessonDetailPage
   │  │  ├─ SectionJumpNav
   │  │  ├─ LessonMarkdown
   │  │  └─ RelatedCardsStrip
   │  ├─ StudyPage
   │  │  ├─ StudyHeader
   │  │  ├─ StudyFilters
   │  │  ├─ FlipCard
   │  │  └─ ReviewControls
   │  └─ QuickReferencePage
   │     ├─ EmergencyRuleBlock
   │     ├─ WarningSignsList
   │     ├─ PartnerActionsList
   │     └─ HospitalBagChecklist
   └─ BottomNav
```

## Routing Plan

Because the app should work as a static installable PWA without rewrite rules, use `HashRouter`. Logical app routes:

| Route | View | Purpose |
| --- | --- | --- |
| `/` | Home | Dashboard, due reviews, overall progress, quick entry points. |
| `/lessons` | Lessons | Browse the two lesson summaries and progress. |
| `/lessons/:lessonId` | Lesson Detail | Read the full markdown lesson with section jump links and related cards. |
| `/study` | Study | Main flip-card review experience with filters (`all`, lesson, category). |
| `/quick-reference` | Quick Reference | Emergency cheat sheet: go-now rules, warning signs, partner actions, hospital bag. |

Implementation note: with `HashRouter`, these appear in the browser as `/#/`, `/#/lessons`, etc.

## Data Model

### Lesson Data

Keep markdown as content source-of-truth and wrap it in metadata:

```js
{
  id: 'lesson-01',
  slug: 'when-to-go-and-interventions',
  titleEn: 'When to Go to the Hospital',
  titleZh: '何时前往医院与常见干预',
  markdown: lesson01Markdown,
  summary: '5-1-1, rupture of membranes, triage, epidural, Pitocin.',
  sections: [
    { id: 'hospital-timing', titleZh: '何时前往医院', titleEn: 'When to Go' },
    { id: 'prep-checklist', titleZh: '产前准备清单', titleEn: 'Prep Checklist' },
    { id: 'triage', titleZh: '入院后的操作与应对', titleEn: 'Triage' },
    { id: 'interventions', titleZh: '医疗干预', titleEn: 'Interventions' },
  ],
  relatedCardIds: ['rule-5-1-1', 'term-epidural', 'term-pitocin']
}
```

### Structured Flip Card Format

Use one normalized card array in `src/data/cards.js` with a category-specific payload.

```js
{
  id: 'term-epidural',
  category: 'medical_terms', // medical_terms | rules_numbers | action_items | warning_signs
  lessonIds: ['lesson-01', 'lesson-02'],
  sourceSections: ['interventions', 'iv-and-emergencies'],
  front: {
    zh: 'Epidural 是什么？',
    en: 'What is an epidural?',
  },
  back: {
    titleEn: 'Epidural',
    titleZh: '无痛分娩 / 硬膜外麻醉',
    summary: 'Pain relief placed near the spine during labor.',
    bullets: ['May limit mobility', 'Usually needs IV + monitoring'],
    context: 'Discussed when labor shifts from coping to suffering.'
  },
  payload: {
    termEn: 'Epidural',
    termZh: '无痛分娩 / 硬膜外麻醉',
    definition: 'Regional anesthesia used for labor pain relief.',
    context: 'Often discussed around active labor; requires monitoring and position changes.'
  },
  tags: ['pain-management', 'hospital-procedures'],
  quickRef: false
}
```

Category payload rules:

- `medical_terms`: `termEn`, `termZh`, `definition`, `context`
- `rules_numbers`: `label`, `keyNumber`, `explanation`
- `action_items`: `action`, `whenToUse`, `howTo`
- `warning_signs`: `sign`, `whyItMatters`, `whatToDo`

### LocalStorage Schema

Use versioned keys instead of one giant blob so theme can be applied before React mounts.

`birth-prep:v1:preferences`

```json
{
  "theme": "system",
  "lastRoute": "/",
  "installPromptDismissedAt": null
}
```

`birth-prep:v1:study`

```json
{
  "version": 1,
  "updatedAt": "2026-03-22T21:00:00.000Z",
  "cardStates": {
    "term-epidural": {
      "box": 2,
      "lastReviewedAt": "2026-03-22T20:45:00.000Z",
      "nextReviewAt": "2026-03-23T20:45:00.000Z",
      "correctCount": 2,
      "incorrectCount": 1,
      "lapses": 1,
      "lastOutcome": "correct"
    }
  },
  "sessionStats": {
    "totalReviews": 18,
    "totalCorrect": 12,
    "totalIncorrect": 6
  }
}
```

`birth-prep:v1:lesson-progress`

```json
{
  "lesson-01": {
    "lastOpenedAt": "2026-03-22T20:30:00.000Z",
    "completedSectionIds": ["hospital-timing", "prep-checklist"]
  },
  "lesson-02": {
    "lastOpenedAt": null,
    "completedSectionIds": []
  }
}
```

Storage rules:

- Missing `cardStates[cardId]` means the card is still new and effectively due.
- Mastery is derived, not stored: `box >= 4` counts as mastered.
- If storage is corrupt or version mismatched, fall back to defaults instead of crashing.

## Flip Card Extraction

Plan to ship these as manually curated cards in `src/data/cards.js`. This avoids fragile runtime parsing and gives the study experience a stable card count.

### Medical Terms (术语)

| ID | English name | Chinese name | Definition | Context |
| --- | --- | --- | --- | --- |
| `term-gbs` | GBS (Group B Strep) | B 族链球菌 | A bacteria screening result that matters during labor because positive patients usually need IV antibiotics after membranes rupture or labor starts. | Lesson 01 ties GBS-positive status to immediate hospital evaluation after water breaks; Lesson 02 lists it as a reason an IV may be needed. |
| `term-meconium` | Meconium | 胎便 | The baby’s first stool; when it appears in amniotic fluid it signals the need for closer fetal monitoring. | Lesson 01 mentions abnormal fluid color possibly containing meconium; Lesson 02 says meconium requires continuous monitoring. |
| `term-triage` | Triage | 分诊 / 入院评估 | The hospital intake area where labor progress is checked and active-labor patients are prioritized. | Lesson 01 describes assessment, walking, baseline monitoring, and admission decisions in triage. |
| `term-epidural` | Epidural | 无痛分娩 / 硬膜外麻醉 | Regional anesthesia placed near the spine to reduce labor pain. | Lesson 01 covers timing, mobility limits, turning, and spinal headache risk; Lesson 02 notes epidural is one reason an IV may be inserted. |
| `term-blood-patch` | Blood Patch | 血贴 | A procedure used to treat the rare spinal headache that can happen after an epidural. | Lesson 01 explicitly names it as the treatment for spinal headache. |
| `term-pitocin` | Pitocin | 缩宫素 / 人工缩宫素 | Synthetic oxytocin used to strengthen contractions during induction or augmentation. | Lesson 01 explains Pitocin for weak/stalled contractions; Lesson 02 discusses pressure to increase it during augmentation. |
| `term-resident` | Resident | 住院医生 | A doctor in training who may participate in labor care under supervision. | Lesson 01 says parents can ask who is in the room and request someone more experienced if needed. |
| `term-telemetry` | Telemetry | 无线胎心监测仪 / 遥测监护 | A wireless monitoring setup that lets the laboring parent walk and shower while still being monitored. | Lesson 02 says hospitals may have it, but patients often need to ask for it directly. |
| `term-doppler` | Doppler | 多普勒胎心听诊 | A handheld device for intermittent fetal heart checks in low-risk labor. | Lesson 02 contrasts Doppler every 15 minutes with continuous monitoring. |
| `term-iv` | IV (Intravenous line) | 静脉输液 / 静脉留置针 | A line used for fluids, antibiotics, medications, epidural prep, or emergency access. | Lesson 02 explains when IVs are actually needed and how placement affects mobility. |
| `term-crash-c-section` | Crash C-section | 紧急剖腹产 | A highly urgent cesarean delivery performed when the situation becomes immediately dangerous. | Lesson 02 says truly crash C-sections are rare and should not be used casually to justify unnecessary early IV placement. |
| `term-induction` | Induction | 催产 | Starting labor artificially before spontaneous labor begins. | Lesson 02 explains common reasons, expectations, and the slow first stage of cervical ripening. |
| `term-misoprostol` | Misoprostol | 米索前列醇 | A medication used in small doses to soften/ripen the cervix during induction. | Lesson 02 lists it as one of the first induction tools. |
| `term-foley` | Foley catheter / Foley balloon | Foley 导尿管 / 球囊导管 | A balloon catheter used to mechanically dilate the cervix. | Lesson 02 presents it as a physical cervical-ripening method during induction. |
| `term-cervidil` | Cervidil | Cervidil 宫颈熟化塞剂 | A cervical-ripening insert used during induction. | Lesson 02 notes it may carry a slightly higher chance of triggering contractions. |
| `term-augmentation` | Augmentation | 加强产程 | Intensifying labor that has already started, often by increasing Pitocin. | Lesson 02 says the laboring parent can refuse augmentation if labor is progressing and mother/baby are doing well. |
| `term-ecv` | ECV (External Cephalic Version) | 外倒转术 | A hands-on attempt to turn a breech baby into a head-down position. | Lesson 02 recommends deep relaxation to improve the odds of success. |
| `term-forceps` | Forceps | 产钳 | Instruments sometimes used to help deliver the baby vaginally. | Lesson 02 says they are usually attempted only when the predicted success rate is very high. |
| `term-c-section` | C-section / Cesarean section | 剖腹产 | Surgical birth through the abdomen and uterus. | Lesson 02 focuses on long-term spacing implications for the next pregnancy. |
| `term-sga` | SGA (Small for Gestational Age) | 小于胎龄儿 / 胎儿生长受限 | A baby measuring smaller than expected for gestational age. | Lesson 02 names SGA as one reason an induction may be suggested. |
| `term-galactagogues` | Galactagogues | 催乳食物 / 下奶食物 | Foods or supports intended to encourage milk production after birth. | Lesson 01 includes researching galactagogues in the pre-birth planning checklist. |

### Rules & Numbers (规则)

| ID | Rule label | Key number / formula | Explanation |
| --- | --- | --- | --- |
| `rule-5-1-1` | Contraction timing rule | `5-1-1` | Go to the hospital when contractions are every 5 minutes, last 1 minute, and continue like that for 1 hour. |
| `rule-no-talking` | Intensity override rule | `No speech / no breath control` | Even if the clock does not match 5-1-1, go in if contractions are so intense that the laboring parent cannot talk or breathe through them. |
| `rule-37-week-threshold` | Preterm rupture threshold | `< 37 weeks` | If water breaks before 37 weeks, treat it as a preterm labor warning and go to the hospital immediately. |
| `rule-term-window` | Full-term range | `37-42 weeks` | The lesson frames 37 to 42 weeks as term, with an extra note that East Asian average gestation is closer to 39 weeks. |
| `rule-rupture-special-cases` | Ruptured membranes special-case rule | `GBS+ or bad fluid = go now` | At term, water breaking without contractions may still need immediate admission if fluid smells bad, looks abnormal, or the parent is GBS positive. |
| `rule-baseline-monitor` | Baseline monitor duration | `30 minutes` | Initial fetal monitoring in triage usually takes around 30 minutes before staff decide next steps. |
| `rule-admission-threshold` | Typical admission threshold | `3-4 cm` | Formal room admission usually happens once the cervix is around 3 to 4 cm and contractions are strong and regular. |
| `rule-epidural-timing` | Epidural timing guide | `~3 cm` | The lesson suggests the epidural conversation usually makes sense when labor changes from coping to suffering, often around 3 cm. |
| `rule-early-epidural-risk` | Early epidural risk note | `0 cm -> +50% C-section risk` | The lesson warns that using an epidural too early may raise C-section risk because mobility drops. |
| `rule-epidural-turning` | Repositioning after epidural | `Every ~30 minutes` | Once an epidural is in place, the laboring parent should be turned regularly to avoid prolonged nerve pressure. |
| `rule-intermittent-monitoring` | Low-risk monitoring cadence | `Every 15 minutes` | For low-risk labor, the lesson favors intermittent Doppler checks about every 15 minutes instead of automatic continuous monitoring. |
| `rule-arom-threshold` | Artificial rupture threshold | `2 cm` | If the cervix is already about 2 cm, the lesson says artificial rupture of membranes may be paired with induction. |
| `rule-forceps-success` | Forceps decision threshold | `~90% success` | The class frames forceps as appropriate only when the clinician believes the chance of success is very high. |
| `rule-c-section-spacing` | Next-pregnancy spacing after C-section | `18-24 months` | The lesson says families should usually wait 18 to 24 months after a C-section before the next pregnancy. |

### Action Items (行动)

| ID | Action | When to use | How-to |
| --- | --- | --- | --- |
| `action-time-contractions` | Time contractions instead of guessing. | When labor may be starting. | Use the 5-1-1 pattern as the main trigger and note frequency, duration, and total time. |
| `action-check-water-break` | Verify whether the water actually broke. | When fluid leakage is uncertain. | Put tissue/pad in underwear, stand up, lift the belly, and cough; a fresh gush suggests ruptured membranes. |
| `action-finish-loose-ends` | Clear unfinished life/admin tasks before labor. | In the final weeks before birth. | Finish things like taxes, work handoff, and other nagging tasks so they do not become mental friction during labor. |
| `action-prepare-safe-room` | Create one calm, comfortable room at home. | Before labor starts. | Lean into nesting enough to make at least one room feel settled, safe, and restful. |
| `action-car-seat-practice` | Install and practice the car seat. | Before the due date. | Install it early, practice buckling, and avoid thick snowsuits in the seat because straps can loosen. |
| `action-pack-bag` | Pack the hospital bag intentionally. | Before labor or induction. | Include lotion, comfortable pajamas, and a straw water bottle. |
| `action-pack-food-entertainment` | Bring snacks, broth, and entertainment. | For hospital labor and especially induction waits. | Pack shelf-stable snacks, frozen broth that can be prepared in hospital, and a movie/show for long induction delays. |
| `action-postpartum-planning` | Finish postpartum logistics early. | Before birth. | Research galactagogues, choose the baby’s doctor, and confirm whether insurance covers breast-pump rental. |
| `action-keep-moving-in-triage` | Keep the laboring parent moving in triage. | While waiting for admission. | Favor walking, the birth ball, and back massage over sitting still. |
| `action-wake-sleepy-baby` | Wake a sleepy baby during monitoring if needed. | When variability is low because the baby seems asleep. | Offer apple juice or ice chips/chewing ice to stimulate the baby before staff overreact. |
| `action-eyes-up` | Use the “Eyes Up” reset. | When stress or overthinking spikes. | Look upward while thinking/breathing to shift the brain toward a more relaxed, creative state. |
| `action-sticky-note-visualization` | Use sticky-note future visualization. | During labor coping. | Put notes on the wall about things to do with the baby after birth and use them as a breathing/grounding prompt. |
| `action-ask-who-is-in-room` | Ask who each provider is. | Any time new staff enter or propose a procedure. | Ask whether they are an attending, resident, or student; request that a student step out or that a more experienced nurse help if desired. |
| `action-use-question-checklist` | Use the medical intervention question checklist. | Before agreeing to induction, C-section, episiotomy, or any new procedure. | Ask what it is, why it is needed, risks/benefits, alternatives, worst case if declined, who will do it, and recovery impact. |
| `action-request-telemetry` | Ask for wireless telemetry proactively. | When monitoring is required but movement still matters. | Ask directly instead of waiting for staff to offer it, because convenience for staff may otherwise win. |
| `action-request-high-iv` | Ask for the IV higher on the arm. | If an IV is necessary. | Request placement up the arm instead of the hand/wrist so walking and movement stay easier. |
| `action-decline-unneeded-augmentation` | Push back on unnecessary augmentation. | When Pitocin is being increased even though labor is progressing and mother/baby are okay. | Calmly refuse escalation and ask staff to explain the true indication. |
| `action-request-check-on-body-signals` | Ask for a cervical check when the body suddenly changes. | If there is strong urge to poop or involuntary descending/grunting sounds. | Tell the nurse immediately that the body is bearing down and ask to be checked, even if the last exam was recent. |
| `action-relax-for-ecv` | Get the body deeply relaxed for ECV. | If an external version is attempted for breech baby. | Use full-body release, hypnosis, or other relaxation methods to reduce tension during the maneuver. |
| `action-counter-pressure` | Apply counter pressure for back labor. | When the laboring parent has strong low-back pain. | Have her lean forward and press firmly on the upper buttock/hip-pocket bones to relieve pressure and help fetal positioning. |
| `action-house-breathing` | Cue the word “House” to stop early pushing. | When she desperately wants to push before the team says it is time. | Have her say “House” out loud because that mouth shape discourages bearing down. |
| `action-change-positions` | Keep changing positions to stay active. | Throughout labor when safe. | Rotate among squatting, birth ball, toilet, shower, walking, and other gravity-friendly positions instead of staying flat in bed. |
| `action-trust-downward-signals` | Trust the body’s downward pushing signals. | Near transition/second stage. | Treat spontaneous downward pressure and involuntary sounds as meaningful information, not something to ignore. |

### Warning Signs (警示)

| ID | Sign | Why it matters | What to do |
| --- | --- | --- | --- |
| `warning-preterm-water-break` | Water breaks before 37 weeks. | The lesson treats this as a preterm labor warning. | Go to the hospital immediately. |
| `warning-bad-fluid-smell` | Amniotic fluid smells bad. | Bad-smelling fluid can suggest a problem and should not be watched casually at home. | Go in for immediate evaluation. |
| `warning-abnormal-fluid-color` | Amniotic fluid has unusual color. | Abnormal color may mean contamination or fetal stress. | Go in for immediate evaluation and tell staff what color you saw. |
| `warning-meconium-fluid` | Amniotic fluid appears to contain meconium. | Meconium is a specific high-attention case that triggers continuous monitoring. | Go in and tell staff you suspect meconium in the fluid. |
| `warning-headache` | Persistent headache. | The lesson lists this as a non-labor warning symptom that still needs care. | Call or go in for medical assessment. |
| `warning-swelling` | Sudden swelling of face or limbs. | Sudden swelling is flagged as a symptom that should not be ignored. | Seek prompt medical evaluation. |
| `warning-vision-spots` | Visual spots or speckles. | Vision changes are listed as a symptom that warrants care. | Call the provider or go in promptly. |
| `warning-itchy-feet` | Itchy feet. | The lesson specifically calls this out as a symptom worth evaluating. | Contact the provider and ask to be assessed. |
| `warning-fever` | Fever. | Fever is listed as a symptom that needs evaluation during pregnancy/labor. | Contact the provider or go to the hospital. |
| `warning-vomiting` | Vomiting. | The lesson includes vomiting in the warning-symptom list. | Contact the provider or go in if symptoms persist. |
| `warning-burning-urination` | Burning with urination. | Could point to a urinary tract infection, which the lesson says warrants care. | Call the provider or go in for assessment. |

## Spaced Repetition Algorithm — Leitner Box System

Use a 5-box Leitner system. Cards begin in Box 1 and move based on review outcome.

| Box | Meaning | Interval after correct review |
| --- | --- | --- |
| 1 | New / fragile | Same session or immediately due |
| 2 | Seen once correctly | 1 day |
| 3 | Familiar | 3 days |
| 4 | Strong | 7 days |
| 5 | Mastered | 14 days |

Rules:

1. All cards initialize in Box 1 and are due immediately.
2. `Got It` promotes the card by one box, capped at Box 5.
3. `Again` resets the card to Box 1, increments `lapses`, and makes it due again in the current session.
4. In-session requeue behavior: cards marked `Again` should come back after 2-3 other cards, not instantly.
5. Queue ordering should be: overdue cards first, then lower-box cards, then `warning_signs`, then older untouched cards.
6. Dashboard mastery percentage per category should be `(cards with box >= 4) / (total cards in category)`.
7. If a card is in Box 5 and is answered correctly again, keep it in Box 5 and push `nextReviewAt` out another 14 days.

Helper functions to implement in `src/lib/spacedRepetition.js`:

- `createInitialCardState()`
- `reviewCard(cardState, outcome, now)`
- `isCardDue(cardState, now)`
- `getDueCards(cards, cardStates, filters, now)`
- `getCategoryMastery(cards, cardStates)`

## PWA Setup

### Manifest

`public/manifest.webmanifest` should include:

- `name`: `Birth Prep Study`
- `short_name`: `Birth Prep`
- `description`: bilingual prenatal labor study + review app
- `display`: `standalone`
- `orientation`: `portrait`
- `start_url`: `.`
- `scope`: `.`
- `background_color` and `theme_color` matching the light theme brand tokens
- icons: `192x192`, `512x512`, `maskable 512x512`, plus Apple touch icon

### Service Worker

Use `public/service-worker.js` and register it from `src/lib/pwa/registerServiceWorker.js`.

Cache strategy:

1. Precache app shell essentials: `./`, `./index.html`, `./manifest.webmanifest`, icon files.
2. Runtime-cache same-origin CSS/JS/image requests with stale-while-revalidate.
3. For navigation requests, serve cached `index.html` if the network is unavailable.
4. Version cache names so stale caches can be deleted on activate.

### Install UX

- Show `InstallBanner` on the Home page when `beforeinstallprompt` fires.
- Persist dismissal in `birth-prep:v1:preferences.installPromptDismissedAt`.
- Do not block the primary study flow on install.

## Styling Approach

- Use vanilla CSS Modules for page/component styling and `src/index.css` for tokens, reset, and theme variables.
- Keep layout mobile-first at 375px width, then scale fluidly up to a max content width of 768px.
- Use CSS custom properties for color, spacing, radius, shadow, and typography so dark mode is just a token swap.
- Favor large tap targets, sticky bottom navigation, and card surfaces that read clearly one-handed.
- Dark mode strategy:
  - Default to `system`
  - Allow explicit `light` / `dark` override
  - Store theme in `birth-prep:v1:preferences`
  - Apply `data-theme` on the root element before React mounts to avoid a flash

## Testing Approach

### Unit Tests

- `src/lib/spacedRepetition.test.js`
  - Box promotion and reset behavior
  - Due-date interval calculations
  - Queue sorting order
- `src/lib/storage.test.js`
  - Valid load/save
  - Corrupt JSON fallback
  - Version mismatch fallback
- `src/data/cards.test.js`
  - Unique card IDs
  - Every card has bilingual front/back text
  - Every card belongs to a known lesson + category

### Component / Integration Tests

- `src/pages/StudyPage.test.jsx`
  - Flip card reveals answer
  - `Again` and `Got It` update progress and queue correctly
  - Empty-state appears when no cards are due
- `src/pages/QuickReferencePage.test.jsx`
  - Emergency rule block appears before bag checklist
  - Warning signs render with correct call-to-action copy

### Manual Verification

- 375px viewport and 768px viewport layout check
- Theme persistence after reload
- Hash-route deep links (`/#/study`, `/#/lessons/lesson-01`)
- PWA install prompt
- Offline reload after one successful online visit

## Open Risks For Developer Phase

- PWA icons do not yet exist; the developer phase must either design or generate them before install testing.
- Chinese labels for a few English-only branded terms (`Cervidil`, `Telemetry`, `Blood Patch`) should stay plain-language and consistent across cards/UI.
- Manual card curation is correct for MVP, but future lesson expansion should probably move card content into its own authoring workflow instead of editing one large array directly.
