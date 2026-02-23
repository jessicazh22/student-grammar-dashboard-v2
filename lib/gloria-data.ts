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
        "'Gonna' is short for 'going to', but it still needs a helper verb before it -- like 'are' or 'will'. Without it, the sentence feels incomplete. A cleaner option for past habits: 'we would all order'.",
      rule: "Always pair 'gonna' with a helper verb: we're gonna, I'm gonna, they're gonna.",
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
        "You're talking about drinks in general here, not specific ones -- so drop 'the'. Only use 'the' when you and your listener both know exactly which ones you mean.",
      rule: "Speaking generally? No 'the': order drinks, buy food, listen to music.",
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
        "'Drinks menu' is a fixed expression -- 'drinks' stays plural because the menu lists multiple drinks. Most compound nouns use the singular (like 'shoe store'), but this one is an exception worth remembering.",
      rule: "Some compound nouns keep the plural: drinks menu, sports car, arms dealer -- learn these as set phrases.",
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
        "'There was a time' tells your listener this happened in the past, so the next verb needs to match -- 'hung out' instead of 'hang out'. You already got 'was' right, so it's just about carrying that past tense through!",
      rule: "Past time marker (there was, last week, yesterday) = keep all verbs in past tense.",
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
        "You're telling a story about what happened, so stay in past tense. 'Realise' is present -- you want 'realised' here. Small switch, big difference!",
      rule: "Past story = past verbs. 'Realise' becomes 'realised', 'decide' becomes 'decided'.",
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
        "Same pattern as earlier -- 'gonna' always needs a helper verb before it. Add 'you're' before 'gonna', or switch to 'will' for a more formal version.",
      rule: "Always pair 'gonna' with a helper: you're gonna, he's gonna, we're gonna.",
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
        "'Skills' is plural, so the pointer word needs to be plural too -- 'these skills', not 'this skills'. Easy to lose track of when there's a filler word in between!",
      rule: "'This' = one thing. 'These' = more than one. Match the pointer to the noun.",
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
        "Two things here:\n- After 'rather than', use the -ing form ('letting') to keep the sentence flowing\n- Drop 'the' before 'money' -- you're talking about money in general, not specific money",
      rule: "'Rather than' + -ing keeps sentences parallel: 'rather than letting', 'rather than waiting'.",
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
        "'Money skills' totally gets the point across! But if you want to sound more polished, native speakers usually say 'financial literacy' or 'money management skills'. These are set phrases you'll hear everywhere.",
      rule: "More natural collocations: 'financial literacy', 'financial skills', or 'money management skills'.",
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
        "Your meaning is clear! But naming the habit directly makes your point stronger -- 'build better spending habits' tells your listener exactly what you mean, instead of the vague 'good habit'.",
      rule: "Be specific: name the habit instead of saying 'good habit' -- it sounds more precise and confident.",
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
        "Great idea! To make it smoother:\n- Add 'being' to show you're comparing two states\n- Use 'or' instead of 'and' since these are opposites\n\nSo: 'not about being rich or poor'.",
      rule: "Comparing opposite states? Use 'being X or Y': 'about being rich or poor', 'about being right or wrong'.",
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
        "There's only one main character in this movie, so you need 'the' -- it tells your listener 'you know which one I mean'. Without it, it sounds like a piece is missing.",
      rule: "Only one of something? Use 'the': the main character, the teacher, the ending.",
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
        "You're retelling a movie plot -- past story, so past tense: 'focused' instead of 'focus'. Also, 'her beauty' sounds more natural than just 'beauty'.",
      rule: "Retelling a story? Keep everything in past tense: 'focused', 'wanted', 'decided'.",
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
        "Two things to fix here:\n- Past tense: 'wanted' instead of 'want' (you're telling a past story)\n- Complete the phrasal verb: 'hang out', not just 'hang' -- dropping 'out' changes the meaning\n\nAlso, 'all day long' sounds more natural than 'all day'.",
      rule: "Phrasal verbs need both parts: 'hang out', 'get into', 'look after'. Dropping the second word changes the meaning.",
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
        "After 'one of', the noun always needs to be plural -- you're picking one person from a group, so the group word is plural: 'one of her teachers'.",
      rule: "'One of' + plural noun: one of her teachers, one of my friends, one of the best movies.",
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
        "You got 'looked' right (past tense!), so just carry that through -- 'don't' needs to become 'didn't' to match.",
      rule: "All verbs in the same clause should be in the same tense: 'looked' + 'didn't', not 'looked' + 'don't'.",
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
        "Two things:\n- Past story = 'could' not 'can' (can is present, could is past)\n- The phrasal verb is 'get into' (not 'get in') when talking about being accepted somewhere",
      rule: "Past context: 'can' becomes 'could'. And 'get into' = be accepted into a place.",
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
        "Two things:\n- 'She get' needs the past form: 'she got' (not 'she get')\n- After 'one of the best', the noun needs to be plural: 'unis' (not 'uni')",
      rule: "'She' + verb: 'she gets' (present) or 'she got' (past) -- never 'she get'.",
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
        "This happened back in high school, so past tense: 'wanted' instead of 'want'. You're getting better at catching these -- just keep an eye on them!",
      rule: "Past story = past verbs. 'Want' becomes 'wanted', 'decide' becomes 'decided'.",
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
        "Both sides of 'and' should match in form. You started with 'studying' (-ing), so the other side needs -ing too: 'dreams coming true'. Think of it like a balance -- both sides should look the same.",
      rule: "Both sides of 'and' should match: -ing + -ing, or 'to' + 'to'. Keep it balanced!",
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
        "Both verbs here need past tense: 'decided' (not 'decide') and 'wanted' (not 'want'). Same pattern as before -- once you're in a past story, every verb needs its past form.",
      rule: "Past story = past verbs everywhere, even in smaller clauses inside the sentence.",
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
        "Three things to tidy up here:\n- 'Students' (plural) -- you're talking about students in general\n- 'Studying hard' (gerund) -- when an activity is the subject, use -ing\n- 'Embarrassing' not 'embarrassed' -- the activity is what causes the feeling (-ing), the person experiences it (-ed)",
      rule: "Thing/activity = -ing (embarrassing, boring). Person's feeling = -ed (embarrassed, bored).",
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
        "After modal verbs (might, could, should, will), always use the base form of the verb. So it's 'might get' (not 'might got'). The modal already carries the meaning -- the verb just needs to be in its simplest form.",
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
        "This happened when you watched the movie, so past tense: 'realised' instead of 'realise'. Same pattern you've been working on -- you're getting the hang of it!",
      rule: "Past story = past verbs. 'Realise' becomes 'realised', 'learn' becomes 'learned'.",
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
        "Two things:\n- Use 'people' (plural) instead of 'someone' -- for general advice, plurals sound more natural\n- Use 'want to' instead of 'wanna' -- this is a serious point, so the full form sounds stronger",
      rule: "General advice = plural: 'people who want to...' sounds more natural than 'someone who wanna...'",
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
      "Your most common pattern! Once you start a past story, every verb needs to stay in past tense:\n\n- 'decided' not 'decide'\n- 'wanted' not 'want'\n- 'didn't' not 'don't'\n- 'hung out' not 'hang out'\n\nOnly switch to present for things still true now -- like 'I have a friend' (you still have them). You already use past tense correctly a lot -- this is just about staying consistent the whole way through.",
    quickTip:
      "Before you finish a story, do a quick verb check: did every verb get its past form? If one slipped to present, that's your cue to fix it.",
    examples: [
      {
        incorrect: "I actually got a friend",
        correct: "I actually have a friend",
        context:
          "You still have this friend right now -- so present tense 'have' is the one you want here.",
      },
      {
        incorrect: "there was a time we hang out",
        correct: "there was a time we hung out",
        context:
          "'There was a time' tells us this is a past story -- so 'hang' needs to become 'hung'.",
      },
      {
        incorrect: "only focus on beauty",
        correct: "only focused on her beauty",
        context:
          "You're retelling a movie plot, so stay in past tense -- 'focused'.",
      },
      {
        incorrect: "looked down on her and don't believe",
        correct: "looked down on her and didn't believe",
        context:
          "'Looked' is already past tense -- so 'don't' needs to match and become 'didn't'.",
      },
      {
        incorrect: "when she decide she want to study hard",
        correct: "when she decided she wanted to study hard",
        context:
          "Both verbs need past tense here: 'decided' and 'wanted'.",
      },
      {
        incorrect: "in that movie, I realise",
        correct: "in that movie, I realised",
        context:
          "This happened when you watched the movie -- past event, so 'realised'.",
      },
    ],
    studyContent: {
      fullExplanation:
        "This came up 8 times across your two recordings, so it's worth giving some extra attention. The good news: you clearly know how past tense works -- you use it correctly plenty of times! The pattern to watch for is when a verb slips back to present tense in the middle of a past story. English really wants you to stay in one tense lane the whole way through.",
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
        "When you're telling an exciting story, your brain wants to make it vivid by switching to present tense -- totally natural instinct! But English expects past tense throughout.",
        "Verb pairs to practise: hang/hung, realise/realised, decide/decided, focus/focused, want/wanted, can/could.",
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
      "A few verb-form rules keep coming up. Here are the key ones:\n\n- After prepositions (at, for, about), always add -ing -- 'good at managing'\n- After modals (might, could), always base form -- 'might get', not 'might got'\n- Finish your phrasal verbs -- 'hang out', not just 'hang'; 'get into', not 'get in'\n- 'Gonna' needs a helper verb before it -- 'we're gonna', not 'we gonna'\n\nThese click fast once you start spotting them!",
    quickTip:
      "Quick check: what word comes right before the verb? A preposition = add -ing. A modal = use base form. A phrasal verb = make sure it has both parts.",
    examples: [
      {
        incorrect: "good at manage her money",
        correct: "good at managing her money",
        context:
          "'At' is a preposition, so the verb after it always takes -ing.",
      },
      {
        incorrect: "we all gonna order",
        correct: "we would all order / we're all gonna order",
        context:
          "'Gonna' needs a helper verb (are/will). Or switch to 'would' for past habits.",
      },
      {
        incorrect: "studying hard and dream comes true",
        correct: "studying hard and dreams coming true",
        context:
          "Both sides of 'and' should match -- gerund + gerund.",
      },
      {
        incorrect: "you might got laughed at",
        correct: "you might get laughed at",
        context:
          "After 'might' (a modal), always use the base form: 'get', not 'got'.",
      },
      {
        incorrect: "just want to hang with friends",
        correct: "just wanted to hang out with friends",
        context:
          "The phrasal verb is 'hang out' -- dropping 'out' changes the meaning.",
      },
      {
        incorrect: "she can get in uni",
        correct: "she could get into uni",
        context:
          "Past story = 'could' not 'can'. And the phrasal verb is 'get into', not 'get in'.",
      },
    ],
    studyContent: {
      fullExplanation:
        "Verbs in English change form depending on what comes right before them. This came up 8 times across your recordings, but it's actually a few different rules bundled together. Once you learn to spot the word before the verb, the right form becomes much easier to pick.",
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
        "'Gonna' sounds complete when you say it fast, but it always needs a helper verb: I'm gonna, we're gonna, they're gonna.",
        "Phrasal verbs are two-part teams -- 'hang out', 'get into', 'look after'. Dropping the second word changes the meaning or sounds incomplete.",
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
      "A few singular/plural mismatches came up. The key patterns:\n\n- After 'one of', always use a plural noun -- 'one of her teachers', not 'one of her teacher'\n- Pointer words need to match -- 'these skills' (plural), not 'this skills'\n- Some compound nouns keep the plural -- 'drinks menu' is a fixed expression\n\nOnce you know these patterns, they're easy to catch!",
    quickTip:
      "Saying 'one of'? The next noun is always plural. Saying 'this' or 'these'? Check if the noun is singular or plural and match it.",
    examples: [
      {
        incorrect: "develop this, uh, money skills",
        correct: "develop these money skills",
        context:
          "'Skills' is plural, so the pointer needs to be 'these' (not 'this').",
      },
      {
        incorrect: "one of her teacher",
        correct: "one of her teachers",
        context:
          "You're picking one person from a group -- so the group word needs to be plural: 'teachers'.",
      },
      {
        incorrect: "the drink menu",
        correct: "the drinks menu",
        context:
          "'Drinks menu' is a fixed expression -- the plural stays because the menu lists multiple drinks.",
      },
    ],
    studyContent: {
      fullExplanation:
        "English expects pointer words (this/these) to match the noun they point to, and patterns like 'one of' always need a plural noun after them. These came up 3 times -- not a huge number, but worth being aware of.",
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
        "Filler words (um, uh) can sneak in between the pointer and the noun, making it easy to lose track -- totally normal, just something to watch for.",
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
      "Articles are genuinely one of the trickiest parts of English! The core idea:\n\n- 'The' = you and your listener both know which one -- 'the main character' (there's only one)\n- No article = you're speaking generally -- 'order drinks' (any drinks, not specific ones)\n\nA good test: could your listener point to the exact thing you mean? If yes, use 'the'. If not, skip it.",
    quickTip:
      "Try this test: could your listener point to the exact one you mean? Yes = 'the'. No = drop it.",
    examples: [
      {
        incorrect: "order the drinks",
        correct: "order drinks",
        context:
          "You're talking about drinks in general, not specific ones -- so drop 'the'.",
      },
      {
        incorrect: "telling stories about, um, main character",
        correct: "telling stories about the main character",
        context:
          "There's one specific main character in the movie -- so you need 'the'.",
      },
    ],
    studyContent: {
      fullExplanation:
        "Articles signal whether you and your listener are on the same page about which specific thing you mean. This only came up twice, so you're doing well here -- just keep the 'pointing test' in mind and you'll catch these easily.",
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
        "General truths about categories use no article: 'order drinks' (not 'the drinks'), 'I like music' (not 'the music').",
        "When there's only one of something and you both know it, use 'the': 'the main character', 'the sun'.",
      ],
      decisionGuide:
        "Could my listener point to the exact one? Yes = 'the'. Am I talking generally? = nothing.",
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
      "Two patterns showed up here:\n\n- -ing describes the thing: 'studying hard is embarrassing' (the activity causes the feeling)\n- -ed describes the person: 'I feel embarrassed' (you're the one experiencing it)\n\nAlso, for general advice, use plurals: 'people who want to improve' sounds more natural than 'someone who wanna improve'.",
    quickTip:
      "Ask yourself: am I describing the thing/activity, or the person feeling it? Thing = -ing. Person = -ed.",
    examples: [
      {
        incorrect: "study hard is awkward or embarrassed",
        correct: "studying hard is awkward or embarrassing",
        context:
          "The activity is what causes the feeling, so it's 'embarrassing' (-ing), not 'embarrassed' (-ed).",
      },
      {
        incorrect: "mock someone who wanna improve",
        correct: "mock people who want to improve",
        context:
          "For general advice, use 'people' (plural) and 'want to' instead of 'wanna'.",
      },
    ],
    studyContent: {
      fullExplanation:
        "English has pairs of adjectives that look similar but mean different things: -ing describes the thing causing a feeling, -ed describes the person experiencing it. This only came up twice, so you're mostly on track -- just watch for the -ing/-ed swap.",
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
        "Look at the subject of the sentence: if it's a thing or activity, use -ing. If it's a person, use -ed.",
        "'Wanna' is totally fine in casual chat, but for more serious or general statements, 'want to' sounds stronger.",
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
      "This only came up once, but it's a good one to know! When the subject is 'she', 'he', or 'it', the verb needs the right form:\n\n- Present tense: 'she gets' (not 'she get')\n- Past tense: 'she got' (not 'she get')\n\nFor example, 'she get into uni' should be 'she got into uni'.",
    quickTip:
      "Pause on he/she/it sentences: does the verb have its -s (present) or past form? 'She gets' or 'she got' -- never 'she get'.",
    examples: [
      {
        incorrect: "she get into one of the best uni",
        correct: "she got into one of the best unis",
        context:
          "Past story = 'she got' (not 'she get'). And after 'one of the best', the noun needs to be plural: 'unis'.",
      },
    ],
    studyContent: {
      fullExplanation:
        "English verbs change depending on who's doing the action. For he/she/it in present tense, add -s (gets, goes, does). In past tense, use the correct past form (got, went, did). This only appeared once, so it's not a big pattern for you -- just something to keep an eye on.",
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
        "In past tense, the verb looks the same for everyone (she got, I got, they got) -- just make sure you're using the past form and not the base form.",
      ],
    },
  },
]
