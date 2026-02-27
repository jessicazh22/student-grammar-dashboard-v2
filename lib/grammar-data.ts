// Types
export type Priority = "HIGH" | "MEDIUM" | "LOW"

export type ErrorCategory =
  | "subject-verb"
  | "articles"
  | "verb-patterns"
  | "tense"
  | "singular-plural"
  | "prepositions"
  | "word-form-choice"
  | "style"

export type AnnotationKind = "error" | "suggestion"

export interface PatternExample {
  incorrect: string
  correct: string
  context: string
}

export interface StudyTableRow {
  cells: string[]
}

export interface StudyTable {
  headers: string[]
  rows: StudyTableRow[]
}

export interface StudyContent {
  fullExplanation: string
  tables: { title: string; table: StudyTable }[]
  trickySpots: string[]
  decisionGuide?: string
}

export interface ErrorPattern {
  id: string
  category: ErrorCategory
  name: string
  priority: Priority
  count: number
  conversationCount: number
  shortExplanation: string
  quickTip: string
  examples: PatternExample[]
  studyContent: StudyContent
}

export interface CorrectionOption {
  label: string
  correction: string
  explanation: string
}

export interface TranscriptError {
  id: string
  startIndex: number
  endIndex: number
  category: ErrorCategory
  kind?: AnnotationKind // defaults to "error"
  original: string
  correction: string
  explanation: string
  rule: string
  alternatives?: CorrectionOption[]
}

export interface Transcript {
  id: string
  title: string
  date: string
  prompt?: string
  content: string
  errors: TranscriptError[]
  score: number
}

export interface TrendDataPoint {
  conversation: string
  errors: number
  score: number
}

export interface CategoryTrendPoint {
  conversation: string
  "subject-verb": number
  articles: number
  "verb-patterns": number
  tense: number
  "singular-plural": number
  prepositions: number
  "word-form-choice": number
}

// Category metadata
export const categoryMeta: Record<
  ErrorCategory,
  { label: string; color: string }
> = {
  "subject-verb": { label: "Subject-Verb Agreement", color: "var(--chart-1)" },
  articles: { label: "Article Usage", color: "var(--chart-2)" },
  "verb-patterns": { label: "Verb Patterns", color: "var(--chart-3)" },
  tense: { label: "Tense Consistency", color: "var(--chart-4)" },
  "singular-plural": { label: "Singular / Plural", color: "var(--chart-5)" },
  prepositions: { label: "Preposition Choice", color: "var(--chart-1)" },
  "word-form-choice": { label: "Word & Form Mix-Ups", color: "var(--chart-3)" },
  style: { label: "Style Suggestion", color: "var(--suggestion)" },
}

// ─── Rina's real patterns ───

