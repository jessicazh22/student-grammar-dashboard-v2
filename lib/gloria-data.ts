import type { Transcript, ErrorPattern } from "@/lib/grammar-data"

// ─── Gloria's transcript text ───
// Punctuation and capitalization added for readability (not highlighted as errors).
// Paragraph breaks added for scannability.

const gloriaMoneyText = `So, I actually got a friend who is really good at manage her money. Um, I really want to develop this, uh, money skills, cause before I'm kind of, I'm like, I have no concept about money.

So, um, for example, um, if I hang out with friends in the restaurant, we all gonna order the drinks even though there's nothing I want to drink, I'll still order one. But my friend, um, there was a time we hang out and had dinner. After she checked the drink menu, she said, "Oh, um, there's nothing I want to drink, so I will not order."

And after that I just realise, I wasted a lot of my money on something that I don't really need and I don't actually want. Um, so that's a reason I want to develop this, um, good habit.

This is not about rich and poor. It's about, do you have a clear mind, or like, clear concept with money, and how you gonna use it as a tool rather than let the money control you.

She also knows clearly about the, um, price of daily necessities, like fruits, vegetables, um, tissues, paper towels, like everything. So you can tell when the price is going higher, or um, is the price worth it when you buy the same thing at different places?`

// ─── Gloria's transcript with inline errors ───

