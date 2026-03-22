import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, useNavigate } from 'react-router-dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import ScrollToTop from './ScrollToTop.jsx'

function ScrollHarness() {
  const navigate = useNavigate()

  return (
    <>
      <ScrollToTop />
      <button onClick={() => navigate('/study')} type="button">
        Go to study
      </button>
    </>
  )
}

describe('ScrollToTop', () => {
  beforeEach(() => {
    window.scrollTo = vi.fn()
  })

  it('scrolls the window to the top when the pathname changes', async () => {
    const user = userEvent.setup()

    render(
      <MemoryRouter initialEntries={['/lessons']}>
        <ScrollHarness />
      </MemoryRouter>,
    )

    expect(window.scrollTo).toHaveBeenCalledWith(0, 0)

    await user.click(screen.getByRole('button', { name: /go to study/i }))

    expect(window.scrollTo).toHaveBeenCalledTimes(2)
    expect(window.scrollTo).toHaveBeenLastCalledWith(0, 0)
  })
})