export const errorPatterns: ErrorPattern[] = [
  {
    id: "1",
    category: "subject-verb",
    name: "Subject-Verb Agreement",
    priority: "HIGH",
    count: 5,
    conversationCount: 4,
    shortExplanation:
      "When the subject is he/she/it or a singular noun, the verb needs an -s ending.",
    quickTip:
      "Quick check: can you replace the subject with \"he\" or \"she\"? If yes, the verb needs an -s.",
    examples: [
      {
        incorrect: "...because she practice like five times a week",
        correct: "...because she practices like five times a week",
        context: "\"She\" is third person singular -- the verb always needs -s.",
      },
      {
        incorrect: "Sometimes she dance for up to seven hours",
        correct: "Sometimes she dances for up to seven hours",
        context:
          "Same pattern -- \"she\" + verb needs -s, even when other words like \"sometimes\" come before it.",
      },
      {
        incorrect: "Her persistence really amaze me",
        correct: "Her persistence really amazes me",
        context:
          "\"Persistence\" is a singular noun -- it works like \"it.\" Abstract nouns are always singular.",
      },
      {
        incorrect: "the type of person who always follow the rules",
        correct: "the type of person who always follows the rules",
        context:
          "\"Who\" refers back to \"person\" (singular). The verb after \"who\" agrees with the noun before it.",
      },
      {
        incorrect: "someone are selling",
        correct: "someone is selling",
        context:
          "\"Someone,\" \"anyone,\" \"everyone,\" and \"nobody\" are always grammatically singular.",
      },
    ],
    studyContent: {
      fullExplanation:
        "In English, present tense verbs change depending on who's doing the action. When the subject is he, she, it, or any singular noun, the verb needs an -s ending. This is called subject-verb agreement -- the verb has to \"agree\" with (match) the subject. Most languages don't do this, which is why it's one of the most common errors for English learners. It's also one of the first things native speakers notice, and one of the easiest to fix.",
      tables: [
        {
          title: "The Rule",
          table: {
            headers: ["Subject type", "Example", "Verb form"],
            rows: [
              { cells: ["he / she / it", "She runs every morning.", "+ s"] },
              {
                cells: [
                  "A singular noun",
                  "The company offers good benefits.",
                  "+ s",
                ],
              },
              {
                cells: ["Abstract noun", "Patience takes practice.", "+ s"],
              },
              {
                cells: [
                  "Someone / anyone / everyone / nobody",
                  "Everyone wants to be happy.",
                  "+ s",
                ],
              },
              {
                cells: [
                  "\"Who\" or \"that\" + singular",
                  "The person who lives here.",
                  "+ s",
                ],
              },
              {
                cells: [
                  "I / you / we / they",
                  "They run every morning.",
                  "no s",
                ],
              },
            ],
          },
        },
      ],
      trickySpots: [
        "Words between subject and verb: \"The quality of her ideas is impressive\" -- \"quality\" is the subject (singular), not \"ideas.\"",
        "\"Who\" and \"that\" clauses: the verb agrees with the noun before who/that. \"The people who live here\" (plural) vs \"the person who lives here\" (singular).",
      ],
    },
  },
  {
    id: "2",
    category: "articles",
    name: "Article Usage",
    priority: "HIGH",
    count: 7,
    conversationCount: 5,
    shortExplanation:
      "\"The\" means you both know which one. \"A\" means any one of this type. No article means the general concept.",
    quickTip:
      "Ask yourself: does my listener already know exactly which one I mean? Yes = \"the.\" No = \"a\" or nothing.",
    examples: [
      {
        incorrect: "I went to market",
        correct: "I went to the market",
        context: "There's a specific market you mean -- use \"the.\"",
      },
      {
        incorrect: "she is nurse",
        correct: "she is a nurse",
        context:
          "One person, one job -- use \"a\" to introduce a singular countable noun.",
      },
      {
        incorrect: "I bought a rice",
        correct: "I bought some rice / the rice",
        context:
          "Rice is uncountable -- you can't say \"a rice.\" Use \"some\" for an unspecified amount.",
      },
      {
        incorrect: "the happiness is important",
        correct: "Happiness is important",
        context:
          "General abstract concepts (happiness, freedom, love) don't use \"the\" when you mean the concept in general.",
      },
      {
        incorrect: "I like the dogs",
        correct: "I like dogs",
        context:
          "General statements about a whole category use no article with plural nouns.",
      },
      {
        incorrect: "a elderly",
        correct: "the elderly",
        context:
          "\"The elderly\" is a fixed expression for a group of people (like \"the poor,\" \"the young\").",
      },
      {
        incorrect: "the most of situations",
        correct: "most situations",
        context:
          "\"Most\" as a quantifier doesn't use \"the\" -- it stands alone before the noun.",
      },
    ],
    studyContent: {
      fullExplanation:
        "Articles exist in English to signal whether you and your listener are thinking about the same specific thing. \"The\" means you both know which one -- it's specific, shared knowledge. \"A\" means any one of this type -- introducing something new or talking about one example. No article with plural or uncountable nouns means the general concept. That's the core logic behind all article decisions.",
      tables: [
        {
          title: "Decision Table",
          table: {
            headers: ["Situation", "Article", "Example"],
            rows: [
              {
                cells: [
                  "Specific, both people know which one",
                  "the",
                  "Pass me the salt",
                ],
              },
              {
                cells: [
                  "Introducing something new, singular countable",
                  "a / an",
                  "I saw a dog",
                ],
              },
              {
                cells: [
                  "Referring back to something already mentioned",
                  "the",
                  "I saw a dog. The dog was huge.",
                ],
              },
              {
                cells: [
                  "General statement about a category (plural)",
                  "nothing",
                  "Dogs are loyal.",
                ],
              },
              {
                cells: [
                  "General abstract concept",
                  "nothing",
                  "Happiness matters.",
                ],
              },
              {
                cells: [
                  "Uncountable noun (general amount)",
                  "nothing / some",
                  "I need water / some water.",
                ],
              },
              {
                cells: [
                  "Fixed expressions with groups",
                  "the",
                  "The elderly, the poor",
                ],
              },
              {
                cells: ["Superlatives", "the", "The best, the most important"],
              },
            ],
          },
        },
      ],
      trickySpots: [
        "Uncountable nouns never take \"a\" -- water, rice, information, advice, furniture, homework.",
        "General truths about categories use no article: \"Dogs are loyal\" (not \"the dogs are loyal\").",
        "\"Most\" as a quantifier stands alone: \"most people\" (not \"the most of people\").",
      ],
      decisionGuide:
        "Does my listener already know exactly which one I mean? Yes = \"the.\" No = \"a\" (singular) or nothing (plural/uncountable).",
    },
  },
  {
    id: "3",
    category: "verb-patterns",
    name: "Verb Patterns",
    priority: "HIGH",
    count: 4,
    conversationCount: 3,
    shortExplanation:
      "After a preposition, always use -ing. For purpose, use \"to + verb.\" After let/make, use the base verb.",
    quickTip:
      "See a preposition (of, for, about, in, at)? The next verb must end in -ing. Describing why you do something? Use \"to + verb.\"",
    examples: [
      {
        incorrect: "habit to read",
        correct: "habit of reading",
        context: "After a preposition (\"of\"), the verb always takes -ing.",
      },
      {
        incorrect: "benefits to work",
        correct: "benefits of working",
        context:
          "Same pattern -- preposition + verb = always -ing.",
      },
      {
        incorrect: "I'm here for answering",
        correct: "I'm here to answer",
        context:
          "To express purpose (why you do something), use \"to + verb.\" Test: can you say \"in order to\"?",
      },
      {
        incorrect: "let them to try",
        correct: "let them try",
        context:
          "After \"let,\" \"make,\" and \"help,\" the next verb drops the \"to.\"",
      },
    ],
    studyContent: {
      fullExplanation:
        "English uses three verb forms after other verbs, prepositions, and certain structures: the gerund (-ing), the infinitive (to + verb), and the base verb (no to, no -ing). Which one you use depends on what comes before it -- and unfortunately there isn't one universal rule, but there are clear patterns that cover most situations.",
      tables: [
        {
          title: "Quick Decision Guide",
          table: {
            headers: ["What comes before the verb?", "Form to use", "Example"],
            rows: [
              {
                cells: [
                  "A preposition (of, for, about, in, at...)",
                  "-ing",
                  "habit of reading",
                ],
              },
              {
                cells: [
                  "Purpose -- \"why\" you do something",
                  "to + verb",
                  "here to answer",
                ],
              },
              { cells: ["let / make", "base verb", "let them try"] },
              {
                cells: [
                  "help",
                  "base verb (or to + verb)",
                  "help me find / help me to find",
                ],
              },
              {
                cells: [
                  "want / need / decide / hope / plan",
                  "to + verb",
                  "want to go, need to stop",
                ],
              },
              {
                cells: [
                  "enjoy / avoid / finish / suggest",
                  "-ing",
                  "enjoy reading, avoid making",
                ],
              },
            ],
          },
        },
      ],
      trickySpots: [
        "\"For\" can show function (not purpose): \"a knife for cutting vegetables\" = function (-ing) vs \"I used the knife to cut\" = purpose (to + verb).",
        "After prepositions, it's ALWAYS -ing: tired of waiting, good at speaking, interested in learning, instead of stopping.",
      ],
    },
  },
  {
    id: "4",
    category: "tense",
    name: "Tense Consistency",
    priority: "MEDIUM",
    count: 4,
    conversationCount: 3,
    shortExplanation:
      "When you tell a story about the past, stay in past tense throughout -- don't switch to present mid-story.",
    quickTip:
      "Telling a story? Pick past or present and stick with it. Only switch for things that are still true right now.",
    examples: [
      {
        incorrect: "I was walking and then I see him",
        correct: "I was walking and then I saw him",
        context:
          "Past story = past tense throughout. \"See\" should be \"saw.\"",
      },
      {
        incorrect: "She told me she is busy",
        correct: "She told me she was busy",
        context:
          "Reporting what someone said in the past = past tense.",
      },
    ],
    studyContent: {
      fullExplanation:
        "When you tell a story about the past, English expects you to stay in the past tense throughout -- you can't switch to present tense mid-story just because the action felt vivid. The past tense is for completed events. If something is still true now, you can use present tense, but only for that fact, then return to past.",
      tables: [
        {
          title: "When to Switch Tense",
          table: {
            headers: ["Situation", "Tense", "Example"],
            rows: [
              {
                cells: [
                  "Past story, all events completed",
                  "Stay in past",
                  "Last year I travelled to Japan. The food was amazing.",
                ],
              },
              {
                cells: [
                  "Describing something still true now",
                  "OK to use present",
                  "I grew up in a city that is very crowded.",
                ],
              },
              {
                cells: [
                  "Something that happened before another past event",
                  "Past perfect (had + past participle)",
                  "I had already eaten when she arrived.",
                ],
              },
              {
                cells: [
                  "Reporting speech",
                  "Shift to past",
                  "She told me she was busy.",
                ],
              },
            ],
          },
        },
      ],
      trickySpots: [
        "The \"vivid present\" trap: it feels natural to say \"and then I see him\" when telling an exciting story, but standard English expects \"saw.\"",
        "Reported speech always shifts back: \"She says she is\" becomes \"She said she was.\"",
      ],
    },
  },
  {
    id: "5",
    category: "singular-plural",
    name: "Singular / Plural",
    priority: "MEDIUM",
    count: 5,
    conversationCount: 2,
    shortExplanation:
      "When talking about more than one of something, the noun needs its plural form -- including irregular plurals.",
    quickTip:
      "General statements about a whole category need plurals: dogs, hobbies, businesses, people (not persons).",
    examples: [
      {
        incorrect: "persons can feel",
        correct: "people can feel",
        context:
          "\"People\" is the natural plural of \"person\" in everyday English. \"Persons\" is formal/legal.",
      },
      {
        incorrect: "I like hobby",
        correct: "I like hobbies",
        context:
          "General statement about multiple hobbies needs the plural form.",
      },
      {
        incorrect: "small business are important",
        correct: "small businesses are important",
        context:
          "\"Are\" tells us it's plural, so the noun needs to match.",
      },
    ],
    studyContent: {
      fullExplanation:
        "When you're talking about more than one of something, the noun needs its plural form. This includes irregular plurals and a few tricky cases.",
      tables: [
        {
          title: "Common Irregular Plurals",
          table: {
            headers: ["Singular", "Plural"],
            rows: [
              { cells: ["person", "people"] },
              { cells: ["child", "children"] },
              { cells: ["tooth", "teeth"] },
              { cells: ["foot", "feet"] },
              { cells: ["mouse", "mice"] },
            ],
          },
        },
      ],
      trickySpots: [
        "General statements about a whole category always use plurals: \"dogs are loyal\" (not \"dog is loyal\").",
        "\"Persons\" exists but sounds legal/formal. In everyday speech, always use \"people.\"",
      ],
    },
  },
  {
    id: "6",
    category: "prepositions",
    name: "Preposition Choice",
    priority: "MEDIUM",
    count: 3,
    conversationCount: 3,
    shortExplanation:
      "Some prepositions follow specific rules -- \"look\" + adjective (no \"like\"), position words don't take \"of.\"",
    quickTip:
      "\"Look\" + adjective = no \"like\" (look tired). \"Look like\" + noun (looks like a palace). Position words (below, above, near) connect directly to the noun.",
    examples: [
      {
        incorrect: "jobs only look like fancy",
        correct: "jobs only look fancy",
        context:
          "\"Look\" + adjective (no \"like\"): look tired, look happy, look fancy.",
      },
      {
        incorrect: "below of my eyebrow",
        correct: "below my eyebrow",
        context:
          "Position words connect directly to the noun -- no \"of\": above, below, beside, behind, near.",
      },
      {
        incorrect: "at the most situations",
        correct: "in most situations",
        context:
          "Abstract containers use \"in\": in situations, in cases, in my experience.",
      },
    ],
    studyContent: {
      fullExplanation:
        "Preposition choice in English often depends on patterns and fixed expressions rather than strict logic. There are three key areas that come up in your speech.",
      tables: [
        {
          title: "\"Look\" Patterns",
          table: {
            headers: ["Pattern", "Usage", "Example"],
            rows: [
              {
                cells: [
                  "look + adjective",
                  "Describing appearance",
                  "You look tired / look happy / look fancy",
                ],
              },
              {
                cells: [
                  "look like + noun",
                  "Comparing to something",
                  "It looks like a palace / looks like him",
                ],
              },
            ],
          },
        },
        {
          title: "Position Words",
          table: {
            headers: ["Word", "Usage"],
            rows: [
              {
                cells: [
                  "above, below, beside, behind, near, under, over",
                  "Connect directly to noun (no \"of\")",
                ],
              },
              {
                cells: [
                  "in front of, on top of",
                  "Exception: these DO use \"of\"",
                ],
              },
            ],
          },
        },
      ],
      trickySpots: [
        "\"In\" for abstract containers: in situations, in cases, in contexts.",
        "\"At\" for specific points/locations: at work, at school, at 3pm.",
        "Exception: \"in front of\" and \"on top of\" DO use \"of\" -- they're fixed expressions.",
      ],
    },
  },
  {
    id: "7",
    category: "word-form-choice",
    name: "Word & Form Mix-Ups",
    priority: "LOW",
    count: 6,
    conversationCount: 4,
    shortExplanation:
      "Using the wrong form of a word (hesitated vs hesitant), mixing up similar-sounding words (altitude vs attitude), or choosing the wrong pronoun form (theirselves vs themselves).",
    quickTip:
      "After \"am/is/was/were\" you need an adjective (hesitant, not hesitated). Before a noun, use the possessive form (our, not us). If a word sounds right but the meaning doesn't fit, double-check it.",
    examples: [
      {
        incorrect: "I was a little bit hesitated",
        correct: "I was a little bit hesitant",
        context:
          "\"Hesitant\" is the adjective. \"Hesitated\" is the past tense verb (used differently: \"I hesitated before answering\").",
      },
      {
        incorrect: "patience and altitude",
        correct: "patience and attitude",
        context:
          "Altitude = height (planes fly at high altitude). Attitude = your mindset or approach.",
      },
      {
        incorrect: "made by theirselves",
        correct: "made by themselves",
        context:
          "\"Theirselves\" isn't standard English. The reflexive pronouns are: myself, yourself, himself, herself, itself, ourselves, themselves.",
      },
      {
        incorrect: "protect us safety",
        correct: "protect our safety",
        context:
          "Before a noun, use the possessive form (our). \"Us\" is the object form -- used after verbs (\"help us\"), not before nouns.",
      },
    ],
    studyContent: {
      fullExplanation:
        "This pattern covers three related issues: (1) using the wrong form of a word (adjective vs verb), (2) mixing up similar-sounding words, and (3) choosing the wrong pronoun form. They all come down to picking the right version of a word for the context.",
      tables: [
        {
          title: "Adjective vs Past Tense",
          table: {
            headers: ["After \"I was...\"", "Adjective (correct)", "Past tense verb (different use)"],
            rows: [
              {
                cells: [
                  "Describing a feeling",
                  "I was hesitant",
                  "I hesitated before answering",
                ],
              },
              {
                cells: [
                  "Describing a state",
                  "I was excited",
                  "The news excited everyone",
                ],
              },
            ],
          },
        },
        {
          title: "Similar-Sounding Words",
          table: {
            headers: ["Word A", "Meaning", "Word B", "Meaning"],
            rows: [
              {
                cells: [
                  "altitude",
                  "height above ground",
                  "attitude",
                  "mindset, approach",
                ],
              },
              {
                cells: [
                  "affect",
                  "to influence (verb)",
                  "effect",
                  "a result (noun)",
                ],
              },
            ],
          },
        },
        {
          title: "Pronoun Forms",
          table: {
            headers: ["Subject", "Object", "Possessive", "Reflexive"],
            rows: [
              { cells: ["I", "me", "my", "myself"] },
              { cells: ["you", "you", "your", "yourself"] },
              { cells: ["he", "him", "his", "himself"] },
              { cells: ["she", "her", "her", "herself"] },
              { cells: ["we", "us", "our", "ourselves"] },
              { cells: ["they", "them", "their", "themselves"] },
            ],
          },
        },
      ],
      trickySpots: [
        "Some adjectives look like past participles: \"I was excited\" (adjective) vs \"The news excited me\" (verb).",
        "Similar-sounding words only get caught by context, not by ear. When in doubt, think about what you actually mean.",
        "\"Theirselves\" and \"hisself\" are not standard English -- always use \"themselves\" and \"himself.\"",
        "\"Us\" before a noun is a common mistake: \"us safety\" should be \"our safety.\"",
      ],
    },
  },
]

