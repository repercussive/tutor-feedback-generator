import { useFeedbackStore } from '@src/stores/feedbackStore'
import styles from '@components/styles/LearnerNameInput.module.scss'

function LearnerNameInput() {
  const learnerName = useFeedbackStore((state) => state.learnerName)
  const setLearnerName = useFeedbackStore((state) => state.setLearnerName)

  return (
    <div className={styles.container}>
      <label htmlFor="learner-name-input">Learner name: </label>
      <input id="learner-name-input" type="text" onChange={(e) => setLearnerName(e.target.value)} />
      {!learnerName && <p>Please enter learner name to continue</p>}
    </div>
  )
}

export default LearnerNameInput