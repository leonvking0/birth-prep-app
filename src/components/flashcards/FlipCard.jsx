import { CATEGORY_META } from '../../data/cards.js'
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
  const categoryMeta = CATEGORY_META[card.category]

  return (
    <button
      className={styles.card}
      type="button"
      onClick={onFlip}
      aria-label={`Flip card for ${card.back.titleEn}`}
    >
      <div
        className={`${styles.inner} ${isFlipped ? styles.isFlipped : ''}`}
        data-category={card.category}
      >
        <section className={`${styles.face} ${styles.front}`}>
          <div className={styles.header}>
            <span className="pill pill-accent">{categoryMeta.labelEn}</span>
            {card.quickRef ? <span className="pill pill-warning">Quick ref</span> : null}
          </div>
          <div className={styles.body}>
            <p className={styles.promptZh}>{card.front.zh}</p>
            <p className={styles.promptEn}>{card.front.en}</p>
          </div>
          <span className={styles.footerHint}>Tap to reveal the answer</span>
        </section>

        <section className={`${styles.face} ${styles.back}`}>
          <div className={styles.header}>
            <span className="pill pill-brand">{card.back.titleZh}</span>
            <span className="pill pill-accent">{card.back.titleEn}</span>
          </div>
          <div className={styles.body}>
            <p className={styles.summary}>{card.back.summary}</p>
            {renderBullets(card.back.bullets)}
            <p className={styles.context}>{card.back.context}</p>
          </div>
          <span className={styles.footerHint}>Tap to hide</span>
        </section>
      </div>
    </button>
  )
}
