import { LEITNER_INTERVALS } from '../../lib/spacedRepetition.js'

function formatNextStep(box) {
  const nextBox = Math.min(box + 1, 5)
  const interval = LEITNER_INTERVALS[nextBox]

  if (interval === 0) {
    return 'Again this session'
  }

  if (interval === 1) {
    return '1 day'
  }

  return `${interval} days`
}

export default function ReviewControls({
  cardState,
  controlsDisabled = false,
  lessonTitles,
  onAgain,
  onCorrect,
  remainingCount,
}) {
  return (
    <section className="surface install-banner" data-kind="install">
      <div className="chip-row">
        <span className="pill pill-warning">Box {cardState.box}</span>
        <span className="pill pill-accent">Next on success: {formatNextStep(cardState.box)}</span>
      </div>

      <div className="chip-row">
        {lessonTitles.map((lessonTitle) => (
          <span key={lessonTitle} className="pill pill-brand">
            {lessonTitle}
          </span>
        ))}
        <span className="pill pill-success">{remainingCount} left in session</span>
      </div>

      <div className="chip-row">
        <button
          className="button-secondary"
          disabled={controlsDisabled}
          onClick={onAgain}
          type="button"
        >
          Again
        </button>
        <button
          className="button-primary"
          disabled={controlsDisabled}
          onClick={onCorrect}
          type="button"
        >
          Got it
        </button>
      </div>

      <p className="subtle">
        Resetting sends the card back to Box 1 and brings it back later in the same session.
      </p>
    </section>
  )
}
