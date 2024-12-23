import { useFeedbackStore } from '@src/stores/feedbackStore'
import { useState } from 'react'
import { FeedbackPack } from '@src/types'
import { validateCustomFeedbackPack } from '@helpers/validateCustomFeedbackPack'
import { createTemplateFeedbackPack } from '@helpers/createTemplateFeedbackPack'
import { defaultFeedbackPack } from '@src/resources/default-feedback-pack'
import Button from '@src/components/Button'
import styles from '@components/styles/FeedbackPackSection.module.scss'

function FeedbackPackSection() {
  const setActiveFeedbackPack = useFeedbackStore((state) => state.setActiveFeedbackPack)
  const customFeedbackPack = useFeedbackStore((state) => state.customFeedbackPack)
  const feedbackPackCategory = useFeedbackStore((state) => state.feedbackPackCategory)
  const setFeedbackPackCategory = useFeedbackStore((state) => state.setFeedbackPackCategory)

  const handleSelectFeedbackPackCategory = (category: 'default' | 'custom') => {
    setFeedbackPackCategory(category)
    saveFeedbackPackCategoryToLocalStorage(category)

    if (category === 'default') {
      setActiveFeedbackPack(defaultFeedbackPack)
    } else if (category === 'custom') {
      setActiveFeedbackPack(customFeedbackPack)
    }
  }

  return (
    <div className={styles.container}>
      <div>
        <label htmlFor="feedback-pack-select">Feedback pack:</label>

        <select
          id="feedback-pack-select" value={feedbackPackCategory}
          onChange={(e) => handleSelectFeedbackPackCategory(e.target.value as 'default' | 'custom')}
        >
          <option value="default">Default</option>
          <option value="custom">Custom</option>
        </select>
      </div>

      {feedbackPackCategory === 'default' && <FeedbackPackInfo />}
      {feedbackPackCategory === 'custom' && <CustomFeedbackPackSection />}
    </div>
  )
}

function FeedbackPackInfo() {
  return (
    <details>
      <summary>What's a feedback pack?</summary>
      <ul>
        <li>
          A <b>feedback pack</b> is a pool of preset comments which will be randomly sampled to generate{' '}
          your learner feedback.
        </li>
        <li>
          You have currently selected the <b>default feedback pack</b>, which provides a standard set of comments.
        </li>
        <li>
          If you would like to supply your own comments, please choose "<b>Custom</b>" from the menu above.
        </li>
      </ul>
    </details>
  )
}

function CustomFeedbackPackSection() {
  const customFeedbackPack = useFeedbackStore((state) => state.customFeedbackPack)
  const setCustomFeedbackPack = useFeedbackStore((state) => state.setCustomFeedbackPack)
  const setActiveFeedbackPack = useFeedbackStore((state) => state.setActiveFeedbackPack)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [isPackSubmittedSuccessfully, setIsPackSubmittedSuccessfully] = useState<boolean | undefined>()
  const [templateFeedbackPack] = useState(createTemplateFeedbackPack())

  const handleSubmitFeedbackPackFile = async () => {
    if (!uploadedFile) return
    const fileText = await uploadedFile.text()
    const result = validateCustomFeedbackPack(fileText)
    setIsPackSubmittedSuccessfully(!!result)

    if (!!result) {
      setCustomFeedbackPack(result)
      setActiveFeedbackPack(result)
      saveCustomFeedbackPackToLocalStorage(result)
    }
  }

  return (
    <>
      <p className={styles['loaded-pack']}>
        Loaded feedback pack: "<b>{customFeedbackPack.packTitle}</b>"{' '}(
        <a
          href={generateFeedbackPackDownloadHref(customFeedbackPack)}
          download={generateFeedbackPackFileName(customFeedbackPack)}
        >
          Download pack file
        </a>)
      </p>
      <details>
        <summary>I want to create or load a new custom feedback pack.</summary>
        <ol>
          <li>
            <a
              href={generateFeedbackPackDownloadHref(templateFeedbackPack)}
              download={generateFeedbackPackFileName(templateFeedbackPack)}
            >
              Click here
            </a>
            {' '}to download a template feedback pack file, if you don't have one already.
          </li>
          <li>
            Edit the file to provide your own custom comments.{' '}
            You can use <a href="https://jsoneditoronline.org/" target="_blank">this online JSON editor</a>, or any basic text editor.
          </li>
          <li>
            Under "<b>Upload custom pack</b>" below, upload the feedback pack file from your device.
          </li>
          <li>
            Finally, click the "<b>Submit custom pack</b>" button below.
          </li>
        </ol>
        <p>
          The feedback generator will then utilise your custom comments.{' '}
          Also, your browser will save your custom feedback pack for next time.
        </p>
        <label htmlFor="feedback-pack-file-input">Upload custom pack:</label>
        <input id="feedback-pack-file-input" type="file" onChange={(e) => setUploadedFile(e.target.files?.[0] ?? null)} />
        <Button onClick={handleSubmitFeedbackPackFile} disabled={uploadedFile === null}>
          Submit custom pack
        </Button>
        {isPackSubmittedSuccessfully === true && <p className={styles.success}>Pack loaded successfully!</p>}
        {isPackSubmittedSuccessfully === false && <p className={styles.failure}>Please check that your feedback pack file is formatted correctly.</p>}
      </details>
    </>
  )
}

function generateFeedbackPackDownloadHref(feedbackPack: FeedbackPack) {
  return `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(feedbackPack, null, 2))}`
}

function generateFeedbackPackFileName(feedbackPack: FeedbackPack) {
  return `${feedbackPack.packTitle.replace(/\s/gi, '-').toLowerCase()}.json`
}

function saveCustomFeedbackPackToLocalStorage(pack: FeedbackPack) {
  localStorage.setItem('customFeedbackPack', JSON.stringify(pack))
}

function saveFeedbackPackCategoryToLocalStorage(category: string) {
  localStorage.setItem('feedbackPackCategory', category)
}

export default FeedbackPackSection