// ─── Rina's transcripts ───

const rinaHappinessText = `I'm here for answering the first question, what do you think makes people happy? Um, I think happiness is very subjective. It can mean different things to different people. For someone, maybe the emotional connections or meaningful relationships with their friends and families can make them happy because persons can feel supported and understood by their friends and families. Other things like hobby, good health, delicious food and even good weather can also bring us happiness. And for the second question, is there a difference between short term and long term happiness? I believe there is a difference. Short term happiness can bring us immediately pleasure like when we are having a piece of chocolate, the sugar can induce our brains release dopamine and this kind of feeling is temporary, but long term happiness usually refers to something more stable, um, for instance, like very solid friendship, which can provide us happiness constantly.`

export const sampleTranscript: Transcript = {
  id: "rina_happiness_001",
  title: "Happiness and Well-being",
  date: "2026-02-14",
  content: rinaHappinessText,
  score: 74,
  errors: [
    {
      id: "G1",
      startIndex: 0,
      endIndex: 22,
      category: "verb-patterns",
      original: "I'm here for answering",
      correction: "I'm here to answer",
      explanation:
        "When you explain your purpose or reason, use 'to + verb' (infinitive), not 'for + verb-ing'. Pattern: 'here to answer' (purpose).",
      rule: "Infinitive of purpose: use 'here/come/go + to + verb' to show purpose.",
    },
    {
      id: "G2",
      startIndex: 306,
      endIndex: 322,
      category: "word-form-choice",
      original: "persons can feel",
      correction: "people can feel",
      explanation:
        "Use 'people' when talking about human beings in general. 'Persons' is very formal (used in legal documents) and sounds unnatural in everyday speech.",
      rule: "Word choice: 'people' is the natural plural of 'person' in everyday English.",
    },
    {
      id: "G3",
      startIndex: 257,
      endIndex: 277,
      category: "singular-plural",
      original: "friends and families",
      correction: "friends and family",
      explanation:
        "When you talk about your own family, use the singular form 'family'. Only use 'families' when talking about multiple separate family units.",
      rule: "Singular/Plural: 'family' is singular when referring to one's own family unit.",
    },
    {
      id: "G4",
      startIndex: 392,
      endIndex: 402,
      category: "singular-plural",
      original: "like hobby",
      correction: "like hobbies",
      explanation:
        "When you make a general statement about things (not one specific thing), use the plural form. Since you're listing multiple examples, 'hobby' should be 'hobbies'.",
      rule: "Singular/Plural: general statements about a category need plural nouns.",
    },
    {
      id: "G5",
      startIndex: 636,
      endIndex: 665,
      category: "word-form-choice",
      original: "bring us immediately pleasure",
      correction: "bring us immediate pleasure",
      explanation:
        "You can't put an adverb between a verb and its object. There are two ways to fix this.",
      rule: "Adjective vs adverb: use an adjective before a noun, an adverb after the verb phrase.",
      alternatives: [
        {
          label: "Use adjective before noun",
          correction: "bring us immediate pleasure",
          explanation:
            "Change 'immediately' (adverb) to 'immediate' (adjective) so it describes the noun 'pleasure' directly.",
        },
        {
          label: "Move adverb to end",
          correction: "bring us pleasure immediately",
          explanation:
            "Keep 'immediately' as an adverb but move it after the object so the sentence flows naturally.",
        },
      ],
    },
    {
      id: "G6",
      startIndex: 726,
      endIndex: 760,
      category: "verb-patterns",
      original: "induce our brains release dopamine",
      correction: "induce our brains to release dopamine",
      explanation:
        "The verb 'induce' needs 'to' before the next verb. The pattern is: induce + someone/something + to + verb.",
      rule: "Verb pattern: induce + object + to + infinitive.",
    },
    {
      id: "G7",
      startIndex: 883,
      endIndex: 909,
      category: "articles",
      original: "like very solid friendship",
      correction: "like a very solid friendship",
      explanation:
        "When you give an example with a countable noun like 'friendship', you need 'a/an' before the singular form, or use the plural 'friendships'.",
      rule: "Articles: singular countable nouns need an article (a/an/the).",
    },
    {
      id: "G8a",
      startIndex: 921,
      endIndex: 941,
      category: "prepositions",
      original: "provide us happiness",
      correction: "provide us with happiness",
      explanation:
        "The verb 'provide' needs the word 'with' when giving something to someone. Pattern: provide + person + with + thing.",
      rule: "Preposition: provide + person + with + thing.",
    },
    {
      id: "G8b",
      startIndex: 942,
      endIndex: 953,
      category: "style",
      kind: "suggestion",
      original: "constantly",
      correction: "consistently",
      explanation:
        "Both words work, but 'consistently' better conveys reliability over time, while 'constantly' can imply non-stop without breaks. Here are two ways to express this.",
      rule: "Word nuance: 'consistently' = reliably over time; 'constantly' = without stopping.",
      alternatives: [
        {
          label: "Adjective before noun",
          correction: "consistent happiness",
          explanation:
            "Restructure using the adjective 'consistent' before 'happiness'. This sounds polished and natural.",
        },
        {
          label: "Adverb at the end",
          correction: "happiness consistently",
          explanation:
            "Keep the adverb form 'consistently' after the noun. This emphasises the ongoing nature.",
        },
      ],
    },
  ],
}

