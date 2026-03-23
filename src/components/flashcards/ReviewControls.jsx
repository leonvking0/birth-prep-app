import { LEITNER_INTERVALS } from '../../lib/spacedRepetition.js'
import { useLanguage } from '../../providers/LanguageProvider.jsx'

function formatNextStep(box, t) {
  const nextBox = Math.min(box + 1, 5)
  const interval = LEITNER_INTERVALS[nextBox]

  if (interval === 0) {
    return t('review.againThisSession')
  }

  if (interval === 1) {
    return t('review.oneDay')
  }

  return t('review.days', { days: interval })
}

export default function ReviewControls({
  cardState,
  controlsDisabled = false,
  lessonTitles,
  onAgain,
  onCorrect,
  remainingCount,
}) {
  const { t } = useLanguage()

  return (
    <section className="surface install-banner" data-kind="install">
      <div className="chip-row">
        <span className="pill pill-warning">{t('review.box', { box: cardState.box })}</span>
        <span className="pill pill-accent">
          {t('review.nextOnSuccess', {
            nextStep: formatNextStep(cardState.box, t),
          })}
        </span>
      </div>

      <div className="chip-row">
        {lessonTitles.map((lessonTitle) => (
          <span key={lessonTitle} className="pill pill-brand">
            {lessonTitle}
          </span>
        ))}
        <span className="pill pill-success">{t('review.remaining', { count: remainingCount })}</span>
      </div>

      <div className="chip-row">
        <button
          className="button-secondary"
          disabled={controlsDisabled}
          onClick={onAgain}
          type="button"
        >
          {t('review.again')}
        </button>
        <button
          className="button-primary"
          disabled={controlsDisabled}
          onClick={onCorrect}
          type="button"
        >
          {t('review.gotIt')}
        </button>
      </div>

      <p className="subtle">{t('review.resetHint')}</p>
    </section>
  )
}
