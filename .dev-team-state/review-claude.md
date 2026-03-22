# Edge Case & Runtime Bug Review

Reviewer: The Edge Case Hunter
Date: 2026-03-22
HEAD: e2ee8b5b7f3f38a3d845013f2e5032781300401e

---

## [CRITICAL] Infinite re-render loop in LessonDetailPage

**Files:** `src/pages/LessonDetailPage.jsx:16-47` + `src/providers/StudyProvider.jsx:122-169`

The `useEffect` in `LessonDetailPage` lists `markLessonOpened` and `markSectionCompleted` as dependencies. These functions are defined inside `useMemo(() => { ... }, [state])` in `StudyProvider`. Every time `state` changes, the memo recomputes and the functions get new identities.

The cycle:

1. Effect runs → calls `markLessonOpened(lesson.id)` → dispatches `MARK_LESSON_OPENED`
2. Reducer sets `lastOpenedAt: new Date(action.now).toISOString()` — always a new value
3. `state` changes → `useMemo` recomputes → `markLessonOpened` gets a new identity
4. React sees changed effect deps → cleanup runs (observer disconnected) → effect re-runs
5. GOTO 1

Each iteration produces a different `lastOpenedAt` timestamp, so React never bails out. This runs at ~60 fps, burning CPU/battery, flooding localStorage writes, and preventing the `IntersectionObserver` from ever firing (it gets disconnected and recreated every frame). **Sections never get marked as completed.**

Every visit to any lesson detail page triggers this loop.

**Fix options:**
- Extract `dispatch` and call it directly in the effect (stable ref from `useReducer`)
- Wrap `markLessonOpened`/`markSectionCompleted` in `useCallback` with `[dispatch]` as the only dep, outside the `useMemo`
- Use a ref to hold the latest callback and exclude the functions from effect deps

---

## [CRITICAL] Service worker `skipWaiting()` in install handler defeats update banner and causes first-visit reload

**Files:** `public/service-worker.js:18` + `src/lib/pwa/registerServiceWorker.js:72-74`

The service worker calls `self.skipWaiting()` unconditionally on line 18 of the install handler. Combined with `self.clients.claim()` in the activate handler and the `controllerchange` → `window.location.reload()` listener in the registration code, this causes two problems:

**Problem A — First-visit reload:** On a user's first visit, the SW registers, installs, immediately activates (`skipWaiting`), and claims the client. The `controllerchange` event fires, triggering `window.location.reload()`. The user sees the page load and then get reloaded for no apparent reason. On slow connections this is especially jarring.

**Problem B — Update banner is dead code:** On subsequent visits when the SW updates, the new SW installs and immediately activates (because of `skipWaiting` in the install handler). The `statechange → installed` event might set `updateReady: true` in the React state, but `controllerchange` fires within the same microtask cycle, causing an auto-reload before the user can ever interact with the "Update now" banner. The `activateServiceWorkerUpdate()` function, the update banner in `AppShell`, and the `SKIP_WAITING` message handler are all unreachable code paths.

**Fix:** Remove `self.skipWaiting()` from the install handler. Keep only the `SKIP_WAITING` message handler so the user-initiated update flow works as designed.

---

## [ADVISORY] Double-tap on review buttons can double-promote a card and skip the next one

**File:** `src/pages/StudyPage.jsx:83-100`

`handleReview` reads `currentCard` from render scope. With React 18 concurrent mode (`createRoot`), state updates are batched and re-renders are scheduled asynchronously. Two rapid taps (common on mobile touch) can both execute against the same `currentCard` reference before React re-renders:

- Tap 1: reviews card-A, queues removal of card-A from front of `sessionQueue`
- Tap 2: reviews card-A AGAIN (same closure), queues removal of card-B from front

Result: card-A gets promoted two boxes; card-B is silently removed from the session without being reviewed.

**Fix:** Guard `handleReview` with a ref-based lock that resets after the queue state settles, or disable the buttons during the flip-back animation.

---

## [ADVISORY] FlipCard rapid clicking produces janky mid-animation flips

**File:** `src/components/flashcards/FlipCard.jsx:18-57` + `FlipCard.module.css:14`

