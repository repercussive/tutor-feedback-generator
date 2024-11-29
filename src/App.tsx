import { standardFeedbackPack } from '@src/resources/feedback-standard'
import FeedbackSelector from '@components/FeedbackSelector'

function App() {

  return (
    <>
      <header>
        <h1>Tutor feedback generator</h1>
      </header>
      <main>
        <FeedbackSelector feedbackPack={standardFeedbackPack} />
      </main>
    </>
  )
}

export default App
