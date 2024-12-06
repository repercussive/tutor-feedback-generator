import { useFeedbackStore } from '@src/stores/feedbackStore'
import FeedbackSelector from '@components/FeedbackSelector'
import LearnerNameInput from '@components/LearnerNameInput'
import FeedbackPackSection from '@components/FeedbackPackSection'
import GenerateFeedbackSection from '@components/GenerateFeedbackSection'
import AdditionalCommentsSection from '@components/AdditionalCommentSection'

function App() {
  const activeFeedbackPack = useFeedbackStore((state) => state.activeFeedbackPack)
  const learnerName = useFeedbackStore((state) => state.learnerName)

  return (
    <>
      <header>
        <h1>🍎 Tutor feedback generator</h1>
        <p>Created by Liam Robertson</p>
      </header>
      <main>
        <LearnerNameInput />
        <div style={{
          opacity: learnerName ? 1 : 0.25,
          transition: 'opacity 0.4s',
          pointerEvents: learnerName ? 'auto' : 'none'
        }}>
          <FeedbackSelector feedbackPack={activeFeedbackPack} />
          <AdditionalCommentsSection />
          <FeedbackPackSection />
          <GenerateFeedbackSection />
        </div>
      </main >
    </>
  )
}

export default App
