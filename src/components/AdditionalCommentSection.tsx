import { useFeedbackStore } from '@src/stores/feedbackStore'
import styles from '@components/styles/AdditionalCommentsSection.module.scss'

function AdditionalCommentsSection() {
  const additionalComments = useFeedbackStore((state) => state.additionalComments)
  const setAdditionalComments = useFeedbackStore((state) => state.setAdditionalComments)

  return (
    <div className={styles.container}>
      <label htmlFor="additional-comments-input">
        Additional comments (e.g. recommendations for further learning):
      </label>

      <p>💡 Tip: if you type <b>{'<name>'}</b>, the learner's name will automatically be inserted.</p>

      <textarea
        id="additional-comments-input"
        value={additionalComments}
        onChange={(e) => setAdditionalComments(e.target.value)}
        rows={6}
      />
    </div>
  )
}

export default AdditionalCommentsSection