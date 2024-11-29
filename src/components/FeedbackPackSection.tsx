import { useFeedbackStore } from '@src/stores/feedbackStore'
import styles from '@components/styles/FeedbackPackSection.module.scss'

function FeedbackPackSection() {
  const feedbackPack = useFeedbackStore((state) => state.feedbackPack)
  
  return (
    <div className={styles.container}>
      <h2>Feedback Pack: <span>{feedbackPack.packTitle}</span></h2>
    </div>
  )
}

export default FeedbackPackSection