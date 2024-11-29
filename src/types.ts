export type FeedbackPack = {
  packTitle: string,
  questions: Array<{
    questionName: string,
    positiveComments: string[],
    neutralComments: string[],
    negativeComments: string[]
  }>
}

export type QuestionResponse = 'positive' | 'neutral' | 'negative' | 'none'
