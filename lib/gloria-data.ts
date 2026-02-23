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
  prompt:
    "Describe a good habit your friend has, and you want to develop. You should say:\n- Who your friend is\n- What habit he or she has\n- How you know it is a good habit\n- And explain why you want to develop this habit",
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
        "You still have this friend right now, so you want present tense here -- 'I have a friend'. When you say 'I got a friend', it sounds like you're talking about the moment you met them. It's a really common mix-up, so don't worry -- just think: is this still true right now? If yes, go with 'have'.",
      rule: "Still true right now? Use 'have'. Talking about when it happened? Use 'got'.",
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
        "This is a really useful rule to know! Whenever you see a preposition like 'at', 'for', or 'about', the verb right after it always needs -ing. So 'good at manage' becomes 'good at managing'. Once you get the hang of this pattern, it'll start feeling automatic.",
      rule: "Preposition (at, for, about...) + verb = always -ing. No exceptions!",
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

// ─── Gloria's second transcript text (Movie) ───

const gloriaMovieText = `So this movie called Flying Colours, which was played by my head teacher of the class. Um, it's a very inspiring movie telling stories about, um, main character, Saika, who struggled with her schoolwork, only focus on beauty and just want to hang with friends all day in high school.

So, in this movie, one of her teacher looked down on her and don't believe, um, she can get in uni, so um she decided to prove herself like to everybody. And at the end of the story she get into one of the best uni in Japan, which is very inspiring and that's also why my head of teacher, uh, like my teacher want us to watch that in high school.

But the thing I learned from this movie is not about studying hard and dream comes true. Um, I learned something about friendship. So um, the plot when she wanna study hard because she's a hot girl and she also got hot friends. They always hang out with each other, but when she decide she want to study hard, um, her friend was very supportive.

Sometime like in Chinese high school, student kind of think study hard is awkward or embarrassed, so, um, they don't like nerds or like hardworking students. Um, if you say I'm gonna study hard you might got laughed at.

So in that movie, I realise real friends will support each other no matter what and people should not, um, mock someone who wanna improve and change.`

