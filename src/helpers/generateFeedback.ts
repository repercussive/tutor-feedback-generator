import { FeedbackPack, QuestionResponse } from '@src/types'

export function generateFeedback(feedbackPack: FeedbackPack, learnerName: string, responses: Record<string, QuestionResponse>) {
  let result = ''

  for (const question of feedbackPack.questions) {
    const response = responses[question.questionName]

    if (response === 'none') continue

    const possibleComments = question[`${response}Comments`]
    const randomComment = possibleComments[Math.floor(Math.random() * possibleComments.length)]
    result += insertLearnerName(randomComment, learnerName) + '\n'
  }

  return result
}

function insertLearnerName(content: string, learnerName: string) {
  return content.replace(/<.+>/gi, learnerName)
}