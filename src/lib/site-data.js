export const SITE = {
  name: "Insura",
  tagline: "Medical rehabilitation training for practicing specialists",
  email: "info@insura.example",
  social: {
    facebook: "https://www.facebook.com",
    instagram: "https://www.instagram.com",
    tiktok: "https://www.tiktok.com",
  },
};

export function buildWhatsAppLink() {
  return "https://www.whatsapp.com";
}

export function unsplashUrl(id, width, height) {
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${width}&h=${height}&q=80`;
}

export function formatMinutes(minutes) {
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  return rest ? `${hours}h ${rest}m` : `${hours}h`;
}

export function getCourseStats(course) {
  const lessons = course.curriculum.flatMap((section) => section.lessons);
  const totalMinutes = lessons.reduce((sum, lesson) => sum + lesson.minutes, 0);
  return {
    sections: course.curriculum.length,
    lessons: lessons.length,
    duration: formatMinutes(totalMinutes),
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
    title: "Sports Physiotherapy Fundamentals",
    description:
      "Build a solid clinical base for assessing and rehabilitating common field injuries, taught by practicing sports therapists.",
    duration: "6 weeks",
    price: "EGP 1,200",
    image: "1603398938378-e54eab446dde",
    instructor: {
      name: "Dr. Omar El-Sayed",
      title: "Sports Physiotherapist, 11 years in club and clinic settings",
      bio: "Omar has worked pitch-side for two youth football academies and now splits his time between a private sports clinic and training new graduates on return-to-play decisions.",
      image: "1622253692010-333f2da6031d",
    },
    includes: { pdfs: 12, examBank: true, notes: true },
    exam: {
      title: "Final Assessment",
      subject: "Sports Physiotherapy Fundamentals",
      questions: [
        {
          question:
            "Which of these is a classic sign of an acute (not chronic) sports injury?",
          options: [
            "Gradual onset over several weeks",
            "Sudden onset pain during activity",
            "Pain only after prolonged rest",
            "Symmetrical bilateral stiffness",
          ],
          correctIndex: 1,
        },
        {
          question:
            "Which special test is most associated with assessing ACL integrity?",
          options: ["Thomas test", "Empty can test", "Lachman test", "Slump test"],
          correctIndex: 2,
        },
        {
          question: 'In the RICE protocol for acute sprains, what does the "E" stand for?',
          options: ["Extension", "Exercise", "Evaluation", "Elevation"],
          correctIndex: 3,
        },
        {
          question: "Grade II ankle sprains typically involve:",
          options: [
            "Complete ligament rupture with joint instability",
            "Partial ligament tear with moderate swelling",
            "No ligament damage, only muscle strain",
            "A bone fracture",
          ],
          correctIndex: 1,
        },
        {
          question:
            "Which criterion is NOT typically used to clear an athlete for return to play?",
          options: [
            "Symmetrical strength testing",
            "Pain-free full range of motion",
            "Sport-specific movement screening",
            "The athlete's mood on unrelated topics",
          ],
          correctIndex: 3,
        },
        {
          question: "A hop test is primarily used to assess:",
          options: [
            "Cardiovascular endurance",
            "Lower limb functional strength and confidence",
            "Upper body flexibility",
            "Balance disorders unrelated to injury",
          ],
          correctIndex: 1,
        },
        {
          question: "Chronic overuse injuries are best characterised by:",
          options: [
            "A sudden traumatic mechanism",
            "Immediate severe swelling",
            "Gradual symptom onset from repetitive loading",
            "Complete loss of joint function",
          ],
          correctIndex: 2,
        },
        {
          question: "Which of these is an appropriate early-stage ACL rehab goal?",
          options: [
            "Return to competitive sprinting",
            "Unrestricted contact training",
            "Plyometric jump training",
            "Restoring full knee extension and reducing swelling",
          ],
          correctIndex: 3,
        },
        {
          question: "When progressing a home exercise program, the priority is:",
          options: [
            "Maximum intensity from day one",
            "Gradual load progression the patient can realistically maintain",
            "Skipping warm-up to save time",
            "Avoiding all activity until fully pain-free",
          ],
          correctIndex: 1,
        },
        {
          question: "Hamstring re-injury risk is increased most by:",
          options: [
            "Icing too frequently",
            "Excessive static stretching",
            "Too much rest before any activity",
            "Returning to sprinting before eccentric strength is restored",
          ],
          correctIndex: 3,
        },
      ],
    },
    attachments: [
      {
        title: "Sideline assessment cheat sheet",
        pages: 4,
        url: "https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf",
      },
      {
        title: "Return-to-play testing checklist",
        pages: 3,
        url: "https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf",
      },
      {
        title: "Home exercise plan template",
        pages: 5,
        url: "https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf",
      },
    ],
    reviews: [
      {
        name: "Hana Kamal",
        role: "Physiotherapist",
        quote:
          "The return-to-play section changed how I clear athletes. I stopped guessing and started testing.",
      },
      {
        name: "Ziad Fathallah",
        role: "Sports rehab trainee",
        quote:
          "Watched the ankle protocol module twice before applying it the same week in clinic. Worked.",
      },
      {
        name: "Dina Ashraf",
        role: "Physiotherapist",
        quote:
          "Finally a course that explains why an athlete isn't ready, not just a checklist to tick.",
      },
      {
        name: "Youssef Hamdy",
        role: "Sports rehab trainee",
        quote:
          "The case studies section is worth it alone. Real messy cases, not textbook ones.",
      },
      {
        name: "Marwa Sobhy",
        role: "Clinic physiotherapist",
        quote:
          "My return-to-play conversations with coaches are a lot more confident now.",
      },
    ],
    curriculum: [
      {
        title: "Acute vs. chronic sports injury assessment",
        lessons: [
          { title: "How to triage a fresh sideline injury", minutes: 14, preview: true },
          { title: "Reading swelling, bruising and range of motion", minutes: 11 },
          { title: "When chronic overuse mimics an acute injury", minutes: 9 },
        ],
      },
      {
        title: "Knee and ankle rehab protocols",
        lessons: [
          { title: "ACL rehab, week by week", minutes: 16 },
          { title: "Ankle sprain grading and loading progressions", minutes: 13 },
          { title: "Building a home exercise plan patients stick to", minutes: 10 },
        ],
      },
      {
        title: "Functional rehab and return to play",
        lessons: [
          { title: "Return-to-play testing that actually predicts risk", minutes: 15 },
          { title: "Sport-specific movement drills", minutes: 12 },
          { title: "Clearing an athlete: the final checklist", minutes: 8 },
        ],
      },
      {
        title: "Real case studies from sports clinics",
        lessons: [
          { title: "Case: hamstring re-injury in a sprinter", minutes: 13 },
          { title: "Case: recurring ankle sprains in a footballer", minutes: 11 },
          { title: "Case: slow recovery after knee surgery", minutes: 12 },
        ],
      },
    ],
  },
  {
    slug: "spinal-injury-rehab",
    title: "Spinal Injury Rehabilitation",
    description:
      "Practical assessment and rehab protocols for lumbar and cervical spine pain and injuries, ready to apply in the clinic.",
    duration: "5 weeks",
    price: "EGP 1,100",
    image: "1655313719493-16ebe4906441",
    instructor: {
      name: "Dr. Ramy Hassan",
      title: "Spinal Rehab Specialist, DPT",
      bio: "Ramy runs a lumbar and cervical rehab program at a Cairo outpatient clinic and lectures on mechanical low back pain assessment for new physiotherapy graduates.",
      image: "1645066928295-2506defde470",
    },
    includes: { pdfs: 9, examBank: true, notes: true },
    exam: {
      title: "Final Assessment",
      subject: "Spinal Injury Rehabilitation",
      questions: [
        {
          question: "Which structure most commonly refers pain down the leg in sciatica?",
          options: [
            "The lumbar facet joints",
            "A compressed or irritated lumbar nerve root",
            "The gluteal muscles alone",
            "The sacroiliac ligament",
          ],
          correctIndex: 1,
        },
        {
          question: "A key spinal 'red flag' requiring urgent referral is:",
          options: [
            "Morning stiffness lasting 10 minutes",
            "Pain that improves with movement",
            "New saddle anaesthesia or bladder dysfunction",
            "Mild pain after prolonged sitting",
          ],
          correctIndex: 2,
        },
        {
          question: "Centralisation of leg symptoms during assessment generally suggests:",
          options: [
            "A worsening disc herniation",
            "A favourable prognostic sign for a directional-preference exercise",
            "An unrelated hip pathology",
            "The need for immediate surgery",
          ],
          correctIndex: 1,
        },
        {
          question: "Which finding best differentiates discogenic pain from facet joint pain?",
          options: [
            "Facet pain often worsens with extension and rotation",
            "Discogenic pain never worsens with sitting",
            "Facet pain always radiates below the knee",
            "There is no reliable clinical difference",
          ],
          correctIndex: 0,
        },
        {
          question: "A core stability program in early lumbar rehab should prioritise:",
          options: [
            "Heavy loaded deadlifts from day one",
            "Deep trunk muscle control before adding load",
            "Long-duration static stretching only",
            "Complete rest from all trunk activity",
          ],
          correctIndex: 1,
        },
        {
          question: "Which is an appropriate criterion before progressing a lumbar rehab phase?",
          options: [
            "The patient reports zero pain forever",
            "A fixed number of weeks has passed, regardless of symptoms",
            "Objective functional and symptom-based milestones are met",
            "The patient requests a heavier program",
          ],
          correctIndex: 2,
        },
        {
          question: "Cervical nerve root patterns are most useful for:",
          options: [
            "Diagnosing unrelated shoulder bursitis",
            "Identifying which spinal level may be involved",
            "Replacing the need for any physical assessment",
            "Confirming a muscular strain only",
          ],
          correctIndex: 1,
        },
        {
          question: "A structured lumbar assessment routine should begin with:",
          options: [
            "Aggressive manual therapy before any history-taking",
            "A thorough history and screening for red flags",
            "Immediate strength testing only",
            "Imaging referral for every patient",
          ],
          correctIndex: 1,
        },
        {
          question: "Which best describes appropriate discharge criteria after a rehab plan?",
          options: [
            "The patient has attended a minimum number of sessions",
            "Functional goals are met and a home maintenance plan is in place",
            "The patient has stopped reporting any symptoms at all times",
            "The clinic schedule requires the slot back",
          ],
          correctIndex: 1,
        },
        {
          question: "When progress stalls mid-plan, the most appropriate first step is to:",
          options: [
            "Immediately increase load significantly",
            "Re-assess and adjust the plan based on findings",
            "Discharge the patient",
            "Repeat the exact same exercises indefinitely",
          ],
          correctIndex: 1,
        },
      ],
    },
    attachments: [
      {
        title: "Spinal red flag screening form",
        pages: 2,
        url: "https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf",
      },
      {
        title: "Lumbar assessment routine handout",
        pages: 4,
        url: "https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf",
      },
      {
        title: "12-week progressive plan template",
        pages: 6,
        url: "https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf",
      },
    ],
    reviews: [
      {
        name: "Mostafa Adel",
        role: "Physiotherapist",
        quote:
          "The red flag checklist alone was worth the course. I refer out faster and with more confidence now.",
      },
      {
        name: "Salma Ibrahim",
        role: "Clinic owner",
        quote:
          "We now run the 12-week plan from this course with almost every disc patient we see.",
      },
      {
        name: "Hossam Nabil",
        role: "Physiotherapist",
        quote:
          "The core stability section fixed my biggest weak spot: knowing when to progress load.",
      },
      {
        name: "Farida El-Gohary",
        role: "Physiotherapy student",
        quote:
          "Explained mechanical back pain better than a full semester of university lectures.",
      },
      {
        name: "Amr Shawky",
        role: "Clinic physiotherapist",
        quote:
          "Discharge criteria section stopped me from cutting patients loose too early.",
      },
    ],
    curriculum: [
      {
        title: "Functional anatomy of the spine",
        lessons: [
          { title: "The spine as a load-bearing system", minutes: 12, preview: true },
          { title: "Nerve root patterns you need to recognise", minutes: 14 },
          { title: "Common anatomy mistakes in assessment", minutes: 8 },
        ],
      },
      {
        title: "Assessing mechanical low back pain",
        lessons: [
          { title: "A structured lumbar assessment routine", minutes: 15 },
          { title: "Red flags: when to refer out", minutes: 9 },
          { title: "Differentiating disc, joint and muscular pain", minutes: 13 },
        ],
      },
      {
        title: "Core stability programming",
        lessons: [
          { title: "Building a core program from week one", minutes: 14 },
          { title: "Progressing load without triggering flare-ups", minutes: 11 },
        ],
      },
      {
        title: "A 12-week progressive treatment plan",
        lessons: [
          { title: "Structuring the full 12-week plan", minutes: 16 },
          { title: "Adjusting the plan when progress stalls", minutes: 10 },
          { title: "Discharge criteria and home maintenance", minutes: 9 },
        ],
      },
    ],
  },
  {
    slug: "advanced-manual-therapy",
    title: "Advanced Manual Therapy",
    description:
      "Advanced joint and soft-tissue manual therapy techniques, with step-by-step applied video demonstrations.",
    duration: "8 weeks",
    price: "EGP 1,600",
    image: "1777805865927-a6ee4c4eacb1",
    instructor: {
      name: "Dr. Karim Fathy",
      title: "Manual Therapy Instructor, DPT",
      bio: "Karim trained under manual therapy specialists in Germany before returning to teach hands-on mobilisation and soft-tissue technique to physiotherapists across Egypt.",
      image: "1712215544003-af10130f8eb3",
    },
    includes: { pdfs: 15, examBank: true, notes: true },
    exam: {
      title: "Final Assessment",
      subject: "Advanced Manual Therapy",
      questions: [
        {
          question: "In joint mobilisation grading, a Grade IV mobilisation is best described as:",
          options: [
            "A small-amplitude movement at the start of range",
            "A large-amplitude movement through the middle of range",
            "A small-amplitude movement at the end of available range",
            "A high-velocity thrust technique",
          ],
          correctIndex: 2,
        },
        {
          question: "Before applying deep myofascial release, a therapist should first:",
          options: [
            "Apply maximum pressure immediately",
            "Assess tissue tension and screen for contraindications",
            "Skip assessment to save session time",
            "Only rely on the patient's imaging report",
          ],
          correctIndex: 1,
        },
        {
          question: "Which is an absolute contraindication to manual therapy?",
          options: [
            "Mild generalised muscle soreness",
            "An unstable fracture at the treatment site",
            "Chronic, well-managed low back pain",
            "Mild joint stiffness after inactivity",
          ],
          correctIndex: 1,
        },
        {
          question: "Trigger point work is best applied with the goal of:",
          options: [
            "Overtreating until all soreness disappears immediately",
            "Reducing localised tension without provoking a flare-up",
            "Replacing all active exercise entirely",
            "Working only on the pain-free side of the body",
          ],
          correctIndex: 1,
        },
        {
          question: "Why does manual therapy alone often plateau in effectiveness?",
          options: [
            "It cannot be combined with any other intervention",
            "It provides short-term relief without addressing loading capacity",
            "It always causes long-term tissue damage",
            "It has no evidence base at all",
          ],
          correctIndex: 1,
        },
        {
          question: "Sequencing manual therapy with active exercise typically means:",
          options: [
            "Manual therapy first to create a window for active movement work",
            "Never combining the two approaches",
            "Exercise only, with manual therapy fully excluded",
            "Manual therapy replacing exercise permanently",
          ],
          correctIndex: 0,
        },
        {
          question: "Informed consent before a manual therapy technique should include:",
          options: [
            "Skipping explanation to save time",
            "An explanation of the technique, its purpose, and possible risks",
            "Only a verbal agreement with no discussion of risks",
            "Consent from a colleague instead of the patient",
          ],
          correctIndex: 1,
        },
        {
          question: "Proper documentation of manual therapy technique mainly protects:",
          options: [
            "Only the clinic's billing process",
            "The therapist and patient by recording clinical reasoning and consent",
            "Nothing of clinical or legal value",
            "Only the equipment used in the session",
          ],
          correctIndex: 1,
        },
        {
          question: "Shoulder joint mobilisation hands-on practice should begin with:",
          options: [
            "The highest grade mobilisation available",
            "A clear assessment of end-feel and irritability first",
            "Skipping assessment and mobilising immediately",
            "Applying the same technique regardless of findings",
          ],
          correctIndex: 1,
        },
        {
          question: "A relative contraindication differs from an absolute one because it:",
          options: [
            "Never requires any clinical judgement",
            "May allow treatment with modified technique and caution",
            "Always means treatment must stop entirely",
            "Only applies to spinal manipulation",
          ],
          correctIndex: 1,
        },
      ],
    },
    attachments: [
      {
        title: "Joint mobilisation grading reference",
        pages: 3,
        url: "https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf",
      },
      {
        title: "Contraindications quick guide",
        pages: 2,
        url: "https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf",
      },
      {
        title: "Informed consent form template",
        pages: 3,
        url: "https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf",
      },
    ],
    reviews: [
      {
        name: "Nourhan Samy",
        role: "Physiotherapist",
        quote:
          "First course where the hands-on technique actually matched what I could reproduce on a real patient.",
      },
      {
        name: "Tarek Mansour",
        role: "Sports rehab trainee",
        quote:
          "The mobilisation grading finally clicked for me after the shoulder demonstration.",
      },
      {
        name: "Rania Khattab",
        role: "Physiotherapist",
        quote:
          "The myofascial release module is the clearest hands-on demo I've seen on this technique.",
      },
      {
        name: "Sherif Wahba",
        role: "Clinic physiotherapist",
        quote:
          "Contraindications section made me rethink two patients I was about to treat that week.",
      },
      {
        name: "Lina Hafez",
        role: "Sports rehab trainee",
        quote:
          "Practiced the hip mobilisation on a classmate the same day. It held up in clinic too.",
      },
    ],
    curriculum: [
      {
        title: "Joint mobilisation techniques",
        lessons: [
          { title: "Grading mobilisations I through IV", minutes: 17, preview: true },
          { title: "Shoulder joint mobilisation, hands-on", minutes: 15 },
          { title: "Hip and knee mobilisation, hands-on", minutes: 14 },
        ],
      },
      {
        title: "Soft-tissue and myofascial release",
        lessons: [
          { title: "Reading tissue tension before you treat it", minutes: 12 },
          { title: "Myofascial release for the upper back", minutes: 13 },
          { title: "Trigger point work without overtreating", minutes: 11 },
        ],
      },
      {
        title: "Combining manual therapy with exercise",
        lessons: [
          { title: "Why manual therapy alone plateaus", minutes: 10 },
          { title: "Sequencing hands-on work with active exercise", minutes: 14 },
        ],
      },
      {
        title: "Safety standards and contraindications",
        lessons: [
          { title: "Absolute and relative contraindications", minutes: 12 },
          { title: "Informed consent in manual therapy", minutes: 8 },
          { title: "Documenting technique for legal protection", minutes: 9 },
        ],
      },
    ],
  },
  {
    slug: "post-surgical-rehab",
    title: "Post-Surgical Rehabilitation",
    description:
      "A complete rehab pathway for patients after common orthopaedic surgeries and joint replacements.",
    duration: "7 weeks",
    price: "EGP 1,400",
    image: "1756699280573-85c5628a4c6c",
    instructor: {
      name: "Dr. Mostafa Adel",
      title: "Post-Surgical Rehab Specialist, DPT",
      bio: "Mostafa works alongside orthopaedic surgeons on joint replacement rehab pathways and has built post-surgical protocols used in three private hospitals.",
      image: "1642975967602-653d378f3b5b",
    },
    includes: { pdfs: 11, examBank: true, notes: true },
    exam: {
      title: "Final Assessment",
      subject: "Post-Surgical Rehabilitation",
      questions: [
        {
          question: "In week one after knee replacement, the main priority is:",
          options: [
            "Aggressive strengthening against heavy resistance",
            "Protecting the joint while encouraging safe early movement",
            "Complete immobilisation until week four",
            "Full return to normal walking pace immediately",
          ],
          correctIndex: 1,
        },
        {
          question: "Regaining full knee extension after replacement matters mainly because:",
          options: [
            "It has no effect on gait or function",
            "A flexion contracture can impair normal walking mechanics",
            "It is only a cosmetic concern",
            "It replaces the need for quad strengthening",
          ],
          correctIndex: 1,
        },
        {
          question: "Quad strength rebuilding after knee surgery should be:",
          options: [
            "Delayed until the patient is fully pain-free",
            "Skipped in favour of rest alone",
            "Progressed gradually as swelling and healing allow",
            "Maximal from the very first session",
          ],
          correctIndex: 2,
        },
        {
          question: "In the first six weeks after rotator cuff repair, the priority is typically:",
          options: [
            "Protecting the repair while allowing protected passive motion",
            "Unrestricted overhead lifting",
            "Aggressive stretching into end-range immediately",
            "Complete shoulder immobilisation with no movement at all",
          ],
          correctIndex: 0,
        },
        {
          question: "Reintroducing overhead movement after shoulder surgery should be guided by:",
          options: [
            "A fixed calendar date only",
            "Tissue healing timeframes and objective movement quality",
            "Patient impatience to return to sport",
            "Whichever exercise feels most familiar",
          ],
          correctIndex: 1,
        },
        {
          question: "Non-drug swelling control methods commonly include:",
          options: [
            "Prolonged immobility in a dependent position",
            "Elevation, gentle movement, and compression as appropriate",
            "Avoiding all movement for several weeks",
            "Applying heat immediately post-operatively",
          ],
          correctIndex: 1,
        },
        {
          question: "Setting realistic pain expectations with patients helps mainly to:",
          options: [
            "Guarantee a pain-free recovery",
            "Reduce fear-avoidance and support appropriate activity progression",
            "Replace the need for any pain management plan",
            "Discourage patients from reporting symptoms",
          ],
          correctIndex: 1,
        },
        {
          question: "Pain that suggests something may be wrong post-surgery includes:",
          options: [
            "Mild soreness after a new exercise",
            "Sudden severe pain with new swelling, redness or fever",
            "Stiffness first thing in the morning",
            "Mild fatigue after a session",
          ],
          correctIndex: 1,
        },
        {
          question: "Objective tests before advancing a post-surgical patient should assess:",
          options: [
            "Only the number of days since surgery",
            "Strength, range of motion and functional milestones",
            "The patient's personal preference alone",
            "Nothing beyond a verbal check-in",
          ],
          correctIndex: 1,
        },
        {
          question: "When a patient isn't ready to progress, the appropriate response is to:",
          options: [
            "Advance the protocol anyway to stay on schedule",
            "Discharge the patient early",
            "Adjust the plan and address the specific limiting factor",
            "Ignore the finding and repeat the same session",
          ],
          correctIndex: 2,
        },
      ],
    },
    attachments: [
      {
        title: "Knee replacement week-by-week guide",
        pages: 5,
        url: "https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf",
      },
      {
        title: "Swelling and pain management handout",
        pages: 2,
        url: "https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf",
      },
      {
        title: "Progression criteria checklist",
        pages: 3,
        url: "https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf",
      },
    ],
    reviews: [
      {
        name: "Ahmed Nabil",
        role: "Physiotherapist",
        quote:
          "The week-by-week knee replacement breakdown removed all the guesswork from early-stage rehab.",
      },
      {
        name: "Yasmin Farouk",
        role: "Clinic physiotherapist",
        quote:
          "Patients recover faster now that I'm not improvising the shoulder protocol on the spot.",
      },
      {
        name: "Kareem Zaki",
        role: "Physiotherapist",
        quote:
          "The swelling management lecture alone saved me from a bad habit I'd had for years.",
      },
      {
        name: "Nadia Roushdy",
        role: "Clinic physiotherapist",
        quote:
          "Objective progression tests gave me a real answer instead of a gut feeling.",
      },
      {
        name: "Bassem Adly",
        role: "Physiotherapy student",
        quote:
          "Best explanation of early post-op precautions I've come across in training so far.",
      },
    ],
    curriculum: [
      {
        title: "Rehab stages after knee replacement",
        lessons: [
          { title: "Week one: protecting the joint while moving early", minutes: 13, preview: true },
          { title: "Regaining full extension safely", minutes: 12 },
          { title: "Rebuilding quad strength after surgery", minutes: 14 },
        ],
      },
      {
        title: "Rehab after shoulder surgery",
        lessons: [
          { title: "Rotator cuff repair: the first six weeks", minutes: 15 },
          { title: "Reintroducing overhead movement", minutes: 11 },
        ],
      },
      {
        title: "Managing pain and swelling in early stages",
        lessons: [
          { title: "Non-drug swelling control that works", minutes: 9 },
          { title: "Setting realistic pain expectations with patients", minutes: 8 },
          { title: "When pain means something is wrong", minutes: 10 },
        ],
      },
      {
        title: "Progression criteria between protocol phases",
        lessons: [
          { title: "Objective tests before advancing a patient", minutes: 12 },
          { title: "What to do when a patient isn't ready", minutes: 9 },
        ],
      },
    ],
  },
];

export const UPDATES = [
  {
    id: "u-2026-03",
    title: "March cohort registration is open",
    date: "2026-03-01",
    body: "New cohort schedule and details on where to collect certificates after course completion.",
    attachment: { type: "image", label: "Cohort poster" },
  },
  {
    id: "u-2026-02",
    title: "Manual therapy exam bank updated",
    date: "2026-02-14",
    body: "40 new questions were added to the Advanced Manual Therapy exam bank.",
    attachment: { type: "pdf", label: "Update summary" },
  },
  {
    id: "u-2026-01",
    title: "Monthly live session schedule",
    date: "2026-01-05",
    body: "Schedule for the live case-discussion sessions with our specialists.",
    attachment: { type: "image", label: "Schedule" },
  },
];
