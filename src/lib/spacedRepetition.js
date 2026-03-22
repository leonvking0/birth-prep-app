export const LEITNER_INTERVALS = {
  1: 0,
  2: 1,
  3: 3,
  4: 7,
  5: 14,
}

export const MAX_LEITNER_BOX = 5
export const MASTERED_BOX = 4

const VALID_OUTCOMES = new Set(['correct', 'again'])

function toDate(value) {
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return value
  }

  const candidate = new Date(value)
  return Number.isNaN(candidate.getTime()) ? new Date() : candidate
}

function toTimestamp(value) {
  if (!value) {
    return null
  }

  const parsed = Date.parse(value)
  return Number.isNaN(parsed) ? null : parsed
}

function addDays(now, intervalDays) {
  const next = new Date(now)
  next.setUTCDate(next.getUTCDate() + intervalDays)
  return next.toISOString()
}

function normalizeBox(box) {
  if (Number.isInteger(box) && box >= 1 && box <= MAX_LEITNER_BOX) {
    return box
  }

  return 1
}

export function createInitialCardState() {
  return {
    box: 1,
    lastReviewedAt: null,
    nextReviewAt: null,
    correctCount: 0,
    incorrectCount: 0,
    lapses: 0,
    lastOutcome: null,
  }
}

export function reviewCard(cardState = createInitialCardState(), outcome, now = new Date()) {
  if (!VALID_OUTCOMES.has(outcome)) {
    throw new Error(`Unsupported review outcome: ${outcome}`)
  }

  const reviewTime = toDate(now)
  const safeCardState = { ...createInitialCardState(), ...cardState }

  if (outcome === 'again') {
    return {
      ...safeCardState,
      box: 1,
      lastReviewedAt: reviewTime.toISOString(),
      nextReviewAt: reviewTime.toISOString(),
      incorrectCount: safeCardState.incorrectCount + 1,
      lapses: safeCardState.lapses + 1,
      lastOutcome: 'again',
    }
  }

  const nextBox = Math.min(normalizeBox(safeCardState.box) + 1, MAX_LEITNER_BOX)

  return {
    ...safeCardState,
    box: nextBox,
    lastReviewedAt: reviewTime.toISOString(),
    nextReviewAt: addDays(reviewTime, LEITNER_INTERVALS[nextBox]),
    correctCount: safeCardState.correctCount + 1,
    lastOutcome: 'correct',
  }
}

export function isCardDue(cardState, now = new Date()) {
  if (!cardState) {
    return true
  }

  const safeCardState = { ...createInitialCardState(), ...cardState }
  const nowTimestamp = toDate(now).getTime()
  const nextReviewTimestamp = toTimestamp(safeCardState.nextReviewAt)

  if (safeCardState.box === 1 && !safeCardState.lastReviewedAt) {
    return true
  }

  if (nextReviewTimestamp === null) {
    return true
  }

  return nextReviewTimestamp <= nowTimestamp
}

function matchesFilters(card, filters) {
  const category = filters?.category ?? 'all'
  const lessonId = filters?.lessonId ?? 'all'

  const matchesCategory = category === 'all' || card.category === category
  const matchesLesson = lessonId === 'all' || card.lessonIds.includes(lessonId)

  return matchesCategory && matchesLesson
}

function compareDueCards(left, right) {
  if (left.isReviewedOverdue !== right.isReviewedOverdue) {
    return left.isReviewedOverdue ? -1 : 1
  }

  if (left.state.box !== right.state.box) {
    return left.state.box - right.state.box
  }

  if (left.card.category === 'warning_signs' && right.card.category !== 'warning_signs') {
    return -1
  }

  if (left.card.category !== 'warning_signs' && right.card.category === 'warning_signs') {
    return 1
  }

  if (left.isUntouched !== right.isUntouched) {
    return left.isUntouched ? 1 : -1
  }

  if (left.nextReviewAt !== right.nextReviewAt) {
    return left.nextReviewAt - right.nextReviewAt
  }

  return left.index - right.index
}

export function getDueCards(cards, cardStates = {}, filters = {}, now = new Date()) {
  if (!Array.isArray(cards)) {
    return []
  }

  const nowTimestamp = toDate(now).getTime()

  return cards
    .filter((card) => matchesFilters(card, filters))
    .map((card, index) => {
      const state = { ...createInitialCardState(), ...(cardStates?.[card.id] ?? {}) }
      const nextReviewAt = toTimestamp(state.nextReviewAt) ?? Number.POSITIVE_INFINITY
      const isUntouched = !state.lastReviewedAt
      const isReviewedOverdue = !isUntouched && nextReviewAt <= nowTimestamp

      return {
        card,
        index,
        state,
        nextReviewAt,
        isUntouched,
        isReviewedOverdue,
      }
    })
    .filter(({ state }) => isCardDue(state, now))
    .sort(compareDueCards)
    .map(({ card }) => card)
}

export function insertCardWithDelay(queueIds, cardId) {
  const safeQueue = Array.isArray(queueIds) ? [...queueIds] : []
  const delay = safeQueue.length >= 3 ? 3 : safeQueue.length
  safeQueue.splice(delay, 0, cardId)
  return safeQueue
}

export function getCategoryMastery(cards, cardStates = {}) {
  if (!Array.isArray(cards)) {
    return {}
  }

  return cards.reduce((mastery, card) => {
    const state = { ...createInitialCardState(), ...(cardStates?.[card.id] ?? {}) }
    const entry = mastery[card.category] ?? {
      category: card.category,
      total: 0,
      mastered: 0,
      percentage: 0,
    }

    entry.total += 1

    if (state.box >= MASTERED_BOX) {
      entry.mastered += 1
    }

    entry.percentage = entry.total === 0 ? 0 : entry.mastered / entry.total
    mastery[card.category] = entry
    return mastery
  }, {})
}
