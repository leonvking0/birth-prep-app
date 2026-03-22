import { describe, expect, it } from 'vitest'
import {
  STORAGE_KEYS,
  getDefaultPreferences,
  getDefaultStudyData,
  loadLessonProgress,
  loadPreferences,
  loadStudyData,
  saveLessonProgress,
  savePreferences,
  saveStudyData,
} from './storage.js'

describe('storage helpers', () => {
  it('saves and loads valid preference and study payloads', () => {
    const preferences = {
      theme: 'dark',
      lastRoute: '/study',
      installPromptDismissedAt: null,
    }
    const study = {
      version: 1,
      updatedAt: '2026-03-22T14:00:00.000Z',
      cardStates: {
        sample: {
          box: 3,
          lastReviewedAt: '2026-03-20T14:00:00.000Z',
          nextReviewAt: '2026-03-25T14:00:00.000Z',
          correctCount: 2,
          incorrectCount: 1,
          lapses: 1,
          lastOutcome: 'correct',
        },
      },
      sessionStats: {
        totalReviews: 9,
        totalCorrect: 7,
        totalIncorrect: 2,
      },
    }

    savePreferences(preferences)
    saveStudyData(study)
    saveLessonProgress(
      {
        'lesson-01': {
          lastOpenedAt: '2026-03-22T14:10:00.000Z',
          completedSectionIds: ['hospital-timing'],
        },
      },
      ['lesson-01'],
    )

    expect(loadPreferences()).toEqual(preferences)
    expect(loadStudyData()).toEqual(study)
    expect(loadLessonProgress(['lesson-01'])).toEqual({
      'lesson-01': {
        lastOpenedAt: '2026-03-22T14:10:00.000Z',
        completedSectionIds: ['hospital-timing'],
      },
    })
  })

  it('falls back to defaults when localStorage contains corrupt json', () => {
    window.localStorage.setItem(STORAGE_KEYS.preferences, '{bad json')
    window.localStorage.setItem(STORAGE_KEYS.study, '{still bad json')

    expect(loadPreferences()).toEqual(getDefaultPreferences())
    expect(loadStudyData()).toEqual(getDefaultStudyData())
  })

  it('falls back to defaults when the study schema version does not match', () => {
    window.localStorage.setItem(
      STORAGE_KEYS.study,
      JSON.stringify({
        version: 999,
        cardStates: {
          old: {
            box: 5,
          },
        },
      }),
    )

    expect(loadStudyData()).toEqual(getDefaultStudyData())
  })
})