The 420ms CSS transition has no corresponding debounce or animation-lock in React. Rapid clicks toggle `isFlipped` mid-transition, causing the card to visually stutter. No data corruption, but it feels broken on touch devices.

---

## [ADVISORY] No scroll-to-top on route navigation

**Files:** `src/app/routes.jsx`, `src/main.jsx`

React Router v6 with `HashRouter` does not auto-scroll to top on navigation. After scrolling down a long lesson and tapping "Study" in the bottom nav, the user lands mid-page in the study view. Standard fix is a `<ScrollRestoration />` component or a `useEffect` that scrolls to top on `location` change.

---

## [ADVISORY] QuickReferencePage has no guard against invalid card IDs

**File:** `src/pages/QuickReferencePage.jsx:6-7`

`renderCardList` maps IDs to `cardsById[cardId]` with no null check. If `quickReference.js` ever references a card ID that doesn't exist in `cards.js`, the JSX crashes on `card.id` / `card.back.titleEn`. All current IDs are valid, but there's no runtime guard and no compile-time check. A single typo in `quickReference.js` would crash the entire quick-reference page — the one page most needed under pressure.

---

## [ADVISORY] LessonDetailPage crashes if a related card ID is invalid

**File:** `src/pages/LessonDetailPage.jsx:93-104`

Same pattern: `cardsById[cardId]` is used without a null guard in the related-cards section. If `lessons.js` has a `relatedCardIds` entry that doesn't match `cards.js`, the page crashes. Currently safe, but fragile to data edits.

---

## [ADVISORY] StudyPage `lessonTitles` lookup can crash on bad card data

**File:** `src/pages/StudyPage.jsx:75`

`currentCard.lessonIds.map((lessonId) => lessonsById[lessonId].titleEn)` — if a card references a `lessonId` not in `lessonsById`, this throws `TypeError: Cannot read properties of undefined (reading 'titleEn')`. All current data is valid.

---

## [ADVISORY] iOS PWA missing `apple-mobile-web-app-status-bar-style`

**File:** `index.html`

The page declares `apple-mobile-web-app-capable` but does not set `apple-mobile-web-app-status-bar-style`. On iOS, this defaults to a light status bar. In dark mode, this creates a bright strip at the top of an otherwise dark UI. Adding `<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">` fixes it.

---

## [ADVISORY] FlipCard is a single `<button>` — text selection impossible on mobile

**File:** `src/components/flashcards/FlipCard.jsx:22-57`

The entire card (front and back) is wrapped in a `<button>`. On mobile, this means:
- Users cannot long-press to select/copy Chinese characters for lookup
- The browser treats all touch interactions as potential button activations
- `user-select` is typically suppressed on buttons by browser defaults

For a bilingual study app where users may need to copy unfamiliar characters, this is a usability friction point.

---

## [ADVISORY] FlipCard `min-height: 27rem` may overflow small viewports

**File:** `src/components/flashcards/FlipCard.module.css:3,12`

27rem = ~432px. On an iPhone SE (320x568 logical), the card alone consumes 76% of the viewport height. Combined with the sticky top bar, header section, review controls, and bottom nav, the study view requires significant scrolling. The review buttons end up below the fold.

---

## [ADVISORY] `useMemo` in StudyProvider depends on full `[state]`

**File:** `src/providers/StudyProvider.jsx:169`

The context value is recreated on any state change (study data OR lesson progress). This means every `useStudy()` consumer re-renders when ANY part of the state changes — e.g., marking a lesson section complete re-renders the study page even though it only cares about `cardStates`. For 65 cards and 2 lessons this is negligible, but it creates coupling that would matter at scale.

---

## [ADVISORY] Bullet list uses text content as React key

**File:** `src/components/flashcards/FlipCard.jsx:12`

`key={bullet}` uses the bullet string as the key. If two bullets in the same card have identical text, React would warn and potentially mis-render. No current duplicates exist in the data, but the pattern is fragile.

---

## [ADVISORY] `String.replace('_', ' ')` only replaces the first underscore

**File:** `src/pages/StudyPage.jsx:169`

`category.replace('_', ' ')` uses a string pattern, which only replaces the first match. All current categories (`medical_terms`, `rules_numbers`, `action_items`, `warning_signs`) have exactly one underscore, so this works. A future category with multiple underscores would display incorrectly.
