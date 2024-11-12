export function sanitizeQuotes(text: string) {
  return text.replace(/["]/g, "'")
}
