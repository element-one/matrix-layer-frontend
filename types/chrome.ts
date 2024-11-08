export enum ActionType {
  getOuterHTML
}

export type ChromeMessage = {
  action: ActionType
  type?: string
  selectedText?: string
  pageUrl?: string
  success?: boolean
  highlightId?: string
}

export enum ChromeRuntimeType {
  onTextSelected,
  updateSideWithSelectedText,
  removeSelected,
  onOpenSelected
}

export type ChromeRuntimeMessage = {
  type: ChromeRuntimeType
  [key: string]: unknown
}

export type GetOuterHTMLResponse = {
  outerHTML: string
  paragraphs: string
  documentClone: Document
}

export interface Message {
  id: string
  content: string
  createdAt: Date
  metaData?: {
    pageUrl?: string
    pageContent?: string
  }
}

export type StorageScope = 'local' | 'session' | 'managed' | 'sync'

export type OnTextSelected = {
  type: ChromeRuntimeType.onTextSelected
  url: string
  text: string
  domId: string
}

export type UpdateSideWithSelectedText = {
  type: ChromeRuntimeType.updateSideWithSelectedText
  tabId: number
} & Omit<OnTextSelected, 'type'>

export type RemoveSelected = {
  type: ChromeRuntimeType.removeSelected
  domIds: string[]
}

export type OnOpenSelected = {
  type: ChromeRuntimeType.onOpenSelected
  tabId: number
  domId: string
}
