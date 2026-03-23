import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import LessonMarkdown from '../components/lesson/LessonMarkdown.jsx'
import SectionJumpNav from '../components/lesson/SectionJumpNav.jsx'
import { cardsById } from '../data/cards.js'
import { lessonsById } from '../data/lessons.js'
import { useLanguage } from '../providers/LanguageProvider.jsx'
import { useStudy } from '../providers/StudyProvider.jsx'
import styles from './LessonDetailPage.module.css'

export default function LessonDetailPage() {
  const { lessonId } = useParams()
  const lesson = lessonsById[lessonId]
  const { language, t } = useLanguage()
  const { getLessonProgress, markLessonOpened, markSectionCompleted } = useStudy()
  const lessonProgress = lesson ? getLessonProgress(lesson.id) : null

  useEffect(() => {
    const activeLesson = lessonId ? lessonsById[lessonId] : null

    if (!activeLesson) {
      return undefined
    }

    markLessonOpened(activeLesson.id)

    const sectionElements = activeLesson.sections
      .map((section) => document.getElementById(section.id))
      .filter(Boolean)

    if (!sectionElements.length || typeof IntersectionObserver === 'undefined') {
      return undefined
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            markSectionCompleted(activeLesson.id, entry.target.id)
          }
        })
      },
      {
        threshold: 0.55,
      },
    )

    sectionElements.forEach((sectionElement) => observer.observe(sectionElement))

    return () => observer.disconnect()
  }, [lessonId, markLessonOpened, markSectionCompleted])

  if (!lesson) {
    return (
      <section className="surface empty-state">
        <h2>{t('lessonDetail.notFoundTitle')}</h2>
        <p className="subtle">{t('lessonDetail.notFoundBody')}</p>
        <Link className="button-primary" to="/lessons">
          {t('lessonDetail.back')}
        </Link>
      </section>
    )
  }

  const lessonTitle = language === 'zh' ? lesson.titleZh : lesson.titleEn
  const lessonSummary =
    language === 'zh'
      ? lesson.summaryZh ?? lesson.summary
      : lesson.summaryEn ?? lesson.summary

  return (
    <div className="page">
      <Link className="button-secondary" to="/lessons">
        {t('lessonDetail.back')}
      </Link>

      <section className={`${styles.header} surface`}>
        <div className="page-heading">
          <span className="eyebrow">{t('lessonDetail.eyebrow')}</span>
          <h2>{lessonTitle}</h2>
          <p className="page-subtitle">{lessonSummary}</p>
        </div>

        <SectionJumpNav
          sections={lesson.sections}
          completedSectionIds={lessonProgress.completedSectionIds}
          onJump={(sectionId) => {
            document.getElementById(sectionId)?.scrollIntoView({
              behavior: 'smooth',
              block: 'start',
            })
          }}
        />
      </section>

      <section className={`${styles.reader} surface`}>
        <LessonMarkdown language={language} lesson={lesson} />
      </section>

      <section className={`${styles.related} surface`}>
        <div className="page-heading">
          <span className="eyebrow">{t('lessonDetail.relatedEyebrow')}</span>
          <h2>{t('lessonDetail.relatedTitle')}</h2>
        </div>

        <div className="chip-row">
          {lesson.relatedCardIds.map((cardId) => {
            const card = cardsById[cardId]

            if (!card) {
              return null
            }

            return (
              <Link
                key={cardId}
                className="button-secondary"
                to={`/study?lesson=${lesson.id}&focus=${cardId}`}
              >
                {language === 'zh' ? card.back.titleZh : card.back.titleEn}
              </Link>
            )
          })}
        </div>
      </section>
    </div>
  )
}
