# Refined Scope — i18n (Chinese/English Toggle)

**Status:** skipped (clear requirements, single implementation path)

## Objective

Add language switching (中文/English) to the Birth Prep Study App. Toggle button sits next to the theme toggle (top-right fixed position). All UI text, lesson content, and flip cards already have bilingual data — this wires it up to a user-selectable language preference.

## Recommended MVP

### Core Changes
1. **Language Toggle** — Fixed button next to theme toggle (top-right). Shows "中" or "EN". Cycles between zh/en.
2. **Language Context/Provider** — Similar pattern to ThemeProvider. Persists choice in localStorage (`birth-prep:v1:preferences.language`).
3. **UI Strings** — Extract all hardcoded English UI text into a translations object. Keys: navigation labels, button text, headings, empty states, etc.
4. **Lesson Display** — Show lesson titleZh or titleEn based on language. Section names switch too.
5. **Flip Cards** — Front shows question in selected language. Back shows bilingual (always both, for learning).
6. **Quick Reference** — All section headers and action text in selected language.

### What Does NOT Change
- Flip card back always shows BOTH languages (that's the learning value)
- The raw markdown lesson content stays as-is (it's already bilingual inline)
- Spaced repetition logic unchanged
- PWA/service worker unchanged

### Technical Approach
- `src/providers/LanguageProvider.jsx` — context + provider, stores 'zh' | 'en'
- `src/lib/i18n.js` — translation strings object `{ en: {...}, zh: {...} }`
- `useLanguage()` hook returns `{ language, setLanguage, toggleLanguage, t(key) }`
- Components use `t('nav.home')` for UI strings
- Data components use `language === 'zh' ? titleZh : titleEn` pattern

### Files to Modify
- `src/providers/LanguageProvider.jsx` — NEW
- `src/lib/i18n.js` — NEW (all UI strings)
- `src/lib/storage.js` — add language to preferences schema
- `src/main.jsx` — wrap with LanguageProvider
- `src/components/layout/AppShell.jsx` — add language toggle next to theme toggle
- `src/components/layout/AppShell.module.css` — style for dual toggles
- `src/components/navigation/BottomNav.jsx` — localized labels
- `src/pages/HomePage.jsx` — localized text
- `src/pages/LessonsPage.jsx` — lesson titles by language
- `src/pages/LessonDetailPage.jsx` — section names, headings by language
- `src/pages/StudyPage.jsx` — localized UI, card front by language
- `src/pages/QuickReferencePage.jsx` — localized headers and actions
- `src/components/flashcards/FlipCard.jsx` — front text uses selected language
- `src/components/flashcards/ReviewControls.jsx` — button labels
- `src/components/lesson/SectionJumpNav.jsx` — section names by language
- `src/components/pwa/InstallBanner.jsx` — localized text

### Default Language
- Default: 'zh' (primary user is Chinese-speaking)
- Persisted in localStorage

## Non-Goals
- No auto-detection from browser locale (just toggle)
- No third-party i18n library (overkill for 2 languages)
- No separate markdown files per language (content is already bilingual inline)
