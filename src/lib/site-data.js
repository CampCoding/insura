export const SITE = {
  name: "Insura",
  tagline: "Medical rehabilitation training for practicing specialists",
  whatsappNumber: "201091332282",
  email: "info@insura.example",
  social: {
    facebook: "https://www.facebook.com",
    instagram: "https://www.instagram.com",
    tiktok: "https://www.tiktok.com",
  },
};

export function buildWhatsAppLink(message) {
  const text = encodeURIComponent(message ?? "");
  return `https://wa.me/${SITE.whatsappNumber}${text ? `?text=${text}` : ""}`;
}

export function unsplashUrl(id, width, height) {
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${width}&h=${height}&q=80`;
}

export function picsumUrl(seed, width, height) {
  return `https://picsum.photos/seed/${seed}/${width}/${height}`;
}

export function formatMinutes(minutes, lang = "en") {
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;

  if (lang === "ar") {
    if (minutes < 60) return `${minutes} د`;
    return rest ? `${hours} س ${rest} د` : `${hours} س`;
  }

  if (minutes < 60) return `${minutes}m`;
  return rest ? `${hours}h ${rest}m` : `${hours}h`;
}

export function getCourseStats(course, lang = "en") {
  const lessons = course.curriculum.flatMap((section) => section.lessons);
  const totalMinutes = lessons.reduce((sum, lesson) => sum + lesson.minutes, 0);
  return {
    sections: course.curriculum.length,
    lessons: lessons.length,
    duration: formatMinutes(totalMinutes, lang),
  };
}

export function getCourseBySlug(slug) {
  return COURSES.find((course) => course.slug === slug);
}

export function getFlatLessons(course) {
  return course.curriculum.flatMap((section, sectionIndex) =>
    section.lessons.map((lesson, lessonIndex) => ({
      ...lesson,
      key: `${sectionIndex}-${lessonIndex}`,
      sectionIndex,
      lessonIndex,
      sectionTitle: section.title,
    }))
  );
}

export function getLessonByKey(course, key) {
  return getFlatLessons(course).find((lesson) => lesson.key === key);
}

