/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from 'react'
import { cards } from '../data/cards.js'
import { lessons } from '../data/lessons.js'
import {
  createInitialCardState,
  getCategoryMastery,
  getDueCards as getDueCardsForCards,
  reviewCard as reviewCardState,
} from '../lib/spacedRepetition.js'
import {
  getDefaultLessonProgress,
  getDefaultStudyData,
  loadLessonProgress,
  loadStudyData,
  saveLessonProgress,
  saveStudyData,
} from '../lib/storage.js'

const StudyContext = createContext(null)
const LESSON_IDS = lessons.map((lesson) => lesson.id)

function asValidDate(value) {
  const date = value instanceof Date ? value : new Date(value)

  return Number.isNaN(date.getTime()) ? null : date
}

function isSameLocalDay(left, right) {
  const leftDate = asValidDate(left)
  const rightDate = asValidDate(right)

  if (!leftDate || !rightDate) {
    return false
  }

  return (
    leftDate.getFullYear() === rightDate.getFullYear() &&
    leftDate.getMonth() === rightDate.getMonth() &&
    leftDate.getDate() === rightDate.getDate()
  )
}

function loadInitialState() {
  return {
    study: loadStudyData(),
    lessonProgress: loadLessonProgress(LESSON_IDS),
  }
}

function reviewReducer(state, action) {
  switch (action.type) {
    case 'REVIEW_CARD': {
      const currentCardState = state.study.cardStates[action.cardId] ?? createInitialCardState()
      const nextCardState = reviewCardState(currentCardState, action.outcome, action.now)

      return {
        ...state,
        study: {
          ...state.study,
          updatedAt: new Date(action.now).toISOString(),
          cardStates: {
            ...state.study.cardStates,
            [action.cardId]: nextCardState,
          },
          sessionStats: {
            totalReviews: state.study.sessionStats.totalReviews + 1,
            totalCorrect:
              state.study.sessionStats.totalCorrect + (action.outcome === 'correct' ? 1 : 0),
            totalIncorrect:
              state.study.sessionStats.totalIncorrect + (action.outcome === 'again' ? 1 : 0),
          },
        },
      }
    }

    case 'MARK_LESSON_OPENED': {
      const currentProgress =
        state.lessonProgress[action.lessonId] ??
        getDefaultLessonProgress([action.lessonId])[action.lessonId]

      if (isSameLocalDay(currentProgress.lastOpenedAt, action.now)) {
        return state
      }

      return {
        ...state,
        lessonProgress: {
          ...state.lessonProgress,
          [action.lessonId]: {
            ...currentProgress,
            lastOpenedAt: new Date(action.now).toISOString(),
          },
        },
      }
    }

    case 'MARK_SECTION_COMPLETED': {
      const currentProgress =
        state.lessonProgress[action.lessonId] ??
        getDefaultLessonProgress([action.lessonId])[action.lessonId]

      if (currentProgress.completedSectionIds.includes(action.sectionId)) {
        return state
      }

      return {
        ...state,
        lessonProgress: {
          ...state.lessonProgress,
          [action.lessonId]: {
            ...currentProgress,
            completedSectionIds: [...currentProgress.completedSectionIds, action.sectionId],
          },
        },
      }
    }

    case 'RESET_PROGRESS':
      return {
        study: getDefaultStudyData(),
        lessonProgress: getDefaultLessonProgress(LESSON_IDS),
      }

    default:
      return state
  }
}

export function StudyProvider({ children }) {
  const [state, dispatch] = useReducer(reviewReducer, undefined, loadInitialState)
  const cardStates = state.study.cardStates
  const lessonProgress = state.lessonProgress

  useEffect(() => {
    saveStudyData(state.study)
  }, [state.study])

  useEffect(() => {
    saveLessonProgress(state.lessonProgress, LESSON_IDS)
  }, [state.lessonProgress])

  const getDueCards = useCallback(
    (filters = {}, now = new Date()) =>
      getDueCardsForCards(cards, cardStates, filters, now),
    [cardStates],
  )

  const getLessonProgress = useCallback(
    (lessonId) =>
      lessonProgress[lessonId] ??
      getDefaultLessonProgress([lessonId])[lessonId],
    [lessonProgress],
  )

  const reviewCard = useCallback(
    (cardId, outcome, now = new Date()) => {
      dispatch({
        type: 'REVIEW_CARD',
        cardId,
        outcome,
        now,
      })
    },
    [dispatch],
  )

  const markLessonOpened = useCallback(
    (lessonId, now = new Date()) => {
      dispatch({
        type: 'MARK_LESSON_OPENED',
        lessonId,
        now,
      })
    },
    [dispatch],
  )

  const markSectionCompleted = useCallback(
    (lessonId, sectionId) => {
      dispatch({
        type: 'MARK_SECTION_COMPLETED',
        lessonId,
        sectionId,
      })
    },
    [dispatch],
  )

  const resetProgress = useCallback(() => {
    dispatch({ type: 'RESET_PROGRESS' })
  }, [dispatch])

  const categoryMastery = useMemo(
    () => getCategoryMastery(cards, cardStates),
    [cardStates],
  )
  const dueCount = useMemo(() => getDueCards().length, [getDueCards])

  const value = useMemo(() => {
    return {
      cards,
      lessons,
      cardStates,
      lessonProgress,
      sessionStats: state.study.sessionStats,
      studyUpdatedAt: state.study.updatedAt,
      categoryMastery,
      dueCount,
      getDueCards,
      getLessonProgress,
      reviewCard,
      markLessonOpened,
      markSectionCompleted,
      resetProgress,
    }
  }, [
    cardStates,
    lessonProgress,
    state.study.sessionStats,
    state.study.updatedAt,
    categoryMastery,
    dueCount,
    getDueCards,
    getLessonProgress,
    reviewCard,
    markLessonOpened,
    markSectionCompleted,
    resetProgress,
  ])

  return <StudyContext.Provider value={value}>{children}</StudyContext.Provider>
}

export function useStudy() {
  const context = useContext(StudyContext)

  if (!context) {
    throw new Error('useStudy must be used within StudyProvider')
  }

  return context
}
