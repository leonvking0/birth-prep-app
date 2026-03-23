import { Link } from 'react-router-dom'
import { useLanguage } from '../providers/LanguageProvider.jsx'
import { useStudy } from '../providers/StudyProvider.jsx'

export default function LessonsPage() {
  const { language, t } = useLanguage()
  const { lessons, lessonProgress } = useStudy()

  return (
    <div className="page">
      <div className="page-heading">
        <span className="eyebrow">{t('lessons.eyebrow')}</span>
        <h2>{t('lessons.title')}</h2>
        <p className="page-subtitle">{t('lessons.subtitle')}</p>
      </div>

      <div className="card-grid">
        {lessons.map((lesson) => {
          const progress = lessonProgress[lesson.id]
          const completeCount = progress?.completedSectionIds.length ?? 0
          const lessonTitle = language === 'zh' ? lesson.titleZh : lesson.titleEn
          const lessonSummary =
            language === 'zh'
              ? lesson.summaryZh ?? lesson.summary
              : lesson.summaryEn ?? lesson.summary

          return (
            <Link key={lesson.id} to={`/lessons/${lesson.id}`} className="surface install-banner" data-kind="install">
              <div className="chip-row">
                <span className="pill pill-brand">{lessonTitle}</span>
                <span className="pill pill-accent">
                  {t('lesson.sectionProgress', {
                    completed: completeCount,
                    total: lesson.sections.length,
                  })}
                </span>
              </div>
              <strong>{lessonTitle}</strong>
              <p className="subtle">{lessonSummary}</p>
              <div className="chip-row">
                {lesson.sections.map((section) => (
                  <span key={section.id} className="pill pill-success">
                    {language === 'zh' ? section.titleZh : section.titleEn}
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
