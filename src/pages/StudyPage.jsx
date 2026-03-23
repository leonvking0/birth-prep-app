import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import FlipCard from '../components/flashcards/FlipCard.jsx'
import ReviewControls from '../components/flashcards/ReviewControls.jsx'
import { CARD_CATEGORIES, CATEGORY_META, cardsById } from '../data/cards.js'
import { lessonsById } from '../data/lessons.js'
import {
  createInitialCardState,
  insertCardWithDelay,
} from '../lib/spacedRepetition.js'
import { useLanguage } from '../providers/LanguageProvider.jsx'
import { useStudy } from '../providers/StudyProvider.jsx'
import styles from './StudyPage.module.css'

const REVIEW_LOCK_MS = 420

function sanitizeLessonFilter(value) {
  return value && lessonsById[value] ? value : 'all'
}

function sanitizeCategoryFilter(value) {
  return CARD_CATEGORIES.includes(value) ? value : 'all'
}

function reorderWithFocus(cardIds, focusId) {
  if (!focusId || !cardIds.includes(focusId)) {
    return cardIds
  }

  return [focusId, ...cardIds.filter((cardId) => cardId !== focusId)]
}

export default function StudyPage() {
  const { language, t } = useLanguage()
  const {
    cardStates,
    getDueCards,
    lessons,
    reviewCard,
  } = useStudy()
  const [searchParams, setSearchParams] = useSearchParams()
  const [isFlipped, setIsFlipped] = useState(false)
  const [isReviewLocked, setIsReviewLocked] = useState(false)
  const lessonFilter = sanitizeLessonFilter(searchParams.get('lesson'))
  const categoryFilter = sanitizeCategoryFilter(searchParams.get('category'))
  const focusId = searchParams.get('focus')
  const filterKey = `${lessonFilter}:${categoryFilter}:${focusId ?? ''}`

  const buildQueue = useCallback(() => {
    const dueCardIds = getDueCards({
      lessonId: lessonFilter,
      category: categoryFilter,
    }).map((card) => card.id)

    return reorderWithFocus(dueCardIds, focusId)
  }, [categoryFilter, focusId, getDueCards, lessonFilter])

  const [sessionQueue, setSessionQueue] = useState(() => buildQueue())
  const previousFilterKeyRef = useRef(filterKey)
  const reviewLockRef = useRef(false)
  const reviewUnlockTimeoutRef = useRef(null)

  const clearReviewUnlockTimeout = useCallback(() => {
    if (reviewUnlockTimeoutRef.current !== null) {
      window.clearTimeout(reviewUnlockTimeoutRef.current)
      reviewUnlockTimeoutRef.current = null
    }
  }, [])

  const lockReviewControls = useCallback(() => {
    reviewLockRef.current = true
    setIsReviewLocked(true)
    clearReviewUnlockTimeout()
    reviewUnlockTimeoutRef.current = window.setTimeout(() => {
      reviewLockRef.current = false
      setIsReviewLocked(false)
      reviewUnlockTimeoutRef.current = null
    }, REVIEW_LOCK_MS)
  }, [clearReviewUnlockTimeout])

  useEffect(() => {
    if (previousFilterKeyRef.current !== filterKey) {
      previousFilterKeyRef.current = filterKey
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSessionQueue(buildQueue())
      setIsFlipped(false)
    }
  }, [buildQueue, filterKey])

  useEffect(
    () => () => {
      clearReviewUnlockTimeout()
    },
    [clearReviewUnlockTimeout],
  )

  const currentCard = sessionQueue.length ? cardsById[sessionQueue[0]] : null
  const currentCardState = currentCard
    ? cardStates[currentCard.id] ?? createInitialCardState()
    : createInitialCardState()

  const lessonTitles = useMemo(() => {
    if (!currentCard) {
      return []
    }

    return currentCard.lessonIds
      .map((lessonId) =>
        language === 'zh' ? lessonsById[lessonId]?.titleZh : lessonsById[lessonId]?.titleEn,
      )
      .filter(Boolean)
  }, [currentCard, language])

  const totalMatchingDueCards = getDueCards({
    lessonId: lessonFilter,
    category: categoryFilter,
  }).length

  const handleReview = (outcome) => {
    if (!currentCard || reviewLockRef.current) {
      return
    }

    lockReviewControls()
    reviewCard(currentCard.id, outcome)
    setIsFlipped(false)

    setSessionQueue((previousQueue) => {
      const [, ...remainingQueue] = previousQueue

      if (outcome === 'again') {
        return insertCardWithDelay(remainingQueue, currentCard.id)
      }

      return remainingQueue
    })
  }

  const updateSearch = (nextValues) => {
    const nextSearchParams = new URLSearchParams(searchParams)

    Object.entries(nextValues).forEach(([key, value]) => {
      if (!value || value === 'all') {
        nextSearchParams.delete(key)
        return
      }

      nextSearchParams.set(key, value)
    })

    if (!nextValues.focus) {
      nextSearchParams.delete('focus')
    }

    setSearchParams(nextSearchParams)
  }

  return (
    <div className="page">
      <section className={`${styles.header} surface`}>
        <div className="page-heading">
          <span className="eyebrow">{t('study.eyebrow')}</span>
          <h2>{t('study.title')}</h2>
          <p className="page-subtitle">{t('study.subtitle')}</p>
        </div>

        <div className={styles.filters}>
          <div className="chip-row">
            <button
              type="button"
              className={lessonFilter === 'all' ? 'button-primary' : 'button-secondary'}
              onClick={() => updateSearch({ lesson: 'all', focus: null })}
            >
              {t('study.allLessons')}
            </button>
            {lessons.map((lesson) => (
              <button
                key={lesson.id}
                type="button"
                className={lessonFilter === lesson.id ? 'button-primary' : 'button-secondary'}
                onClick={() => updateSearch({ lesson: lesson.id, focus: null })}
              >
                {language === 'zh' ? lesson.titleZh : lesson.titleEn}
              </button>
            ))}
          </div>

          <div className="chip-row">
            <button
              type="button"
              className={categoryFilter === 'all' ? 'button-primary' : 'button-secondary'}
              onClick={() => updateSearch({ category: 'all', focus: null })}
            >
              {t('study.allCategories')}
            </button>
            {CARD_CATEGORIES.map((category) => (
              <button
                key={category}
                type="button"
                className={categoryFilter === category ? 'button-primary' : 'button-secondary'}
                onClick={() => updateSearch({ category, focus: null })}
              >
                {language === 'zh' ? CATEGORY_META[category].labelZh : CATEGORY_META[category].labelEn}
              </button>
            ))}
          </div>
        </div>
      </section>

      {currentCard ? (
        <>
          <FlipCard card={currentCard} isFlipped={isFlipped} onFlip={() => setIsFlipped((value) => !value)} />
          <ReviewControls
            cardState={currentCardState}
            controlsDisabled={isReviewLocked}
            lessonTitles={lessonTitles}
            onAgain={() => handleReview('again')}
            onCorrect={() => handleReview('correct')}
            remainingCount={sessionQueue.length}
          />
        </>
      ) : (
        <section className="surface empty-state">
          <h2>{t('study.emptyTitle')}</h2>
          <p className="subtle">
            {totalMatchingDueCards === 0
              ? t('study.emptyClear')
              : t('study.emptyFilters')}
          </p>
          <div className="chip-row">
            <Link className="button-primary" to="/lessons">
              {t('study.browseLessons')}
            </Link>
            <Link className="button-secondary" to="/quick-reference">
              {t('study.openQuickReference')}
            </Link>
          </div>
        </section>
      )}
    </div>
  )
}