export const COURSES = [
  {
    slug: "sports-physio-fundamentals",
    title: {
      en: "Sports Physiotherapy Fundamentals",
      ar: "أساسيات العلاج الطبيعي الرياضي",
    },
    description: {
      en: "Build a solid clinical base for assessing and rehabilitating common field injuries, taught by practicing sports therapists.",
      ar: "ابنِ أساسًا إكلينيكيًا قويًا لتقييم وإعادة تأهيل إصابات الملعب الشائعة، بتدريس من معالجين رياضيين يمارسون المهنة فعليًا.",
    },
    duration: { en: "6 weeks", ar: "6 أسابيع" },
    price: { en: "EGP 1,200", ar: "1,200 جنيه مصري" },
    image: "1603398938378-e54eab446dde",
    instructor: {
      name: "Dr. Omar El-Sayed",
      title: {
        en: "Sports Physiotherapist, 11 years in club and clinic settings",
        ar: "أخصائي علاج طبيعي رياضي، بخبرة 11 عامًا بين الأندية والعيادات",
      },
      bio: {
        en: "Omar has worked pitch-side for two youth football academies and now splits his time between a private sports clinic and training new graduates on return-to-play decisions.",
        ar: "عمل عمر كمعالج ملعبي في أكاديميتين لكرة القدم للناشئين، ويوزّع وقته حاليًا بين عيادة رياضية خاصة وتدريب الخريجين الجدد على قرارات العودة للّعب.",
      },
      image: "1622253692010-333f2da6031d",
    },
    includes: { pdfs: 12, examBank: true, notes: true },
    exam: {
      title: { en: "Final Assessment", ar: "الاختبار النهائي" },
      subject: {
        en: "Sports Physiotherapy Fundamentals",
        ar: "أساسيات العلاج الطبيعي الرياضي",
      },
      questions: [
        {
          question: {
            en: "Which of these is a classic sign of an acute (not chronic) sports injury?",
            ar: "أي مما يلي يُعد علامة كلاسيكية على إصابة رياضية حادة (وليست مزمنة)؟",
          },
          options: {
            en: [
              "Gradual onset over several weeks",
              "Sudden onset pain during activity",
              "Pain only after prolonged rest",
              "Symmetrical bilateral stiffness",
            ],
            ar: [
              "بداية تدريجية على مدار عدة أسابيع",
              "ألم مفاجئ أثناء النشاط",
              "ألم يظهر فقط بعد راحة طويلة",
              "تيبّس متماثل في الجانبين",
            ],
          },
          correctIndex: 1,
        },
        {
          question: {
            en: "Which special test is most associated with assessing ACL integrity?",
            ar: "أي اختبار خاص يرتبط بشكل أساسي بتقييم سلامة الرباط الصليبي الأمامي؟",
          },
          options: {
            en: ["Thomas test", "Empty can test", "Lachman test", "Slump test"],
            ar: ["اختبار توماس", "اختبار الكوب الفارغ", "اختبار لاخمان", "اختبار الانحناء (Slump)"],
          },
          correctIndex: 2,
        },
        {
          question: {
            en: 'In the RICE protocol for acute sprains, what does the "E" stand for?',
            ar: 'في بروتوكول RICE لعلاج الالتواءات الحادة، ماذا يرمز حرف "E"؟',
          },
          options: {
            en: ["Extension", "Exercise", "Evaluation", "Elevation"],
            ar: ["الإطالة (Extension)", "التمرين (Exercise)", "التقييم (Evaluation)", "الرفع (Elevation)"],
          },
          correctIndex: 3,
        },
        {
          question: {
            en: "Grade II ankle sprains typically involve:",
            ar: "عادةً ما تتضمن التواءات الكاحل من الدرجة الثانية:",
          },
          options: {
            en: [
              "Complete ligament rupture with joint instability",
              "Partial ligament tear with moderate swelling",
              "No ligament damage, only muscle strain",
              "A bone fracture",
            ],
            ar: [
              "تمزقًا كاملًا في الرباط مع عدم استقرار المفصل",
              "تمزقًا جزئيًا في الرباط مع تورم متوسط",
              "عدم وجود تلف بالرباط، مجرد شد عضلي",
              "كسرًا في العظم",
            ],
          },
          correctIndex: 1,
        },
        {
          question: {
            en: "Which criterion is NOT typically used to clear an athlete for return to play?",
            ar: "أي من المعايير التالية لا يُستخدم عادةً للسماح للرياضي بالعودة للّعب؟",
          },
          options: {
            en: [
              "Symmetrical strength testing",
              "Pain-free full range of motion",
              "Sport-specific movement screening",
              "The athlete's mood on unrelated topics",
            ],
            ar: [
              "اختبار القوة المتماثل بين الجانبين",
              "مدى حركة كامل وخالٍ من الألم",
              "فحص حركي مخصص لطبيعة الرياضة",
              "مزاج الرياضي في مواضيع غير متعلقة بالإصابة",
            ],
          },
          correctIndex: 3,
        },
        {
          question: {
            en: "A hop test is primarily used to assess:",
            ar: "يُستخدم اختبار القفز (Hop Test) بشكل أساسي لتقييم:",
          },
          options: {
            en: [
              "Cardiovascular endurance",
              "Lower limb functional strength and confidence",
              "Upper body flexibility",
              "Balance disorders unrelated to injury",
            ],
            ar: [
              "التحمل القلبي الوعائي",
              "القوة الوظيفية والثقة في الطرف السفلي",
              "مرونة الجزء العلوي من الجسم",
              "اضطرابات التوازن غير المرتبطة بالإصابة",
            ],
          },
          correctIndex: 1,
        },
        {
          question: {
            en: "Chronic overuse injuries are best characterised by:",
            ar: "أفضل وصف لإصابات الإفراط في الاستخدام المزمنة هو:",
          },
          options: {
            en: [
              "A sudden traumatic mechanism",
              "Immediate severe swelling",
              "Gradual symptom onset from repetitive loading",
              "Complete loss of joint function",
            ],
            ar: [
              "آلية إصابة مفاجئة",
              "تورم شديد وفوري",
              "ظهور تدريجي للأعراض ناتج عن حمل متكرر",
              "فقدان كامل لوظيفة المفصل",
            ],
          },
          correctIndex: 2,
        },
        {
          question: {
            en: "Which of these is an appropriate early-stage ACL rehab goal?",
            ar: "أي مما يلي يُعد هدفًا مناسبًا في المرحلة المبكرة من إعادة تأهيل الرباط الصليبي الأمامي؟",
          },
          options: {
            en: [
              "Return to competitive sprinting",
              "Unrestricted contact training",
              "Plyometric jump training",
              "Restoring full knee extension and reducing swelling",
            ],
            ar: [
              "العودة للعدو التنافسي",
              "تدريب احتكاكي دون قيود",
              "تدريب القفز الانفجاري (Plyometric)",
              "استعادة مدّ الركبة الكامل وتقليل التورم",
            ],
          },
          correctIndex: 3,
        },
        {
          question: {
            en: "When progressing a home exercise program, the priority is:",
            ar: "عند تطوير برنامج تمارين منزلي، تكون الأولوية لـ:",
          },
          options: {
            en: [
              "Maximum intensity from day one",
              "Gradual load progression the patient can realistically maintain",
              "Skipping warm-up to save time",
              "Avoiding all activity until fully pain-free",
            ],
            ar: [
              "أقصى شدة من اليوم الأول",
              "زيادة تدريجية في الحمل يستطيع المريض الاستمرار بها فعليًا",
              "تخطي الإحماء لتوفير الوقت",
              "تجنّب أي نشاط حتى زوال الألم تمامًا",
            ],
          },
          correctIndex: 1,
        },
        {
          question: {
            en: "Hamstring re-injury risk is increased most by:",
            ar: "يزداد خطر تكرار إصابة العضلة الخلفية للفخذ بشكل أساسي بسبب:",
          },
          options: {
            en: [
              "Icing too frequently",
              "Excessive static stretching",
              "Too much rest before any activity",
              "Returning to sprinting before eccentric strength is restored",
            ],
            ar: [
              "استخدام الثلج بشكل متكرر جدًا",
              "الإطالة الثابتة المفرطة",
              "راحة زائدة قبل أي نشاط",
              "العودة للعدو قبل استعادة القوة اللامركزية (Eccentric)",
            ],
          },
          correctIndex: 3,
        },
      ],
    },
    attachments: [
      {
        title: { en: "Sideline assessment cheat sheet", ar: "ورقة مرجعية سريعة للتقييم الملعبي" },
        pages: 4,
        url: "https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf",
      },
      {
        title: { en: "Return-to-play testing checklist", ar: "قائمة اختبارات العودة للّعب" },
        pages: 3,
        url: "https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf",
      },
      {
        title: { en: "Home exercise plan template", ar: "نموذج خطة تمارين منزلية" },
        pages: 5,
        url: "https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf",
      },
    ],
    reviews: [
      {
        name: "Hana Kamal",
        role: { en: "Physiotherapist", ar: "أخصائية علاج طبيعي" },
        quote: {
          en: "The return-to-play section changed how I clear athletes. I stopped guessing and started testing.",
          ar: "قسم العودة للّعب غيّر طريقتي في السماح للرياضيين بالعودة. توقفت عن التخمين وبدأت أعتمد على الاختبارات الفعلية.",
        },
      },
      {
        name: "Ziad Fathallah",
        role: { en: "Sports rehab trainee", ar: "متدرب في إعادة التأهيل الرياضي" },
        quote: {
          en: "Watched the ankle protocol module twice before applying it the same week in clinic. Worked.",
          ar: "شاهدت وحدة بروتوكول الكاحل مرتين قبل تطبيقها في نفس الأسبوع بالعيادة. ونجحت فعلًا.",
        },
      },
      {
        name: "Dina Ashraf",
        role: { en: "Physiotherapist", ar: "أخصائية علاج طبيعي" },
        quote: {
          en: "Finally a course that explains why an athlete isn't ready, not just a checklist to tick.",
          ar: "أخيرًا دورة تشرح سبب عدم جاهزية الرياضي، وليست مجرد قائمة تُعلَّم عليها.",
        },
      },
      {
        name: "Youssef Hamdy",
        role: { en: "Sports rehab trainee", ar: "متدرب في إعادة التأهيل الرياضي" },
        quote: {
          en: "The case studies section is worth it alone. Real messy cases, not textbook ones.",
          ar: "قسم دراسات الحالة وحده يستحق الدورة. حالات حقيقية وغير مرتبة، وليست حالات الكتب المدرسية.",
        },
      },
      {
        name: "Marwa Sobhy",
        role: { en: "Clinic physiotherapist", ar: "أخصائية علاج طبيعي بعيادة" },
        quote: {
          en: "My return-to-play conversations with coaches are a lot more confident now.",
          ar: "أصبحت نقاشاتي مع المدربين حول العودة للّعب أكثر ثقة بكثير الآن.",
        },
      },
    ],
    curriculum: [
      {
        title: { en: "Acute vs. chronic sports injury assessment", ar: "تقييم الإصابات الرياضية الحادة والمزمنة" },
        lessons: [
          { title: { en: "How to triage a fresh sideline injury", ar: "كيفية فرز إصابة ملعبية حديثة" }, minutes: 14, preview: true },
          { title: { en: "Reading swelling, bruising and range of motion", ar: "قراءة التورم والكدمات ومدى الحركة" }, minutes: 11 },
          { title: { en: "When chronic overuse mimics an acute injury", ar: "عندما يحاكي الإفراط المزمن إصابة حادة" }, minutes: 9 },
        ],
      },
      {
        title: { en: "Knee and ankle rehab protocols", ar: "بروتوكولات إعادة تأهيل الركبة والكاحل" },
        lessons: [
          { title: { en: "ACL rehab, week by week", ar: "إعادة تأهيل الرباط الصليبي الأمامي أسبوعًا بأسبوع" }, minutes: 16 },
          { title: { en: "Ankle sprain grading and loading progressions", ar: "تصنيف التواءات الكاحل وتدرج الحمل" }, minutes: 13 },
          { title: { en: "Building a home exercise plan patients stick to", ar: "بناء خطة تمارين منزلية يلتزم بها المرضى" }, minutes: 10 },
        ],
      },
      {
        title: { en: "Functional rehab and return to play", ar: "إعادة التأهيل الوظيفي والعودة للّعب" },
        lessons: [
          { title: { en: "Return-to-play testing that actually predicts risk", ar: "اختبارات العودة للّعب التي تتنبأ فعليًا بالخطر" }, minutes: 15 },
          { title: { en: "Sport-specific movement drills", ar: "تمارين حركية مخصصة للرياضة" }, minutes: 12 },
          { title: { en: "Clearing an athlete: the final checklist", ar: "السماح للرياضي بالعودة: القائمة النهائية" }, minutes: 8 },
        ],
      },
      {
        title: { en: "Real case studies from sports clinics", ar: "دراسات حالة حقيقية من عيادات رياضية" },
        lessons: [
          { title: { en: "Case: hamstring re-injury in a sprinter", ar: "حالة: تكرار إصابة العضلة الخلفية لدى عدّاء" }, minutes: 13 },
          { title: { en: "Case: recurring ankle sprains in a footballer", ar: "حالة: التواءات كاحل متكررة لدى لاعب كرة قدم" }, minutes: 11 },
          { title: { en: "Case: slow recovery after knee surgery", ar: "حالة: تعافٍ بطيء بعد جراحة الركبة" }, minutes: 12 },
        ],
      },
    ],
  },
  {
    slug: "spinal-injury-rehab",
    title: { en: "Spinal Injury Rehabilitation", ar: "إعادة تأهيل إصابات العمود الفقري" },
    description: {
      en: "Practical assessment and rehab protocols for lumbar and cervical spine pain and injuries, ready to apply in the clinic.",
      ar: "بروتوكولات عملية للتقييم وإعادة التأهيل لآلام وإصابات الفقرات القطنية والعنقية، جاهزة للتطبيق في العيادة.",
    },
    duration: { en: "5 weeks", ar: "5 أسابيع" },
    price: { en: "EGP 1,100", ar: "1,100 جنيه مصري" },
    image: "1655313719493-16ebe4906441",
    instructor: {
      name: "Dr. Ramy Hassan",
      title: { en: "Spinal Rehab Specialist, DPT", ar: "أخصائي إعادة تأهيل العمود الفقري، دكتوراه علاج طبيعي" },
      bio: {
        en: "Ramy runs a lumbar and cervical rehab program at a Cairo outpatient clinic and lectures on mechanical low back pain assessment for new physiotherapy graduates.",
        ar: "يدير رامي برنامجًا لإعادة تأهيل الفقرات القطنية والعنقية في عيادة خارجية بالقاهرة، ويحاضر في تقييم آلام أسفل الظهر الميكانيكية لخريجي العلاج الطبيعي الجدد.",
      },
      image: "1645066928295-2506defde470",
    },
    includes: { pdfs: 9, examBank: true, notes: true },
    exam: {
      title: { en: "Final Assessment", ar: "الاختبار النهائي" },
      subject: { en: "Spinal Injury Rehabilitation", ar: "إعادة تأهيل إصابات العمود الفقري" },
      questions: [
        {
          question: {
            en: "Which structure most commonly refers pain down the leg in sciatica?",
            ar: "أي بنية تُسبب غالبًا انتشار الألم أسفل الساق في عرق النسا؟",
          },
          options: {
            en: ["The lumbar facet joints", "A compressed or irritated lumbar nerve root", "The gluteal muscles alone", "The sacroiliac ligament"],
            ar: ["المفاصل الوجيهية القطنية", "جذر عصبي قطني مضغوط أو ملتهب", "عضلات الأرداف فقط", "الرباط العجزي الحرقفي"],
          },
          correctIndex: 1,
        },
        {
          question: {
            en: "A key spinal 'red flag' requiring urgent referral is:",
            ar: "من أهم 'العلامات التحذيرية' في العمود الفقري التي تستدعي تحويلًا عاجلًا:",
          },
          options: {
            en: ["Morning stiffness lasting 10 minutes", "Pain that improves with movement", "New saddle anaesthesia or bladder dysfunction", "Mild pain after prolonged sitting"],
            ar: ["تيبّس صباحي يستمر 10 دقائق", "ألم يتحسن مع الحركة", "تخدّر جديد في منطقة السرج أو خلل في وظيفة المثانة", "ألم خفيف بعد جلوس طويل"],
          },
          correctIndex: 2,
        },
        {
          question: {
            en: "Centralisation of leg symptoms during assessment generally suggests:",
            ar: "تمركز أعراض الساق نحو الوسط أثناء التقييم يشير عمومًا إلى:",
          },
          options: {
            en: ["A worsening disc herniation", "A favourable prognostic sign for a directional-preference exercise", "An unrelated hip pathology", "The need for immediate surgery"],
            ar: ["تفاقم الانزلاق الغضروفي", "علامة تنبؤية إيجابية لتمرين ذي اتجاه تفضيلي", "مشكلة غير مرتبطة في مفصل الورك", "الحاجة لجراحة فورية"],
          },
          correctIndex: 1,
        },
        {
          question: {
            en: "Which finding best differentiates discogenic pain from facet joint pain?",
            ar: "أي نتيجة تُميّز بشكل أفضل بين الألم الناتج عن القرص والألم الناتج عن المفصل الوجيهي؟",
          },
          options: {
            en: ["Facet pain often worsens with extension and rotation", "Discogenic pain never worsens with sitting", "Facet pain always radiates below the knee", "There is no reliable clinical difference"],
            ar: ["ألم المفصل الوجيهي غالبًا ما يزداد مع المدّ والدوران", "ألم القرص لا يزداد أبدًا مع الجلوس", "ألم المفصل الوجيهي ينتشر دائمًا أسفل الركبة", "لا يوجد فرق إكلينيكي موثوق"],
          },
          correctIndex: 0,
        },
        {
          question: {
            en: "A core stability program in early lumbar rehab should prioritise:",
            ar: "في المرحلة المبكرة من إعادة تأهيل الفقرات القطنية، يجب أن يُعطي برنامج ثبات الجذع الأولوية لـ:",
          },
          options: {
            en: ["Heavy loaded deadlifts from day one", "Deep trunk muscle control before adding load", "Long-duration static stretching only", "Complete rest from all trunk activity"],
            ar: ["رفعات مميتة بحمل ثقيل من اليوم الأول", "التحكم في عضلات الجذع العميقة قبل إضافة الحمل", "إطالة ثابتة طويلة المدة فقط", "راحة كاملة من أي نشاط للجذع"],
          },
          correctIndex: 1,
        },
        {
          question: {
            en: "Which is an appropriate criterion before progressing a lumbar rehab phase?",
            ar: "أي مما يلي معيار مناسب قبل الانتقال لمرحلة تالية في إعادة تأهيل الفقرات القطنية؟",
          },
          options: {
            en: ["The patient reports zero pain forever", "A fixed number of weeks has passed, regardless of symptoms", "Objective functional and symptom-based milestones are met", "The patient requests a heavier program"],
            ar: ["إبلاغ المريض بعدم وجود ألم نهائيًا وللأبد", "مرور عدد ثابت من الأسابيع بغض النظر عن الأعراض", "تحقيق معايير وظيفية وموضوعية مرتبطة بالأعراض", "طلب المريض برنامجًا أثقل"],
          },
          correctIndex: 2,
        },
        {
          question: {
            en: "Cervical nerve root patterns are most useful for:",
            ar: "أنماط الجذور العصبية العنقية مفيدة بشكل أساسي في:",
          },
          options: {
            en: ["Diagnosing unrelated shoulder bursitis", "Identifying which spinal level may be involved", "Replacing the need for any physical assessment", "Confirming a muscular strain only"],
            ar: ["تشخيص التهاب جراب الكتف غير المرتبط", "تحديد مستوى الفقرة المحتمل تأثره", "إلغاء الحاجة لأي تقييم بدني", "تأكيد وجود شد عضلي فقط"],
          },
          correctIndex: 1,
        },
        {
          question: {
            en: "A structured lumbar assessment routine should begin with:",
            ar: "يجب أن يبدأ روتين التقييم القطني المنظم بـ:",
          },
          options: {
            en: ["Aggressive manual therapy before any history-taking", "A thorough history and screening for red flags", "Immediate strength testing only", "Imaging referral for every patient"],
            ar: ["علاج يدوي قوي قبل أخذ أي تاريخ مرضي", "تاريخ مرضي شامل وفحص عن العلامات التحذيرية", "اختبار القوة فورًا فقط", "تحويل كل مريض للأشعة"],
          },
          correctIndex: 1,
        },
        {
          question: {
            en: "Which best describes appropriate discharge criteria after a rehab plan?",
            ar: "أي مما يلي يصف بشكل أفضل معايير الخروج المناسبة بعد خطة إعادة تأهيل؟",
          },
          options: {
            en: ["The patient has attended a minimum number of sessions", "Functional goals are met and a home maintenance plan is in place", "The patient has stopped reporting any symptoms at all times", "The clinic schedule requires the slot back"],
            ar: ["حضور المريض لعدد أدنى من الجلسات", "تحقيق الأهداف الوظيفية ووجود خطة منزلية للمحافظة عليها", "توقف المريض عن ذكر أي أعراض في كل الأوقات", "حاجة جدول العيادة لاسترجاع الموعد"],
          },
          correctIndex: 1,
        },
        {
          question: {
            en: "When progress stalls mid-plan, the most appropriate first step is to:",
            ar: "عندما يتوقف التقدم في منتصف الخطة، تكون الخطوة الأولى الأنسب هي:",
          },
          options: {
            en: ["Immediately increase load significantly", "Re-assess and adjust the plan based on findings", "Discharge the patient", "Repeat the exact same exercises indefinitely"],
            ar: ["زيادة الحمل بشكل كبير فورًا", "إعادة التقييم وتعديل الخطة بناءً على النتائج", "إخراج المريض من الخطة", "تكرار نفس التمارين إلى ما لا نهاية"],
          },
          correctIndex: 1,
        },
      ],
    },
    attachments: [
      {
        title: { en: "Spinal red flag screening form", ar: "استمارة فحص العلامات التحذيرية للعمود الفقري" },
        pages: 2,
        url: "https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf",
      },
      {
        title: { en: "Lumbar assessment routine handout", ar: "نشرة روتين تقييم الفقرات القطنية" },
        pages: 4,
        url: "https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf",
      },
      {
        title: { en: "12-week progressive plan template", ar: "نموذج خطة تدريجية لمدة 12 أسبوعًا" },
        pages: 6,
        url: "https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf",
      },
    ],
    reviews: [
      {
        name: "Mostafa Adel",
        role: { en: "Physiotherapist", ar: "أخصائي علاج طبيعي" },
        quote: {
          en: "The red flag checklist alone was worth the course. I refer out faster and with more confidence now.",
          ar: "قائمة العلامات التحذيرية وحدها تستحق ثمن الدورة. أصبحت أحوّل المرضى بشكل أسرع وبثقة أكبر.",
        },
      },
      {
        name: "Salma Ibrahim",
        role: { en: "Clinic owner", ar: "مالكة عيادة" },
        quote: {
          en: "We now run the 12-week plan from this course with almost every disc patient we see.",
          ar: "أصبحنا نطبّق خطة الـ12 أسبوعًا من هذه الدورة مع كل مريض قرص تقريبًا.",
        },
      },
      {
        name: "Hossam Nabil",
        role: { en: "Physiotherapist", ar: "أخصائي علاج طبيعي" },
        quote: {
          en: "The core stability section fixed my biggest weak spot: knowing when to progress load.",
          ar: "قسم ثبات الجذع عالج أكبر نقطة ضعف عندي: معرفة متى أزيد الحمل.",
        },
      },
      {
        name: "Farida El-Gohary",
        role: { en: "Physiotherapy student", ar: "طالبة علاج طبيعي" },
        quote: {
          en: "Explained mechanical back pain better than a full semester of university lectures.",
          ar: "شرحت آلام الظهر الميكانيكية بشكل أفضل من فصل دراسي كامل من محاضرات الجامعة.",
        },
      },
      {
        name: "Amr Shawky",
        role: { en: "Clinic physiotherapist", ar: "أخصائي علاج طبيعي بعيادة" },
        quote: {
          en: "Discharge criteria section stopped me from cutting patients loose too early.",
          ar: "قسم معايير الخروج منعني من إنهاء متابعة المرضى مبكرًا جدًا.",
        },
      },
    ],
    curriculum: [
      {
        title: { en: "Functional anatomy of the spine", ar: "التشريح الوظيفي للعمود الفقري" },
        lessons: [
          { title: { en: "The spine as a load-bearing system", ar: "العمود الفقري كنظام حامل للأحمال" }, minutes: 12, preview: true },
          { title: { en: "Nerve root patterns you need to recognise", ar: "أنماط الجذور العصبية التي يجب معرفتها" }, minutes: 14 },
          { title: { en: "Common anatomy mistakes in assessment", ar: "أخطاء تشريحية شائعة أثناء التقييم" }, minutes: 8 },
        ],
      },
      {
        title: { en: "Assessing mechanical low back pain", ar: "تقييم آلام أسفل الظهر الميكانيكية" },
        lessons: [
          { title: { en: "A structured lumbar assessment routine", ar: "روتين منظم لتقييم الفقرات القطنية" }, minutes: 15 },
          { title: { en: "Red flags: when to refer out", ar: "العلامات التحذيرية: متى تُحوّل المريض" }, minutes: 9 },
          { title: { en: "Differentiating disc, joint and muscular pain", ar: "التمييز بين ألم القرص والمفصل والعضلة" }, minutes: 13 },
        ],
      },
      {
        title: { en: "Core stability programming", ar: "برمجة ثبات الجذع" },
        lessons: [
          { title: { en: "Building a core program from week one", ar: "بناء برنامج للجذع من الأسبوع الأول" }, minutes: 14 },
          { title: { en: "Progressing load without triggering flare-ups", ar: "زيادة الحمل دون إثارة نوبات الألم" }, minutes: 11 },
        ],
      },
      {
        title: { en: "A 12-week progressive treatment plan", ar: "خطة علاجية تدريجية لمدة 12 أسبوعًا" },
        lessons: [
          { title: { en: "Structuring the full 12-week plan", ar: "بناء الخطة الكاملة لـ12 أسبوعًا" }, minutes: 16 },
          { title: { en: "Adjusting the plan when progress stalls", ar: "تعديل الخطة عند توقف التقدم" }, minutes: 10 },
          { title: { en: "Discharge criteria and home maintenance", ar: "معايير الخروج والمحافظة المنزلية" }, minutes: 9 },
        ],
      },
    ],
  },
  {
    slug: "advanced-manual-therapy",
    title: { en: "Advanced Manual Therapy", ar: "العلاج اليدوي المتقدم" },
    description: {
      en: "Advanced joint and soft-tissue manual therapy techniques, with step-by-step applied video demonstrations.",
      ar: "تقنيات متقدمة للعلاج اليدوي للمفاصل والأنسجة الرخوة، مع عروض فيديو تطبيقية خطوة بخطوة.",
    },
    duration: { en: "8 weeks", ar: "8 أسابيع" },
    price: { en: "EGP 1,600", ar: "1,600 جنيه مصري" },
    image: "1777805865927-a6ee4c4eacb1",
    instructor: {
      name: "Dr. Karim Fathy",
      title: { en: "Manual Therapy Instructor, DPT", ar: "مدرّب علاج يدوي، دكتوراه علاج طبيعي" },
      bio: {
        en: "Karim trained under manual therapy specialists in Germany before returning to teach hands-on mobilisation and soft-tissue technique to physiotherapists across Egypt.",
        ar: "تدرّب كريم على يد متخصصين في العلاج اليدوي بألمانيا قبل عودته لتدريس تقنيات التعبئة المفصلية والأنسجة الرخوة لأخصائيي العلاج الطبيعي في مصر.",
      },
      image: "1712215544003-af10130f8eb3",
    },
    includes: { pdfs: 15, examBank: true, notes: true },
    exam: {
      title: { en: "Final Assessment", ar: "الاختبار النهائي" },
      subject: { en: "Advanced Manual Therapy", ar: "العلاج اليدوي المتقدم" },
      questions: [
        {
          question: {
            en: "In joint mobilisation grading, a Grade IV mobilisation is best described as:",
            ar: "في تصنيف درجات تعبئة المفاصل، تُوصف تعبئة الدرجة الرابعة بأنها:",
          },
          options: {
            en: ["A small-amplitude movement at the start of range", "A large-amplitude movement through the middle of range", "A small-amplitude movement at the end of available range", "A high-velocity thrust technique"],
            ar: ["حركة بسعة صغيرة في بداية المدى الحركي", "حركة بسعة كبيرة عبر منتصف المدى الحركي", "حركة بسعة صغيرة في نهاية المدى المتاح", "تقنية دفع عالية السرعة"],
          },
          correctIndex: 2,
        },
        {
          question: {
            en: "Before applying deep myofascial release, a therapist should first:",
            ar: "قبل تطبيق تحرير اللفافة العضلية العميق، يجب على المعالج أولًا أن:",
          },
          options: {
            en: ["Apply maximum pressure immediately", "Assess tissue tension and screen for contraindications", "Skip assessment to save session time", "Only rely on the patient's imaging report"],
            ar: ["يطبّق أقصى ضغط فورًا", "يقيّم توتر الأنسجة ويفحص موانع الاستعمال", "يتخطى التقييم لتوفير وقت الجلسة", "يعتمد فقط على تقرير الأشعة الخاص بالمريض"],
          },
          correctIndex: 1,
        },
        {
          question: {
            en: "Which is an absolute contraindication to manual therapy?",
            ar: "أي مما يلي يُعد مانعًا مطلقًا للعلاج اليدوي؟",
          },
          options: {
            en: ["Mild generalised muscle soreness", "An unstable fracture at the treatment site", "Chronic, well-managed low back pain", "Mild joint stiffness after inactivity"],
            ar: ["ألم عضلي عام خفيف", "كسر غير مستقر في موضع العلاج", "ألم أسفل ظهر مزمن ومُدار جيدًا", "تيبّس مفصلي خفيف بعد الخمول"],
          },
          correctIndex: 1,
        },
        {
          question: {
            en: "Trigger point work is best applied with the goal of:",
            ar: "يُطبَّق العمل على النقاط الزنادية بشكل أفضل بهدف:",
          },
          options: {
            en: ["Overtreating until all soreness disappears immediately", "Reducing localised tension without provoking a flare-up", "Replacing all active exercise entirely", "Working only on the pain-free side of the body"],
            ar: ["الإفراط في العلاج حتى يختفي الألم فورًا", "تقليل التوتر الموضعي دون إثارة نوبة ألم", "استبدال كل التمارين الفعّالة تمامًا", "العمل فقط على الجانب الخالي من الألم بالجسم"],
          },
          correctIndex: 1,
        },
        {
          question: {
            en: "Why does manual therapy alone often plateau in effectiveness?",
            ar: "لماذا يصل العلاج اليدوي وحده غالبًا لمرحلة ثبات في الفعالية؟",
          },
          options: {
            en: ["It cannot be combined with any other intervention", "It provides short-term relief without addressing loading capacity", "It always causes long-term tissue damage", "It has no evidence base at all"],
            ar: ["لا يمكن دمجه مع أي تدخل آخر", "يمنح راحة قصيرة المدى دون معالجة القدرة على تحمل الحمل", "يسبب دائمًا تلفًا طويل المدى بالأنسجة", "لا يوجد له أي أساس علمي"],
          },
          correctIndex: 1,
        },
        {
          question: {
            en: "Sequencing manual therapy with active exercise typically means:",
            ar: "يعني ترتيب العلاج اليدوي مع التمارين الفعّالة عادةً:",
          },
          options: {
            en: ["Manual therapy first to create a window for active movement work", "Never combining the two approaches", "Exercise only, with manual therapy fully excluded", "Manual therapy replacing exercise permanently"],
            ar: ["العلاج اليدوي أولًا لفتح نافذة للعمل الحركي الفعّال", "عدم الجمع بين الأسلوبين إطلاقًا", "التمارين فقط مع استبعاد العلاج اليدوي تمامًا", "استبدال العلاج اليدوي للتمارين بشكل دائم"],
          },
          correctIndex: 0,
        },
        {
          question: {
            en: "Informed consent before a manual therapy technique should include:",
            ar: "يجب أن تتضمن الموافقة المستنيرة قبل تقنية العلاج اليدوي:",
          },
          options: {
            en: ["Skipping explanation to save time", "An explanation of the technique, its purpose, and possible risks", "Only a verbal agreement with no discussion of risks", "Consent from a colleague instead of the patient"],
            ar: ["تخطي الشرح لتوفير الوقت", "شرح التقنية والغرض منها والمخاطر المحتملة", "موافقة شفهية فقط دون مناقشة المخاطر", "موافقة من زميل بدلًا من المريض"],
          },
          correctIndex: 1,
        },
        {
          question: {
            en: "Proper documentation of manual therapy technique mainly protects:",
            ar: "التوثيق الصحيح لتقنية العلاج اليدوي يحمي بشكل أساسي:",
          },
          options: {
            en: ["Only the clinic's billing process", "The therapist and patient by recording clinical reasoning and consent", "Nothing of clinical or legal value", "Only the equipment used in the session"],
            ar: ["فواتير العيادة فقط", "المعالج والمريض من خلال توثيق التبرير الإكلينيكي والموافقة", "لا شيء ذو قيمة إكلينيكية أو قانونية", "الأجهزة المستخدمة في الجلسة فقط"],
          },
          correctIndex: 1,
        },
        {
          question: {
            en: "Shoulder joint mobilisation hands-on practice should begin with:",
            ar: "يجب أن يبدأ التطبيق العملي لتعبئة مفصل الكتف بـ:",
          },
          options: {
            en: ["The highest grade mobilisation available", "A clear assessment of end-feel and irritability first", "Skipping assessment and mobilising immediately", "Applying the same technique regardless of findings"],
            ar: ["أعلى درجة تعبئة متاحة", "تقييم واضح لإحساس نهاية المدى والتهيّج أولًا", "تخطي التقييم والتعبئة فورًا", "تطبيق نفس التقنية بغض النظر عن النتائج"],
          },
          correctIndex: 1,
        },
        {
          question: {
            en: "A relative contraindication differs from an absolute one because it:",
            ar: "يختلف المانع النسبي عن المانع المطلق لأنه:",
          },
          options: {
            en: ["Never requires any clinical judgement", "May allow treatment with modified technique and caution", "Always means treatment must stop entirely", "Only applies to spinal manipulation"],
            ar: ["لا يتطلب أي تقدير إكلينيكي إطلاقًا", "قد يسمح بالعلاج بتقنية معدَّلة وبحذر", "يعني دائمًا التوقف عن العلاج تمامًا", "يُطبَّق فقط على تلاعب العمود الفقري"],
          },
          correctIndex: 1,
        },
      ],
    },
    attachments: [
      {
        title: { en: "Joint mobilisation grading reference", ar: "مرجع تصنيف درجات تعبئة المفاصل" },
        pages: 3,
        url: "https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf",
      },
      {
        title: { en: "Contraindications quick guide", ar: "دليل سريع لموانع الاستعمال" },
        pages: 2,
        url: "https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf",
      },
      {
        title: { en: "Informed consent form template", ar: "نموذج استمارة الموافقة المستنيرة" },
        pages: 3,
        url: "https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf",
      },
    ],
    reviews: [
      {
        name: "Nourhan Samy",
        role: { en: "Physiotherapist", ar: "أخصائية علاج طبيعي" },
        quote: {
          en: "First course where the hands-on technique actually matched what I could reproduce on a real patient.",
          ar: "أول دورة تتطابق فيها التقنية العملية بالفعل مع ما استطعت تطبيقه على مريض حقيقي.",
        },
      },
      {
        name: "Tarek Mansour",
        role: { en: "Sports rehab trainee", ar: "متدرب في إعادة التأهيل الرياضي" },
        quote: {
          en: "The mobilisation grading finally clicked for me after the shoulder demonstration.",
          ar: "أخيرًا فهمت تصنيف درجات التعبئة بعد عرض الكتف التوضيحي.",
        },
      },
      {
        name: "Rania Khattab",
        role: { en: "Physiotherapist", ar: "أخصائية علاج طبيعي" },
        quote: {
          en: "The myofascial release module is the clearest hands-on demo I've seen on this technique.",
          ar: "وحدة تحرير اللفافة العضلية هي أوضح عرض عملي شاهدته لهذه التقنية.",
        },
      },
      {
        name: "Sherif Wahba",
        role: { en: "Clinic physiotherapist", ar: "أخصائي علاج طبيعي بعيادة" },
        quote: {
          en: "Contraindications section made me rethink two patients I was about to treat that week.",
          ar: "قسم موانع الاستعمال جعلني أعيد التفكير في حالتين كنت سأعالجهما في نفس الأسبوع.",
        },
      },
      {
        name: "Lina Hafez",
        role: { en: "Sports rehab trainee", ar: "متدربة في إعادة التأهيل الرياضي" },
        quote: {
          en: "Practiced the hip mobilisation on a classmate the same day. It held up in clinic too.",
          ar: "طبّقت تعبئة الورك على زميل دراسة في نفس اليوم، ونجحت في العيادة أيضًا.",
        },
      },
    ],
    curriculum: [
      {
        title: { en: "Joint mobilisation techniques", ar: "تقنيات تعبئة المفاصل" },
        lessons: [
          { title: { en: "Grading mobilisations I through IV", ar: "تصنيف درجات التعبئة من الأولى إلى الرابعة" }, minutes: 17, preview: true },
          { title: { en: "Shoulder joint mobilisation, hands-on", ar: "تعبئة مفصل الكتف عمليًا" }, minutes: 15 },
          { title: { en: "Hip and knee mobilisation, hands-on", ar: "تعبئة الورك والركبة عمليًا" }, minutes: 14 },
        ],
      },
      {
        title: { en: "Soft-tissue and myofascial release", ar: "تحرير الأنسجة الرخوة واللفافة العضلية" },
        lessons: [
          { title: { en: "Reading tissue tension before you treat it", ar: "قراءة توتر الأنسجة قبل علاجها" }, minutes: 12 },
          { title: { en: "Myofascial release for the upper back", ar: "تحرير اللفافة العضلية لأعلى الظهر" }, minutes: 13 },
          { title: { en: "Trigger point work without overtreating", ar: "العمل على النقاط الزنادية دون إفراط" }, minutes: 11 },
        ],
      },
      {
        title: { en: "Combining manual therapy with exercise", ar: "دمج العلاج اليدوي مع التمارين" },
        lessons: [
          { title: { en: "Why manual therapy alone plateaus", ar: "لماذا يصل العلاج اليدوي وحده لمرحلة ثبات" }, minutes: 10 },
          { title: { en: "Sequencing hands-on work with active exercise", ar: "ترتيب العمل اليدوي مع التمارين الفعّالة" }, minutes: 14 },
        ],
      },
      {
        title: { en: "Safety standards and contraindications", ar: "معايير السلامة وموانع الاستعمال" },
        lessons: [
          { title: { en: "Absolute and relative contraindications", ar: "الموانع المطلقة والنسبية" }, minutes: 12 },
          { title: { en: "Informed consent in manual therapy", ar: "الموافقة المستنيرة في العلاج اليدوي" }, minutes: 8 },
          { title: { en: "Documenting technique for legal protection", ar: "توثيق التقنية للحماية القانونية" }, minutes: 9 },
        ],
      },
    ],
  },
  {
    slug: "post-surgical-rehab",
    title: { en: "Post-Surgical Rehabilitation", ar: "إعادة التأهيل بعد الجراحة" },
    description: {
      en: "A complete rehab pathway for patients after common orthopaedic surgeries and joint replacements.",
      ar: "مسار كامل لإعادة التأهيل للمرضى بعد العمليات الجراحية العظمية الشائعة واستبدال المفاصل.",
    },
    duration: { en: "7 weeks", ar: "7 أسابيع" },
    price: { en: "EGP 1,400", ar: "1,400 جنيه مصري" },
    image: "1756699280573-85c5628a4c6c",
    instructor: {
      name: "Dr. Mostafa Adel",
      title: { en: "Post-Surgical Rehab Specialist, DPT", ar: "أخصائي إعادة تأهيل ما بعد الجراحة، دكتوراه علاج طبيعي" },
      bio: {
        en: "Mostafa works alongside orthopaedic surgeons on joint replacement rehab pathways and has built post-surgical protocols used in three private hospitals.",
        ar: "يعمل مصطفى إلى جانب جراحي العظام في مسارات إعادة تأهيل استبدال المفاصل، وقد بنى بروتوكولات ما بعد الجراحة المُستخدمة في ثلاث مستشفيات خاصة.",
      },
      image: "1642975967602-653d378f3b5b",
    },
    includes: { pdfs: 11, examBank: true, notes: true },
    exam: {
      title: { en: "Final Assessment", ar: "الاختبار النهائي" },
      subject: { en: "Post-Surgical Rehabilitation", ar: "إعادة التأهيل بعد الجراحة" },
      questions: [
        {
          question: {
            en: "In week one after knee replacement, the main priority is:",
            ar: "في الأسبوع الأول بعد استبدال الركبة، تكون الأولوية الرئيسية:",
          },
          options: {
            en: ["Aggressive strengthening against heavy resistance", "Protecting the joint while encouraging safe early movement", "Complete immobilisation until week four", "Full return to normal walking pace immediately"],
            ar: ["تقوية عنيفة ضد مقاومة ثقيلة", "حماية المفصل مع تشجيع حركة مبكرة آمنة", "تثبيت كامل حتى الأسبوع الرابع", "العودة الكاملة لسرعة المشي الطبيعية فورًا"],
          },
          correctIndex: 1,
        },
        {
          question: {
            en: "Regaining full knee extension after replacement matters mainly because:",
            ar: "تُعد استعادة مدّ الركبة الكامل بعد الاستبدال مهمة بشكل أساسي لأن:",
          },
          options: {
            en: ["It has no effect on gait or function", "A flexion contracture can impair normal walking mechanics", "It is only a cosmetic concern", "It replaces the need for quad strengthening"],
            ar: ["ليس لها أي تأثير على المشية أو الوظيفة", "تقلص الثني يمكن أن يعيق ميكانيكية المشي الطبيعية", "الأمر مجرد مسألة شكلية", "تُلغي الحاجة لتقوية العضلة الرباعية"],
          },
          correctIndex: 1,
        },
        {
          question: {
            en: "Quad strength rebuilding after knee surgery should be:",
            ar: "يجب أن تكون إعادة بناء قوة العضلة الرباعية بعد جراحة الركبة:",
          },
          options: {
            en: ["Delayed until the patient is fully pain-free", "Skipped in favour of rest alone", "Progressed gradually as swelling and healing allow", "Maximal from the very first session"],
            ar: ["مؤجلة حتى يصبح المريض خاليًا من الألم تمامًا", "متروكة لصالح الراحة فقط", "متدرجة بما يسمح به التورم والشفاء", "بأقصى شدة من أول جلسة"],
          },
          correctIndex: 2,
        },
        {
          question: {
            en: "In the first six weeks after rotator cuff repair, the priority is typically:",
            ar: "في أول ستة أسابيع بعد إصلاح الكفة المدورة، تكون الأولوية عادةً:",
          },
          options: {
            en: ["Protecting the repair while allowing protected passive motion", "Unrestricted overhead lifting", "Aggressive stretching into end-range immediately", "Complete shoulder immobilisation with no movement at all"],
            ar: ["حماية الإصلاح مع السماح بحركة سلبية محمية", "رفع فوق الرأس دون قيود", "إطالة قوية لنهاية المدى الحركي فورًا", "تثبيت كامل للكتف دون أي حركة إطلاقًا"],
          },
          correctIndex: 0,
        },
        {
          question: {
            en: "Reintroducing overhead movement after shoulder surgery should be guided by:",
            ar: "يجب أن تُوجَّه إعادة إدخال الحركة فوق الرأس بعد جراحة الكتف بواسطة:",
          },
          options: {
            en: ["A fixed calendar date only", "Tissue healing timeframes and objective movement quality", "Patient impatience to return to sport", "Whichever exercise feels most familiar"],
            ar: ["تاريخ محدد فقط في التقويم", "الإطار الزمني لشفاء الأنسجة وجودة الحركة الموضوعية", "نفاد صبر المريض للعودة للرياضة", "أي تمرين يبدو أكثر إلفة"],
          },
          correctIndex: 1,
        },
        {
          question: {
            en: "Non-drug swelling control methods commonly include:",
            ar: "تشمل طرق التحكم في التورم غير الدوائية بشكل شائع:",
          },
          options: {
            en: ["Prolonged immobility in a dependent position", "Elevation, gentle movement, and compression as appropriate", "Avoiding all movement for several weeks", "Applying heat immediately post-operatively"],
            ar: ["عدم الحركة لفترة طويلة في وضع منخفض", "الرفع والحركة اللطيفة والضغط حسب الحاجة", "تجنّب أي حركة لعدة أسابيع", "استخدام الحرارة فورًا بعد الجراحة"],
          },
          correctIndex: 1,
        },
        {
          question: {
            en: "Setting realistic pain expectations with patients helps mainly to:",
            ar: "وضع توقعات واقعية للألم مع المرضى يساعد بشكل أساسي في:",
          },
          options: {
            en: ["Guarantee a pain-free recovery", "Reduce fear-avoidance and support appropriate activity progression", "Replace the need for any pain management plan", "Discourage patients from reporting symptoms"],
            ar: ["ضمان تعافٍ خالٍ من الألم", "تقليل تجنّب الخوف ودعم التقدم المناسب في النشاط", "إلغاء الحاجة لأي خطة لإدارة الألم", "تثبيط المرضى عن الإبلاغ بالأعراض"],
          },
          correctIndex: 1,
        },
        {
          question: {
            en: "Pain that suggests something may be wrong post-surgery includes:",
            ar: "من الألم الذي يشير لاحتمال وجود مشكلة بعد الجراحة:",
          },
          options: {
            en: ["Mild soreness after a new exercise", "Sudden severe pain with new swelling, redness or fever", "Stiffness first thing in the morning", "Mild fatigue after a session"],
            ar: ["ألم خفيف بعد تمرين جديد", "ألم شديد ومفاجئ مع تورم أو احمرار أو حمى جديدة", "تيبّس أول الصباح", "تعب خفيف بعد الجلسة"],
          },
          correctIndex: 1,
        },
        {
          question: {
            en: "Objective tests before advancing a post-surgical patient should assess:",
            ar: "يجب أن تُقيّم الاختبارات الموضوعية قبل تقدّم مريض ما بعد الجراحة:",
          },
          options: {
            en: ["Only the number of days since surgery", "Strength, range of motion and functional milestones", "The patient's personal preference alone", "Nothing beyond a verbal check-in"],
            ar: ["عدد الأيام منذ الجراحة فقط", "القوة ومدى الحركة والمعالم الوظيفية", "تفضيل المريض الشخصي فقط", "لا شيء أبعد من سؤال شفهي"],
          },
          correctIndex: 1,
        },
        {
          question: {
            en: "When a patient isn't ready to progress, the appropriate response is to:",
            ar: "عندما لا يكون المريض جاهزًا للتقدم، تكون الاستجابة المناسبة هي:",
          },
          options: {
            en: ["Advance the protocol anyway to stay on schedule", "Discharge the patient early", "Adjust the plan and address the specific limiting factor", "Ignore the finding and repeat the same session"],
            ar: ["تقديم البروتوكول رغم ذلك للحفاظ على الجدول", "إخراج المريض مبكرًا", "تعديل الخطة ومعالجة العامل المحدِّد تحديدًا", "تجاهل النتيجة وتكرار نفس الجلسة"],
          },
          correctIndex: 2,
        },
      ],
    },
    attachments: [
      {
        title: { en: "Knee replacement week-by-week guide", ar: "دليل استبدال الركبة أسبوعًا بأسبوع" },
        pages: 5,
        url: "https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf",
      },
      {
        title: { en: "Swelling and pain management handout", ar: "نشرة إدارة التورم والألم" },
        pages: 2,
        url: "https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf",
      },
      {
        title: { en: "Progression criteria checklist", ar: "قائمة معايير التقدم" },
        pages: 3,
        url: "https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf",
      },
    ],
    reviews: [
      {
        name: "Ahmed Nabil",
        role: { en: "Physiotherapist", ar: "أخصائي علاج طبيعي" },
        quote: {
          en: "The week-by-week knee replacement breakdown removed all the guesswork from early-stage rehab.",
          ar: "تفصيل استبدال الركبة أسبوعًا بأسبوع أزال كل التخمين من مرحلة إعادة التأهيل المبكرة.",
        },
      },
      {
        name: "Yasmin Farouk",
        role: { en: "Clinic physiotherapist", ar: "أخصائية علاج طبيعي بعيادة" },
        quote: {
          en: "Patients recover faster now that I'm not improvising the shoulder protocol on the spot.",
          ar: "يتعافى المرضى أسرع الآن بعد أن توقفت عن ارتجال بروتوكول الكتف في اللحظة.",
        },
      },
      {
        name: "Kareem Zaki",
        role: { en: "Physiotherapist", ar: "أخصائي علاج طبيعي" },
        quote: {
          en: "The swelling management lecture alone saved me from a bad habit I'd had for years.",
          ar: "محاضرة إدارة التورم وحدها أنقذتني من عادة سيئة استمرت معي لسنوات.",
        },
      },
      {
        name: "Nadia Roushdy",
        role: { en: "Clinic physiotherapist", ar: "أخصائية علاج طبيعي بعيادة" },
        quote: {
          en: "Objective progression tests gave me a real answer instead of a gut feeling.",
          ar: "اختبارات التقدم الموضوعية أعطتني إجابة حقيقية بدلًا من الإحساس الشخصي.",
        },
      },
      {
        name: "Bassem Adly",
        role: { en: "Physiotherapy student", ar: "طالب علاج طبيعي" },
        quote: {
          en: "Best explanation of early post-op precautions I've come across in training so far.",
          ar: "أفضل شرح لاحتياطات ما بعد الجراحة المبكرة صادفته في تدريبي حتى الآن.",
        },
      },
    ],
    curriculum: [
      {
        title: { en: "Rehab stages after knee replacement", ar: "مراحل إعادة التأهيل بعد استبدال الركبة" },
        lessons: [
          { title: { en: "Week one: protecting the joint while moving early", ar: "الأسبوع الأول: حماية المفصل مع الحركة المبكرة" }, minutes: 13, preview: true },
          { title: { en: "Regaining full extension safely", ar: "استعادة المدّ الكامل بأمان" }, minutes: 12 },
          { title: { en: "Rebuilding quad strength after surgery", ar: "إعادة بناء قوة العضلة الرباعية بعد الجراحة" }, minutes: 14 },
        ],
      },
      {
        title: { en: "Rehab after shoulder surgery", ar: "إعادة التأهيل بعد جراحة الكتف" },
        lessons: [
          { title: { en: "Rotator cuff repair: the first six weeks", ar: "إصلاح الكفة المدورة: الأسابيع الستة الأولى" }, minutes: 15 },
          { title: { en: "Reintroducing overhead movement", ar: "إعادة إدخال الحركة فوق الرأس" }, minutes: 11 },
        ],
      },
      {
        title: { en: "Managing pain and swelling in early stages", ar: "إدارة الألم والتورم في المراحل المبكرة" },
        lessons: [
          { title: { en: "Non-drug swelling control that works", ar: "تحكم فعّال في التورم دون أدوية" }, minutes: 9 },
          { title: { en: "Setting realistic pain expectations with patients", ar: "وضع توقعات واقعية للألم مع المرضى" }, minutes: 8 },
          { title: { en: "When pain means something is wrong", ar: "متى يشير الألم لوجود مشكلة" }, minutes: 10 },
        ],
      },
      {
        title: { en: "Progression criteria between protocol phases", ar: "معايير التقدم بين مراحل البروتوكول" },
        lessons: [
          { title: { en: "Objective tests before advancing a patient", ar: "اختبارات موضوعية قبل تقدّم المريض" }, minutes: 12 },
          { title: { en: "What to do when a patient isn't ready", ar: "ماذا تفعل عندما لا يكون المريض جاهزًا" }, minutes: 9 },
        ],
      },
    ],
  },
];

