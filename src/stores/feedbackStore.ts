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

  feedbackContent: 'Click the button above to generate feedback. Once generated, it will display here, and you can freely edit this text box.',
  setFeedbackContent: (content: string) => set(() => ({ feedbackContent: content })),
  generateFeedback: () => set((state) => ({
    feedbackContent: generateFeedback(state.feedbackPack, state.learnerName, state.questionResponses)
  })),
}))

