import lesson01Markdown from './lesson-01.md?raw'
import lesson02Markdown from './lesson-02.md?raw'

export const lessons = [
  {
    id: 'lesson-01',
    slug: 'when-to-go-and-interventions',
    titleEn: 'When to Go to the Hospital',
    titleZh: '何时前往医院与常见干预',
    markdown: lesson01Markdown,
    summary:
      '5-1-1, rupture of membranes, triage, epidural timing, Pitocin, and hospital logistics.',
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
    summary:
      'Question checklists, fetal monitoring, IV decisions, induction, augmentation, and partner techniques.',
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
