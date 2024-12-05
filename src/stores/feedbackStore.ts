import { standardFeedbackPack } from '@src/resources/feedback-standard'
import { FeedbackPack, QuestionResponse } from '@src/types'
import { initializeQuestionResponses } from '@helpers/initializeQuestionResponses'
import { create } from 'zustand'
import { generateFeedback } from '@src/helpers/generateFeedback'

interface FeedbackState {
  learnerName: string,
  setLearnerName: (newName: string) => void
  feedbackPack: FeedbackPack,
  setFeedbackPack: (feedbackPack: FeedbackPack) => void,
  questionResponses: Record<string, QuestionResponse>,
  setQuestionResponse: (question: string, response: QuestionResponse) => void,
  additionalComments: string,
  setAdditionalComments: (comments: string) => void,
  feedbackContent: string,
  setFeedbackContent: (content: string) => void,
  generateFeedback: () => void,
}

export const useFeedbackStore = create<FeedbackState>()((set) => ({
  learnerName: '',
  setLearnerName: (newName) => set(() => ({ learnerName: newName })),

  feedbackPack: standardFeedbackPack,
  setFeedbackPack: (newFeedbackPack) => set(() => ({
    feedbackPack: newFeedbackPack,
    questionResponses: initializeQuestionResponses(newFeedbackPack)
  })),

  questionResponses: initializeQuestionResponses(standardFeedbackPack),
  setQuestionResponse: (question, response) => set((state) => (
    { questionResponses: { ...state.questionResponses, [question]: response } }
  )),

  additionalComments: '',
  setAdditionalComments: (comments: string) => set(() => ({ additionalComments: comments })),

  feedbackContent: '',
  setFeedbackContent: (content: string) => set(() => ({ feedbackContent: content })),
  generateFeedback: () => set((state) => ({
    feedbackContent: generateFeedback(state.feedbackPack, state.learnerName, state.questionResponses, state.additionalComments)
  })),
}))

