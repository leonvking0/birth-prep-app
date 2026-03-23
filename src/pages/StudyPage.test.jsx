import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { cards } from '../data/cards.js'
import { STORAGE_KEYS } from '../lib/storage.js'
import { LanguageProvider } from '../providers/LanguageProvider.jsx'
import { StudyProvider } from '../providers/StudyProvider.jsx'
import StudyPage from './StudyPage.jsx'

function waitForReviewUnlock() {
  return new Promise((resolve) => {
    window.setTimeout(resolve, 450)
  })
}

function renderStudyPage(initialEntry = '/study', language = 'en') {
  window.localStorage.setItem(
    STORAGE_KEYS.preferences,
    JSON.stringify({ language }),
  )

  return render(
    <MemoryRouter initialEntries={[initialEntry]}>
      <LanguageProvider>
        <StudyProvider>
          <Routes>
            <Route path="/study" element={<StudyPage />} />
          </Routes>
        </StudyProvider>
      </LanguageProvider>
    </MemoryRouter>,
  )
}

describe('StudyPage', () => {
  it('flips a card to reveal the answer', async () => {
    const user = userEvent.setup()
    renderStudyPage()

    expect(screen.getByText(/Why does "Water Breaks Before 37 Weeks" matter\?/i)).toBeTruthy()

    await user.click(
      screen.getByRole('button', { name: /flip card for Water Breaks Before 37 Weeks/i }),
    )

    expect(screen.getAllByText(/preterm labor warning/i).length).toBeGreaterThan(0)
  })

  it('updates queue progress and localStorage after Got it and Again reviews', async () => {
    const user = userEvent.setup()
    renderStudyPage()

    await user.click(screen.getByRole('button', { name: /got it/i }))

    let storedStudy = JSON.parse(window.localStorage.getItem(STORAGE_KEYS.study))
    expect(storedStudy.cardStates['warning-preterm-water-break'].box).toBe(2)
    expect(storedStudy.sessionStats.totalCorrect).toBe(1)

    await waitForReviewUnlock()
    await user.click(screen.getByRole('button', { name: /again/i }))

    storedStudy = JSON.parse(window.localStorage.getItem(STORAGE_KEYS.study))
    expect(storedStudy.cardStates['warning-bad-fluid-smell'].box).toBe(1)
    expect(storedStudy.cardStates['warning-bad-fluid-smell'].lastOutcome).toBe('again')
    expect(storedStudy.sessionStats.totalIncorrect).toBe(1)

    expect(screen.queryByText(/Why does "Bad-Smelling Amniotic Fluid" matter\?/i)).toBeNull()
  })

  it('ignores a second review tap while controls are locked', async () => {
    const user = userEvent.setup()
    renderStudyPage()

    await user.click(screen.getByRole('button', { name: /got it/i }))
    await user.click(screen.getByRole('button', { name: /got it/i }))

    const storedStudy = JSON.parse(window.localStorage.getItem(STORAGE_KEYS.study))
    expect(storedStudy.sessionStats.totalReviews).toBe(1)
    expect(storedStudy.sessionStats.totalCorrect).toBe(1)
    expect(storedStudy.cardStates['warning-preterm-water-break'].box).toBe(2)
  })

  it('shows the empty state when no cards are due', () => {
    const futureReviewAt = '2026-04-22T12:00:00.000Z'
    const cardStates = Object.fromEntries(
      cards.map((card) => [
        card.id,
        {
          box: 5,
          lastReviewedAt: '2026-03-22T12:00:00.000Z',
          nextReviewAt: futureReviewAt,
          correctCount: 3,
          incorrectCount: 0,
          lapses: 0,
          lastOutcome: 'correct',
        },
      ]),
    )

    window.localStorage.setItem(
      STORAGE_KEYS.study,
      JSON.stringify({
        version: 1,
        updatedAt: '2026-03-22T12:00:00.000Z',
        cardStates,
        sessionStats: {
          totalReviews: 99,
          totalCorrect: 99,
          totalIncorrect: 0,
        },
      }),
    )

    renderStudyPage()

    expect(screen.getByText(/No due cards for this queue/i)).toBeTruthy()
  })
})
