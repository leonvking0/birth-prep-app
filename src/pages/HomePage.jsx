import { Link, useOutletContext } from 'react-router-dom'
import { CATEGORY_META } from '../data/cards.js'
import InstallBanner from '../components/pwa/InstallBanner.jsx'
import ProgressRing from '../components/progress/ProgressRing.jsx'
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
  const { categoryMastery, dueCount, lessons, lessonProgress, sessionStats } = useStudy()

  const nextLesson =
    lessons.find((lesson) => getLessonProgressRatio(lesson, lessonProgress[lesson.id]) < 1) ??
    lessons[0]

  return (
    <div className="page">
      {installState.canInstall ? (
        <InstallBanner
          kind="install"
          message="Keep the study app on the home screen."
          description="Install it for faster launch, offline access, and a clean full-screen reading view."
          confirmLabel="Install now"
          onConfirm={installState.installApp}
          onDismiss={installState.dismissInstall}
        />
      ) : null}

      <section className={`${styles.hero} surface`}>
        <div className="page-heading">
          <span className="eyebrow">Dashboard</span>
          <h2>Stay ready for labor conversations and fast decisions.</h2>
          <p className="page-subtitle">
            Review weak cards, return to the next unfinished lesson, and keep the emergency rules close.
          </p>
        </div>

        <div className={styles.heroGrid}>
          <div className={`${styles.statCard} surface-strong`}>
            <span className="pill pill-brand">Due now</span>
            <strong className="metric-value">{dueCount}</strong>
            <p className="subtle">Open today’s review queue before the cards pile up.</p>
            <Link className="button-primary" to="/study">
              Start studying
            </Link>
          </div>

          <div className={`${styles.statCard} surface-strong`}>
            <span className="pill pill-accent">Session stats</span>
            <strong className="metric-value">{sessionStats.totalReviews}</strong>
            <p className="subtle">
              {sessionStats.totalCorrect} correct / {sessionStats.totalIncorrect} again
            </p>
            <Link className="button-secondary" to="/quick-reference">
              Open quick reference
            </Link>
          </div>
        </div>
      </section>

      <section className="page">
        <div className="page-heading">
          <span className="eyebrow">Category mastery</span>
          <h2>Move cards into the strong boxes.</h2>
        </div>

        <div className={styles.progressGrid}>
          {Object.entries(CATEGORY_META).map(([category, meta]) => {
            const entry = categoryMastery[category]

            return (
              <ProgressRing
                key={category}
                label={`${meta.labelEn} · ${meta.labelZh}`}
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
          <span className="eyebrow">Next lesson</span>
          <h2>{nextLesson.titleEn}</h2>
          <p className="page-subtitle">{nextLesson.summary}</p>
        </div>

        <div className={styles.lessonList}>
          {lessons.map((lesson) => {
            const progress = lessonProgress[lesson.id]
            const completeCount = progress?.completedSectionIds.length ?? 0

            return (
              <Link key={lesson.id} className={`${styles.lessonCard} surface`} to={`/lessons/${lesson.id}`}>
                <span className="pill pill-accent">
                  {completeCount}/{lesson.sections.length} sections
                </span>
                <strong>{lesson.titleEn}</strong>
                <span className="subtle">{lesson.titleZh}</span>
                <p className="subtle">{lesson.summary}</p>
              </Link>
            )
          })}
        </div>
      </section>
    </div>
  )
}
