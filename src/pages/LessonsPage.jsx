import { Link } from 'react-router-dom'
import { useStudy } from '../providers/StudyProvider.jsx'

export default function LessonsPage() {
  const { lessons, lessonProgress } = useStudy()

  return (
    <div className="page">
      <div className="page-heading">
        <span className="eyebrow">Lessons</span>
        <h2>Read the source material before drilling the cards.</h2>
        <p className="page-subtitle">
          Lesson notes stay as the source of truth. Progress updates as you move through the section anchors.
        </p>
      </div>

      <div className="card-grid">
        {lessons.map((lesson) => {
          const progress = lessonProgress[lesson.id]
          const completeCount = progress?.completedSectionIds.length ?? 0

          return (
            <Link key={lesson.id} to={`/lessons/${lesson.id}`} className="surface install-banner" data-kind="install">
              <div className="chip-row">
                <span className="pill pill-brand">{lesson.titleZh}</span>
                <span className="pill pill-accent">
                  {completeCount}/{lesson.sections.length} sections
                </span>
              </div>
              <strong>{lesson.titleEn}</strong>
              <p className="subtle">{lesson.summary}</p>
              <div className="chip-row">
                {lesson.sections.map((section) => (
                  <span key={section.id} className="pill pill-success">
                    {section.titleEn}
                  </span>
                ))}
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
