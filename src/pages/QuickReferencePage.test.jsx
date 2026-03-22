import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import QuickReferencePage from './QuickReferencePage.jsx'

describe('QuickReferencePage', () => {
  it('renders the emergency rule block before the bag checklist', () => {
    render(<QuickReferencePage />)

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
    render(<QuickReferencePage />)

    expect(screen.getByText('Go to the hospital immediately.')).toBeTruthy()
    expect(screen.getByText('Call or go in for medical assessment.')).toBeTruthy()
  })
})
