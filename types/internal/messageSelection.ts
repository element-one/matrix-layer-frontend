export type MessageSelection = {
  url: string
  quotes: MessageQuote[]
}

export type MessageQuote = {
  tabId: number
  domId: string
  text: string
}
