const text = `I'm here for answering the first question, what do you think makes people happy? Um, I think happiness is very subjective. It can mean different things to different people. For someone, maybe the emotional connections or meaningful relationships with their friends and families can make them happy because persons can feel supported and understood by their friends and families. Other things like hobby, good health, delicious food and even good weather can also bring us happiness. And for the second question, is there a difference between short term and long term happiness? I believe there is a difference. Short term happiness can bring us immediately pleasure like when we are having a piece of chocolate, the sugar can induce our brains release dopamine and this kind of feeling is temporary, but long term happiness usually refers to something more stable, um, for instance, like very solid friendship, which can provide us happiness constantly.`

const errors = [
  { id: "G1", original: "I'm here for answering", startIndex: 0, endIndex: 22 },
  { id: "G2", original: "persons can feel", startIndex: 283, endIndex: 299 },
  { id: "G3", original: "friends and families", startIndex: 337, endIndex: 357 },
  { id: "G4", original: "like hobby", startIndex: 377, endIndex: 387 },
  { id: "G5", original: "bring us immediately pleasure", startIndex: 530, endIndex: 559 },
  { id: "G6", original: "induce our brains release dopamine", startIndex: 623, endIndex: 659 },
  { id: "G7", original: "like very solid friendship", startIndex: 756, endIndex: 781 },
  { id: "G8", original: "provide us happiness", startIndex: 793, endIndex: 813 },
]

for (const e of errors) {
  const actual = text.substring(e.startIndex, e.endIndex)
  const realIdx = text.indexOf(e.original)
  const match = actual === e.original
  console.log(`${e.id}: ${match ? "OK" : "MISMATCH"} | expected "${e.original}" | got "${actual}" | real index: ${realIdx}`)
}
