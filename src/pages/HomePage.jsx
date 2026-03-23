import { Link, useOutletContext } from 'react-router-dom'
import { CATEGORY_META } from '../data/cards.js'
import InstallBanner from '../components/pwa/InstallBanner.jsx'
import ProgressRing from '../components/progress/ProgressRing.jsx'
import { useLanguage } from '../providers/LanguageProvider.jsx'
import { useStudy } from '../providers/StudyProvider.jsx'
import styles from './HomePage.module.css'

function getLessonProgressRatio(lesson, lessonProgress) {
  if (!lesson.sections.length) {
    return 0
  }

  return lessonProgress.completedSectionIds.length / lesson.sections.length
}

export default function HomePage() {
  const { installState } = useOutletContext()
  const { language, t } = useLanguage()
  const { categoryMastery, dueCount, lessons, lessonProgress, sessionStats } = useStudy()

  const nextLesson =
    lessons.find((lesson) => getLessonProgressRatio(lesson, lessonProgress[lesson.id]) < 1) ??
    lessons[0]
  const nextLessonTitle = language === 'zh' ? nextLesson.titleZh : nextLesson.titleEn
  const nextLessonSummary =
    language === 'zh'
      ? nextLesson.summaryZh ?? nextLesson.summary
      : nextLesson.summaryEn ?? nextLesson.summary

  return (
    <div className="page">
      {installState.canInstall ? (
        <InstallBanner
          kind="install"
          message={t('home.installMessage')}
          description={t('home.installDescription')}
          confirmLabel={t('home.installConfirm')}
          onConfirm={installState.installApp}
          onDismiss={installState.dismissInstall}
        />
      ) : null}

      <section className={`${styles.hero} surface`}>
        <div className="page-heading">
          <span className="eyebrow">{t('home.eyebrow')}</span>
          <h2>{t('home.title')}</h2>
          <p className="page-subtitle">{t('home.subtitle')}</p>
        </div>

        <div className={styles.heroGrid}>
          <div className={`${styles.statCard} surface-strong`}>
            <span className="pill pill-brand">{t('home.dueNow')}</span>
            <strong className="metric-value">{dueCount}</strong>
            <p className="subtle">{t('home.dueDescription')}</p>
            <Link className="button-primary" to="/study">
              {t('home.startStudying')}
            </Link>
          </div>

          <div className={`${styles.statCard} surface-strong`}>
            <span className="pill pill-accent">{t('home.sessionStats')}</span>
            <strong className="metric-value">{sessionStats.totalReviews}</strong>
            <p className="subtle">
              {t('home.sessionSummary', {
                correct: sessionStats.totalCorrect,
                incorrect: sessionStats.totalIncorrect,
              })}
            </p>
            <Link className="button-secondary" to="/quick-reference">
              {t('home.openQuickReference')}
            </Link>
          </div>
        </div>
      </section>

      <section className="page">
        <div className="page-heading">
          <span className="eyebrow">{t('home.categoryMastery')}</span>
          <h2>{t('home.categoryTitle')}</h2>
        </div>

        <div className={styles.progressGrid}>
          {Object.entries(CATEGORY_META).map(([category, meta]) => {
            const entry = categoryMastery[category]

            return (
              <ProgressRing
                key={category}
                label={language === 'zh' ? meta.labelZh : meta.labelEn}
                mastered={entry?.mastered ?? 0}
                total={entry?.total ?? 0}
                percentage={entry?.percentage ?? 0}
              />
            )
          })}
        </div>
      </section>

      <section className="page">
        <div className="page-heading">
          <span className="eyebrow">{t('home.nextLesson')}</span>
          <h2>{nextLessonTitle}</h2>
          <p className="page-subtitle">{nextLessonSummary}</p>
        </div>

        <div className={styles.lessonList}>
          {lessons.map((lesson) => {
            const progress = lessonProgress[lesson.id]
            const completeCount = progress?.completedSectionIds.length ?? 0
            const lessonTitle = language === 'zh' ? lesson.titleZh : lesson.titleEn
            const lessonSummary =
              language === 'zh'
                ? lesson.summaryZh ?? lesson.summary
                : lesson.summaryEn ?? lesson.summary

            return (
              <Link key={lesson.id} className={`${styles.lessonCard} surface`} to={`/lessons/${lesson.id}`}>
                <span className="pill pill-accent">
                  {t('lesson.sectionProgress', {
                    completed: completeCount,
                    total: lesson.sections.length,
                  })}
                </span>
                <strong>{lessonTitle}</strong>
                <p className="subtle">{lessonSummary}</p>
              </Link>
            )
          })}
        </div>
      </section>
    </div>
  )
}