// ─── Small Businesses transcript ───

const rinaBusinessText = `Yeah, there are many small business in the place where I lived, especially it's Christmas season now. And almost every time I went to the street, I could saw I could see someone are selling some Christmas decorations like, mm, tiny Christmas tree trees made by theirselves. For the second question, for me, compared to buying things from small business, I prefer to buy products from big companies like chain stores or something because I think they have better after sales guarantee. If you have any quality issues, you can return your product and refund your money at any time you want, so I think big companies can always have better commitment compared to the small business. For the third question, um, honestly, I don't think I will create my own small business in the future because I'm not the type of person who is very interested in business stuff and I don't think I have enough business knowledge or marketing knowledge or market perception. So I don't think this career is suitable for me and uh, I don't think I am that responsible for taking care of the business.`

export const rinaBusinessTranscript: Transcript = {
  id: "rina_business_001",
  title: "Small Businesses",
  date: "2026-02-10",
  prompt:
    "Answer the following questions about small businesses:\n- Are there many small businesses where you live?\n- Do you prefer shopping at small businesses or big companies? Why?\n- Would you ever consider starting your own small business?",
  content: rinaBusinessText,
  score: 60,
  errors: [
    {
      id: "B1",
      startIndex: rinaBusinessText.indexOf("many small business"),
      endIndex:
        rinaBusinessText.indexOf("many small business") +
        "many small business".length,
      category: "singular-plural",
      original: "many small business",
      correction: "many small businesses",
      explanation:
        "'Many' signals more than one, so the noun needs its plural form. 'Business' becomes 'businesses'. This pattern comes up several more times in your answer -- it's a good one to lock in!",
      rule: "'Many' + noun = always plural: many businesses, many people, many ideas.",
    },
    {
      id: "B2",
      startIndex: rinaBusinessText.indexOf("where I lived"),
      endIndex:
        rinaBusinessText.indexOf("where I lived") + "where I lived".length,
      category: "tense",
      original: "where I lived",
      correction: "where I live",
      explanation:
        "You're still living there right now, so use present tense 'live'. Only use past tense 'lived' if you've moved away. Think: is this still true? Yes → present tense.",
      rule: "Still true now? Use present tense. Finished in the past? Use past tense.",
    },
    {
      id: "B3",
      startIndex: rinaBusinessText.indexOf("especially it's"),
      endIndex:
        rinaBusinessText.indexOf("especially it's") +
        "especially it's".length,
      category: "verb-patterns",
      original: "especially it's",
      correction: "especially since it's",
      explanation:
        "You need the connector 'since' to link your reason (Christmas season) to your statement. Without it, the two clauses feel disconnected. Pattern: 'especially since + reason'.",
      rule: "To introduce a reason: 'especially since + clause'. 'Since' means 'because' here.",
    },
    {
      id: "B4",
      startIndex: rinaBusinessText.indexOf("someone are selling"),
      endIndex:
        rinaBusinessText.indexOf("someone are selling") +
        "someone are selling".length,
      category: "subject-verb",
      original: "someone are selling",
      correction: "someone selling / someone was selling",
      explanation:
        "'Someone' is always singular -- think of it as 'one person'. So it takes a singular verb. The simplest fix: drop the verb entirely ('I could see someone selling') or use 'was' ('someone was selling').",
      rule: "Someone / anyone / everyone / no one = always singular verb.",
      alternatives: [
        {
          label: "Drop the verb (natural)",
          correction: "I could see someone selling",
          explanation:
            "After 'see', you can drop the 'to be' verb: 'I could see someone selling' = natural and correct.",
        },
        {
          label: "Use singular verb",
          correction: "someone was selling",
          explanation:
            "'Someone' + singular past verb. Use 'was' (not 'were') to match the singular subject.",
        },
      ],
    },
    {
      id: "B5",
      startIndex: rinaBusinessText.indexOf("made by theirselves"),
      endIndex:
        rinaBusinessText.indexOf("made by theirselves") +
        "made by theirselves".length,
      category: "word-form-choice",
      original: "made by theirselves",
      correction: "made by themselves",
      explanation:
        "'Theirselves' isn't standard English -- it doesn't exist as a real word. The correct reflexive pronoun for 'they' is 'themselves'. Reflexive pronouns follow a pattern: myself, yourself, himself, herself, ourselves, themselves.",
      rule: "Reflexive pronouns: myself, yourself, himself, herself, ourselves, themselves. No 'theirselves'.",
    },
    {
      id: "B6",
      startIndex: rinaBusinessText.indexOf("from small business,"),
      endIndex:
        rinaBusinessText.indexOf("from small business,") +
        "from small business".length,
      category: "singular-plural",
      original: "from small business",
      correction: "from small businesses",
      explanation:
        "Same pattern as earlier -- you're talking about multiple small businesses in general, so use the plural. This comes up four times in your answer, which makes it a pattern to work on!",
      rule: "Talking about a category or multiple examples = plural noun.",
    },
    {
      id: "B7",
      startIndex: rinaBusinessText.indexOf("the small business."),
      endIndex:
        rinaBusinessText.indexOf("the small business.") +
        "the small business".length,
      category: "singular-plural",
      original: "the small business",
      correction: "small businesses",
      explanation:
        "Two things here: (1) you're talking about small businesses in general (not one specific one), so use the plural 'businesses', and (2) drop 'the' since you're not referring to a specific business your listener already knows.",
      rule: "General category = no article + plural: small businesses (not 'the small business').",
    },
    {
      id: "B8",
      startIndex: rinaBusinessText.indexOf("better commitment"),
      endIndex:
        rinaBusinessText.indexOf("better commitment") +
        "better commitment".length,
      category: "singular-plural",
      original: "better commitment",
      correction: "better commitments",
      explanation:
        "Big companies make multiple types of commitments (quality, refunds, service, etc.), so the plural 'commitments' is more natural here.",
      rule: "When referring to multiple types of something, use the plural form.",
    },
    {
      id: "B9",
      startIndex: rinaBusinessText.indexOf("I am that responsible"),
      endIndex:
        rinaBusinessText.indexOf("I am that responsible") +
        "I am that responsible".length,
      category: "word-form-choice",
      original: "I am that responsible",
      correction: "I am responsible enough",
      explanation:
        "'That + adjective + for' isn't a standard English pattern when expressing capability. The natural way to say this is 'adjective + enough + to + verb': 'responsible enough to take care of a business'.",
      rule: "To say you have enough of a quality: adjective + enough + to + verb. E.g. 'confident enough to speak', 'experienced enough to lead'.",
    },
    {
      id: "B10",
      startIndex: rinaBusinessText.indexOf("taking care of the business"),
      endIndex:
        rinaBusinessText.indexOf("taking care of the business") +
        "taking care of the business".length,
      category: "articles",
      original: "taking care of the business",
      correction: "taking care of a business",
      explanation:
        "You're imagining a hypothetical future business -- it doesn't exist yet and isn't specific. Use 'a business' (introducing something new/indefinite), not 'the business' (which points to something specific both people already know about).",
      rule: "Hypothetical or first-mention = 'a/an'. Specific, already known = 'the'.",
      alternatives: [
        {
          label: "More natural phrasing",
          correction: "running a business",
          explanation:
            "'Running a business' is the more common and natural phrase for managing a business day-to-day.",
        },
      ],
    },
  ],
}

