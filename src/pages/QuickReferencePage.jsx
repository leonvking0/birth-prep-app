import { cardsById } from '../data/cards.js'
import { quickReference } from '../data/quickReference.js'
import styles from './QuickReferencePage.module.css'

function renderCardList(cardIds) {
  return cardIds.map((cardId) => cardsById[cardId])
}

export default function QuickReferencePage() {
  const emergencyCards = renderCardList(quickReference.emergencyRuleIds)
  const warningCards = renderCardList(quickReference.warningSignIds)
  const partnerCards = renderCardList(quickReference.partnerActionIds)

  return (
    <div className="page">
      <div className="page-heading">
        <span className="eyebrow">Quick reference</span>
        <h2>Put the urgent rules at the top and everything else beneath them.</h2>
        <p className="page-subtitle">
          This page is meant for fast scanning under pressure, not deep study.
        </p>
      </div>

      <section className={`${styles.alertBlock} surface`}>
        <div className="page-heading">
          <span className="pill pill-warning">Go now rules</span>
          <h2>Hospital timing first</h2>
        </div>
        <div className={styles.stack}>
          {emergencyCards.map((card) => (
            <article key={card.id} className={`${styles.referenceCard} ${styles.emergencyCard}`}>
              <strong>{card.back.titleEn}</strong>
              <p>{card.payload.explanation}</p>
              <span className="pill pill-brand">{card.payload.keyNumber}</span>
            </article>
          ))}
        </div>
      </section>

      <section className={`${styles.panel} surface`}>
        <div className="page-heading">
          <span className="pill pill-accent">Warning signs</span>
          <h2>Symptoms that should trigger a call or trip in.</h2>
        </div>
        <div className={styles.stack}>
          {warningCards.map((card) => (
            <article key={card.id} className={styles.referenceCard}>
              <strong>{card.back.titleEn}</strong>
              <p className="subtle">{card.payload.whyItMatters}</p>
              <p>{card.payload.whatToDo}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={`${styles.panel} surface`}>
        <div className="page-heading">
          <span className="pill pill-success">Partner actions</span>
          <h2>Useful support moves and escalation language.</h2>
        </div>
        <div className={styles.stack}>
          {partnerCards.map((card) => (
            <article key={card.id} className={styles.referenceCard}>
              <strong>{card.back.titleEn}</strong>
              <p className="subtle">{card.payload.whenToUse}</p>
              <p>{card.payload.howTo}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={`${styles.panel} surface`}>
        <div className="page-heading">
          <span className="pill pill-brand">Hospital bag checklist</span>
          <h2>Pack the comfort items before the rush starts.</h2>
        </div>
        <ul className={styles.checklist}>
          {quickReference.hospitalBagChecklist.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
    </div>
  )
}
