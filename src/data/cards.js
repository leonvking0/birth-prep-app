export const CARD_CATEGORIES = [
  'medical_terms',
  'rules_numbers',
  'action_items',
  'warning_signs',
]

export const CATEGORY_META = {
  medical_terms: {
    labelEn: 'Medical Terms',
    labelZh: '术语',
  },
  rules_numbers: {
    labelEn: 'Rules & Numbers',
    labelZh: '规则',
  },
  action_items: {
    labelEn: 'Action Items',
    labelZh: '行动',
  },
  warning_signs: {
    labelEn: 'Warning Signs',
    labelZh: '警示',
  },
}

function createCardBase({
  id,
  category,
  lessonIds,
  sourceSections,
  front,
  back,
  payload,
  tags,
  quickRef = false,
}) {
  return {
    id,
    category,
    lessonIds,
    sourceSections,
    front,
    back,
    payload,
    tags,
    quickRef,
  }
}

function createMedicalCard({
  id,
  lessonIds,
  sourceSections,
  termEn,
  termZh,
  definition,
  context,
  tags,
  quickRef = false,
}) {
  return createCardBase({
    id,
    category: 'medical_terms',
    lessonIds,
    sourceSections,
    front: {
      zh: `${termZh} 是什么？`,
      en: `What is ${termEn}?`,
    },
    back: {
      titleEn: termEn,
      titleZh: termZh,
      summary: definition,
      bullets: [definition, context],
      context,
    },
    payload: {
      termEn,
      termZh,
      definition,
      context,
    },
    tags,
    quickRef,
  })
}

function createRuleCard({
  id,
  lessonIds,
  sourceSections,
  titleEn,
  titleZh,
  label,
  keyNumber,
  explanation,
  tags,
  quickRef = false,
}) {
  return createCardBase({
    id,
    category: 'rules_numbers',
    lessonIds,
    sourceSections,
    front: {
      zh: `${titleZh} 是什么？`,
      en: `What does ${label} mean?`,
    },
    back: {
      titleEn,
      titleZh,
      summary: `${keyNumber}: ${explanation}`,
      bullets: [keyNumber, explanation],
      context: explanation,
    },
    payload: {
      label,
      keyNumber,
      explanation,
    },
    tags,
    quickRef,
  })
}

function createActionCard({
  id,
  lessonIds,
  sourceSections,
  titleEn,
  titleZh,
  action,
  whenToUse,
  howTo,
  tags,
  quickRef = false,
}) {
  return createCardBase({
    id,
    category: 'action_items',
    lessonIds,
    sourceSections,
    front: {
      zh: `什么时候应该${titleZh}？`,
      en: `When should you ${titleEn.toLowerCase()}?`,
    },
    back: {
      titleEn,
      titleZh,
      summary: action,
      bullets: [whenToUse, howTo],
      context: whenToUse,
    },
    payload: {
      action,
      whenToUse,
      howTo,
    },
    tags,
    quickRef,
  })
}

function createWarningCard({
  id,
  lessonIds,
  sourceSections,
  titleEn,
  titleZh,
  sign,
  whyItMatters,
  whatToDo,
  tags,
  quickRef = true,
}) {
  return createCardBase({
    id,
    category: 'warning_signs',
    lessonIds,
    sourceSections,
    front: {
      zh: `${titleZh} 为什么重要？`,
      en: `Why does "${titleEn}" matter?`,
    },
    back: {
      titleEn,
      titleZh,
      summary: whyItMatters,
      bullets: [sign, whatToDo],
      context: whatToDo,
    },
    payload: {
      sign,
      whyItMatters,
      whatToDo,
    },
    tags,
    quickRef,
  })
}