export const gloriaTranscript: Transcript = {
  id: "gloria_money_001",
  title: "Money Management Habit",
  date: "2026-02-18",
  content: gloriaMoneyText,
  score: 68,
  errors: [
    {
      id: "G0",
      startIndex: gloriaMoneyText.indexOf("I actually got a friend"),
      endIndex:
        gloriaMoneyText.indexOf("I actually got a friend") +
        "I actually got a friend".length,
      category: "tense",
      original: "I actually got a friend",
      correction: "I actually have a friend",
      explanation:
        "When describing a current situation -- you still have this friend -- use the present tense 'have', not the past tense 'got'. 'Got' suggests you acquired the friend in the past and is less natural here.",
      rule: "Use 'have' for something you currently possess. Use 'got' for the moment of acquiring it.",
    },
    {
      id: "G1",
      startIndex: gloriaMoneyText.indexOf("good at manage her money"),
      endIndex:
        gloriaMoneyText.indexOf("good at manage her money") +
        "good at manage her money".length,
      category: "verb-patterns",
      original: "good at manage her money",
      correction: "good at managing her money",
      explanation:
        "After a preposition like 'at', always use the -ing form of the verb. Think of it as: preposition + verb-ing. So 'good at manage' becomes 'good at managing'.",
      rule: "Preposition + verb = always use the -ing form (gerund).",
    },
    {
      id: "G2",
      startIndex: gloriaMoneyText.indexOf("we all gonna order"),
      endIndex:
        gloriaMoneyText.indexOf("we all gonna order") +
        "we all gonna order".length,
      category: "verb-patterns",
      original: "we all gonna order",
      correction: "we would all order",
      explanation:
        "'Gonna' is short for 'going to', but it still needs a helper verb like 'are' or 'will' before it. Without it, the sentence is missing a piece. A cleaner option: 'we would all order'.",
      rule: "Gonna/going to needs a helper verb: we're gonna, I'm gonna, they're gonna.",
      alternatives: [
        {
          label: "Formal version",
          correction: "we would all order",
          explanation:
            "Use 'would' to describe a habitual past action. This sounds natural and polished.",
        },
        {
          label: "Casual version",
          correction: "we're all gonna order",
          explanation:
            "Keep 'gonna' but add the helper verb 'are' (contracted to 're'). This works in casual speech.",
        },
      ],
    },
    {
      id: "G3",
      startIndex: gloriaMoneyText.indexOf("order the drinks"),
      endIndex:
        gloriaMoneyText.indexOf("order the drinks") +
        "order the drinks".length,
      category: "articles",
      original: "order the drinks",
      correction: "order drinks",
      explanation:
        "When you're talking about drinks in general (not specific ones you've already mentioned), drop 'the'. Use 'the' only when both you and your listener know exactly which drinks you mean.",
      rule: "General categories don't need 'the': order drinks, buy food, listen to music.",
    },
    {
      id: "G4",
      startIndex: gloriaMoneyText.indexOf("the drink menu"),
      endIndex:
        gloriaMoneyText.indexOf("the drink menu") +
        "the drink menu".length,
      category: "singular-plural",
      original: "the drink menu",
      correction: "the drinks menu",
      explanation:
        "When a noun acts as a modifier before another noun, it usually stays singular in English (e.g., 'shoe store'). But 'drinks menu' is an exception -- it's a fixed expression where 'drinks' keeps its plural form because it refers to a list of multiple drinks.",
      rule: "Some compound nouns keep the plural: drinks menu, sports car, arms dealer. Learn these as fixed expressions.",
    },
    {
      id: "G4b",
      startIndex: gloriaMoneyText.indexOf("there was a time we hang out"),
      endIndex:
        gloriaMoneyText.indexOf("there was a time we hang out") +
        "there was a time we hang out".length,
      category: "tense",
      original: "there was a time we hang out",
      correction: "there was a time we hung out",
      explanation:
        "'There was a time' tells your listener this happened in the past, so the next verb needs to be past tense too. 'Hang' is present; 'hung' is past.",
      rule: "Past time marker (there was, last week, yesterday) = past tense verbs throughout.",
    },
    {
      id: "G5",
      startIndex: gloriaMoneyText.indexOf("after that I just realise"),
      endIndex:
        gloriaMoneyText.indexOf("after that I just realise") +
        "after that I just realise".length,
      category: "tense",
      original: "after that I just realise",
      correction: "after that I just realised",
      explanation:
        "You're telling a story about the past, so stay in past tense. 'Realise' is present tense; 'realised' (or 'realized') is the past form you need here.",
      rule: "Telling a past story? Keep all verbs in past tense. Only switch to present for things still true now.",
    },
    {
      id: "G6",
      startIndex: gloriaMoneyText.indexOf("how you gonna use it"),
      endIndex:
        gloriaMoneyText.indexOf("how you gonna use it") +
        "how you gonna use it".length,
      category: "verb-patterns",
      original: "how you gonna use it",
      correction: "how you're gonna use it",
      explanation:
        "Same pattern as G2 -- 'gonna' needs a helper verb. Add 'are' (contracted to 're') before 'gonna', or use 'will' for a more formal version.",
      rule: "Gonna/going to needs a helper verb: you're gonna, he's gonna, we're gonna.",
      alternatives: [
        {
          label: "Casual fix",
          correction: "how you're gonna use it",
          explanation: "Add the helper verb 'are' (contracted). Natural for speaking.",
        },
        {
          label: "Formal fix",
          correction: "how you will use it",
          explanation: "Replace 'gonna' with 'will' for a cleaner, more formal tone.",
        },
      ],
    },
    {
      id: "G7",
      startIndex: gloriaMoneyText.indexOf("develop this, uh, money skills"),
      endIndex:
        gloriaMoneyText.indexOf("develop this, uh, money skills") +
        "develop this, uh, money skills".length,
      category: "singular-plural",
      original: "develop this, uh, money skills",
      correction: "develop these money skills",
      explanation:
        "'Skills' is plural, so the pointer word before it needs to be plural too. 'This' is for one thing; 'these' is for more than one.",
      rule: "This/that = singular noun. These/those = plural noun. Match the pointer to the noun.",
    },
    {
      id: "G8",
      startIndex: gloriaMoneyText.indexOf(
        "rather than let the money control you"
      ),
      endIndex:
        gloriaMoneyText.indexOf(
          "rather than let the money control you"
        ) + "rather than let the money control you".length,
      category: "verb-patterns",
      original: "rather than let the money control you",
      correction: "rather than letting money control you",
      explanation:
        "Two things here: (1) after 'rather than', use the -ing form 'letting' to keep the sentence parallel, and (2) drop 'the' before 'money' since you're talking about money as a general concept, not specific money.",
      rule: "'Rather than' + -ing form keeps sentences parallel: 'rather than letting', 'rather than waiting'.",
      alternatives: [
        {
          label: "With -ing (natural)",
          correction: "rather than letting money control you",
          explanation:
            "Using 'letting' matches the flow of the sentence and drops the unnecessary 'the'. This is the most natural option.",
        },
        {
          label: "With 'instead of'",
          correction: "instead of letting money control you",
          explanation:
            "'Instead of' + -ing is another natural way to express the same idea.",
        },
      ],
    },
    {
      id: "S1",
      startIndex: gloriaMoneyText.indexOf("money skills"),
      endIndex:
        gloriaMoneyText.indexOf("money skills") + "money skills".length,
      category: "style",
      kind: "suggestion",
      original: "money skills",
      correction: "financial literacy",
      explanation:
        "While 'money skills' is perfectly understandable, native speakers would more commonly say 'financial literacy', 'financial skills', or 'money management skills'. These are natural collocations that sound polished in both casual and professional contexts.",
      rule: "Word choice: 'financial literacy' or 'financial skills' are more natural collocations than 'money skills'.",
      alternatives: [
        {
          label: "Most common",
          correction: "financial literacy",
          explanation:
            "'Financial literacy' is the standard term for understanding how to manage money. You'll hear it in schools, news, and everyday conversation.",
        },
        {
          label: "Professional",
          correction: "financial skills",
          explanation:
            "'Financial skills' is a natural pairing that works well in both casual and formal settings.",
        },
        {
          label: "Descriptive",
          correction: "money management skills",
          explanation:
            "More specific and descriptive -- makes it clear you mean the skill of managing money.",
        },
      ],
    },
    {
      id: "S1b",
      startIndex: gloriaMoneyText.indexOf("develop this, um, good habit"),
      endIndex:
        gloriaMoneyText.indexOf("develop this, um, good habit") +
        "develop this, um, good habit".length,
      category: "style",
      kind: "suggestion",
      original: "develop this, um, good habit",
      correction: "build better spending habits",
      explanation:
        "Your meaning is clear, but 'develop this good habit' is a bit vague -- which habit exactly? In English, being specific makes your point stronger. Try naming the habit directly.",
      rule: "Be specific: instead of 'good habit', name the habit. It makes your English sound more precise and confident.",
      alternatives: [
        {
          label: "Specific & natural",
          correction: "build better spending habits",
          explanation:
            "'Build habits' and 'spending habits' are common collocations in English. This tells your listener exactly what kind of habit you mean.",
        },
        {
          label: "With 'financial'",
          correction: "develop better financial habits",
          explanation:
            "Uses 'financial habits' -- a natural pairing that connects to the money management theme of your story.",
        },
        {
          label: "Casual & direct",
          correction: "get better with money",
          explanation:
            "Simple, natural, and conversational. 'Get better with' is a common spoken phrase.",
        },
      ],
    },
    {
      id: "S2",
      startIndex: gloriaMoneyText.indexOf(
        "This is not about rich and poor"
      ),
      endIndex:
        gloriaMoneyText.indexOf("This is not about rich and poor") +
        "This is not about rich and poor".length,
      category: "style",
      kind: "suggestion",
      original: "This is not about rich and poor",
      correction: "This is not about being rich or poor",
      explanation:
        "Your idea is great! To make the structure smoother, add 'being' to show you're comparing two states, and use 'or' instead of 'and' since you're contrasting opposites.",
      rule: "Parallel structure: 'about being X or Y' is cleaner than 'about X and Y' when comparing states.",
      alternatives: [
        {
          label: "With 'being'",
          correction: "This is not about being rich or poor",
          explanation:
            "Adding 'being' makes it clear you're talking about the state of being rich or poor.",
        },
        {
          label: "With 'who's'",
          correction: "This is not about who's rich or who's poor",
          explanation:
            "This version emphasises the people rather than the states. Both work well.",
        },
      ],
    },
  ],
}

