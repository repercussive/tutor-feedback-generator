import { FeedbackPack, QuestionResponse } from '@src/types'

export function initializeQuestionResponses(feedbackPack: FeedbackPack, responsesToMerge?: Record<string, QuestionResponse>) {
  const responses: Record<string, QuestionResponse> = {}

  for (const question of feedbackPack.questions) {
    responses[question.questionName] = responsesToMerge?.[question.questionName] ?? 'none'
  }

  return responses
}