const medicalTerms = [
  createMedicalCard({
    id: 'term-gbs',
    lessonIds: ['lesson-01', 'lesson-02'],
    sourceSections: ['hospital-timing', 'iv-and-emergencies'],
    termEn: 'GBS (Group B Strep)',
    termZh: 'B 族链球菌',
    definition:
      'A bacteria screening result that matters during labor because positive patients usually need IV antibiotics once labor starts or membranes rupture.',
    context:
      'Lesson 01 ties GBS-positive status to immediate hospital evaluation after water breaks, and Lesson 02 lists it as a common reason an IV may be needed.',
    tags: ['screening', 'antibiotics'],
    quickRef: true,
  }),
  createMedicalCard({
    id: 'term-meconium',
    lessonIds: ['lesson-01', 'lesson-02'],
    sourceSections: ['hospital-timing', 'monitoring-and-mobility'],
    termEn: 'Meconium',
    termZh: '胎便',
    definition:
      'The baby’s first stool; if it appears in amniotic fluid it raises concern and usually calls for closer fetal monitoring.',
    context:
      'The lessons mention meconium as an abnormal fluid finding and a reason continuous monitoring may become necessary.',
    tags: ['amniotic-fluid', 'fetal-monitoring'],
    quickRef: true,
  }),
  createMedicalCard({
    id: 'term-triage',
    lessonIds: ['lesson-01'],
    sourceSections: ['triage'],
    termEn: 'Triage',
    termZh: '分诊 / 入院评估',
    definition:
      'The hospital intake and assessment area where staff check labor progress before deciding whether to admit the patient.',
    context:
      'The lesson describes walking, baseline monitoring, and waiting in triage before a room is assigned.',
    tags: ['hospital-procedures'],
  }),
  createMedicalCard({
    id: 'term-epidural',
    lessonIds: ['lesson-01', 'lesson-02'],
    sourceSections: ['interventions', 'iv-and-emergencies'],
    termEn: 'Epidural',
    termZh: '无痛分娩 / 硬膜外麻醉',
    definition:
      'Regional anesthesia placed near the spine to reduce labor pain while still allowing the parent to stay awake.',
    context:
      'Lesson 01 covers timing, mobility limits, turning, and spinal headache risk, while Lesson 02 notes it as a reason an IV may be inserted.',
    tags: ['pain-management', 'hospital-procedures'],
  }),
  createMedicalCard({
    id: 'term-blood-patch',
    lessonIds: ['lesson-01'],
    sourceSections: ['interventions'],
    termEn: 'Blood Patch',
    termZh: '血贴',
    definition:
      'A procedure used to treat the rare spinal headache that can happen after an epidural.',
    context:
      'The lesson explicitly names a blood patch as the treatment for a severe post-epidural spinal headache.',
    tags: ['epidural', 'recovery'],
  }),
  createMedicalCard({
    id: 'term-pitocin',
    lessonIds: ['lesson-01', 'lesson-02'],
    sourceSections: ['interventions', 'augmentation'],
    termEn: 'Pitocin',
    termZh: '缩宫素 / 人工缩宫素',
    definition:
      'Synthetic oxytocin used to strengthen contractions during induction or augmentation.',
    context:
      'Lesson 01 explains Pitocin for weak or stalled contractions; Lesson 02 discusses pressure to increase it during augmentation.',
    tags: ['induction', 'contractions'],
  }),
  createMedicalCard({
    id: 'term-resident',
    lessonIds: ['lesson-01', 'lesson-02'],
    sourceSections: ['hospital-environment', 'question-checklist'],
    termEn: 'Resident',
    termZh: '住院医生',
    definition:
      'A doctor in training who may participate in labor care under supervision.',
    context:
      'The classes stress asking who is in the room and whether the person is an attending, resident, or student before agreeing to procedures.',
    tags: ['hospital-team', 'communication'],
  }),
  createMedicalCard({
    id: 'term-telemetry',
    lessonIds: ['lesson-02'],
    sourceSections: ['monitoring-and-mobility'],
    termEn: 'Telemetry',
    termZh: '无线胎心监测仪 / 遥测监护',
    definition:
      'A wireless monitoring setup that lets the laboring parent walk or shower while staff still track the baby.',
    context:
      'Lesson 02 says some hospitals have telemetry but parents often need to ask for it directly.',
    tags: ['fetal-monitoring', 'mobility'],
  }),
  createMedicalCard({
    id: 'term-doppler',
    lessonIds: ['lesson-02'],
    sourceSections: ['monitoring-and-mobility'],
    termEn: 'Doppler',
    termZh: '多普勒胎心听诊',
    definition:
      'A handheld device used for intermittent fetal heart checks in low-risk labor.',
    context:
      'The class contrasts Doppler checks every 15 minutes with automatic continuous monitoring.',
    tags: ['fetal-monitoring', 'low-risk-labor'],
  }),
  createMedicalCard({
    id: 'term-iv',
    lessonIds: ['lesson-02'],
    sourceSections: ['iv-and-emergencies'],
    termEn: 'IV (Intravenous line)',
    termZh: '静脉输液 / 静脉留置针',
    definition:
      'A line used for fluids, antibiotics, medications, epidural prep, or emergency access.',
    context:
      'Lesson 02 explains when IVs are actually needed and how placement affects mobility.',
    tags: ['hospital-procedures', 'medications'],
  }),
  createMedicalCard({
    id: 'term-crash-c-section',
    lessonIds: ['lesson-02'],
    sourceSections: ['iv-and-emergencies'],
    termEn: 'Crash C-section',
    termZh: '紧急剖腹产',
    definition:
      'A highly urgent cesarean delivery performed when the situation becomes immediately dangerous.',
    context:
      'The class says true crash C-sections are rare and should not be used casually to justify unnecessary early IV placement.',
    tags: ['surgery', 'emergency'],
  }),
  createMedicalCard({
    id: 'term-induction',
    lessonIds: ['lesson-02'],
    sourceSections: ['induction'],
    termEn: 'Induction',
    termZh: '催产',
    definition:
      'Starting labor artificially before spontaneous labor begins.',
    context:
      'Lesson 02 explains common reasons for induction and warns that the cervical-ripening stage is often slow.',
    tags: ['labor-onset', 'hospital-procedures'],
  }),
  createMedicalCard({
    id: 'term-misoprostol',
    lessonIds: ['lesson-02'],
    sourceSections: ['induction'],
    termEn: 'Misoprostol',
    termZh: '米索前列醇',
    definition:
      'A medication used in small doses to soften or ripen the cervix during induction.',
    context:
      'The lesson lists Misoprostol as one of the first tools used in the long cervical-ripening stage.',
    tags: ['induction', 'cervix'],
  }),
  createMedicalCard({
    id: 'term-foley',
    lessonIds: ['lesson-02'],
    sourceSections: ['induction'],
    termEn: 'Foley catheter / Foley balloon',
    termZh: 'Foley 导尿管 / 球囊导管',
    definition:
      'A balloon catheter used to mechanically dilate the cervix during induction.',
    context:
      'Lesson 02 presents a Foley balloon as the physical cervical-ripening option alongside medication.',
    tags: ['induction', 'cervix'],
  }),
  createMedicalCard({
    id: 'term-cervidil',
    lessonIds: ['lesson-02'],
    sourceSections: ['induction'],
    termEn: 'Cervidil',
    termZh: 'Cervidil 宫颈熟化塞剂',
    definition:
      'A cervical-ripening insert used during induction.',
    context:
      'The lesson notes Cervidil as another ripening tool and mentions it may slightly increase the chance of triggering contractions.',
    tags: ['induction', 'cervix'],
  }),
  createMedicalCard({
    id: 'term-augmentation',
    lessonIds: ['lesson-02'],
    sourceSections: ['augmentation'],
    termEn: 'Augmentation',
    termZh: '加强产程',
    definition:
      'Intensifying labor that has already started, often by increasing Pitocin.',
    context:
      'Lesson 02 says the laboring parent can refuse augmentation if labor is progressing and mother and baby are doing well.',
    tags: ['contractions', 'hospital-procedures'],
  }),
  createMedicalCard({
    id: 'term-ecv',
    lessonIds: ['lesson-02'],
    sourceSections: ['special-cases'],
    termEn: 'ECV (External Cephalic Version)',
    termZh: '外倒转术',
    definition:
      'A hands-on attempt to turn a breech baby into a head-down position before birth.',
    context:
      'The lesson recommends deep relaxation to improve the odds of success during an ECV.',
    tags: ['breech', 'positioning'],
  }),
  createMedicalCard({
    id: 'term-forceps',
    lessonIds: ['lesson-02'],
    sourceSections: ['special-cases'],
    termEn: 'Forceps',
    termZh: '产钳',
    definition:
      'Instruments sometimes used to help deliver the baby vaginally.',
    context:
      'Lesson 02 says forceps are usually attempted only when the predicted success rate is very high.',
    tags: ['instrument-assisted-birth'],
  }),
  createMedicalCard({
    id: 'term-c-section',
    lessonIds: ['lesson-02'],
    sourceSections: ['special-cases'],
    termEn: 'C-section / Cesarean section',
    termZh: '剖腹产',
    definition:
      'Surgical birth through the abdomen and uterus.',
    context:
      'Lesson 02 focuses on spacing implications for the next pregnancy after a C-section.',
    tags: ['surgery', 'recovery'],
  }),
  createMedicalCard({
    id: 'term-sga',
    lessonIds: ['lesson-02'],
    sourceSections: ['induction'],
    termEn: 'SGA (Small for Gestational Age)',
    termZh: '小于胎龄儿 / 胎儿生长受限',
    definition:
      'A baby measuring smaller than expected for gestational age.',
    context:
      'The lesson names SGA as one reason an induction may be suggested.',
    tags: ['growth', 'induction'],
  }),
  createMedicalCard({
    id: 'term-galactagogues',
    lessonIds: ['lesson-01'],
    sourceSections: ['prep-checklist'],
    termEn: 'Galactagogues',
    termZh: '催乳食物 / 下奶食物',
    definition:
      'Foods or supports intended to encourage milk production after birth.',
    context:
      'Lesson 01 includes researching galactagogues in the pre-birth planning checklist.',
    tags: ['postpartum', 'feeding'],
  }),
]