export const gloriaMovieTranscript: Transcript = {
  id: "gloria_movie_001",
  title: "Book or Movie with Strong Impact",
  date: "2026-02-20",
  prompt:
    "Describe a book or movie that had a strong impact on you. You should say:\n- What the book or movie was\n- Why did you decide to read or watch it\n- How did it influence you\n- Would you recommend it to others?",
  content: gloriaMovieText,
  score: 55,
  errors: [
    {
      id: "GM1",
      startIndex: gloriaMovieText.indexOf("telling stories about, um, main character"),
      endIndex:
        gloriaMovieText.indexOf("telling stories about, um, main character") +
        "telling stories about, um, main character".length,
      category: "articles",
      original: "telling stories about, um, main character",
      correction: "telling stories about the main character",
      explanation:
        "When introducing a specific character (Saika), use 'the main character'. The article 'the' shows there is one main character in this story.",
      rule: "Use 'the' when both you and your listener know exactly which one you mean -- here there's only one main character.",
    },
    {
      id: "GM2",
      startIndex: gloriaMovieText.indexOf("only focus on beauty"),
      endIndex:
        gloriaMovieText.indexOf("only focus on beauty") +
        "only focus on beauty".length,
      category: "tense",
      original: "only focus on beauty",
      correction: "only focused on her beauty",
      explanation:
        "You're telling a past story about the movie, so use past tense 'focused'. Also, 'her beauty' is more natural than just 'beauty'.",
      rule: "Past story = past tense verbs throughout. Only switch to present for things still true now.",
    },
    {
      id: "GM3",
      startIndex: gloriaMovieText.indexOf("just want to hang with friends all day"),
      endIndex:
        gloriaMovieText.indexOf("just want to hang with friends all day") +
        "just want to hang with friends all day".length,
      category: "verb-patterns",
      original: "just want to hang with friends all day",
      correction: "just wanted to hang out with her friends all day long",
      explanation:
        "Two issues: (1) Use past tense 'wanted' to match the story, AND (2) Complete phrasal verb: 'hang out' (not just 'hang'). Also, 'all day long' is more natural.",
      rule: "Complete your phrasal verbs: 'hang out', 'get into', 'look after'. Missing the particle changes the meaning.",
    },
    {
      id: "GM4",
      startIndex: gloriaMovieText.indexOf("one of her teacher"),
      endIndex:
        gloriaMovieText.indexOf("one of her teacher") +
        "one of her teacher".length,
      category: "singular-plural",
      original: "one of her teacher",
      correction: "one of her teachers",
      explanation:
        "After 'one of', always use a plural noun. Pattern: one of + plural. You're selecting one person from a group of teachers.",
      rule: "'One of' + plural noun: one of her teachers, one of my friends, one of the books.",
    },
    {
      id: "GM5",
      startIndex: gloriaMovieText.indexOf("looked down on her and don't believe"),
      endIndex:
        gloriaMovieText.indexOf("looked down on her and don't believe") +
        "looked down on her and don't believe".length,
      category: "tense",
      original: "looked down on her and don't believe",
      correction: "looked down on her and didn't believe",
      explanation:
        "Keep consistent past tense. 'Looked' is past, so 'don't' should be 'didn't' (past tense of 'don't').",
      rule: "Past time marker = past tense verbs throughout. Match all verbs in the same clause.",
    },
    {
      id: "GM6",
      startIndex: gloriaMovieText.indexOf("she can get in uni"),
      endIndex:
        gloriaMovieText.indexOf("she can get in uni") +
        "she can get in uni".length,
      category: "verb-patterns",
      original: "she can get in uni",
      correction: "she could get into uni",
      explanation:
        "Two issues: (1) In past context, use 'could' not 'can', AND (2) Use 'get into' (phrasal verb) for entering university, not 'get in'.",
      rule: "Past context = 'could' not 'can'. Also: 'get into' = enter/be accepted into a place.",
    },
    {
      id: "GM7",
      startIndex: gloriaMovieText.indexOf("she get into one of the best uni in Japan"),
      endIndex:
        gloriaMovieText.indexOf("she get into one of the best uni in Japan") +
        "she get into one of the best uni in Japan".length,
      category: "subject-verb",
      original: "she get into one of the best uni in Japan",
      correction: "she got into one of the best unis in Japan",
      explanation:
        "Two issues: (1) 'She' needs verb agreement -- past tense 'got' (or present 'gets'), AND (2) 'Uni' is countable -- plural 'unis' after 'one of the best'.",
      rule: "Subject-verb agreement: she gets/got (not 'she get'). After 'one of the best' = plural noun.",
    },
    {
      id: "GM8",
      startIndex: gloriaMovieText.indexOf("my teacher want us to watch"),
      endIndex:
        gloriaMovieText.indexOf("my teacher want us to watch") +
        "my teacher want us to watch".length,
      category: "tense",
      original: "my teacher want us to watch",
      correction: "my teacher wanted us to watch",
      explanation:
        "You're talking about the past (when you were in high school), so use past tense 'wanted', not present 'want'.",
      rule: "Past story = past tense. 'Want' becomes 'wanted' when you're narrating past events.",
    },
    {
      id: "GM9",
      startIndex: gloriaMovieText.indexOf("studying hard and dream comes true"),
      endIndex:
        gloriaMovieText.indexOf("studying hard and dream comes true") +
        "studying hard and dream comes true".length,
      category: "verb-patterns",
      original: "studying hard and dream comes true",
      correction: "studying hard and dreams coming true",
      explanation:
        "Keep parallel structure: both should be gerunds (verb + -ing). Use 'studying hard and dreams coming true' -- both gerund phrases.",
      rule: "Parallel structure: keep the same verb form on both sides of 'and'. Gerund + gerund, or infinitive + infinitive.",
    },
    {
      id: "GM10",
      startIndex: gloriaMovieText.indexOf("when she decide she want to study hard"),
      endIndex:
        gloriaMovieText.indexOf("when she decide she want to study hard") +
        "when she decide she want to study hard".length,
      category: "tense",
      original: "when she decide she want to study hard",
      correction: "when she decided she wanted to study hard",
      explanation:
        "Past tense needed for both verbs: 'decided' (not 'decide') and 'wanted' (not 'want').",
      rule: "Past story = past tense verbs throughout, including in subordinate clauses.",
    },
    {
      id: "GM11",
      startIndex: gloriaMovieText.indexOf("student kind of think study hard is awkward or embarrassed"),
      endIndex:
        gloriaMovieText.indexOf("student kind of think study hard is awkward or embarrassed") +
        "student kind of think study hard is awkward or embarrassed".length,
      category: "word-form-choice",
      original: "student kind of think study hard is awkward or embarrassed",
      correction: "students kind of think studying hard is awkward or embarrassing",
      explanation:
        "Three issues: (1) Use plural 'students' (talking about students in general), (2) Use gerund 'studying hard' as the subject, AND (3) Use 'embarrassing' (describes the action) not 'embarrassed' (how a person feels).",
      rule: "-ing = describes the thing (embarrassing, boring). -ed = describes the feeling (embarrassed, bored). Also: general statements need plural nouns.",
    },
    {
      id: "GM12",
      startIndex: gloriaMovieText.indexOf("you might got laughed at"),
      endIndex:
        gloriaMovieText.indexOf("you might got laughed at") +
        "you might got laughed at".length,
      category: "verb-patterns",
      original: "you might got laughed at",
      correction: "you might get laughed at",
      explanation:
        "After modal verbs (might, could, should, will), always use the base verb form. Use 'get' (base form), not 'got' (past form).",
      rule: "Modal + base verb: might get, could see, should go, will be. Never modal + past form.",
    },
    {
      id: "GM13",
      startIndex: gloriaMovieText.indexOf("in that movie, I realise"),
      endIndex:
        gloriaMovieText.indexOf("in that movie, I realise") +
        "in that movie, I realise".length,
      category: "tense",
      original: "in that movie, I realise",
      correction: "in that movie, I realised",
      explanation:
        "You're talking about when you watched the movie (past), so use past tense 'realised', not present 'realise'.",
      rule: "Past story = past tense. 'Realise' becomes 'realised' for past events.",
    },
    {
      id: "GM14",
      startIndex: gloriaMovieText.indexOf("mock someone who wanna improve"),
      endIndex:
        gloriaMovieText.indexOf("mock someone who wanna improve") +
        "mock someone who wanna improve".length,
      category: "word-form-choice",
      original: "mock someone who wanna improve",
      correction: "mock people who want to improve",
      explanation:
        "Two issues: (1) Use 'people' or 'others' (plural) instead of 'someone' (singular) for general advice, AND (2) Use 'want to' instead of casual 'wanna' for this more serious context.",
      rule: "General advice uses plural: 'people who want to...' not 'someone who wanna...'",
    },
  ],
}

