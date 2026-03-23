import { CATEGORY_META } from '../../data/cards.js'
import { useLanguage } from '../../providers/LanguageProvider.jsx'
import styles from './FlipCard.module.css'

function renderBullets(bullets) {
  if (!Array.isArray(bullets) || bullets.length === 0) {
    return null
  }

  return (
    <ul className={styles.bulletList}>
      {bullets.map((bullet) => (
        <li key={bullet}>{bullet}</li>
      ))}
    </ul>
  )
}

export default function FlipCard({ card, isFlipped, onFlip }) {
  const { language, t } = useLanguage()
  const categoryMeta = CATEGORY_META[card.category]
  const selectedTitle = language === 'zh' ? card.back.titleZh : card.back.titleEn
  const selectedPrompt = card.front[language] ?? card.front.zh
  const summaryZh = card.back.summaryZh ?? card.back.summary
  const summaryEn = card.back.summaryEn ?? card.back.summary
  const bulletsZh = card.back.bulletsZh ?? card.back.bullets ?? []
  const bulletsEn = card.back.bulletsEn ?? card.back.bullets ?? []
  const contextZh = card.back.contextZh ?? card.back.context
  const contextEn = card.back.contextEn ?? card.back.context
  const categoryLabel = language === 'zh' ? categoryMeta.labelZh : categoryMeta.labelEn

  return (
    <button
      className={styles.card}
      type="button"
      onClick={onFlip}
      aria-label={t('card.flipAria', { title: selectedTitle })}
    >
      <div
        className={`${styles.inner} ${isFlipped ? styles.isFlipped : ''}`}
        data-category={card.category}
      >
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

        <section className={`${styles.face} ${styles.back}`}>
          <div className={styles.header}>
            <span className="pill pill-brand">{card.back.titleZh}</span>
            <span className="pill pill-accent">{card.back.titleEn}</span>
          </div>
          <div className={styles.body}>
            <div className={styles.translationBlock} lang="zh-CN">
              <p className={styles.summary}>{summaryZh}</p>
              {renderBullets(bulletsZh)}
              <p className={styles.context}>{contextZh}</p>
            </div>
            <div className={styles.translationBlock} lang="en">
              <p className={styles.summary}>{summaryEn}</p>
              {renderBullets(bulletsEn)}
              <p className={styles.context}>{contextEn}</p>
            </div>
          </div>
          <span className={styles.footerHint}>{t('card.hide')}</span>
        </section>
      </div>
    </button>
  )
}
