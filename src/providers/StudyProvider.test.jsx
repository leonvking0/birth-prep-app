import { act, renderHook } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { StudyProvider, useStudy } from './StudyProvider.jsx'

function wrapper({ children }) {
  return <StudyProvider>{children}</StudyProvider>
}

describe('StudyProvider', () => {
  it('keeps lesson action callbacks stable across state updates', () => {
    const { result } = renderHook(() => useStudy(), { wrapper })
    const initialMarkLessonOpened = result.current.markLessonOpened
    const initialMarkSectionCompleted = result.current.markSectionCompleted

    act(() => {
      result.current.markLessonOpened('lesson-01', new Date('2026-03-22T13:00:00.000Z'))
    })

    expect(result.current.markLessonOpened).toBe(initialMarkLessonOpened)
    expect(result.current.markSectionCompleted).toBe(initialMarkSectionCompleted)
  })

  it('does not rewrite the lesson open timestamp more than once per day', () => {
    const { result } = renderHook(() => useStudy(), { wrapper })

    act(() => {
      result.current.markLessonOpened('lesson-01', new Date('2026-03-22T13:00:00.000Z'))
    })

    const firstOpenedAt = result.current.getLessonProgress('lesson-01').lastOpenedAt

    act(() => {
      result.current.markLessonOpened('lesson-01', new Date('2026-03-22T21:00:00.000Z'))
    })

    expect(result.current.getLessonProgress('lesson-01').lastOpenedAt).toBe(firstOpenedAt)
  })
})