const ruleCards = [
  createRuleCard({
    id: 'rule-5-1-1',
    lessonIds: ['lesson-01'],
    sourceSections: ['hospital-timing'],
    titleEn: '5-1-1 Rule',
    titleZh: '5-1-1 法则',
    label: 'Contraction timing rule',
    keyNumber: '5-1-1',
    explanation:
      'Go to the hospital when contractions are every 5 minutes, last 1 minute, and continue like that for 1 hour.',
    tags: ['hospital-timing', 'labor-onset'],
    quickRef: true,
  }),
  createRuleCard({
    id: 'rule-no-talking',
    lessonIds: ['lesson-01'],
    sourceSections: ['hospital-timing'],
    titleEn: 'No Speech / No Breath Control Rule',
    titleZh: '强度优先法则',
    label: 'Intensity override rule',
    keyNumber: 'No speech / no breath control',
    explanation:
      'Even if the clock does not match 5-1-1, go in if contractions are so intense that the laboring parent cannot talk or breathe through them.',
    tags: ['hospital-timing', 'labor-onset'],
    quickRef: true,
  }),
  createRuleCard({
    id: 'rule-37-week-threshold',
    lessonIds: ['lesson-01'],
    sourceSections: ['hospital-timing'],
    titleEn: 'Preterm Rupture Threshold',
    titleZh: '37 周前破水阈值',
    label: 'Preterm rupture threshold',
    keyNumber: '< 37 weeks',
    explanation:
      'If water breaks before 37 weeks, treat it as a preterm labor warning and go to the hospital immediately.',
    tags: ['preterm', 'warning-signs'],
    quickRef: true,
  }),
  createRuleCard({
    id: 'rule-term-window',
    lessonIds: ['lesson-01', 'lesson-02'],
    sourceSections: ['hospital-timing', 'induction'],
    titleEn: 'Full-Term Range',
    titleZh: '足月范围',
    label: 'Full-term range',
    keyNumber: '37-42 weeks',
    explanation:
      'The class frames 37 to 42 weeks as term, with an extra note that East Asian average gestation is often closer to 39 weeks.',
    tags: ['term-pregnancy', 'timing'],
  }),
  createRuleCard({
    id: 'rule-rupture-special-cases',
    lessonIds: ['lesson-01'],
    sourceSections: ['hospital-timing'],
    titleEn: 'Ruptured Membranes Special Cases',
    titleZh: '破水特殊情况',
    label: 'Ruptured membranes special-case rule',
    keyNumber: 'GBS+ or bad fluid = go now',
    explanation:
      'At term, water breaking without contractions may still need immediate admission if fluid smells bad, looks abnormal, or the parent is GBS positive.',
    tags: ['water-break', 'warning-signs'],
    quickRef: true,
  }),
  createRuleCard({
    id: 'rule-baseline-monitor',
    lessonIds: ['lesson-01'],
    sourceSections: ['triage'],
    titleEn: 'Baseline Monitor Duration',
    titleZh: '基线监测时长',
    label: 'Baseline monitor duration',
    keyNumber: '30 minutes',
    explanation:
      'Initial fetal monitoring in triage usually takes around 30 minutes before staff decide the next steps.',
    tags: ['triage', 'fetal-monitoring'],
  }),
  createRuleCard({
    id: 'rule-admission-threshold',
    lessonIds: ['lesson-01'],
    sourceSections: ['triage'],
    titleEn: 'Typical Admission Threshold',
    titleZh: '正式入院宫口阈值',
    label: 'Typical admission threshold',
    keyNumber: '3-4 cm',
    explanation:
      'Formal room admission usually happens once the cervix is around 3 to 4 cm and contractions are strong and regular.',
    tags: ['triage', 'cervix'],
  }),
  createRuleCard({
    id: 'rule-epidural-timing',
    lessonIds: ['lesson-01'],
    sourceSections: ['interventions'],
    titleEn: 'Epidural Timing Guide',
    titleZh: '无痛讨论时机',
    label: 'Epidural timing guide',
    keyNumber: '~3 cm',
    explanation:
      'The epidural conversation usually makes sense when labor shifts from coping to suffering, often around 3 cm.',
    tags: ['epidural', 'pain-management'],
  }),
  createRuleCard({
    id: 'rule-early-epidural-risk',
    lessonIds: ['lesson-01'],
    sourceSections: ['interventions'],
    titleEn: 'Early Epidural Risk Note',
    titleZh: '过早无痛风险',
    label: 'Early epidural risk note',
    keyNumber: '0 cm -> +50% C-section risk',
    explanation:
      'The lesson warns that using an epidural too early may raise C-section risk because mobility drops.',
    tags: ['epidural', 'c-section'],
  }),
  createRuleCard({
    id: 'rule-epidural-turning',
    lessonIds: ['lesson-01'],
    sourceSections: ['interventions'],
    titleEn: 'Repositioning After Epidural',
    titleZh: '无痛后翻身频率',
    label: 'Repositioning after epidural',
    keyNumber: 'Every ~30 minutes',
    explanation:
      'Once an epidural is in place, the laboring parent should be turned regularly to avoid prolonged nerve pressure.',
    tags: ['epidural', 'mobility'],
  }),
  createRuleCard({
    id: 'rule-intermittent-monitoring',
    lessonIds: ['lesson-02'],
    sourceSections: ['monitoring-and-mobility'],
    titleEn: 'Low-Risk Monitoring Cadence',
    titleZh: '低风险监测频率',
    label: 'Low-risk monitoring cadence',
    keyNumber: 'Every 15 minutes',
    explanation:
      'For low-risk labor, the lesson favors intermittent Doppler checks about every 15 minutes instead of default continuous monitoring.',
    tags: ['fetal-monitoring', 'low-risk-labor'],
  }),
  createRuleCard({
    id: 'rule-arom-threshold',
    lessonIds: ['lesson-02'],
    sourceSections: ['induction'],
    titleEn: 'Artificial Rupture Threshold',
    titleZh: '人工破水阈值',
    label: 'Artificial rupture threshold',
    keyNumber: '2 cm',
    explanation:
      'If the cervix is already about 2 cm, the lesson says artificial rupture of membranes may be paired with induction.',
    tags: ['induction', 'water-break'],
  }),
  createRuleCard({
    id: 'rule-forceps-success',
    lessonIds: ['lesson-02'],
    sourceSections: ['special-cases'],
    titleEn: 'Forceps Decision Threshold',
    titleZh: '产钳成功率阈值',
    label: 'Forceps decision threshold',
    keyNumber: '~90% success',
    explanation:
      'The class frames forceps as appropriate only when the clinician believes the chance of success is very high.',
    tags: ['instrument-assisted-birth'],
  }),
  createRuleCard({
    id: 'rule-c-section-spacing',
    lessonIds: ['lesson-02'],
    sourceSections: ['special-cases'],
    titleEn: 'Next-Pregnancy Spacing After C-section',
    titleZh: '剖腹产后再孕间隔',
    label: 'Next-pregnancy spacing after C-section',
    keyNumber: '18-24 months',
    explanation:
      'Families should usually wait 18 to 24 months after a C-section before the next pregnancy.',
    tags: ['c-section', 'family-planning'],
    quickRef: true,
  }),
]

