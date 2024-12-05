import Button from '@src/components/Button'
import styles from '@components/styles/GenerateFeedbackSection.module.scss'
import { useFeedbackStore } from '@src/stores/feedbackStore'

function GenerateFeedbackSection() {
  const feedbackContent = useFeedbackStore((state) => state.feedbackContent)
  const generateFeedback = useFeedbackStore((state) => state.generateFeedback)
  const setFeedbackContent = useFeedbackStore((state) => state.setFeedbackContent)

  return (
    <div className={styles.container}>
      <Button onClick={generateFeedback}>Generate feedback</Button>
      <textarea
        rows={12}
        value={feedbackContent}
        onChange={(e) => setFeedbackContent(e.target.value)}
        placeholder="Click the button above to generate feedback. Once generated, it will display here, and you can freely edit this text box."
      />
    </div>
  )
}

export default GenerateFeedbackSection