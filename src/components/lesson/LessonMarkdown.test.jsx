import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { lessonsById } from '../../data/lessons.js'
import LessonMarkdown from './LessonMarkdown.jsx'

describe('LessonMarkdown', () => {
  it('maps Chinese section headings to the same section ids', () => {
    render(<LessonMarkdown lesson={lessonsById['lesson-01']} />)

    expect(
      screen.getByRole('heading', { name: /^一、\s*何时前往医院/ }).getAttribute('id'),
    ).toBe('hospital-timing')
  })

  it('maps English section headings to the same section ids', () => {
    render(<LessonMarkdown language="en" lesson={lessonsById['lesson-01']} />)

    expect(screen.getByRole('heading', { name: 'I. When to Go' }).getAttribute('id')).toBe(
      'hospital-timing',
    )
    expect(screen.getByText(/No speech rule/i)).toBeTruthy()
  })
})
