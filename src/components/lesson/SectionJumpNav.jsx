export default function SectionJumpNav({
  sections,
  completedSectionIds,
  onJump,
}) {
  return (
    <div className="jump-nav" aria-label="Lesson sections">
      {sections.map((section) => {
        const isComplete = completedSectionIds.includes(section.id)

        return (
          <button
            key={section.id}
            type="button"
            className={`button-secondary ${isComplete ? 'pill-success' : ''}`}
            onClick={() => onJump(section.id)}
          >
            {section.titleEn}
          </button>
        )
      })}
    </div>
  )
}