export const gloriaTranscriptList: Omit<
  Transcript,
  "content" | "errors"
>[] = [
  {
    id: "gloria_movie_001",
    title: "Book or Movie with Strong Impact",
    date: "2026-02-20",
    score: 55,
  },
  {
    id: "gloria_money_001",
    title: "Money Management Habit",
    date: "2026-02-18",
    score: 68,
  },
]

// ─── Gloria's error patterns (aggregated across all transcripts) ───

export const gloriaErrorPatterns: ErrorPattern[] = [
  {
    id: "g1",
    category: "tense",
    name: "Tense Consistency",
    priority: "HIGH",
    count: 8,
    conversationCount: 2,
    shortExplanation:
      "BY FAR your biggest pattern -- you constantly switch between present and past tense when narrating past events. In English, once you start telling a past story, keep all your verbs in past tense: 'hung out' not 'hang out', 'realised' not 'realise', 'decided' not 'decide'. The one exception: if something is still true right now, use present tense for that part ('I have a friend', not 'I got a friend').",
    quickTip:
      "Telling a story? Pick past tense and stick with it. Only switch to present for things still true now.",
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
        incorrect: "only focus on beauty",
        correct: "only focused on her beauty",
        context:
          "You're retelling a movie plot (past), so use past tense 'focused'.",
      },
      {
        incorrect: "looked down on her and don't believe",
        correct: "looked down on her and didn't believe",
        context:
          "'Looked' is past -- 'don't' must become 'didn't' to match.",
      },
      {
        incorrect: "when she decide she want to study hard",
        correct: "when she decided she wanted to study hard",
        context:
          "Both verbs need past tense: 'decided' and 'wanted'.",
      },
      {
        incorrect: "in that movie, I realise",
        correct: "in that movie, I realised",
        context:
          "Past event = past tense. 'Realise' becomes 'realised'.",
      },
    ],
    studyContent: {
      fullExplanation:
        "When you tell a story about the past, English expects you to stay in past tense throughout. You can't switch to present tense mid-story just because the action felt vivid. This appeared 8 times across your two transcripts -- it is your most systematic error and needs focused practice.",
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
        "Common pairs to practise: hang/hung, realise/realised, decide/decided, focus/focused, want/wanted, can/could.",
      ],
    },
  },
  {
    id: "g2",
    category: "verb-patterns",
    name: "Verb Patterns",
    priority: "HIGH",
    count: 8,
    conversationCount: 2,
    shortExplanation:
      "You used verbs in the wrong form in several ways: (1) After a preposition like 'at', always add -ing (e.g. 'good at managing'). (2) 'Gonna' needs a helper verb before it ('we're gonna', not 'we gonna'). (3) Keep parallel structure -- 'studying hard and dreams coming true'. (4) After modal verbs (might, could), use base form ('might get', not 'might got'). (5) Complete your phrasal verbs: 'hang out', 'get into'.",
    quickTip:
      "See a preposition? Next verb must end in -ing. Using 'gonna'? Add a helper verb. After modals (might, could)? Always base form.",
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
          "'Gonna' needs a helper verb (are/will). Or use 'would' for past habits.",
      },
      {
        incorrect: "studying hard and dream comes true",
        correct: "studying hard and dreams coming true",
        context:
          "Parallel structure: both sides of 'and' should be gerund phrases.",
      },
      {
        incorrect: "you might got laughed at",
        correct: "you might get laughed at",
        context:
          "Modal + base verb: might get, could see, should go.",
      },
      {
        incorrect: "just want to hang with friends",
        correct: "just wanted to hang out with friends",
        context:
          "Complete the phrasal verb: 'hang out' (not just 'hang').",
      },
      {
        incorrect: "she can get in uni",
        correct: "she could get into uni",
        context:
          "Past context = 'could' not 'can'. 'Get into' = enter/be accepted.",
      },
    ],
    studyContent: {
      fullExplanation:
        "English uses different verb forms depending on what comes before them. Key patterns: (1) after prepositions, always -ing; (2) 'gonna' needs a helper verb; (3) after modals (might, could, should), always base form; (4) complete phrasal verbs ('hang out', 'get into'). These patterns appeared 8 times across your transcripts.",
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
                  "A modal verb (might, could, should...)",
                  "base form",
                  "might get, could see",
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
        "'Gonna' sounds complete in fast speech, but in standard English it always needs 'am/is/are/will' before it.",
        "After modals, ALWAYS base form: might get (not 'might got'), could see (not 'could saw').",
        "Complete your phrasal verbs: 'hang out' (not 'hang'), 'get into' (not 'get in').",
      ],
    },
  },
  {
    id: "g3",
    category: "singular-plural",
    name: "Singular / Plural Agreement",
    priority: "MEDIUM",
    count: 3,
    conversationCount: 2,
    shortExplanation:
      "Plural nouns need their plural forms: 'one of her teachers' (not 'teacher'), 'these skills' (not 'this skills'). Also watch for fixed compound nouns like 'drinks menu' that keep the plural.",
    quickTip:
      "After 'one of', always use a plural noun. Check that pointer words (this/these) match whether the noun is singular or plural.",
    examples: [
      {
        incorrect: "develop this, uh, money skills",
        correct: "develop these money skills",
        context:
          "'Skills' is plural, so use 'these' (plural), not 'this' (singular).",
      },
      {
        incorrect: "one of her teacher",
        correct: "one of her teachers",
        context:
          "After 'one of', always use a plural noun: one of her teachers, one of my friends.",
      },
      {
        incorrect: "the drink menu",
        correct: "the drinks menu",
        context:
          "'Drinks menu' is a fixed expression -- 'drinks' stays plural.",
      },
    ],
    studyContent: {
      fullExplanation:
        "Demonstrative pronouns (this/these) must agree in number with the noun. After 'one of', always use a plural noun because you're selecting one from a group. Some compound nouns keep the plural as fixed expressions.",
      tables: [
        {
          title: "Singular / Plural Patterns",
          table: {
            headers: ["Pattern", "Rule", "Example"],
            rows: [
              { cells: ["this / that", "singular noun", "this skill, that book"] },
              { cells: ["these / those", "plural noun", "these skills, those books"] },
              { cells: ["one of + noun", "always plural", "one of her teachers, one of my friends"] },
            ],
          },
        },
      ],
      trickySpots: [
        "Filler words (um, uh) between the pointer and noun can make you lose track of singular vs plural.",
        "After 'one of the best', the noun must be plural: 'one of the best unis' (not 'uni').",
      ],
    },
  },
  {
    id: "g4",
    category: "articles",
    name: "Article Usage",
    priority: "MEDIUM",
    count: 2,
    conversationCount: 2,
    shortExplanation:
      "Articles ('the', 'a', or nothing) signal whether you and your listener know which specific thing you mean. You sometimes add 'the' where it isn't needed (general concepts) or drop it where it is needed (specific references). Quick test: does your listener already know exactly which one you mean? If yes, use 'the'. If not, drop it.",
    quickTip:
      "General concept = no 'the' (order drinks, money is a tool). Specific one you both know = 'the' (the main character).",
    examples: [
      {
        incorrect: "order the drinks",
        correct: "order drinks",
        context:
          "General category, not specific ones. Drop 'the'.",
      },
      {
        incorrect: "telling stories about, um, main character",
        correct: "telling stories about the main character",
        context:
          "There's one specific main character -- use 'the'.",
      },
    ],
    studyContent: {
      fullExplanation:
        "Articles exist to signal whether you and your listener are thinking about the same specific thing. 'The' = both know which one. No article with plural or uncountable nouns = general concept. 'A/an' = introducing something new.",
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
                  "the main character, the menu on the table",
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
            ],
          },
        },
      ],
      trickySpots: [
        "General truths about categories use no article: 'order drinks' (not 'the drinks').",
        "When introducing a specific, known entity, use 'the': 'the main character' (there's only one).",
      ],
      decisionGuide:
        "Does my listener already know exactly which one I mean? Yes = 'the'. Am I talking about a concept in general? = nothing.",
    },
  },
  {
    id: "g5",
    category: "word-form-choice",
    name: "Word & Form Mix-Ups",
    priority: "MEDIUM",
    count: 2,
    conversationCount: 1,
    shortExplanation:
      "Two patterns here: (1) '-ing' describes the thing (embarrassing, boring), '-ed' describes the feeling (embarrassed, bored). The movie is 'embarrassing'; you feel 'embarrassed'. (2) For general advice, use plurals: 'people who want to improve' not 'someone who wanna improve'.",
    quickTip:
      "Is it describing the thing/action? Use -ing. Is it describing a person's feeling? Use -ed.",
    examples: [
      {
        incorrect: "study hard is awkward or embarrassed",
        correct: "studying hard is awkward or embarrassing",
        context:
          "The activity itself is 'embarrassing' (-ing). A person feels 'embarrassed' (-ed).",
      },
      {
        incorrect: "mock someone who wanna improve",
        correct: "mock people who want to improve",
        context:
          "General advice uses plural ('people'), and 'want to' instead of casual 'wanna'.",
      },
    ],
    studyContent: {
      fullExplanation:
        "English adjective pairs ending in -ing and -ed have different meanings: -ing describes the thing or situation causing the feeling, -ed describes the person experiencing it. Also, when giving general life advice, use plural nouns ('people', 'others') for a broader, more natural statement.",
      tables: [
        {
          title: "-ing vs -ed Adjectives",
          table: {
            headers: ["-ing (the thing)", "-ed (the person)", "Example"],
            rows: [
              { cells: ["embarrassing", "embarrassed", "Studying is embarrassing. I feel embarrassed."] },
              { cells: ["boring", "bored", "The movie is boring. I am bored."] },
              { cells: ["exciting", "excited", "The news is exciting. She is excited."] },
              { cells: ["confusing", "confused", "The instructions are confusing. He is confused."] },
            ],
          },
        },
      ],
      trickySpots: [
        "The subject tells you which to use: if it's a thing/activity, use -ing. If it's a person, use -ed.",
        "'Wanna' is fine in casual chat but avoid it in serious or general statements -- use 'want to' instead.",
      ],
    },
  },
  {
    id: "g6",
    category: "subject-verb",
    name: "Subject-Verb Agreement",
    priority: "MEDIUM",
    count: 1,
    conversationCount: 1,
    shortExplanation:
      "When the subject is 'she', the verb needs the correct form. 'She get' should be 'she gets' (present) or 'she got' (past). This appeared once but it's an important pattern to watch.",
    quickTip:
      "He/she/it + verb always needs -s in present tense, or the correct past form.",
    examples: [
      {
        incorrect: "she get into one of the best uni",
        correct: "she got into one of the best unis",
        context:
          "'She' + past tense = 'got' (not 'get'). Also: 'unis' (plural after 'one of the best').",
      },
    ],
    studyContent: {
      fullExplanation:
        "In English, present tense verbs change depending on who's doing the action. When the subject is he, she, it, or any singular noun, the verb needs an -s ending. In past tense, use the correct past form (get -> got).",
      tables: [
        {
          title: "Subject-Verb Agreement",
          table: {
            headers: ["Subject", "Present", "Past"],
            rows: [
              { cells: ["she / he / it", "gets, goes, does", "got, went, did"] },
              { cells: ["I / you / we / they", "get, go, do", "got, went, did"] },
            ],
          },
        },
      ],
      trickySpots: [
        "In past tense, most verbs look the same for all subjects (she got, I got, they got) -- but make sure you're actually using the past form, not the base form.",
      ],
    },
  },
]
