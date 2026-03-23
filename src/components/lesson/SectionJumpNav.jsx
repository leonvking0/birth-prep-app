import { useLanguage } from '../../providers/LanguageProvider.jsx'

export default function SectionJumpNav({
  sections,
  completedSectionIds,
  onJump,
}) {
  const { language, t } = useLanguage()

  return (
    <div className="jump-nav" aria-label={t('sectionJump.aria')}>
      {sections.map((section) => {
        const isComplete = completedSectionIds.includes(section.id)
        const title = language === 'zh' ? section.titleZh : section.titleEn

        return (
          <button
            key={section.id}
            type="button"
            className={`button-secondary ${isComplete ? 'pill-success' : ''}`}
            onClick={() => onJump(section.id)}
          >
            {title}
          </button>
        )
      })}
    </div>
  )
}
