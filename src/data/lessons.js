import lesson01Raw from './lesson-01.md?raw'
import lesson01EnRaw from './lesson-01-en.md?raw'
import lesson02Raw from './lesson-02.md?raw'
import lesson02EnRaw from './lesson-02-en.md?raw'

// The source markdown has broken list formatting:
// "- \n    \n    **text**" instead of "- **text**"
// This collapses empty lines inside list items so react-markdown parses correctly.
function cleanMarkdown(md) {
  return md
    // Remove empty lines between "- " and the actual content (handles 4-space indent too)
    .replace(/^(-\s*)\n\s*\n\s{2,}/gm, '$1')
    // Remove empty lines between "    - " (nested) and content
    .replace(/^(\s+-\s*)\n\s*\n\s{4,}/gm, '$1')
    // Collapse runs of blank lines inside list blocks to single blank line
    .replace(/\n{3,}/g, '\n\n')
}

const lesson01Markdown = cleanMarkdown(lesson01Raw)
const lesson01EnMarkdown = cleanMarkdown(lesson01EnRaw)
const lesson02Markdown = cleanMarkdown(lesson02Raw)
const lesson02EnMarkdown = cleanMarkdown(lesson02EnRaw)

export const lessons = [
  {
    id: 'lesson-01',
    slug: 'when-to-go-and-interventions',
    titleEn: 'When to Go to the Hospital',
    titleZh: '何时前往医院与常见干预',
    markdown: lesson01Markdown,
    markdownEn: lesson01EnMarkdown,
    summary:
      '5-1-1, rupture of membranes, triage, epidural timing, Pitocin, and hospital logistics.',
    summaryEn:
      '5-1-1, rupture of membranes, triage, epidural timing, Pitocin, and hospital logistics.',
    summaryZh:
      '涵盖 5-1-1、破水判断、分诊、无痛时机、Pitocin 以及医院流程要点。',
    sections: [
      { id: 'hospital-timing', titleZh: '何时前往医院', titleEn: 'When to Go' },
      { id: 'prep-checklist', titleZh: '产前准备清单', titleEn: 'Prep Checklist' },
      { id: 'triage', titleZh: '入院后的操作与应对', titleEn: 'Triage' },
      { id: 'interventions', titleZh: '医疗干预', titleEn: 'Interventions' },
      { id: 'hospital-environment', titleZh: '医院环境与人员', titleEn: 'Hospital Team' },
    ],
    relatedCardIds: ['rule-5-1-1', 'term-epidural', 'term-pitocin', 'action-ask-who-is-in-room'],
  },
  {
    id: 'lesson-02',
    slug: 'monitoring-induction-and-partner-support',
    titleEn: 'Monitoring, Induction, and Partner Support',
    titleZh: '监护、催产与陪产支持',
    markdown: lesson02Markdown,
    markdownEn: lesson02EnMarkdown,
    summary:
      'Question checklists, fetal monitoring, IV decisions, induction, augmentation, and partner techniques.',
    summaryEn:
      'Question checklists, fetal monitoring, IV decisions, induction, augmentation, and partner techniques.',
    summaryZh:
      '涵盖医疗提问清单、胎心监护、IV 决策、引产、加强产程与陪产支持。',
    sections: [
      { id: 'question-checklist', titleZh: '核心沟通策略', titleEn: 'Question Checklist' },
      { id: 'monitoring-and-mobility', titleZh: '胎心监测与活动受限', titleEn: 'Monitoring and Mobility' },
      { id: 'iv-and-emergencies', titleZh: '静脉注射与紧急情况', titleEn: 'IV and Emergencies' },
      { id: 'induction', titleZh: '催产详解', titleEn: 'Induction' },
      { id: 'augmentation', titleZh: '加强产程与身体自主', titleEn: 'Augmentation' },
      { id: 'special-cases', titleZh: '特殊情况与器械助产', titleEn: 'Special Cases' },
      { id: 'partner-support', titleZh: '给陪产爸爸的建议', titleEn: 'Partner Support' },
    ],
    relatedCardIds: [
      'action-use-question-checklist',
      'term-telemetry',
      'term-induction',
      'action-counter-pressure',
    ],
  },
]

export const lessonsById = Object.fromEntries(
  lessons.map((lesson) => [lesson.id, lesson]),
)
