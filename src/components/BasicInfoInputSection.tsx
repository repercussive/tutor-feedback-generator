import { useFeedbackStore } from '@src/stores/feedbackStore'
import styles from '@components/styles/BasicInfoInputSection.module.scss'

function BasicInfoInputSection() {
  const learnerName = useFeedbackStore((state) => state.learnerName)
  const setLearnerName = useFeedbackStore((state) => state.setLearnerName)
  const courseTitle = useFeedbackStore((state) => state.courseTitle)
  const setCourseTitle = useFeedbackStore((state) => state.setCourseTitle)

  return (
    <div className={styles.container}>
      <div>
        <label htmlFor="learner-name-input">Learner name: </label>
        <input
          id="learner-name-input"
          type="text"
          onChange={(e) => setLearnerName(e.target.value)}
          value={learnerName}
        />
      </div>
      <div>
        <label htmlFor="course-title-input">Course title: </label>
        <input
          id="course-title-input"
          type="text"
          onChange={(e) => setCourseTitle(e.target.value)}
          value={courseTitle}
        />
      </div>
    </div>
  )
}

export default BasicInfoInputSection