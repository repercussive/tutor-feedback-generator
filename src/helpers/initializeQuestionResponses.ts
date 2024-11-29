import { FeedbackPack, QuestionResponse } from '@src/types'

export function initializeQuestionResponses(feedbackPack: FeedbackPack) {
  const responses: Record<string, QuestionResponse> = {}

  for (const question of feedbackPack.questions) {
    responses[question.questionName] = 'none'
  }

  return responses
}