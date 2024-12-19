import { useFeedbackStore } from '@src/stores/feedbackStore'
import FeedbackSelector from '@components/FeedbackSelector'
import LearnerNameInput from '@src/components/BasicInfoInputSection'
import FeedbackPackSection from '@components/FeedbackPackSection'
import GenerateFeedbackSection from '@components/GenerateFeedbackSection'
import AdditionalCommentsSection from '@components/AdditionalCommentSection'

function App() {
  const activeFeedbackPack = useFeedbackStore((state) => state.activeFeedbackPack)

  return (
    <>
      <header>
        <h1>🍎 Tutor feedback generator</h1>
        <p>Created by Liam Robertson</p>
      </header>
      <main>
        <LearnerNameInput />
        <FeedbackSelector feedbackPack={activeFeedbackPack} />
        <AdditionalCommentsSection />
        <FeedbackPackSection />
        <GenerateFeedbackSection />
      </main >
    </>
  )
}

export default App
