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
  definitionZh,
  context,
  contextZh,
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
      summaryEn: definition,
      summaryZh: definitionZh,
      bullets: [definition, context],
      bulletsEn: [definition, context],
      bulletsZh: [definitionZh, contextZh],
      context,
      contextEn: context,
      contextZh,
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
  explanationZh,
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
      summaryEn: `${keyNumber}: ${explanation}`,
      summaryZh: `${keyNumber}：${explanationZh}`,
      bullets: [keyNumber, explanation],
      bulletsEn: [keyNumber, explanation],
      bulletsZh: [keyNumber, explanationZh],
      context: explanation,
      contextEn: explanation,
      contextZh: explanationZh,
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
  actionZh,
  whenToUse,
  whenToUseZh,
  howTo,
  howToZh,
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
      summaryEn: action,
      summaryZh: actionZh,
      bullets: [whenToUse, howTo],
      bulletsEn: [whenToUse, howTo],
      bulletsZh: [whenToUseZh, howToZh],
      context: whenToUse,
      contextEn: whenToUse,
      contextZh: whenToUseZh,
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
  signZh,
  whyItMatters,
  whyItMattersZh,
  whatToDo,
  whatToDoZh,
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
      summaryEn: whyItMatters,
      summaryZh: whyItMattersZh,
      bullets: [sign, whatToDo],
      bulletsEn: [sign, whatToDo],
      bulletsZh: [signZh, whatToDoZh],
      context: whatToDo,
      contextEn: whatToDo,
      contextZh: whatToDoZh,
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
    definitionZh:
      '一种在孕期筛查中会关注的细菌结果；若为阳性，通常在开始临产或破水后需要静脉抗生素。',
    context:
      'Lesson 01 ties GBS-positive status to immediate hospital evaluation after water breaks, and Lesson 02 lists it as a common reason an IV may be needed.',
    contextZh:
      '第 01 课把 GBS 阳性列为破水后应立即去医院评估的情况，第 02 课则把它列为常见需要 IV 的原因之一。',
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
    definitionZh:
      '宝宝出生前后的第一泡胎便；如果出现在羊水里，往往提示需要更密切地监测胎儿。',
    context:
      'The lessons mention meconium as an abnormal fluid finding and a reason continuous monitoring may become necessary.',
    contextZh:
      '课程把胎便视为羊水异常的信号，也是可能需要持续胎心监护的原因。',
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
    definitionZh:
      '医院在正式入院前进行接诊与评估的区域，医护会先判断产程进展，再决定是否收住。',
    context:
      'The lesson describes walking, baseline monitoring, and waiting in triage before a room is assigned.',
    contextZh:
      '课程提到，在分诊区常会先走动、做基线监测，并等待安排病房。',
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
    definitionZh:
      '在脊柱附近实施的区域麻醉，可减轻分娩疼痛，同时让产妇保持清醒。',
    context:
      'Lesson 01 covers timing, mobility limits, turning, and spinal headache risk, while Lesson 02 notes it as a reason an IV may be inserted.',
    contextZh:
      '第 01 课讲到无痛的时机、活动受限、翻身和脊髓性头痛风险，第 02 课提到它也是需要 IV 的原因之一。',
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
    definitionZh:
      '用于治疗硬膜外麻醉后罕见脊髓性头痛的一种处理方式。',
    context:
      'The lesson explicitly names a blood patch as the treatment for a severe post-epidural spinal headache.',
    contextZh:
      '课程明确指出，严重的无痛后脊髓性头痛通常用血贴治疗。',
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
    definitionZh:
      '人工合成的催产素，用于在引产或加强产程时增强宫缩。',
    context:
      'Lesson 01 explains Pitocin for weak or stalled contractions; Lesson 02 discusses pressure to increase it during augmentation.',
    contextZh:
      '第 01 课解释了宫缩无力或停滞时会用到 Pitocin；第 02 课则讨论了加强产程时常被要求继续加量。',
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
    definitionZh:
      '在培训中的医生，可能会在监督下参与分娩照护。',
    context:
      'The classes stress asking who is in the room and whether the person is an attending, resident, or student before agreeing to procedures.',
    contextZh:
      '课程强调，在同意操作前要先问清楚进房间的是主治、住院医生还是学生。',
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
    definitionZh:
      '一种无线监护方式，让产妇在医护继续追踪胎儿状况时仍能走动或淋浴。',
    context:
      'Lesson 02 says some hospitals have telemetry but parents often need to ask for it directly.',
    contextZh:
      '第 02 课说有些医院提供 telemetry，但往往需要家属或产妇主动提出。',
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
    definitionZh:
      '低风险产程中可用于间歇性听胎心的手持设备。',
    context:
      'The class contrasts Doppler checks every 15 minutes with automatic continuous monitoring.',
    contextZh:
      '课程把每 15 分钟一次的多普勒听诊，与默认持续监护做了对比。',
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
    definitionZh:
      '用于补液、抗生素、给药、无痛准备或紧急通路的静脉留置针。',
    context:
      'Lesson 02 explains when IVs are actually needed and how placement affects mobility.',
    contextZh:
      '第 02 课解释了真正需要 IV 的场景，以及扎针位置会如何影响活动。',
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
    definitionZh:
      '在情况立刻变得危险时实施的高度紧急剖腹产。',
    context:
      'The class says true crash C-sections are rare and should not be used casually to justify unnecessary early IV placement.',
    contextZh:
      '课程说真正的 crash C-section 很少见，不该被随意拿来当作提早放 IV 的理由。',
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
    definitionZh:
      '在自然发动前，用医疗方式让产程开始。',
    context:
      'Lesson 02 explains common reasons for induction and warns that the cervical-ripening stage is often slow.',
    contextZh:
      '第 02 课解释了常见的引产原因，也提醒宫颈熟化阶段通常很慢。',
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
    definitionZh:
      '引产时以小剂量用于软化或熟化宫颈的药物。',
    context:
      'The lesson lists Misoprostol as one of the first tools used in the long cervical-ripening stage.',
    contextZh:
      '课程把米索前列醇列为漫长宫颈熟化阶段中常见的第一步工具之一。',
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
    definitionZh:
      '在引产中用于机械性扩张宫颈的球囊导管。',
    context:
      'Lesson 02 presents a Foley balloon as the physical cervical-ripening option alongside medication.',
    contextZh:
      '第 02 课把 Foley 球囊列为与药物并列的物理性宫颈熟化方式。',
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
    definitionZh:
      '用于引产时帮助宫颈熟化的药栓。',
    context:
      'The lesson notes Cervidil as another ripening tool and mentions it may slightly increase the chance of triggering contractions.',
    contextZh:
      '课程提到 Cervidil 也是熟化工具之一，并提醒它可能略微增加引发宫缩的机会。',
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
    definitionZh:
      '在产程已经开始后进一步加强宫缩，常见方式是增加 Pitocin。',
    context:
      'Lesson 02 says the laboring parent can refuse augmentation if labor is progressing and mother and baby are doing well.',
    contextZh:
      '第 02 课说，如果产程本来就在前进，且母婴情况稳定，产妇可以拒绝不必要的加强产程。',
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
    definitionZh:
      '在分娩前尝试把臀位宝宝转成头位的外部手法。',
    context:
      'The lesson recommends deep relaxation to improve the odds of success during an ECV.',
    contextZh:
      '课程建议在做外倒转时尽量深度放松，以提高成功率。',
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
    definitionZh:
      '有时会在阴道分娩中帮助娩出宝宝的器械。',
    context:
      'Lesson 02 says forceps are usually attempted only when the predicted success rate is very high.',
    contextZh:
      '第 02 课说，通常只有在医生判断成功率非常高时才会考虑产钳。',
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
    definitionZh:
      '经腹部和子宫进行的手术分娩方式。',
    context:
      'Lesson 02 focuses on spacing implications for the next pregnancy after a C-section.',
    contextZh:
      '第 02 课重点提到，剖腹产后下一次怀孕的间隔需要特别考虑。',
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
    definitionZh:
      '胎儿体型比相应孕周预期更小。',
    context:
      'The lesson names SGA as one reason an induction may be suggested.',
    contextZh:
      '课程把 SGA 列为医生可能建议引产的原因之一。',
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
    definitionZh:
      '产后用来帮助促进泌乳的食物或支持方式。',
    context:
      'Lesson 01 includes researching galactagogues in the pre-birth planning checklist.',
    contextZh:
      '第 01 课把提前了解催乳食物与支持方式，列入产前准备清单。',
    tags: ['postpartum', 'feeding'],
  }),
  createMedicalCard({
    id: 'term-elective-c-section',
    lessonIds: ['lesson-03'],
    sourceSections: ['understanding-c-sections'],
    termEn: 'Elective C-section',
    termZh: '择期剖腹产',
    definition:
      'A planned cesarean booked ahead of time for a known situation or medical reason.',
    definitionZh:
      '因已知情况或医疗原因，提前预约安排好的剖腹产。',
    context:
      'Lesson 03 contrasts elective, emergency, and crash C-sections so families understand they are not the same level of urgency.',
    contextZh:
      '第 03 课区分了择期、急诊和 crash 剖腹产，帮助家长理解它们的紧急程度完全不同。',
    tags: ['c-section', 'surgery'],
  }),
  createMedicalCard({
    id: 'term-crash-c-section-lesson3',
    lessonIds: ['lesson-03'],
    sourceSections: ['understanding-c-sections'],
    termEn: 'Crash C-section',
    termZh: '紧急剖腹产',
    definition:
      'A true obstetric emergency where the baby must be delivered immediately.',
    definitionZh:
      '真正的产科急症，宝宝必须立刻娩出。',
    context:
      'Lesson 03 gives cord prolapse as an example and notes a hospital record of 59 seconds from detection to birth.',
    contextZh:
      '第 03 课以脐带脱垂为例，并提到该院最快纪录是从发现到出生仅 59 秒。',
    tags: ['c-section', 'emergency'],
    quickRef: true,
  }),
  createMedicalCard({
    id: 'term-dermabond',
    lessonIds: ['lesson-03'],
    sourceSections: ['understanding-c-sections'],
    termEn: 'Dermabond',
    termZh: 'Dermabond 手术胶',
    definition:
      'A surgical glue that may be used over an incision instead of only relying on dissolvable stitches.',
    definitionZh:
      '一种可用于覆盖手术切口的外科胶，不只是单纯依靠可吸收缝线。',
    context:
      'Lesson 03 says some families consider it because it may reduce scarring and infection risk, though it can cost extra.',
    contextZh:
      '第 03 课说有些家庭会考虑使用它，因为可能减少疤痕和感染风险，但往往需要额外付费。',
    tags: ['c-section', 'recovery'],
  }),
  createMedicalCard({
    id: 'term-peanut-ball',
    lessonIds: ['lesson-03'],
    sourceSections: ['birthing-unit-and-triage'],
    termEn: 'Peanut Ball',
    termZh: '花生球',
    definition:
      'A peanut-shaped support ball placed between the legs to help keep the pelvis open during labor.',
    definitionZh:
      '一种花生形状的辅助球，可夹在双腿之间，帮助产程中维持骨盆打开。',
    context:
      'Lesson 03 highlights it as especially useful after an epidural when mobility is reduced.',
    contextZh:
      '第 03 课特别提到，打完无痛、活动受限时，它尤其有帮助。',
    tags: ['mobility', 'labor-support'],
  }),
  createMedicalCard({
    id: 'term-golden-hour',
    lessonIds: ['lesson-03'],
    sourceSections: ['pushing-and-golden-hour'],
    termEn: 'Golden Hour',
    termZh: '黄金两小时 / 黄金时段',
    definition:
      'The immediate period after birth when bonding, skin-to-skin, and feeding are prioritized.',
    definitionZh:
      '宝宝出生后的最初时段，会优先安排 bonding、肌肤接触和喂养。',
    context:
      'Lesson 03 says weighing and measuring may be delayed for up to two hours to protect this period.',
    contextZh:
      '第 03 课说，为了保护这段时间，称重和量身长可能会延后最多两小时。',
    tags: ['postpartum', 'bonding'],
    quickRef: true,
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
    explanationZh:
      '当宫缩每 5 分钟一次、每次持续 1 分钟，并连续 1 小时时，就该去医院。',
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
    explanationZh:
      '即使没有完全符合 5-1-1，只要宫缩已经强到产妇无法说话或无法好好呼吸，也该出发去医院。',
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
    explanationZh:
      '如果在 37 周前破水，要按早产警讯处理，并立刻去医院。',
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
    explanationZh:
      '课程把 37 到 42 周视为足月，并补充说东亚人平均孕周常更接近 39 周。',
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
    explanationZh:
      '足月时即使破水后还没开始宫缩，只要羊水有异味、颜色异常，或产妇 GBS 阳性，也可能需要立刻入院。',
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
    explanationZh:
      '分诊时最初的胎心监测通常约 30 分钟，医护会据此决定下一步。',
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
    explanationZh:
      '通常要到宫口大约 3 到 4 公分、宫缩也强而规律时，才会正式分到病房入院。',
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
    explanationZh:
      '当产程从还能应付转向明显受苦时，通常才是讨论无痛的合理时机，常见大约在 3 公分左右。',
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
    explanationZh:
      '课程提醒，如果无痛打得太早，可能因为活动度下降而提高剖腹产风险。',
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
    explanationZh:
      '打完无痛后应规律翻身，避免神经长时间受压。',
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
    explanationZh:
      '对于低风险产程，课程更倾向每约 15 分钟一次的间歇性多普勒听诊，而不是默认持续监护。',
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
    explanationZh:
      '如果宫口已经大约 2 公分，课程说人工破水可能会和引产一起进行。',
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
    explanationZh:
      '课程认为只有在临床上判断成功率非常高时，才适合考虑产钳。',
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
    explanationZh:
      '剖腹产后，下一次怀孕通常最好间隔 18 到 24 个月。',
    tags: ['c-section', 'family-planning'],
    quickRef: true,
  }),
  createRuleCard({
    id: 'rule-triage-40-minutes',
    lessonIds: ['lesson-03'],
    sourceSections: ['birthing-unit-and-triage'],
    titleEn: 'Triage Monitoring Window',
    titleZh: '分诊监护时长',
    label: 'Triage monitoring window',
    keyNumber: 'About 40 minutes',
    explanation:
      'Arrival triage often includes about 40 minutes on the monitor before the next decision is made.',
    explanationZh:
      '到院分诊后，通常会先上监护大约 40 分钟，再决定下一步。',
    tags: ['triage', 'fetal-monitoring'],
    quickRef: true,
  }),
  createRuleCard({
    id: 'rule-golden-hour-delay',
    lessonIds: ['lesson-03'],
    sourceSections: ['pushing-and-golden-hour'],
    titleEn: 'Delayed Weighing Window',
    titleZh: '延后称重窗口',
    label: 'Delayed weighing window',
    keyNumber: 'Up to 2 hours',
    explanation:
      'Weighing and measuring may be delayed up to two hours to protect skin-to-skin and early feeding.',
    explanationZh:
      '为了保护肌肤接触和早期喂养，称重和量身长可能会延后最多两小时。',
    tags: ['golden-hour', 'bonding'],
    quickRef: true,
  }),
  createRuleCard({
    id: 'rule-day-2-crash',
    lessonIds: ['lesson-03'],
    sourceSections: ['recovery-first-days'],
    titleEn: 'Day 2-3 Hormone Crash',
    titleZh: '第 2-3 天激素崩溃期',
    label: 'Day 2-3 hormone crash',
    keyNumber: 'Day 2-3',
    explanation:
      'The lesson warns that day 2 to 3 is often when hormones crash, milk comes in, and emotions spike.',
    explanationZh:
      '课程提醒，第 2 到 3 天常是激素下滑、泌乳开始、情绪最容易爆发的时候。',
    tags: ['postpartum', 'recovery'],
    quickRef: true,
  }),
  createRuleCard({
    id: 'rule-c-section-no-driving',
    lessonIds: ['lesson-03'],
    sourceSections: ['recovery-first-days'],
    titleEn: 'Driving Restriction After C-section',
    titleZh: '剖腹产后禁驾时长',
    label: 'Driving restriction after C-section',
    keyNumber: '~1 month',
    explanation:
      'After a C-section, driving is usually avoided for about one month because sudden braking can be dangerous.',
    explanationZh:
      '剖腹产后通常约 1 个月内不建议开车，因为紧急刹车会有风险。',
    tags: ['c-section', 'recovery'],
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
    actionZh: '不要凭感觉猜，开始有产兆时要实际计时宫缩。',
    whenToUse: 'Use this when labor may be starting and you need an objective trigger.',
    whenToUseZh: '怀疑产程开始、需要客观判断是否该出发时使用。',
    howTo:
      'Track frequency, duration, and total pattern length, then compare it against the 5-1-1 rule.',
    howToZh: '记录频率、持续时间和整体模式，再对照 5-1-1 法则。',
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
    actionZh: '分不清是不是破水时，先确认羊水是否真的破了。',
    whenToUse: 'Use this when fluid leakage is ambiguous and you are not sure it was amniotic fluid.',
    whenToUseZh: '出现漏液但不确定是不是羊水时使用。',
    howTo:
      'Put tissue or a pad in the underwear, stand up, lift the belly, and cough; a fresh gush suggests ruptured membranes.',
    howToZh:
      '把纸巾或护垫放进内裤，站起来托住肚子并咳嗽；如果又有一股新液体流出，比较像是真的破水。',
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
    actionZh: '在临产前把生活和行政上的尾巴尽量收干净。',
    whenToUse: 'Do this in the final weeks before birth so nagging chores do not become mental friction during labor.',
    whenToUseZh: '孕晚期就做，避免待产时还被琐事牵住心神。',
    howTo:
      'Finish taxes, work handoffs, haircuts, paperwork, and other lingering to-dos while there is still time.',
    howToZh:
      '趁还有时间，把报税、工作交接、理发、文件等拖着没做的事处理完。',
    tags: ['prep', 'mental-load'],
  }),
  createActionCard({
    id: 'action-prepare-safe-room',
    lessonIds: ['lesson-01'],
    sourceSections: ['prep-checklist'],
    titleEn: 'Prepare One Calm Room',
    titleZh: '准备安心房间',
    action: 'Create one calm, comfortable room at home before labor starts.',
    actionZh: '在家先准备一个让人安心、舒服的房间。',
    whenToUse: 'Do this before labor so there is at least one settled, restful space to return to.',
    whenToUseZh: '临产前完成，这样至少有一个稳定、能让人休息的空间可回去。',
    howTo:
      'Lean into nesting enough to make one room feel safe, comfortable, and emotionally steady.',
    howToZh:
      '顺着筑巢本能，把一个房间布置得安全、舒适、情绪上也安定。',
    tags: ['prep', 'environment'],
  }),
  createActionCard({
    id: 'action-car-seat-practice',
    lessonIds: ['lesson-01'],
    sourceSections: ['prep-checklist'],
    titleEn: 'Practice the Car Seat',
    titleZh: '练习安全座椅',
    action: 'Install and practice the car seat before the due date.',
    actionZh: '预产期前就把安全座椅装好并实际练习。',
    whenToUse: 'Do this before birth so discharge day is not the first time you handle it.',
    whenToUseZh: '产前完成，避免出院当天第一次上手。',
    howTo:
      'Install it early, practice buckling, and avoid thick snowsuits in the seat because straps can loosen.',
    howToZh:
      '提早安装，练习扣带，也不要让宝宝穿厚雪衣坐安全座椅，以免肩带松掉。',
    tags: ['prep', 'safety'],
  }),
  createActionCard({
    id: 'action-pack-bag',
    lessonIds: ['lesson-01'],
    sourceSections: ['prep-checklist'],
    titleEn: 'Pack the Hospital Bag Intentionally',
    titleZh: '有意识地整理待产包',
    action: 'Pack the hospital bag with comfort and hydration in mind.',
    actionZh: '整理待产包时，把舒适和补水放在优先位置。',
    whenToUse: 'Do this before labor or induction so you are not packing while contractions are happening.',
    whenToUseZh: '在临产或引产前就准备好，不要等宫缩开始了才临时打包。',
    howTo:
      'Include lotion, comfortable pajamas, and a straw water bottle instead of only basic documents.',
    howToZh:
      '除了文件，也放入润肤乳、舒适睡衣和吸管水瓶等真正会用到的物品。',
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
    actionZh: '去医院待产或引产时，带上食物和打发时间的东西。',
    whenToUse: 'Use this for any hospital stay and especially for induction, when waiting can be long and unpredictable.',
    whenToUseZh: '任何住院待产都适用，尤其引产时等待时间常常又长又难预料。',
    howTo:
      'Pack shelf-stable snacks, frozen broth that can be prepared at the hospital, and a movie or show for delays.',
    howToZh:
      '准备耐放零食、可在医院冲煮的高汤，以及电影或节目来应付延迟。',
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
    actionZh: '把产后安排尽量在生产前就处理好。',
    whenToUse: 'Do this before labor so feeding and pediatric logistics are not rushed afterward.',
    whenToUseZh: '产前完成，这样产后不会在喂养和儿科安排上手忙脚乱。',
    howTo:
      'Research galactagogues, choose the baby’s doctor, and confirm whether insurance covers breast-pump rental.',
    howToZh:
      '先了解催乳食物、选好儿科医生，并确认保险是否覆盖吸奶器租借。',
    tags: ['postpartum', 'feeding'],
  }),
  createActionCard({
    id: 'action-keep-moving-in-triage',
    lessonIds: ['lesson-01'],
    sourceSections: ['triage'],
    titleEn: 'Keep Moving in Triage',
    titleZh: '分诊时持续活动',
    action: 'Keep the laboring parent moving instead of sitting still in triage.',
    actionZh: '在分诊时尽量持续活动，不要一直坐着不动。',
    whenToUse: 'Use this while waiting for admission or during assessment in triage.',
    whenToUseZh: '等待入院或在分诊评估期间使用。',
    howTo:
      'Favor walking, the birth ball, and back massage over sitting in one place for long stretches.',
    howToZh:
      '比起长时间坐着，更优先走路、坐分娩球和按压背部。',
    tags: ['triage', 'mobility'],
  }),
  createActionCard({
    id: 'action-wake-sleepy-baby',
    lessonIds: ['lesson-01'],
    sourceSections: ['triage'],
    titleEn: 'Wake a Sleepy Baby During Monitoring',
    titleZh: '监测时唤醒宝宝',
    action: 'Wake a sleepy baby during monitoring if variability is low for benign reasons.',
    actionZh: '若监测平平只是因为宝宝睡着了，就先试着把他唤醒。',
    whenToUse: 'Use this when the monitor pattern looks flat because the baby seems asleep.',
    whenToUseZh: '胎监看起来平、但怀疑只是宝宝在睡觉时使用。',
    howTo:
      'Offer apple juice or ice chips and chewing ice to stimulate movement before staff overreact.',
    howToZh:
      '可尝试喝苹果汁、吃冰块或咀嚼冰块，先刺激宝宝动一动，再避免医护过早反应。',
    tags: ['triage', 'fetal-monitoring'],
  }),
  createActionCard({
    id: 'action-eyes-up',
    lessonIds: ['lesson-01'],
    sourceSections: ['triage'],
    titleEn: 'Use the Eyes Up Reset',
    titleZh: '使用向上看重置法',
    action: 'Use the “Eyes Up” reset when stress or overthinking spikes.',
    actionZh: '在压力飙高或开始钻牛角尖时，使用“眼睛向上”的重置法。',
    whenToUse: 'Use it during labor or stressful conversations when your brain feels locked into fear.',
    whenToUseZh: '分娩中或紧张对话时，只要觉得脑子卡在恐惧里就可以用。',
    howTo:
      'Look upward while breathing or thinking to shift the brain toward a more relaxed, creative state.',
    howToZh:
      '一边呼吸或思考，一边把视线往上带，帮助大脑转回更放松、更有创造力的状态。',
    tags: ['coping', 'mental-state'],
  }),
  createActionCard({
    id: 'action-sticky-note-visualization',
    lessonIds: ['lesson-01'],
    sourceSections: ['triage'],
    titleEn: 'Use Sticky-Note Visualization',
    titleZh: '使用便利贴想象法',
    action: 'Use sticky notes about life with the baby as a grounding tool during labor.',
    actionZh: '分娩时可用写着宝宝出生后生活的便利贴来帮助自己落地。',
    whenToUse: 'Use this during labor coping when focus starts collapsing inward.',
    whenToUseZh: '当专注开始往内塌、需要重新安定下来时使用。',
    howTo:
      'Put notes on the wall about things to do with the baby after birth and use them as a breathing and meditation prompt.',
    howToZh:
      '把和宝宝出生后想做的事写在墙上的便利贴上，把它们当成呼吸和冥想的提示。',
    tags: ['coping', 'mental-state'],
  }),
  createActionCard({
    id: 'action-ask-who-is-in-room',
    lessonIds: ['lesson-01', 'lesson-02'],
    sourceSections: ['hospital-environment', 'question-checklist'],
    titleEn: 'Ask Who Is in the Room',
    titleZh: '问清楚进房间的人是谁',
    action: 'Ask who each provider is any time new staff enter or propose a procedure.',
    actionZh: '每次有新医护进来或提出操作时，都先问清楚对方是谁。',
    whenToUse: 'Use this during labor whenever new staff arrive or a procedure is discussed.',
    whenToUseZh: '分娩过程中只要有新人进房，或有人开始讨论操作，就可以用。',
    howTo:
      'Ask whether they are an attending, resident, or student, and request a different clinician if desired.',
    howToZh:
      '问清楚对方是主治、住院医生还是学生；如果你愿意，也可以要求换别的临床人员。',
    tags: ['communication', 'hospital-team'],
  }),
  createActionCard({
    id: 'action-use-question-checklist',
    lessonIds: ['lesson-02'],
    sourceSections: ['question-checklist'],
    titleEn: 'Use the Intervention Question Checklist',
    titleZh: '使用医疗提问清单',
    action: 'Use the medical intervention question checklist before agreeing to a new procedure.',
    actionZh: '在同意新的医疗操作前，先用一遍医疗提问清单。',
    whenToUse:
      'Use this before agreeing to induction, C-section, episiotomy, or any unexpected intervention.',
    whenToUseZh:
      '在答应引产、剖腹产、会阴侧切或任何突发医疗介入前使用。',
    howTo:
      'Ask what it is, why it is needed, risks and benefits, alternatives, worst case if declined, who will do it, and recovery impact.',
    howToZh:
      '依次问：这是什么、为什么需要、风险和好处、有没有替代方案、如果拒绝最坏会怎样、谁来做、恢复会受什么影响。',
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
    actionZh: '需要监护但又想保留活动自由时，主动要求无线监护。',
    whenToUse: 'Use this when fetal monitoring is needed and you want to preserve walking or shower access.',
    whenToUseZh: '医护说需要胎监，但你仍想保留走路或洗澡的空间时使用。',
    howTo:
      'Ask directly instead of waiting for staff to offer it, because convenience for staff may otherwise win.',
    howToZh:
      '不要等医护主动提供，直接开口问，因为临床流程常会先考虑他们自己的方便。',
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
    actionZh: '如果一定要扎 IV，就要求扎在手臂更高的位置。',
    whenToUse: 'Use this if an IV must be inserted but mobility still matters.',
    whenToUseZh: '必须放 IV、但活动能力仍然很重要时使用。',
    howTo:
      'Ask for placement up the arm instead of the hand or wrist so walking and movement stay easier.',
    howToZh:
      '请对方尽量避开手背和手腕，改扎在手臂上方，走动会更容易。',
    tags: ['iv', 'mobility'],
  }),
  createActionCard({
    id: 'action-decline-unneeded-augmentation',
    lessonIds: ['lesson-02'],
    sourceSections: ['augmentation'],
    titleEn: 'Push Back on Unneeded Augmentation',
    titleZh: '拒绝不必要的加强产程',
    action: 'Push back on unnecessary augmentation when labor is already progressing and mother and baby are okay.',
    actionZh: '如果产程本来就在前进，就对不必要的加强产程提出异议。',
    whenToUse: 'Use this when Pitocin is being increased despite reassuring progress and status.',
    whenToUseZh: '在母婴状态都稳定、但医护仍要继续加 Pitocin 时使用。',
    howTo:
      'Calmly refuse escalation and ask staff to explain the real indication instead of defaulting to scheduling convenience.',
    howToZh:
      '冷静表明暂不接受升级，请医护解释真正的医学指征，而不是只是为了排班或流程方便。',
    tags: ['augmentation', 'consent'],
  }),
  createActionCard({
    id: 'action-request-check-on-body-signals',
    lessonIds: ['lesson-02'],
    sourceSections: ['augmentation'],
    titleEn: 'Ask for a Check When Body Signals Change',
    titleZh: '身体信号突变时要求检查',
    action: 'Ask for a cervical check when the body suddenly changes.',
    actionZh: '当身体信号突然改变时，主动要求重新内诊检查。',
    whenToUse:
      'Use this if there is a strong urge to poop or involuntary descending and grunting sounds even if the last exam was recent.',
    whenToUseZh:
      '即使上一轮内诊刚做过，只要突然很想大便，或出现不自主往下用力、发 grunt 声时就用。',
    howTo:
      'Tell the nurse immediately that the body is bearing down and ask to be checked.',
    howToZh:
      '立刻告诉护士身体在往下用力，并要求重新检查。',
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
    actionZh: '做外倒转前，先让身体尽可能深度放松。',
    whenToUse: 'Use this if an ECV is attempted for a breech baby.',
    whenToUseZh: '计划尝试为臀位宝宝做外倒转时使用。',
    howTo:
      'Use full-body release, hypnosis, or other relaxation methods to reduce tension during the maneuver.',
    howToZh:
      '用全身放松、催眠或其他放松方法，尽量降低手法过程中身体的紧张。',
    tags: ['ecv', 'positioning'],
  }),
  createActionCard({
    id: 'action-counter-pressure',
    lessonIds: ['lesson-02'],
    sourceSections: ['partner-support'],
    titleEn: 'Apply Counter Pressure',
    titleZh: '提供反向压力',
    action: 'Apply counter pressure for back labor.',
    actionZh: '后腰痛明显时，用反向压力来帮忙。',
    whenToUse: 'Use this when the laboring parent has strong low-back pain.',
    whenToUseZh: '产妇下背痛很强时使用。',
    howTo:
      'Have her lean forward and press firmly on the upper buttock or hip-pocket bones to relieve pressure and help fetal positioning.',
    howToZh:
      '让她身体前倾，稳稳按压上臀部或髋后口袋的位置，减轻压力，也帮助胎位调整。',
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
    actionZh: '在太早想用力时，用“House”这个词帮助暂停。',
    whenToUse: 'Use this when she desperately wants to push before the team says it is time.',
    whenToUseZh: '她非常想推，但团队还没说可以开始用力时使用。',
    howTo:
      'Have her say “House” out loud because that mouth shape discourages bearing down.',
    howToZh:
      '让她大声说出“House”，因为这个口型会抑制往下憋力。',
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
    actionZh: '只要安全，就持续换姿势，让整个产程保持活动。',
    whenToUse: 'Use this throughout labor, especially if labor slows or the parent gets stuck in bed.',
    whenToUseZh: '整个产程都适用，尤其产程变慢或人被困在床上时。',
    howTo:
      'Rotate among squatting, birth ball, toilet, shower, walking, and other gravity-friendly positions instead of staying flat in bed.',
    howToZh:
      '在深蹲、分娩球、马桶、淋浴、走路等顺重力姿势之间轮换，不要一直平躺在床上。',
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
    actionZh: '接近转折期和第二产程时，要相信身体往下推的信号。',
    whenToUse: 'Use this when pressure, involuntary sounds, or strong downward sensations appear.',
    whenToUseZh: '一旦出现明显压力感、不自主发声，或强烈向下的感觉时使用。',
    howTo:
      'Treat spontaneous downward pressure and involuntary sounds as meaningful information, not something to ignore.',
    howToZh:
      '把这些自发向下的压力和声音当成重要信息，而不是一味压住不理。',
    tags: ['body-signals', 'partner-support'],
    quickRef: true,
  }),
  createActionCard({
    id: 'action-set-triage-timer',
    lessonIds: ['lesson-03'],
    sourceSections: ['birthing-unit-and-triage'],
    titleEn: 'Set a Silent Triage Timer',
    titleZh: '在分诊时设静音计时器',
    action: 'Set a silent timer when triage monitoring starts.',
    actionZh: '开始分诊监护时，自己设一个静音计时器。',
    whenToUse: 'Use this once you are connected to the monitor in triage.',
    whenToUseZh: '到院分诊、开始上监护后就可以用。',
    howTo:
      'Track roughly 40 minutes yourself so the waiting period feels less vague and you know when to ask what comes next.',
    howToZh:
      '自己记住大约 40 分钟的窗口，减少模糊等待感，也更知道何时可以主动问下一步。',
    tags: ['triage', 'self-advocacy'],
    quickRef: true,
  }),
  createActionCard({
    id: 'action-use-labor-circuit',
    lessonIds: ['lesson-03'],
    sourceSections: ['birthing-unit-and-triage'],
    titleEn: 'Use a Labor Movement Circuit',
    titleZh: '做产程活动循环',
    action: 'Rotate among movement tools to help labor keep progressing.',
    actionZh: '在不同活动方式之间轮换，帮助产程继续前进。',
    whenToUse: 'Use this in early labor or while waiting in the birthing unit if movement is allowed.',
    whenToUseZh: '产程早期或在产房等待时，只要允许活动就适用。',
    howTo:
      'Cycle through the exercise ball, peanut ball, shower, and other upright or open-pelvis positions instead of staying still.',
    howToZh:
      '在分娩球、花生球、淋浴和其他直立或打开骨盆的姿势之间轮换，不要一直静止不动。',
    tags: ['mobility', 'labor-support'],
    quickRef: true,
  }),
  createActionCard({
    id: 'action-expect-baby-appearance',
    lessonIds: ['lesson-03'],
    sourceSections: ['pushing-and-golden-hour'],
    titleEn: 'Expect a Blue or Cone-Shaped Baby at First',
    titleZh: '先预期宝宝可能发青或头型拉长',
    action: 'Prepare yourself so the baby’s first appearance does not cause unnecessary panic.',
    actionZh: '先做心理准备，避免宝宝刚出来的样子引发不必要恐慌。',
    whenToUse: 'Use this before pushing or birth so you know what can still be normal.',
    whenToUseZh: '在进入用力和分娩前就先了解，知道哪些现象仍属正常。',
    howTo:
      'Remember that temporary blue color and a cone-shaped head can be normal right after birth and usually improve after the first breath.',
    howToZh:
      '记住，刚出生时短暂发青和头型偏长常常是正常的，第一次呼吸后通常会慢慢改善。',
    tags: ['newborn', 'expectations'],
  }),
  createActionCard({
    id: 'action-sleep-on-day-1',
    lessonIds: ['lesson-03'],
    sourceSections: ['recovery-first-days'],
    titleEn: 'Sleep Aggressively on Day 1',
    titleZh: '第 1 天尽量猛睡',
    action: 'Use the sleepy first day to get as much rest as possible.',
    actionZh: '利用第 1 天宝宝爱睡的窗口，尽量多休息。',
    whenToUse: 'Use this during the first postpartum day when adrenaline is high but the baby is often still very sleepy.',
    whenToUseZh: '产后第 1 天、你还靠肾上腺素撑着、但宝宝通常还很爱睡时使用。',
    howTo:
      'Treat every quiet stretch as sleep time rather than social or administrative time.',
    howToZh:
      '把每段安静时间都当成补觉时间，而不是拿来社交或处理杂事。',
    tags: ['postpartum', 'recovery'],
    quickRef: true,
  }),
  createActionCard({
    id: 'action-take-stool-softeners',
    lessonIds: ['lesson-03'],
    sourceSections: ['recovery-first-days'],
    titleEn: 'Take the Stool Softeners',
    titleZh: '把软便剂吃上',
    action: 'Take stool softeners if they are offered during recovery.',
    actionZh: '恢复期如果医院有给软便剂，直接吃。',
    whenToUse: 'Use this during postpartum recovery, especially after pain meds, stitches, or a C-section.',
    whenToUseZh: '产后恢复期都适用，尤其用了止痛药、有缝线或经历剖腹产时。',
    howTo:
      'Do not try to tough it out. Early stool softening can make the first bowel movement much easier.',
    howToZh:
      '不要硬扛。早点软化大便，第一次排便会轻松很多。',
    tags: ['postpartum', 'recovery'],
    quickRef: true,
  }),
  createActionCard({
    id: 'action-screen-visitors',
    lessonIds: ['lesson-03'],
    sourceSections: ['hospital-logistics'],
    titleEn: 'Screen Visitors by Energy',
    titleZh: '按能量筛选访客',
    action: 'Only allow visitors who genuinely help recovery.',
    actionZh: '只让真正对恢复有帮助的人来探访。',
    whenToUse: 'Use this before and during the hospital stay when people ask to visit.',
    whenToUseZh: '住院前后，只要有人提出想来探望就适用。',
    howTo:
      'Ask whether this person will bring food, help, and calm, or whether they will create hosting pressure. Choose accordingly.',
    howToZh:
      '先问自己，这个人是会带来食物、帮忙和安定，还是会制造待客压力，再决定要不要见。',
    tags: ['boundaries', 'postpartum'],
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
    signZh: '37 周前破水。',
    whyItMatters: 'The lesson treats this as a preterm labor warning.',
    whyItMattersZh: '课程把这视为早产警讯。',
    whatToDo: 'Go to the hospital immediately.',
    whatToDoZh: '立刻去医院。',
    tags: ['preterm', 'water-break'],
  }),
  createWarningCard({
    id: 'warning-bad-fluid-smell',
    lessonIds: ['lesson-01'],
    sourceSections: ['hospital-timing'],
    titleEn: 'Bad-Smelling Amniotic Fluid',
    titleZh: '羊水有异味',
    sign: 'Amniotic fluid smells bad.',
    signZh: '羊水有异味。',
    whyItMatters:
      'Bad-smelling fluid can suggest a problem and should not be watched casually at home.',
    whyItMattersZh:
      '羊水异味可能提示异常，不适合在家里继续观望。',
    whatToDo: 'Go in for immediate evaluation.',
    whatToDoZh: '马上去医院评估。',
    tags: ['water-break', 'amniotic-fluid'],
  }),
  createWarningCard({
    id: 'warning-abnormal-fluid-color',
    lessonIds: ['lesson-01'],
    sourceSections: ['hospital-timing'],
    titleEn: 'Abnormal Amniotic Fluid Color',
    titleZh: '羊水颜色异常',
    sign: 'Amniotic fluid has unusual color.',
    signZh: '羊水颜色异常。',
    whyItMatters: 'Abnormal color may mean contamination or fetal stress.',
    whyItMattersZh: '颜色异常可能表示污染或胎儿受压。',
    whatToDo: 'Go in for immediate evaluation and tell staff what color you saw.',
    whatToDoZh: '立即去医院评估，并告诉医护你看到的颜色。',
    tags: ['water-break', 'amniotic-fluid'],
  }),
  createWarningCard({
    id: 'warning-meconium-fluid',
    lessonIds: ['lesson-01', 'lesson-02'],
    sourceSections: ['hospital-timing', 'monitoring-and-mobility'],
    titleEn: 'Meconium in the Fluid',
    titleZh: '羊水里疑似有胎便',
    sign: 'Amniotic fluid appears to contain meconium.',
    signZh: '羊水里看起来有胎便。',
    whyItMatters:
      'Meconium is a specific high-attention case that usually triggers continuous monitoring.',
    whyItMattersZh:
      '胎便属于需要高度注意的情况，通常会触发持续监护。',
    whatToDo: 'Go in and tell staff you suspect meconium in the fluid.',
    whatToDoZh: '去医院，并告知医护你怀疑羊水里有胎便。',
    tags: ['water-break', 'fetal-monitoring'],
  }),
  createWarningCard({
    id: 'warning-headache',
    lessonIds: ['lesson-01'],
    sourceSections: ['hospital-timing'],
    titleEn: 'Persistent Headache',
    titleZh: '持续性头痛',
    sign: 'Persistent headache.',
    signZh: '持续性头痛。',
    whyItMatters: 'The lesson lists this as a non-labor warning symptom that still needs care.',
    whyItMattersZh: '课程把它列为即使不是临产，也需要处理的孕期警讯。',
    whatToDo: 'Call or go in for medical assessment.',
    whatToDoZh: '打电话给医生或去医院评估。',
    tags: ['pregnancy-warning'],
  }),
  createWarningCard({
    id: 'warning-swelling',
    lessonIds: ['lesson-01'],
    sourceSections: ['hospital-timing'],
    titleEn: 'Sudden Swelling',
    titleZh: '面部或肢体突然肿胀',
    sign: 'Sudden swelling of the face or limbs.',
    signZh: '面部或四肢突然肿胀。',
    whyItMatters: 'Sudden swelling is flagged as a symptom that should not be ignored.',
    whyItMattersZh: '突然肿胀是不能忽视的警示症状。',
    whatToDo: 'Seek prompt medical evaluation.',
    whatToDoZh: '尽快接受医疗评估。',
    tags: ['pregnancy-warning'],
  }),
  createWarningCard({
    id: 'warning-vision-spots',
    lessonIds: ['lesson-01'],
    sourceSections: ['hospital-timing'],
    titleEn: 'Vision Spots or Speckles',
    titleZh: '视野有斑点',
    sign: 'Visual spots or speckles.',
    signZh: '眼前出现斑点或闪点。',
    whyItMatters: 'Vision changes are listed as a symptom that warrants care.',
    whyItMattersZh: '视力变化是课程中特别点出的需要就医症状。',
    whatToDo: 'Call the provider or go in promptly.',
    whatToDoZh: '尽快联系医生或前往就诊。',
    tags: ['pregnancy-warning'],
  }),
  createWarningCard({
    id: 'warning-itchy-feet',
    lessonIds: ['lesson-01'],
    sourceSections: ['hospital-timing'],
    titleEn: 'Itchy Feet',
    titleZh: '脚部瘙痒',
    sign: 'Itchy feet.',
    signZh: '脚部发痒。',
    whyItMatters: 'The lesson specifically calls this out as a symptom worth evaluating.',
    whyItMattersZh: '课程特别提醒，这个症状也值得检查。',
    whatToDo: 'Contact the provider and ask to be assessed.',
    whatToDoZh: '联系医生并要求评估。',
    tags: ['pregnancy-warning'],
  }),
  createWarningCard({
    id: 'warning-fever',
    lessonIds: ['lesson-01'],
    sourceSections: ['hospital-timing'],
    titleEn: 'Fever',
    titleZh: '发烧',
    sign: 'Fever.',
    signZh: '发烧。',
    whyItMatters: 'Fever is listed as a symptom that needs evaluation during pregnancy or labor.',
    whyItMattersZh: '发烧在孕期或产程中都属于需要评估的症状。',
    whatToDo: 'Contact the provider or go to the hospital.',
    whatToDoZh: '联系医生或直接去医院。',
    tags: ['pregnancy-warning'],
  }),
  createWarningCard({
    id: 'warning-vomiting',
    lessonIds: ['lesson-01'],
    sourceSections: ['hospital-timing'],
    titleEn: 'Vomiting',
    titleZh: '呕吐',
    sign: 'Vomiting.',
    signZh: '呕吐。',
    whyItMatters: 'The lesson includes vomiting in the warning-symptom list.',
    whyItMattersZh: '课程把呕吐列在警示症状清单中。',
    whatToDo: 'Contact the provider or go in if symptoms persist.',
    whatToDoZh: '如果持续不缓解，联系医生或去医院。',
    tags: ['pregnancy-warning'],
  }),
  createWarningCard({
    id: 'warning-burning-urination',
    lessonIds: ['lesson-01'],
    sourceSections: ['hospital-timing'],
    titleEn: 'Burning with Urination',
    titleZh: '排尿灼痛',
    sign: 'Burning with urination.',
    signZh: '排尿时灼痛。',
    whyItMatters:
      'This could point to a urinary tract infection, which the lesson says warrants medical care.',
    whyItMattersZh:
      '这可能提示泌尿道感染，课程说这类情况需要就医。',
    whatToDo: 'Call the provider or go in for assessment.',
    whatToDoZh: '联系医生或去医院做评估。',
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
