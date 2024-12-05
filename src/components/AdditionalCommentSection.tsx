import { useEffect } from 'react'
import { useFeedbackStore } from '@src/stores/feedbackStore'
import { useDebouncedCallback } from 'use-debounce'
import styles from '@components/styles/AdditionalCommentsSection.module.scss'

const storedComments = localStorage.getItem('additionalComments')
let hasLoadedCommentsFromLocalStorage = false

function AdditionalCommentsSection() {
  const additionalComments = useFeedbackStore((state) => state.additionalComments)
  const setAdditionalComments = useFeedbackStore((state) => state.setAdditionalComments)

  const saveAdditionalCommentsToLocalStorage = useDebouncedCallback((comments: string) => {
    localStorage.setItem('additionalComments', comments)
  }, 1000, { maxWait: 5000 })

  const handleChangeComments = (comments: string) => {
    setAdditionalComments(comments)
    saveAdditionalCommentsToLocalStorage(comments)
  }

  useEffect(() => {
    if (!hasLoadedCommentsFromLocalStorage) {
      setAdditionalComments(storedComments ?? '')
    }
  }, [])

  return (
    <div className={styles.container}>
      <label htmlFor="additional-comments-input">
        Additional comments (e.g. recommendations for further learning):
      </label>

      <p>💡 Tip: if you type <b>{'<name>'}</b>, the learner's name will automatically be inserted.</p>

      <textarea
        id="additional-comments-input"
        value={additionalComments}
        onChange={(e) => handleChangeComments(e.target.value)}
        onBlur={saveAdditionalCommentsToLocalStorage.flush}
        rows={6}
      />
    </div>
  )
}

export default AdditionalCommentsSection