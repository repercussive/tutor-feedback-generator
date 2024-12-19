import { FeedbackPack, QuestionResponse } from '@src/types'
import { useFeedbackStore } from '@stores/feedbackStore'
import styles from '@components/styles/FeedbackSelector.module.scss'

type FeedbackSelectorProps = {
  feedbackPack: FeedbackPack
}

const possibleResponses: QuestionResponse[] = ['positive', 'neutral', 'negative', 'notApplicable']

function FeedbackSelector({ feedbackPack }: FeedbackSelectorProps) {
  const questionResponses = useFeedbackStore((state) => state.questionResponses)
  const setQuestionResponse = useFeedbackStore((state) => state.setQuestionResponse)

  const handleCheckRadioButton = (questionName: string, response: QuestionResponse) => {
    setQuestionResponse(questionName, response)
  }

  return (
    <div className={styles.container}>
      <table>
        <thead>
          <tr>
            <th>Area of feedback</th>
            <th scope="col" id="positive">Positive</th>
            <th scope="col" id="neutral">Neutral</th>
            <th scope="col" id="negative">Negative</th>
            <th scope="col" id="notApplicable">N/A</th>
          </tr>
        </thead>
        <tbody>
          {feedbackPack.questions.map((question) => <tr key={question.questionName}>
            <td>{question.questionName}</td>

            {(possibleResponses).map((response) => (
              <td key={response}>
                <input
                  type="radio"
                  name={question.questionName}
                  aria-labelledby={`${question.questionName} ${response}`}
                  checked={questionResponses[question.questionName] === response}
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

export default FeedbackSelector