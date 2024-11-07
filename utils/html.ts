import { Readability } from '@mozilla/readability'

import { trimString } from './text'

function parseDocument(document: Document) {
  return new Readability(document).parse()
}

function generateDocumentFromHTML(html: string): Document {
  const parser = new DOMParser()
  return parser.parseFromString(html, 'text/html')
}

function getTextFromHTML(html: string): string {
  const document = generateDocumentFromHTML(html)
  const parsedDocument = parseDocument(document)
  return parsedDocument?.textContent || ''
}

export function getFormattedTextFromHTML(html: string): string {
  const text = getTextFromHTML(html)
  return trimString(text)
}
