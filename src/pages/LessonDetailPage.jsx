import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import LessonMarkdown from '../components/lesson/LessonMarkdown.jsx'
import SectionJumpNav from '../components/lesson/SectionJumpNav.jsx'
import { cardsById } from '../data/cards.js'
import { lessonsById } from '../data/lessons.js'
import { useStudy } from '../providers/StudyProvider.jsx'
import styles from './LessonDetailPage.module.css'

export default function LessonDetailPage() {
  const { lessonId } = useParams()
  const lesson = lessonsById[lessonId]
  const { getLessonProgress, markLessonOpened, markSectionCompleted } = useStudy()
  const lessonProgress = lesson ? getLessonProgress(lesson.id) : null

  useEffect(() => {
    if (!lesson) {
      return undefined
    }

    markLessonOpened(lesson.id)

    const sectionElements = lesson.sections
      .map((section) => document.getElementById(section.id))
      .filter(Boolean)

    if (!sectionElements.length || typeof IntersectionObserver === 'undefined') {
      return undefined
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            markSectionCompleted(lesson.id, entry.target.id)
          }
        })
      },
      {
        threshold: 0.55,
      },
    )

    sectionElements.forEach((sectionElement) => observer.observe(sectionElement))

    return () => observer.disconnect()
  }, [lesson, markLessonOpened, markSectionCompleted])

  if (!lesson) {
    return (
      <section className="surface empty-state">
        <h2>Lesson not found</h2>
        <p className="subtle">The requested lesson ID does not exist in the current study pack.</p>
        <Link className="button-primary" to="/lessons">
          Back to lessons
        </Link>
      </section>
    )
  }

  return (
    <div className="page">
      <section className={`${styles.header} surface`}>
        <div className="page-heading">
          <span className="eyebrow">{lesson.titleZh}</span>
          <h2>{lesson.titleEn}</h2>
          <p className="page-subtitle">{lesson.summary}</p>
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
        <LessonMarkdown lesson={lesson} />
      </section>

      <section className={`${styles.related} surface`}>
        <div className="page-heading">
          <span className="eyebrow">Related cards</span>
          <h2>Open the matching study prompts.</h2>
        </div>

        <div className="chip-row">
          {lesson.relatedCardIds.map((cardId) => {
            const card = cardsById[cardId]

            return (
              <Link
                key={cardId}
                className="button-secondary"
                to={`/study?lesson=${lesson.id}&focus=${cardId}`}
              >
                {card.back.titleEn}
              </Link>
            )
          })}
        </div>
      </section>
    </div>
  )
}
