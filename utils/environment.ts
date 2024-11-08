export function isChrome() {
  const isRanInChrome =
    typeof chrome !== 'undefined' && chrome && chrome.storage
  return Boolean(isRanInChrome)
}

export function isBrowser() {
  return typeof window !== 'undefined'
}

export function isNode() {
  return typeof global !== 'undefined'
}
