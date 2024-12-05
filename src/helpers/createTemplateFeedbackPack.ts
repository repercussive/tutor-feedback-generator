import { defaultFeedbackPack } from '@src/resources/default-feedback-pack'
import { FeedbackPack } from '@src/types'

export function createTemplateFeedbackPack(packTitle?: string): FeedbackPack {
  const pack = { ...defaultFeedbackPack }
  pack.packTitle = packTitle ?? `Custom feedback pack ${getCurrentDateYyyyMmDd()}`
  return pack
}

function getCurrentDateYyyyMmDd() {
  const currentDate = new Date()
  const offsetDate = new Date(currentDate.getTime() - (currentDate.getTimezoneOffset() * 60 * 1000))
  const dateString = offsetDate.toISOString().split('T')[0]
  return dateString
}