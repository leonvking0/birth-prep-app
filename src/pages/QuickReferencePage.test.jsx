import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { STORAGE_KEYS } from '../lib/storage.js'
import { LanguageProvider } from '../providers/LanguageProvider.jsx'
import QuickReferencePage from './QuickReferencePage.jsx'

function renderQuickReferencePage(language = 'en') {
  window.localStorage.setItem(
    STORAGE_KEYS.preferences,
    JSON.stringify({ language }),
  )

  return render(
    <LanguageProvider>
      <QuickReferencePage />
    </LanguageProvider>,
  )
}

describe('QuickReferencePage', () => {
  it('renders the emergency rule block before the bag checklist', () => {
    renderQuickReferencePage()

    const emergencyHeading = screen.getByText('Hospital timing first')
    const checklistHeading = screen.getByText('Pack the comfort items before the rush starts.')

    expect(
      Boolean(
        emergencyHeading.compareDocumentPosition(checklistHeading) &
          Node.DOCUMENT_POSITION_FOLLOWING,
      ),
    ).toBe(true)
  })

  it('renders warning signs with their call-to-action guidance', () => {
    renderQuickReferencePage()

    expect(screen.getByText('Go to the hospital immediately.')).toBeTruthy()
    expect(screen.getByText('Call or go in for medical assessment.')).toBeTruthy()
  })
})
