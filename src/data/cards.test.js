import { describe, expect, it } from 'vitest'
import { CARD_CATEGORIES, cards } from './cards.js'
import { lessons } from './lessons.js'

const knownLessonIds = new Set(lessons.map((lesson) => lesson.id))

describe('flashcard dataset', () => {
  it('ships the full curated card set with unique ids', () => {
    expect(cards.length).toBeGreaterThanOrEqual(65)

    const ids = cards.map((card) => card.id)
    expect(new Set(ids).size).toBe(cards.length)
  })

  it('includes bilingual front and back text for every card', () => {
    cards.forEach((card) => {
      expect(card.front.zh).toBeTruthy()
      expect(card.front.en).toBeTruthy()
      expect(card.back.titleZh).toBeTruthy()
      expect(card.back.titleEn).toBeTruthy()
      expect(card.back.summary).toBeTruthy()
      expect(card.back.summaryZh).toBeTruthy()
      expect(card.back.summaryEn).toBeTruthy()
      expect(card.back.bulletsZh?.length).toBeGreaterThan(0)
      expect(card.back.bulletsEn?.length).toBeGreaterThan(0)
      expect(card.back.contextZh).toBeTruthy()
      expect(card.back.contextEn).toBeTruthy()
    })
  })

  it('keeps every card in a known category and lesson set', () => {
    cards.forEach((card) => {
      expect(CARD_CATEGORIES).toContain(card.category)
      expect(card.lessonIds.length).toBeGreaterThan(0)
      card.lessonIds.forEach((lessonId) => {
        expect(knownLessonIds.has(lessonId)).toBe(true)
      })
    })
  })
})
