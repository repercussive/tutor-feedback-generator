import { FeedbackPack, QuestionResponse } from '@src/types'

type FeedbackSource = {
  feedbackPack: FeedbackPack,
  learnerName: string,
  courseTitle: string,
  responses: Record<string, QuestionResponse>,
  additionalComments: string
}

export function generateFeedback({ feedbackPack, learnerName, courseTitle, responses, additionalComments }: FeedbackSource) {
  let result = ''

  if (courseTitle) {
    result += `Feedback for course "${courseTitle}":\n\n`
  }

  for (const question of feedbackPack.questions) {
    const response = responses[question.questionName]

    if (response === 'none') continue

    const possibleComments = question[`${response}Comments`]
    const randomComment = possibleComments[Math.floor(Math.random() * possibleComments.length)]
    result += insertLearnerName(randomComment, learnerName) + '\n\n'
  }

  if (additionalComments) {
    result += insertLearnerName(additionalComments, learnerName)
  }

  return result
}

function insertLearnerName(content: string, learnerName: string) {
  return content.replace(/<.+>/gi, learnerName)
}