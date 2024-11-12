import { ChromeRuntimeType, type RemoveSelected } from '@type/chrome'
import type { ChatQuoteInput } from '@type/graphqlApiSchema'
import type { MessageSelection } from '@type/internal/messageSelection'

import { sendMessageToTab } from '../chrome'
import { getHostname } from '../url'

export function removeQuote(
  messageSelections: MessageSelection[],
  url: string,
  domId: string
): MessageSelection[] {
  const existingSelection = messageSelections.find((sel) => sel.url === url)

  if (existingSelection) {
    existingSelection.quotes = existingSelection.quotes.filter(
      (quote) => quote.domId !== domId
    )

    if (existingSelection.quotes.length === 0) {
      messageSelections = messageSelections.filter((sel) => sel.url !== url)
    }
  }

  return messageSelections
}

export function addSelection(
  messageSelections: MessageSelection[],
  messageSelection: MessageSelection
): MessageSelection[] {
  const existingSelection = messageSelections.find(
    (sel) => sel.url === messageSelection.url
  )

  if (existingSelection) {
    existingSelection.quotes.push(...messageSelection.quotes)
  } else {
    messageSelections.push(messageSelection)
  }

  return messageSelections
}

export function removeSelectionByUrl(
  messageSelections: MessageSelection[],
  url: string
): MessageSelection[] {
  return messageSelections.filter((selection) => selection.url !== url)
}

export function getSelectionByUrl(
  messageSelections: MessageSelection[],
  url: string
): MessageSelection | undefined {
  return messageSelections.find((selection) => selection.url === url)
}

export function truncateSelectionText(
  text: string,
  maxLength: number = 40
): string {
  if (text.length > maxLength) {
    return `${text.slice(0, maxLength)}...`
  }
  return text
}

export function getFormattedQuotes(
  selections: MessageSelection[]
): ChatQuoteInput[] {
  return selections.map((selection) => {
    const hostname = getHostname(selection.url)
    const quotesText = selection.quotes
      .map((quote) => `"${quote.text}"`)
      .join(' ')
    return { text: `[${hostname}](${selection.url}) ${quotesText}` }
  })
}

export const groupDomIdsByTab = (
  selections: MessageSelection[]
): { tabId: number; domIds: string[] }[] => {
  return selections.reduce<{ tabId: number; domIds: string[] }[]>(
    (acc, selection) => {
      selection.quotes.forEach((quote) => {
        const existingGroup = acc.find((group) => group.tabId === quote.tabId)
        if (existingGroup) {
          existingGroup.domIds.push(quote.domId)
        } else {
          acc.push({ tabId: quote.tabId, domIds: [quote.domId] })
        }
      })
      return acc
    },
    []
  )
}

export const sendMessageToRemove = (selections: MessageSelection[]) => {
  if (!selections.length) {
    return
  }

  const domIdsToRemove = groupDomIdsByTab(selections)

  domIdsToRemove.forEach(({ tabId, domIds }) => {
    sendMessageToTab<RemoveSelected>(tabId, {
      type: ChromeRuntimeType.removeSelected,
      domIds
    })
  })
}
