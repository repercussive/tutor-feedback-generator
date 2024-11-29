import { FeedbackPack } from '@src/types'
import styles from '@components/styles/FeedbackSelector.module.scss'
import { useState } from 'react'

type FeedbackSelectorProps = {
  feedbackPack: FeedbackPack
}

type FeedbackResponse = 'positive' | 'neutral' | 'negative' | 'none'

type SelectedFeedbackState = Record<string, FeedbackResponse>

function FeedbackSelector({ feedbackPack }: FeedbackSelectorProps) {
  const [selectedFeedback, setSelectedFeedback] = useState(initializeFeedbackState(feedbackPack))

  const handleCheckRadioButton = (questionName: string, response: FeedbackResponse) => {
    setSelectedFeedback((prev) => ({ ...prev, [questionName]: response }))
  }

  return (
    <div className={styles.container}>
      <h2>Feedback Pack: <span>{feedbackPack.packTitle}</span></h2>
      <table>
        <thead>
          <tr>
            <th>Area of feedback</th>
            <th scope="col" id="positive">Positive</th>
            <th scope="col" id="neutral">Neutral</th>
            <th scope="col" id="negative">Negative</th>
            <th scope="col" id="none">N/A</th>
          </tr>
        </thead>
        <tbody>
          {feedbackPack.questions.map((question) => <tr key={question.questionName}>
            <td>{question.questionName}</td>

            {(['positive', 'negative', 'neutral', 'none'] as FeedbackResponse[]).map((response) => (
              <td key={response}>
                <input
                  type="radio"
                  name={question.questionName}
                  aria-labelledby={`${question.questionName} ${response}`}
                  checked={selectedFeedback[question.questionName] === response}
                  onChange={(e) => e.target.checked && handleCheckRadioButton(question.questionName, response)}
                />
              </td>
            ))}
          </tr>)}
        </tbody>
      </table>
    </div>
  )
}

function initializeFeedbackState(feedbackPack: FeedbackPack) {
  const feedbackState: SelectedFeedbackState = {}

  for (const question of feedbackPack.questions) {
    feedbackState[question.questionName] = 'none'
  }

  return feedbackState
}

export default FeedbackSelector