export const gloriaTranscriptList: Omit<
  Transcript,
  "content" | "errors"
>[] = [
  {
    id: "gloria_money_001",
    title: "Money Management Habit",
    date: "2026-02-18",
  score: 68,
  },
]

// ─── Gloria's error patterns (aggregated from single transcript) ───

export const gloriaErrorPatterns: ErrorPattern[] = [
  {
    id: "g1",
    category: "verb-patterns",
    name: "Verb Patterns",
    priority: "HIGH",
    count: 4,
    conversationCount: 1,
    shortExplanation:
      "Four patterns to watch: (1) after a preposition, always use -ing; (2) 'gonna' needs a helper verb like 'are' or 'will'; (3) 'rather than' + -ing keeps sentences parallel.",
    quickTip:
      "See a preposition (at, for, about)? The next verb must end in -ing. Using 'gonna'? Make sure there's a helper verb before it.",
    examples: [
      {
        incorrect: "good at manage her money",
        correct: "good at managing her money",
        context:
          "After 'at' (a preposition), the verb always takes -ing.",
      },
      {
        incorrect: "we all gonna order",
        correct: "we would all order / we're all gonna order",
        context:
          "'Gonna' is short for 'going to' but still needs a helper verb (are/will). Or use 'would' for past habits.",
      },
      {
        incorrect: "how you gonna use it",
        correct: "how you're gonna use it / how you will use it",
        context:
          "Same pattern -- add the helper verb before 'gonna'.",
      },
      {
        incorrect: "rather than let the money control you",
        correct: "rather than letting money control you",
        context:
          "'Rather than' + -ing keeps the sentence flowing naturally. Also drop 'the' before general concepts.",
      },
    ],
    studyContent: {
      fullExplanation:
        "English uses different verb forms depending on what comes before them. Two key patterns appear in your speech: (1) after prepositions like 'at', 'for', 'about', always use the -ing form (gerund), and (2) 'gonna' (informal for 'going to') always needs a helper verb (am/is/are/will) before it. Without the helper, the sentence sounds incomplete.",
      tables: [
        {
          title: "Quick Decision Guide",
          table: {
            headers: ["What comes before the verb?", "Form to use", "Example"],
            rows: [
              {
                cells: [
                  "A preposition (at, for, about, in...)",
                  "-ing",
                  "good at managing",
                ],
              },
              {
                cells: [
                  "Gonna (informal 'going to')",
                  "helper verb + gonna + base verb",
                  "we're gonna order",
                ],
              },
              {
                cells: [
                  "Purpose -- 'why' you do something",
                  "to + verb",
                  "I want to develop",
                ],
              },
            ],
          },
        },
      ],
      trickySpots: [
        "'Gonna' sounds complete in fast speech, but in standard English it always needs 'am/is/are/will' before it: 'I'm gonna', 'we're gonna', 'they're gonna'.",
        "After prepositions, it's ALWAYS -ing: good at speaking, tired of waiting, interested in learning.",
      ],
    },
  },
  {
    id: "g2",
    category: "articles",
    name: "Article Usage",
    priority: "HIGH",
    count: 1,
    conversationCount: 1,
    shortExplanation:
      "Using 'the' with general concepts or categories where no article is needed. Drop 'the' when you mean something in general, not a specific one.",
    quickTip:
      "Ask yourself: does my listener already know exactly which one I mean? If you're talking about the general concept, drop 'the'.",
    examples: [
      {
        incorrect: "order the drinks",
        correct: "order drinks",
        context:
          "You're talking about drinks in general, not specific ones. General categories don't need 'the'.",
      },
    ],
    studyContent: {
      fullExplanation:
        "Articles ('the', 'a/an', or nothing) signal whether you and your listener are thinking about the same specific thing. 'The' means you both know which one. No article with plural or uncountable nouns means the general concept. In your speech, you tend to add 'the' before general concepts where it's not needed.",
      tables: [
        {
          title: "When to Use 'The' vs Nothing",
          table: {
            headers: ["Situation", "Article", "Example"],
            rows: [
              {
                cells: [
                  "Specific -- both people know which one",
                  "the",
                  "Pass me the menu (the one on the table)",
                ],
              },
              {
                cells: [
                  "General category (plural nouns)",
                  "nothing",
                  "I like drinks / Order drinks",
                ],
              },
              {
                cells: [
                  "General abstract concept",
                  "nothing",
                  "Money is a tool / Happiness matters",
                ],
              },
              {
                cells: [
                  "Already mentioned before",
                  "the",
                  "She checked the drink menu (specific menu)",
                ],
              },
            ],
          },
        },
      ],
      trickySpots: [
        "General truths about categories use no article: 'I like dogs' (not 'the dogs'), 'order drinks' (not 'the drinks').",
        "Abstract nouns used as general concepts don't take 'the': money, happiness, life, love.",
      ],
      decisionGuide:
        "Am I talking about a specific one we both know about? Use 'the'. Am I talking about the concept in general? Use nothing.",
    },
  },
  {
    id: "g3",
    category: "tense",
    name: "Tense Consistency",
    priority: "HIGH",
    count: 3,
    conversationCount: 1,
    shortExplanation:
      "When telling a story about the past, keep all verbs in past tense. Also, use present tense 'have' (not past 'got') when describing something that's still true now.",
    quickTip:
      "Telling a story? Pick past tense and stick with it. Describing something current? Use present tense.",
    examples: [
      {
        incorrect: "I actually got a friend",
        correct: "I actually have a friend",
        context:
          "You still have this friend now, so use present tense 'have', not past tense 'got'.",
      },
      {
        incorrect: "there was a time we hang out",
        correct: "there was a time we hung out",
        context:
          "'There was a time' signals past, so use 'hung out' (past), not 'hang out' (present).",
      },
      {
        incorrect: "after that I just realise",
        correct: "after that I just realised",
        context:
          "You're narrating a past event, so use 'realised' (past), not 'realise' (present).",
      },
    ],
    studyContent: {
      fullExplanation:
        "When you tell a story about the past, English expects you to stay in past tense throughout. You can't switch to present tense mid-story just because the action felt vivid. This is one of the most common patterns for English learners -- the story starts in past tense but some verbs slip back to present.",
      tables: [
        {
          title: "Staying in Past Tense",
          table: {
            headers: ["Situation", "Tense", "Example"],
            rows: [
              {
                cells: [
                  "Past story, all events completed",
                  "Stay in past",
                  "There was a time we hung out and had dinner.",
                ],
              },
              {
                cells: [
                  "Something still true now",
                  "OK to use present",
                  "I realised that I waste a lot of money (still true).",
                ],
              },
              {
                cells: [
                  "Reporting what someone said",
                  "Shift to past",
                  "She said there was nothing she wanted.",
                ],
              },
            ],
          },
        },
      ],
      trickySpots: [
        "The 'vivid present' trap: it feels natural to use present tense when telling an exciting past story, but English expects past throughout.",
        "Common pairs to practise: hang/hung, realise/realised, see/saw, go/went, say/said.",
      ],
    },
  },
  {
    id: "g4",
    category: "singular-plural",
    name: "Singular / Plural Agreement",
    priority: "MEDIUM",
    count: 2,
    conversationCount: 1,
    shortExplanation:
      "Two patterns: (1) pointer words like 'this/that' (singular) and 'these/those' (plural) must match the noun, and (2) some compound nouns keep the plural form, like 'drinks menu'.",
    quickTip:
      "Before you say 'this' or 'these', check: is the noun singular or plural? Also, learn fixed expressions like 'drinks menu' and 'sports car'.",
    examples: [
      {
        incorrect: "develop this, uh, money skills",
        correct: "develop these money skills",
        context:
          "'Skills' is plural, so the pointer word must be 'these' (plural), not 'this' (singular).",
      },
      {
        incorrect: "the drink menu",
        correct: "the drinks menu",
        context:
          "'Drinks menu' is a fixed expression -- 'drinks' stays plural because it refers to a list of multiple drinks.",
      },
    ],
    studyContent: {
      fullExplanation:
        "Demonstrative pronouns (this, that, these, those) must agree in number with the noun they modify. 'This' and 'that' are for singular nouns; 'these' and 'those' are for plural nouns. This is easy to miss in speech because fillers (um, uh) can separate the pointer from the noun.",
      tables: [
        {
          title: "Demonstrative Agreement",
          table: {
            headers: ["Pointer", "Used with", "Example"],
            rows: [
              { cells: ["this / that", "singular noun", "this skill, that book"] },
              {
                cells: [
                  "these / those",
                  "plural noun",
                  "these skills, those books",
                ],
              },
            ],
          },
        },
      ],
      trickySpots: [
        "Filler words (um, uh) between the pointer and noun can make you lose track of whether you said 'this' or 'these'.",
        "If you're unsure, check the noun: does it end in -s? If yes, use 'these/those'.",
      ],
    },
  },
]
