import { cardsById } from '../data/cards.js'
import { quickReference } from '../data/quickReference.js'
import { useLanguage } from '../providers/LanguageProvider.jsx'
import styles from './QuickReferencePage.module.css'

function renderCardList(cardIds) {
  return cardIds
    .map((cardId) => cardsById[cardId])
    .filter(Boolean)
}

function getLocalizedEntry(entry, language) {
  if (entry && typeof entry === 'object') {
    if (language === 'zh') {
      return entry.zh ?? entry.labelZh ?? entry.en ?? entry.labelEn ?? ''
    }

    return entry.en ?? entry.labelEn ?? entry.zh ?? entry.labelZh ?? ''
  }

  return entry
}

function getLocalizedText(record, language, zhKey, enKey, fallbackKey) {
  if (language === 'zh') {
    return record?.[zhKey] ?? record?.[fallbackKey] ?? record?.[enKey] ?? ''
  }

  return record?.[enKey] ?? record?.[fallbackKey] ?? record?.[zhKey] ?? ''
}

function getLocalizedBullets(record, language) {
  if (language === 'zh') {
    return record?.bulletsZh ?? record?.bullets ?? []
  }

  return record?.bulletsEn ?? record?.bullets ?? []
}

export default function QuickReferencePage() {
  const { language, t } = useLanguage()
  const emergencyCards = renderCardList(quickReference.emergencyRuleIds)
  const warningCards = renderCardList(quickReference.warningSignIds)
  const partnerCards = renderCardList(quickReference.partnerActionIds)

  return (
    <div className="page">
      <div className="page-heading">
        <span className="eyebrow">{t('quickRef.eyebrow')}</span>
        <h2>{t('quickRef.title')}</h2>
        <p className="page-subtitle">{t('quickRef.subtitle')}</p>
      </div>

      <section className={`${styles.alertBlock} surface`}>
        <div className="page-heading">
          <span className="pill pill-warning">{t('quickRef.goNowBadge')}</span>
          <h2>{t('quickRef.goNowTitle')}</h2>
        </div>
        <div className={styles.stack}>
          {emergencyCards.map((card) => (
            <article key={card.id} className={`${styles.referenceCard} ${styles.emergencyCard}`}>
              <strong>{language === 'zh' ? card.back.titleZh : card.back.titleEn}</strong>
              <p>{getLocalizedText(card.back, language, 'summaryZh', 'summaryEn', 'summary')}</p>
              <span className="pill pill-brand">{card.payload.keyNumber}</span>
            </article>
          ))}
        </div>
      </section>

      <section className={`${styles.panel} surface`}>
        <div className="page-heading">
          <span className="pill pill-accent">{t('quickRef.warningBadge')}</span>
          <h2>{t('quickRef.warningTitle')}</h2>
        </div>
        <div className={styles.stack}>
          {warningCards.map((card) => (
            <article key={card.id} className={styles.referenceCard}>
              <strong>{language === 'zh' ? card.back.titleZh : card.back.titleEn}</strong>
              <p className="subtle">{getLocalizedText(card.back, language, 'summaryZh', 'summaryEn', 'summary')}</p>
              <p>{getLocalizedText(card.back, language, 'contextZh', 'contextEn', 'context')}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={`${styles.panel} surface`}>
        <div className="page-heading">
          <span className="pill pill-success">{t('quickRef.partnerBadge')}</span>
          <h2>{t('quickRef.partnerTitle')}</h2>
        </div>
        <div className={styles.stack}>
          {partnerCards.map((card) => (
            <article key={card.id} className={styles.referenceCard}>
              <strong>{language === 'zh' ? card.back.titleZh : card.back.titleEn}</strong>
              <p className="subtle">{getLocalizedBullets(card.back, language)[0]}</p>
              <p>{getLocalizedBullets(card.back, language)[1]}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={`${styles.panel} surface`}>
        <div className="page-heading">
          <span className="pill pill-brand">{t('quickRef.bagBadge')}</span>
          <h2>{t('quickRef.bagTitle')}</h2>
        </div>
        <ul className={styles.checklist}>
          {quickReference.hospitalBagChecklist.map((item) => (
            <li key={typeof item === 'string' ? item : item.en ?? item.zh}>
              {getLocalizedEntry(item, language)}
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
