import { useFeedbackStore } from '@src/stores/feedbackStore'
import FeedbackSelector from '@components/FeedbackSelector'
import LearnerNameInput from '@components/LearnerNameInput'
import FeedbackPackSection from '@components/FeedbackPackSection'
import GenerateFeedbackSection from '@components/GenerateFeedbackSection'
import AdditionalCommentsSection from '@components/AdditionalCommentSection'

function App() {
  const activeFeedbackPack = useFeedbackStore((state) => state.activeFeedbackPack)

  return (
    <>
      <header>
        <h1>🍎 Tutor feedback generator</h1>
      </header>
      <main>
        <FeedbackPackSection />
        <LearnerNameInput />
        <FeedbackSelector feedbackPack={activeFeedbackPack} />
        <AdditionalCommentsSection />
        <GenerateFeedbackSection />
      </main>
      <footer>
        Created by Liam Robertson
      </footer>
    </>
  )
}

export default App
