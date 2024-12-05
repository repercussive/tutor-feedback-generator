import { FeedbackPack } from '@src/types'

export function validateCustomFeedbackPack(feedbackPackJsonString: string): FeedbackPack | false {
  try {
    const feedbackPackObject = JSON.parse(feedbackPackJsonString)

    if (!feedbackPackObject.packTitle) return false
    if (!feedbackPackObject.questions) return false

    for (const question of feedbackPackObject.questions) {
      if (!question.questionName) return false
      if (!Array.isArray(question.positiveComments)) return false
      if (!Array.isArray(question.neutralComments)) return false
      if (!Array.isArray(question.negativeComments)) return false
    }

    return feedbackPackObject
  } catch {
    return false
  }
}