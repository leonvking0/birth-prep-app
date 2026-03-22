# Refined Scope — Birth Prep Study App

**Status:** skipped (narrow scope, clear requirements, single implementation path)
**Reason:** Feature task with well-defined input (2 lesson markdown files) and clear output (mobile-first study webapp with flip cards)

## Objective

Build a mobile-first study/review webapp for prenatal class content. The primary user is an expecting father who needs to quickly learn and retain medical terminology and key procedures to communicate effectively with healthcare providers during labor and delivery.

## Recommended MVP

### Core Features
1. **Lesson Browser** — Display the 2 lessons in readable, well-structured format with section navigation
2. **Flip Cards** — Interactive flip cards for:
   - Medical terms (English + Chinese): Pitocin, Epidural, Misoprostol, Cervidil, Meconium, GBS, ECV, Foley catheter, etc.
   - Key rules: 5-1-1 rule, when to go to hospital, questioning template for medical procedures
   - Partner actions: counter pressure technique, breathing guidance ("House" technique), position changes
3. **Spaced Repetition** — Track which cards the user knows vs. needs review, prioritize weak cards
4. **Progress Tracking** — Show mastery percentage per category
5. **Quick Reference** — Emergency cheat sheet (5-1-1 rule, warning signs, hospital bag checklist)

### Technical Requirements
- **Mobile-first** responsive design (primary use case: studying on phone)
- **Single-page app** — React + Vite (already scaffolded)
- **No backend** — All data in local storage, all content compiled in
- **Bilingual** — Terms shown in both English and Chinese (content is already bilingual)
- **PWA** — Installable on phone home screen for quick access
- **Dark mode** support (late-night studying)

### Content Structure
- Source: 2 markdown lesson files in `src/data/`
- Lesson 01: When to go to hospital, prep checklist, triage, medical interventions (epidural, pitocin)
- Lesson 02: Communication strategies, fetal monitoring, IV, induction, augmentation, instruments, partner tips

### Flip Card Categories
1. **Medical Terms** (术语) — Pitocin, Epidural, Misoprostol, Cervidil, Meconium, GBS, ECV, Foley, Telemetry, Galactagogues, Blood Patch, Crash C-section, Augmentation, SGA
2. **Rules & Numbers** (规则) — 5-1-1 rule, 3-4cm admission, 37 weeks term, 50% c-section risk from early epidural, 18-24 month c-section spacing, 90% forceps success rate
3. **Action Items** (行动) — Counter pressure technique, "House" breathing, questioning template (BRAIN), when to demand wireless monitoring, position changes
4. **Warning Signs** (警示) — Headache, swelling, vision spots, foot itching, fever, abnormal amniotic fluid color/smell

## Alternative Approaches
- Could use Anki export instead of custom app → rejected, want integrated lesson browser + mobile UX
- Could use Next.js → overkill for static content, Vite+React is lighter

## Non-Goals
- No user accounts or cloud sync (MVP)
- No audio/video content
- No quiz/test mode beyond flip cards (MVP)
- No content editing UI

## Hidden Complexity
- Extracting structured flip card data from free-form markdown
- Bilingual term matching (some terms appear in Chinese context only)
- Spaced repetition algorithm (use simple SM-2 or Leitner box)

## Open Questions
- None — scope is clear