const actionCards = [
  createActionCard({
    id: 'action-time-contractions',
    lessonIds: ['lesson-01'],
    sourceSections: ['hospital-timing'],
    titleEn: 'Time Contractions',
    titleZh: '记录宫缩',
    action: 'Time contractions instead of guessing when labor may be starting.',
    whenToUse: 'Use this when labor may be starting and you need an objective trigger.',
    howTo:
      'Track frequency, duration, and total pattern length, then compare it against the 5-1-1 rule.',
    tags: ['labor-onset', 'timing'],
    quickRef: true,
  }),
  createActionCard({
    id: 'action-check-water-break',
    lessonIds: ['lesson-01'],
    sourceSections: ['hospital-timing'],
    titleEn: 'Check Whether the Water Broke',
    titleZh: '确认是否破水',
    action: 'Verify whether the water actually broke when leakage is uncertain.',
    whenToUse: 'Use this when fluid leakage is ambiguous and you are not sure it was amniotic fluid.',
    howTo:
      'Put tissue or a pad in the underwear, stand up, lift the belly, and cough; a fresh gush suggests ruptured membranes.',
    tags: ['water-break', 'home-triage'],
    quickRef: true,
  }),
  createActionCard({
    id: 'action-finish-loose-ends',
    lessonIds: ['lesson-01'],
    sourceSections: ['prep-checklist'],
    titleEn: 'Finish Loose Ends',
    titleZh: '完成未竟事项',
    action: 'Clear unfinished life or admin tasks before labor.',
    whenToUse: 'Do this in the final weeks before birth so nagging chores do not become mental friction during labor.',
    howTo:
      'Finish taxes, work handoffs, haircuts, paperwork, and other lingering to-dos while there is still time.',
    tags: ['prep', 'mental-load'],
  }),
  createActionCard({
    id: 'action-prepare-safe-room',
    lessonIds: ['lesson-01'],
    sourceSections: ['prep-checklist'],
    titleEn: 'Prepare One Calm Room',
    titleZh: '准备安心房间',
    action: 'Create one calm, comfortable room at home before labor starts.',
    whenToUse: 'Do this before labor so there is at least one settled, restful space to return to.',
    howTo:
      'Lean into nesting enough to make one room feel safe, comfortable, and emotionally steady.',
    tags: ['prep', 'environment'],
  }),
  createActionCard({
    id: 'action-car-seat-practice',
    lessonIds: ['lesson-01'],
    sourceSections: ['prep-checklist'],
    titleEn: 'Practice the Car Seat',
    titleZh: '练习安全座椅',
    action: 'Install and practice the car seat before the due date.',
    whenToUse: 'Do this before birth so discharge day is not the first time you handle it.',
    howTo:
      'Install it early, practice buckling, and avoid thick snowsuits in the seat because straps can loosen.',
    tags: ['prep', 'safety'],
  }),
  createActionCard({
    id: 'action-pack-bag',
    lessonIds: ['lesson-01'],
    sourceSections: ['prep-checklist'],
    titleEn: 'Pack the Hospital Bag Intentionally',
    titleZh: '有意识地整理待产包',
    action: 'Pack the hospital bag with comfort and hydration in mind.',
    whenToUse: 'Do this before labor or induction so you are not packing while contractions are happening.',
    howTo:
      'Include lotion, comfortable pajamas, and a straw water bottle instead of only basic documents.',
    tags: ['prep', 'hospital-bag'],
    quickRef: true,
  }),
  createActionCard({
    id: 'action-pack-food-entertainment',
    lessonIds: ['lesson-01', 'lesson-02'],
    sourceSections: ['prep-checklist', 'induction'],
    titleEn: 'Bring Food and Entertainment',
    titleZh: '带好食物和消遣',
    action: 'Bring snacks, broth, and entertainment for hospital labor or long induction waits.',
    whenToUse: 'Use this for any hospital stay and especially for induction, when waiting can be long and unpredictable.',
    howTo:
      'Pack shelf-stable snacks, frozen broth that can be prepared at the hospital, and a movie or show for delays.',
    tags: ['hospital-bag', 'induction'],
    quickRef: true,
  }),
  createActionCard({
    id: 'action-postpartum-planning',
    lessonIds: ['lesson-01'],
    sourceSections: ['prep-checklist'],
    titleEn: 'Plan Postpartum Logistics Early',
    titleZh: '提前安排产后事项',
    action: 'Finish postpartum logistics before birth.',
    whenToUse: 'Do this before labor so feeding and pediatric logistics are not rushed afterward.',
    howTo:
      'Research galactagogues, choose the baby’s doctor, and confirm whether insurance covers breast-pump rental.',
    tags: ['postpartum', 'feeding'],
  }),
  createActionCard({
    id: 'action-keep-moving-in-triage',
    lessonIds: ['lesson-01'],
    sourceSections: ['triage'],
    titleEn: 'Keep Moving in Triage',
    titleZh: '分诊时持续活动',
    action: 'Keep the laboring parent moving instead of sitting still in triage.',
    whenToUse: 'Use this while waiting for admission or during assessment in triage.',
    howTo:
      'Favor walking, the birth ball, and back massage over sitting in one place for long stretches.',
    tags: ['triage', 'mobility'],
  }),
  createActionCard({
    id: 'action-wake-sleepy-baby',
    lessonIds: ['lesson-01'],
    sourceSections: ['triage'],
    titleEn: 'Wake a Sleepy Baby During Monitoring',
    titleZh: '监测时唤醒宝宝',
    action: 'Wake a sleepy baby during monitoring if variability is low for benign reasons.',
    whenToUse: 'Use this when the monitor pattern looks flat because the baby seems asleep.',
    howTo:
      'Offer apple juice or ice chips and chewing ice to stimulate movement before staff overreact.',
    tags: ['triage', 'fetal-monitoring'],
  }),
  createActionCard({
    id: 'action-eyes-up',
    lessonIds: ['lesson-01'],
    sourceSections: ['triage'],
    titleEn: 'Use the Eyes Up Reset',
    titleZh: '使用向上看重置法',
    action: 'Use the “Eyes Up” reset when stress or overthinking spikes.',
    whenToUse: 'Use it during labor or stressful conversations when your brain feels locked into fear.',
    howTo:
      'Look upward while breathing or thinking to shift the brain toward a more relaxed, creative state.',
    tags: ['coping', 'mental-state'],
  }),
  createActionCard({
    id: 'action-sticky-note-visualization',
    lessonIds: ['lesson-01'],
    sourceSections: ['triage'],
    titleEn: 'Use Sticky-Note Visualization',
    titleZh: '使用便利贴想象法',
    action: 'Use sticky notes about life with the baby as a grounding tool during labor.',
    whenToUse: 'Use this during labor coping when focus starts collapsing inward.',
    howTo:
      'Put notes on the wall about things to do with the baby after birth and use them as a breathing and meditation prompt.',
    tags: ['coping', 'mental-state'],
  }),
  createActionCard({
    id: 'action-ask-who-is-in-room',
    lessonIds: ['lesson-01', 'lesson-02'],
    sourceSections: ['hospital-environment', 'question-checklist'],
    titleEn: 'Ask Who Is in the Room',
    titleZh: '问清楚进房间的人是谁',
    action: 'Ask who each provider is any time new staff enter or propose a procedure.',
    whenToUse: 'Use this during labor whenever new staff arrive or a procedure is discussed.',
    howTo:
      'Ask whether they are an attending, resident, or student, and request a different clinician if desired.',
    tags: ['communication', 'hospital-team'],
  }),
  createActionCard({
    id: 'action-use-question-checklist',
    lessonIds: ['lesson-02'],
    sourceSections: ['question-checklist'],
    titleEn: 'Use the Intervention Question Checklist',
    titleZh: '使用医疗提问清单',
    action: 'Use the medical intervention question checklist before agreeing to a new procedure.',
    whenToUse:
      'Use this before agreeing to induction, C-section, episiotomy, or any unexpected intervention.',
    howTo:
      'Ask what it is, why it is needed, risks and benefits, alternatives, worst case if declined, who will do it, and recovery impact.',
    tags: ['communication', 'consent'],
    quickRef: true,
  }),
  createActionCard({
    id: 'action-request-telemetry',
    lessonIds: ['lesson-02'],
    sourceSections: ['monitoring-and-mobility'],
    titleEn: 'Request Wireless Telemetry',
    titleZh: '主动要求无线监护',
    action: 'Ask for wireless telemetry proactively when monitoring is required but movement still matters.',
    whenToUse: 'Use this when fetal monitoring is needed and you want to preserve walking or shower access.',
    howTo:
      'Ask directly instead of waiting for staff to offer it, because convenience for staff may otherwise win.',
    tags: ['mobility', 'fetal-monitoring'],
    quickRef: true,
  }),
  createActionCard({
    id: 'action-request-high-iv',
    lessonIds: ['lesson-02'],
    sourceSections: ['iv-and-emergencies'],
    titleEn: 'Ask for the IV Higher on the Arm',
    titleZh: '要求把 IV 扎高一点',
    action: 'Request IV placement higher on the arm if an IV is necessary.',
    whenToUse: 'Use this if an IV must be inserted but mobility still matters.',
    howTo:
      'Ask for placement up the arm instead of the hand or wrist so walking and movement stay easier.',
    tags: ['iv', 'mobility'],
  }),
  createActionCard({
    id: 'action-decline-unneeded-augmentation',
    lessonIds: ['lesson-02'],
    sourceSections: ['augmentation'],
    titleEn: 'Push Back on Unneeded Augmentation',
    titleZh: '拒绝不必要的加强产程',
    action: 'Push back on unnecessary augmentation when labor is already progressing and mother and baby are okay.',
    whenToUse: 'Use this when Pitocin is being increased despite reassuring progress and status.',
    howTo:
      'Calmly refuse escalation and ask staff to explain the real indication instead of defaulting to scheduling convenience.',
    tags: ['augmentation', 'consent'],
  }),
  createActionCard({
    id: 'action-request-check-on-body-signals',
    lessonIds: ['lesson-02'],
    sourceSections: ['augmentation'],
    titleEn: 'Ask for a Check When Body Signals Change',
    titleZh: '身体信号突变时要求检查',
    action: 'Ask for a cervical check when the body suddenly changes.',
    whenToUse:
      'Use this if there is a strong urge to poop or involuntary descending and grunting sounds even if the last exam was recent.',
    howTo:
      'Tell the nurse immediately that the body is bearing down and ask to be checked.',
    tags: ['body-signals', 'second-stage'],
    quickRef: true,
  }),
  createActionCard({
    id: 'action-relax-for-ecv',
    lessonIds: ['lesson-02'],
    sourceSections: ['special-cases'],
    titleEn: 'Relax Deeply for ECV',
    titleZh: '做外倒转前先深度放松',
    action: 'Get the body deeply relaxed before an external version attempt.',
    whenToUse: 'Use this if an ECV is attempted for a breech baby.',
    howTo:
      'Use full-body release, hypnosis, or other relaxation methods to reduce tension during the maneuver.',
    tags: ['ecv', 'positioning'],
  }),
  createActionCard({
    id: 'action-counter-pressure',
    lessonIds: ['lesson-02'],
    sourceSections: ['partner-support'],
    titleEn: 'Apply Counter Pressure',
    titleZh: '提供反向压力',
    action: 'Apply counter pressure for back labor.',
    whenToUse: 'Use this when the laboring parent has strong low-back pain.',
    howTo:
      'Have her lean forward and press firmly on the upper buttock or hip-pocket bones to relieve pressure and help fetal positioning.',
    tags: ['partner-support', 'back-labor'],
    quickRef: true,
  }),
  createActionCard({
    id: 'action-house-breathing',
    lessonIds: ['lesson-02'],
    sourceSections: ['partner-support'],
    titleEn: 'Use the Word "House"',
    titleZh: '用 House 呼吸法暂停用力',
    action: 'Cue the word “House” to stop early pushing.',
    whenToUse: 'Use this when she desperately wants to push before the team says it is time.',
    howTo:
      'Have her say “House” out loud because that mouth shape discourages bearing down.',
    tags: ['partner-support', 'breathing'],
    quickRef: true,
  }),
  createActionCard({
    id: 'action-change-positions',
    lessonIds: ['lesson-02'],
    sourceSections: ['partner-support', 'monitoring-and-mobility'],
    titleEn: 'Keep Changing Positions',
    titleZh: '持续更换姿势',
    action: 'Keep changing positions to stay active throughout labor when it is safe.',
    whenToUse: 'Use this throughout labor, especially if labor slows or the parent gets stuck in bed.',
    howTo:
      'Rotate among squatting, birth ball, toilet, shower, walking, and other gravity-friendly positions instead of staying flat in bed.',
    tags: ['mobility', 'partner-support'],
    quickRef: true,
  }),
  createActionCard({
    id: 'action-trust-downward-signals',
    lessonIds: ['lesson-02'],
    sourceSections: ['augmentation', 'partner-support'],
    titleEn: 'Trust Downward Signals',
    titleZh: '相信身体向下的信号',
    action: 'Trust the body’s downward pushing signals near transition and second stage.',
    whenToUse: 'Use this when pressure, involuntary sounds, or strong downward sensations appear.',
    howTo:
      'Treat spontaneous downward pressure and involuntary sounds as meaningful information, not something to ignore.',
    tags: ['body-signals', 'partner-support'],
    quickRef: true,
  }),
]