export const NOTIFICATIONS = [
  {
    id: "u-2026-03",
    title: { en: "March cohort registration is open", ar: "التسجيل في دفعة مارس متاح الآن" },
    date: "2026-03-01",
    image: picsumUrl("insura-notif-cohort", 900, 560),
    body: {
      en: "New cohort schedule and details on where to collect certificates after course completion.",
      ar: "جدول الدفعة الجديدة وتفاصيل مكان استلام الشهادات بعد إتمام الدورة.",
    },
  },
  {
    id: "u-2026-02",
    title: { en: "Manual therapy exam bank updated", ar: "تحديث بنك أسئلة العلاج اليدوي" },
    date: "2026-02-14",
    image: picsumUrl("insura-notif-exam-bank", 900, 560),
    body: {
      en: "40 new questions were added to the Advanced Manual Therapy exam bank.",
      ar: "تمت إضافة 40 سؤالًا جديدًا لبنك أسئلة دورة العلاج اليدوي المتقدم.",
    },
    attachment: {
      title: { en: "Update summary", ar: "ملخص التحديث" },
      url: "https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf",
    },
  },
  {
    id: "u-2026-01",
    title: { en: "Monthly live session schedule", ar: "جدول الجلسات المباشرة الشهرية" },
    date: "2026-01-05",
    image: picsumUrl("insura-notif-schedule", 900, 560),
    body: {
      en: "Schedule for the live case-discussion sessions with our specialists.",
      ar: "جدول جلسات مناقشة الحالات المباشرة مع متخصصينا.",
    },
  },
];
