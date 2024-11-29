import { standardFeedbackPack } from '@src/resources/feedback-standard'
import FeedbackSelector from '@components/FeedbackSelector'
import LearnerNameInput from '@components/LearnerNameInput'
import FeedbackPackSection from '@components/FeedbackPackSection'
import GenerateFeedbackSection from '@components/GenerateFeedbackSection'

function App() {
  return (
    <>
      <header>
        <h1>Tutor feedback generator</h1>
      </header>
      <main>
        <FeedbackPackSection />
        <LearnerNameInput />
        <FeedbackSelector feedbackPack={standardFeedbackPack} />
        <GenerateFeedbackSection />
      </main>
    </>
  )
}

export default App
