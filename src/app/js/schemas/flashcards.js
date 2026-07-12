
// Must be exactly the same as the internal name of hudb columns
export const FLASHCARD_SCHEMA_KEYS = Object.freeze({
  QUESTION: 'question',
  ANSWER: 'answer',
  TAG: 'tag'
})

// Schema validates shape, allowed values in enum should be validated separately 
export const FLASHCARD_SCHEMA = Object.freeze({
  [FLASHCARD_SCHEMA_KEYS.QUESTION]: {
    type: "string",
    required: true,
  },
  [FLASHCARD_SCHEMA_KEYS.ANSWER]: {
    type: "string",
    required: true,
  },
  [FLASHCARD_SCHEMA_KEYS.TAG]: {
    type: "array",
    required: true,
    items: {
      type: "object",
      properties: {
        name: { type: "string", required: true },
        type: { type: "string", required: true },
      },
    },
  },
});