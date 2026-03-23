import { CATEGORY_META } from '../../data/cards.js'
import { useLanguage } from '../../providers/LanguageProvider.jsx'
import styles from './FlipCard.module.css'

export default function FlipCard({ card, isFlipped, onFlip }) {
  const { language, t } = useLanguage()
  const categoryMeta = CATEGORY_META[card.category]
  const selectedPrompt = card.front[language] ?? card.front.zh
  const categoryLabel = language === 'zh' ? categoryMeta.labelZh : categoryMeta.labelEn

  // Pick the best summary/bullets/context for the selected language, with fallback
  const summary = (language === 'zh' ? card.back.summaryZh : card.back.summaryEn) ?? card.back.summary
  const bullets = (language === 'zh' ? card.back.bulletsZh : card.back.bulletsEn) ?? card.back.bullets ?? []
  const context = (language === 'zh' ? card.back.contextZh : card.back.contextEn) ?? card.back.context

  return (
    <button
      className={styles.card}
      type="button"
      onClick={onFlip}
      aria-label={t('card.flipAria', { title: card.back.titleEn })}
    >
      <div
        className={`${styles.inner} ${isFlipped ? styles.isFlipped : ''}`}
        data-category={card.category}
      >
        {/* FRONT */}
        <section className={`${styles.face} ${styles.front}`}>
          <div className={styles.header}>
            <span className="pill pill-accent">{categoryLabel}</span>
            {card.quickRef ? <span className="pill pill-warning">{t('card.quickRef')}</span> : null}
          </div>
          <div className={styles.body}>
            <p className={styles.prompt}>{selectedPrompt}</p>
          </div>
          <span className={styles.footerHint}>{t('card.reveal')}</span>
        </section>

        {/* BACK — clean bilingual display */}
        <section className={`${styles.face} ${styles.back}`}>
          <div className={styles.header}>
            <span className="pill pill-brand">{card.back.titleZh}</span>
            <span className="pill pill-accent">{card.back.titleEn}</span>
          </div>
          <div className={styles.body}>
            {summary ? <p className={styles.summary}>{summary}</p> : null}
            {bullets.length > 0 ? (
              <ul className={styles.bulletList}>
                {bullets.map((b) => <li key={b}>{b}</li>)}
              </ul>
            ) : null}
            {context ? <p className={styles.context}>{context}</p> : null}
          </div>
          <span className={styles.footerHint}>{t('card.hide')}</span>
        </section>
      </div>
    </button>
  )
}
