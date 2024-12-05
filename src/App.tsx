import { standardFeedbackPack } from '@src/resources/feedback-standard'
import FeedbackSelector from '@components/FeedbackSelector'
import LearnerNameInput from '@components/LearnerNameInput'
import FeedbackPackSection from '@components/FeedbackPackSection'
import GenerateFeedbackSection from '@components/GenerateFeedbackSection'
import AdditionalCommentsSection from '@components/AdditionalCommentSection'

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
