import { describe, expect, it } from 'vitest'
import {
  createInitialCardState,
  getCategoryMastery,
  getDueCards,
  isCardDue,
  reviewCard,
} from './spacedRepetition.js'

describe('spaced repetition helpers', () => {
  it('promotes cards and schedules the next review interval after a correct answer', () => {
    const now = new Date('2026-03-22T12:00:00.000Z')
    const nextState = reviewCard(createInitialCardState(), 'correct', now)

    expect(nextState.box).toBe(2)
    expect(nextState.correctCount).toBe(1)
    expect(nextState.lastOutcome).toBe('correct')
    expect(nextState.nextReviewAt).toBe('2026-03-23T12:00:00.000Z')
    expect(isCardDue(nextState, now)).toBe(false)
  })

  it('resets cards to box 1 and makes them due immediately after an Again review', () => {
    const now = new Date('2026-03-22T12:00:00.000Z')
    const existingState = {
      box: 4,
      lastReviewedAt: '2026-03-20T12:00:00.000Z',
      nextReviewAt: '2026-03-29T12:00:00.000Z',
      correctCount: 3,
      incorrectCount: 0,
      lapses: 0,
      lastOutcome: 'correct',
    }

    const nextState = reviewCard(existingState, 'again', now)

    expect(nextState.box).toBe(1)
    expect(nextState.incorrectCount).toBe(1)
    expect(nextState.lapses).toBe(1)
    expect(nextState.nextReviewAt).toBe('2026-03-22T12:00:00.000Z')
    expect(isCardDue(nextState, now)).toBe(true)
  })

  it('sorts due cards with reviewed overdue cards first, then low boxes, then warning cards, then untouched cards', () => {
    const cards = [
      { id: 'new-regular', category: 'medical_terms', lessonIds: ['lesson-01'] },
      { id: 'reviewed-low-box', category: 'medical_terms', lessonIds: ['lesson-01'] },
      { id: 'warning-untouched', category: 'warning_signs', lessonIds: ['lesson-01'] },
      { id: 'reviewed-high-box', category: 'medical_terms', lessonIds: ['lesson-01'] },
    ]
    const cardStates = {
      'reviewed-low-box': {
        box: 2,
        lastReviewedAt: '2026-03-19T09:00:00.000Z',
        nextReviewAt: '2026-03-20T09:00:00.000Z',
        correctCount: 1,
        incorrectCount: 0,
        lapses: 0,
        lastOutcome: 'correct',
      },
      'reviewed-high-box': {
        box: 4,
        lastReviewedAt: '2026-03-12T09:00:00.000Z',
        nextReviewAt: '2026-03-19T09:00:00.000Z',
        correctCount: 3,
        incorrectCount: 0,
        lapses: 0,
        lastOutcome: 'correct',
      },
    }

    const dueCards = getDueCards(cards, cardStates, {}, new Date('2026-03-22T12:00:00.000Z'))

    expect(dueCards.map((card) => card.id)).toEqual([
      'reviewed-low-box',
      'reviewed-high-box',
      'warning-untouched',
      'new-regular',
    ])
  })

  it('derives category mastery from cards in boxes 4 and 5', () => {
    const cards = [
      { id: 'a', category: 'medical_terms' },
      { id: 'b', category: 'medical_terms' },
      { id: 'c', category: 'warning_signs' },
    ]
    const cardStates = {
      a: { ...createInitialCardState(), box: 4 },
      b: { ...createInitialCardState(), box: 2 },
      c: { ...createInitialCardState(), box: 5 },
    }

    const mastery = getCategoryMastery(cards, cardStates)

    expect(mastery.medical_terms.mastered).toBe(1)
    expect(mastery.medical_terms.total).toBe(2)
    expect(mastery.warning_signs.percentage).toBe(1)
  })
})