const warningCards = [
  createWarningCard({
    id: 'warning-preterm-water-break',
    lessonIds: ['lesson-01'],
    sourceSections: ['hospital-timing'],
    titleEn: 'Water Breaks Before 37 Weeks',
    titleZh: '37 周前破水',
    sign: 'Water breaks before 37 weeks.',
    whyItMatters: 'The lesson treats this as a preterm labor warning.',
    whatToDo: 'Go to the hospital immediately.',
    tags: ['preterm', 'water-break'],
  }),
  createWarningCard({
    id: 'warning-bad-fluid-smell',
    lessonIds: ['lesson-01'],
    sourceSections: ['hospital-timing'],
    titleEn: 'Bad-Smelling Amniotic Fluid',
    titleZh: '羊水有异味',
    sign: 'Amniotic fluid smells bad.',
    whyItMatters:
      'Bad-smelling fluid can suggest a problem and should not be watched casually at home.',
    whatToDo: 'Go in for immediate evaluation.',
    tags: ['water-break', 'amniotic-fluid'],
  }),
  createWarningCard({
    id: 'warning-abnormal-fluid-color',
    lessonIds: ['lesson-01'],
    sourceSections: ['hospital-timing'],
    titleEn: 'Abnormal Amniotic Fluid Color',
    titleZh: '羊水颜色异常',
    sign: 'Amniotic fluid has unusual color.',
    whyItMatters: 'Abnormal color may mean contamination or fetal stress.',
    whatToDo: 'Go in for immediate evaluation and tell staff what color you saw.',
    tags: ['water-break', 'amniotic-fluid'],
  }),
  createWarningCard({
    id: 'warning-meconium-fluid',
    lessonIds: ['lesson-01', 'lesson-02'],
    sourceSections: ['hospital-timing', 'monitoring-and-mobility'],
    titleEn: 'Meconium in the Fluid',
    titleZh: '羊水里疑似有胎便',
    sign: 'Amniotic fluid appears to contain meconium.',
    whyItMatters:
      'Meconium is a specific high-attention case that usually triggers continuous monitoring.',
    whatToDo: 'Go in and tell staff you suspect meconium in the fluid.',
    tags: ['water-break', 'fetal-monitoring'],
  }),
  createWarningCard({
    id: 'warning-headache',
    lessonIds: ['lesson-01'],
    sourceSections: ['hospital-timing'],
    titleEn: 'Persistent Headache',
    titleZh: '持续性头痛',
    sign: 'Persistent headache.',
    whyItMatters: 'The lesson lists this as a non-labor warning symptom that still needs care.',
    whatToDo: 'Call or go in for medical assessment.',
    tags: ['pregnancy-warning'],
  }),
  createWarningCard({
    id: 'warning-swelling',
    lessonIds: ['lesson-01'],
    sourceSections: ['hospital-timing'],
    titleEn: 'Sudden Swelling',
    titleZh: '面部或肢体突然肿胀',
    sign: 'Sudden swelling of the face or limbs.',
    whyItMatters: 'Sudden swelling is flagged as a symptom that should not be ignored.',
    whatToDo: 'Seek prompt medical evaluation.',
    tags: ['pregnancy-warning'],
  }),
  createWarningCard({
    id: 'warning-vision-spots',
    lessonIds: ['lesson-01'],
    sourceSections: ['hospital-timing'],
    titleEn: 'Vision Spots or Speckles',
    titleZh: '视野有斑点',
    sign: 'Visual spots or speckles.',
    whyItMatters: 'Vision changes are listed as a symptom that warrants care.',
    whatToDo: 'Call the provider or go in promptly.',
    tags: ['pregnancy-warning'],
  }),
  createWarningCard({
    id: 'warning-itchy-feet',
    lessonIds: ['lesson-01'],
    sourceSections: ['hospital-timing'],
    titleEn: 'Itchy Feet',
    titleZh: '脚部瘙痒',
    sign: 'Itchy feet.',
    whyItMatters: 'The lesson specifically calls this out as a symptom worth evaluating.',
    whatToDo: 'Contact the provider and ask to be assessed.',
    tags: ['pregnancy-warning'],
  }),
  createWarningCard({
    id: 'warning-fever',
    lessonIds: ['lesson-01'],
    sourceSections: ['hospital-timing'],
    titleEn: 'Fever',
    titleZh: '发烧',
    sign: 'Fever.',
    whyItMatters: 'Fever is listed as a symptom that needs evaluation during pregnancy or labor.',
    whatToDo: 'Contact the provider or go to the hospital.',
    tags: ['pregnancy-warning'],
  }),
  createWarningCard({
    id: 'warning-vomiting',
    lessonIds: ['lesson-01'],
    sourceSections: ['hospital-timing'],
    titleEn: 'Vomiting',
    titleZh: '呕吐',
    sign: 'Vomiting.',
    whyItMatters: 'The lesson includes vomiting in the warning-symptom list.',
    whatToDo: 'Contact the provider or go in if symptoms persist.',
    tags: ['pregnancy-warning'],
  }),
  createWarningCard({
    id: 'warning-burning-urination',
    lessonIds: ['lesson-01'],
    sourceSections: ['hospital-timing'],
    titleEn: 'Burning with Urination',
    titleZh: '排尿灼痛',
    sign: 'Burning with urination.',
    whyItMatters:
      'This could point to a urinary tract infection, which the lesson says warrants medical care.',
    whatToDo: 'Call the provider or go in for assessment.',
    tags: ['pregnancy-warning', 'infection'],
  }),
]

export const cards = [
  ...medicalTerms,
  ...ruleCards,
  ...actionCards,
  ...warningCards,
]

export const cardsById = Object.fromEntries(cards.map((card) => [card.id, card]))
