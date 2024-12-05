import { defaultFeedbackPack } from '@src/resources/default-feedback-pack'
import { FeedbackPack, QuestionResponse } from '@src/types'
import { initializeQuestionResponses } from '@helpers/initializeQuestionResponses'
import { create } from 'zustand'
import { generateFeedback } from '@src/helpers/generateFeedback'
import { validateCustomFeedbackPack } from '@src/helpers/validateCustomFeedbackPack'
import customFeedbackPackTemplate from '@src/resources/custom-feedback-pack-template.json'

const initialFeedbackPackCategory = loadFeedbackPackCategoryFromLocalStorage()
const initialCustomFeedbackPack = loadCustomFeedbackPackFromLocalStorage()
const initialFeedbackPack = initialFeedbackPackCategory === 'default' ? defaultFeedbackPack : initialCustomFeedbackPack

interface FeedbackState {
  learnerName: string,
  setLearnerName: (newName: string) => void
  feedbackPackCategory: 'default' | 'custom',
  setFeedbackPackCategory: (category: 'default' | 'custom') => void,
  activeFeedbackPack: FeedbackPack,
  setActiveFeedbackPack: (feedbackPack: FeedbackPack) => void,
  customFeedbackPack: FeedbackPack,
  setCustomFeedbackPack: (customPack: FeedbackPack) => void,
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

  feedbackPackCategory: initialFeedbackPackCategory,
  setFeedbackPackCategory: (category) => set(() => ({ feedbackPackCategory: category })),

  activeFeedbackPack: initialFeedbackPack,
  setActiveFeedbackPack: (newFeedbackPack) => set(() => ({
    activeFeedbackPack: newFeedbackPack,
    questionResponses: initializeQuestionResponses(newFeedbackPack)
  })),

  customFeedbackPack: initialCustomFeedbackPack,
  setCustomFeedbackPack: (customPack) => set(() => ({ customFeedbackPack: customPack })),

  questionResponses: initializeQuestionResponses(initialFeedbackPack),
  setQuestionResponse: (question, response) => set((state) => (
    { questionResponses: { ...state.questionResponses, [question]: response } }
  )),

  additionalComments: '',
  setAdditionalComments: (comments: string) => set(() => ({ additionalComments: comments })),

  feedbackContent: '',
  setFeedbackContent: (content: string) => set(() => ({ feedbackContent: content })),
  generateFeedback: () => set((state) => ({
    feedbackContent: generateFeedback(state.activeFeedbackPack, state.learnerName, state.questionResponses, state.additionalComments)
  })),
}))

function loadCustomFeedbackPackFromLocalStorage(): FeedbackPack {
  const customPack = localStorage.getItem('customFeedbackPack')

  if (!customPack) {
    return customFeedbackPackTemplate
  }

  return validateCustomFeedbackPack(customPack) || customFeedbackPackTemplate
}

function loadFeedbackPackCategoryFromLocalStorage() {
  const category = localStorage.getItem('feedbackPackCategory')
  return category === 'custom' ? 'custom' : 'default'
}