export const STORAGE_KEYS = {
  preferences: 'birth-prep:v1:preferences',
  study: 'birth-prep:v1:study',
  lessonProgress: 'birth-prep:v1:lesson-progress',
}

export const STUDY_SCHEMA_VERSION = 1

const VALID_THEMES = new Set(['light', 'dark', 'system'])
const VALID_OUTCOMES = new Set(['correct', 'again'])

function getStorage() {
  if (typeof window === 'undefined') {
    return null
  }

  try {
    return window.localStorage
  } catch {
    return null
  }
}

function readJson(key) {
  const storage = getStorage()

  if (!storage) {
    return null
  }

  try {
    const rawValue = storage.getItem(key)
    return rawValue ? JSON.parse(rawValue) : null
  } catch {
    return null
  }
}

function writeJson(key, value) {
  const storage = getStorage()

  if (!storage) {
    return false
  }

  try {
    storage.setItem(key, JSON.stringify(value))
    return true
  } catch {
    return false
  }
}

function removeKey(key) {
  const storage = getStorage()

  if (!storage) {
    return false
  }

  try {
    storage.removeItem(key)
    return true
  } catch {
    return false
  }
}

function asIsoDate(value) {
  if (typeof value !== 'string') {
    return null
  }

  return Number.isNaN(Date.parse(value)) ? null : value
}

function asNonNegativeInteger(value) {
  if (!Number.isInteger(value) || value < 0) {
    return 0
  }

  return value
}

function normalizeCardState(cardState) {
  if (!cardState || typeof cardState !== 'object') {
    return null
  }

  const box =
    Number.isInteger(cardState.box) && cardState.box >= 1 && cardState.box <= 5
      ? cardState.box
      : 1

  return {
    box,
    lastReviewedAt: asIsoDate(cardState.lastReviewedAt),
    nextReviewAt: asIsoDate(cardState.nextReviewAt),
    correctCount: asNonNegativeInteger(cardState.correctCount),
    incorrectCount: asNonNegativeInteger(cardState.incorrectCount),
    lapses: asNonNegativeInteger(cardState.lapses),
    lastOutcome: VALID_OUTCOMES.has(cardState.lastOutcome) ? cardState.lastOutcome : null,
  }
}

export function getDefaultPreferences() {
  return {
    theme: 'system',
    lastRoute: '/',
    installPromptDismissedAt: null,
  }
}

export function normalizePreferences(preferences) {
  if (!preferences || typeof preferences !== 'object') {
    return getDefaultPreferences()
  }

  return {
    theme: VALID_THEMES.has(preferences.theme) ? preferences.theme : 'system',
    lastRoute: typeof preferences.lastRoute === 'string' ? preferences.lastRoute : '/',
    installPromptDismissedAt: asIsoDate(preferences.installPromptDismissedAt),
  }
}

export function loadPreferences() {
  return normalizePreferences(readJson(STORAGE_KEYS.preferences))
}

export function savePreferences(preferences) {
  return writeJson(STORAGE_KEYS.preferences, normalizePreferences(preferences))
}

export function updatePreferences(partialPreferences) {
  const nextPreferences = {
    ...loadPreferences(),
    ...(partialPreferences ?? {}),
  }

  return savePreferences(nextPreferences)
}

export function getDefaultStudyData() {
  return {
    version: STUDY_SCHEMA_VERSION,
    updatedAt: null,
    cardStates: {},
    sessionStats: {
      totalReviews: 0,
      totalCorrect: 0,
      totalIncorrect: 0,
    },
  }
}

export function normalizeStudyData(studyData) {
  if (!studyData || typeof studyData !== 'object') {
    return getDefaultStudyData()
  }

  if (studyData.version !== STUDY_SCHEMA_VERSION) {
    return getDefaultStudyData()
  }

  const cardStates = Object.entries(studyData.cardStates ?? {}).reduce(
    (nextCardStates, [cardId, cardState]) => {
      const normalizedCardState = normalizeCardState(cardState)

      if (normalizedCardState) {
        nextCardStates[cardId] = normalizedCardState
      }

      return nextCardStates
    },
    {},
  )

  return {
    version: STUDY_SCHEMA_VERSION,
    updatedAt: asIsoDate(studyData.updatedAt),
    cardStates,
    sessionStats: {
      totalReviews: asNonNegativeInteger(studyData.sessionStats?.totalReviews),
      totalCorrect: asNonNegativeInteger(studyData.sessionStats?.totalCorrect),
      totalIncorrect: asNonNegativeInteger(studyData.sessionStats?.totalIncorrect),
    },
  }
}

export function loadStudyData() {
  return normalizeStudyData(readJson(STORAGE_KEYS.study))
}

export function saveStudyData(studyData) {
  return writeJson(STORAGE_KEYS.study, normalizeStudyData(studyData))
}

function normalizeCompletedSectionIds(sectionIds) {
  if (!Array.isArray(sectionIds)) {
    return []
  }

  return [...new Set(sectionIds.filter((sectionId) => typeof sectionId === 'string'))]
}

export function getDefaultLessonProgress(lessonIds = []) {
  return Object.fromEntries(
    lessonIds.map((lessonId) => [
      lessonId,
      {
        lastOpenedAt: null,
        completedSectionIds: [],
      },
    ]),
  )
}

export function normalizeLessonProgress(lessonProgress, lessonIds = []) {
  const defaults = getDefaultLessonProgress(lessonIds)

  if (!lessonProgress || typeof lessonProgress !== 'object') {
    return defaults
  }

  return Object.keys(defaults).reduce((nextProgress, lessonId) => {
    const current = lessonProgress[lessonId]
    nextProgress[lessonId] = {
      lastOpenedAt: asIsoDate(current?.lastOpenedAt),
      completedSectionIds: normalizeCompletedSectionIds(current?.completedSectionIds),
    }
    return nextProgress
  }, {})
}

export function loadLessonProgress(lessonIds = []) {
  return normalizeLessonProgress(readJson(STORAGE_KEYS.lessonProgress), lessonIds)
}

export function saveLessonProgress(lessonProgress, lessonIds = Object.keys(lessonProgress ?? {})) {
  return writeJson(
    STORAGE_KEYS.lessonProgress,
    normalizeLessonProgress(lessonProgress, lessonIds),
  )
}

export function resetAllStorage() {
  removeKey(STORAGE_KEYS.preferences)
  removeKey(STORAGE_KEYS.study)
  removeKey(STORAGE_KEYS.lessonProgress)
}