export const transcriptList: Omit<Transcript, "content" | "errors">[] = [
  { id: "rina_happiness_001", title: "Happiness and Well-being", date: "2026-02-14", score: 74 },
  { id: "rina_business_001", title: "Small Businesses", date: "2026-02-10", score: 60 },
]

export const rinaTranscriptMap: Record<string, Transcript> = {
  rina_happiness_001: sampleTranscript,
  rina_business_001: rinaBusinessTranscript,
}

// ─── Trend data (approximated across 9 conversations) ───

export const overallTrend: TrendDataPoint[] = [
  { conversation: "Conv 1", errors: 5, score: 62 },
  { conversation: "Conv 2", errors: 4, score: 65 },
  { conversation: "Conv 3", errors: 3, score: 70 },
  { conversation: "Conv 4", errors: 4, score: 68 },
  { conversation: "Conv 5", errors: 3, score: 72 },
  { conversation: "Conv 6", errors: 2, score: 76 },
  { conversation: "Conv 7", errors: 3, score: 74 },
  { conversation: "Conv 8", errors: 2, score: 78 },
  { conversation: "Conv 9", errors: 1, score: 82 },
]

export const categoryTrend: CategoryTrendPoint[] = [
  { conversation: "Conv 1", "subject-verb": 2, articles: 1, "verb-patterns": 1, tense: 1, "singular-plural": 0, prepositions: 0, "word-form-choice": 0 },
  { conversation: "Conv 2", "subject-verb": 1, articles: 1, "verb-patterns": 0, tense: 1, "singular-plural": 1, prepositions: 0, "word-form-choice": 1 },
  { conversation: "Conv 3", "subject-verb": 0, articles: 1, "verb-patterns": 1, tense: 0, "singular-plural": 1, prepositions: 0, "word-form-choice": 0 },
  { conversation: "Conv 4", "subject-verb": 1, articles: 1, "verb-patterns": 0, tense: 1, "singular-plural": 0, prepositions: 1, "word-form-choice": 1 },
  { conversation: "Conv 5", "subject-verb": 0, articles: 1, "verb-patterns": 1, tense: 0, "singular-plural": 0, prepositions: 1, "word-form-choice": 1 },
  { conversation: "Conv 6", "subject-verb": 1, articles: 0, "verb-patterns": 0, tense: 0, "singular-plural": 1, prepositions: 0, "word-form-choice": 1 },
  { conversation: "Conv 7", "subject-verb": 0, articles: 1, "verb-patterns": 1, tense: 0, "singular-plural": 0, prepositions: 1, "word-form-choice": 1 },
  { conversation: "Conv 8", "subject-verb": 0, articles: 1, "verb-patterns": 0, tense: 1, "singular-plural": 0, prepositions: 0, "word-form-choice": 1 },
  { conversation: "Conv 9", "subject-verb": 0, articles: 0, "verb-patterns": 0, tense: 0, "singular-plural": 1, prepositions: 0, "word-form-choice": 0 },
]
