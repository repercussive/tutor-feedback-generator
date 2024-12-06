import { useState } from 'react'
import { useFeedbackStore } from '@src/stores/feedbackStore'
import Button from '@src/components/Button'
import styles from '@components/styles/GenerateFeedbackSection.module.scss'

function GenerateFeedbackSection() {
  const feedbackContent = useFeedbackStore((state) => state.feedbackContent)
  const generateFeedback = useFeedbackStore((state) => state.generateFeedback)
  const setFeedbackContent = useFeedbackStore((state) => state.setFeedbackContent)
  const questionResponses = useFeedbackStore((state) => state.questionResponses)
  const additionalComments = useFeedbackStore((state) => state.additionalComments)
  const learnerName = useFeedbackStore((state) => state.learnerName)
  const [showTextarea, setShowTextarea] = useState(false)

  if (feedbackContent && !showTextarea) {
    setShowTextarea(true)
  }

  const disableGeneration =
    !learnerName
    || (!additionalComments && Object.values(questionResponses).every((response) => response === 'none'))

  return (
    <div className={styles.container}>
      <Button onClick={generateFeedback} disabled={disableGeneration}>
        Generate feedback
      </Button>
      {!learnerName && <p>⚠️ Learner name not provided</p>}
      {!!learnerName && disableGeneration && <p>⚠️ No information provided</p>}
      {showTextarea && <textarea
        rows={12}
        value={feedbackContent}
        onChange={(e) => setFeedbackContent(e.target.value)}
        placeholder="Click the button above to generate feedback. Once generated, it will display here, and you can freely edit this text box."
      />}
    </div>
  )
}

export default GenerateFeedbackSection