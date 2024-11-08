import { ActionType, ChromeMessage, GetOuterHTMLResponse } from '@type/chrome'
import { isBrowser, isChrome } from '@utils/environment'
import { getFormattedTextFromHTML } from '@utils/html'

type StorageResult = {
  [key: string]: string
}

export async function getStorageItems(keys: string[]): Promise<StorageResult> {
  let result: StorageResult = {}

  if (isChrome()) {
    const { storageGet } = await import('@services/chrome/storage')

    const data = await storageGet('local', keys)

    result = keys.reduce((acc, key) => {
      if (key in data) {
        acc[key] = data[key]
      }
      return acc
    }, {} as StorageResult)
  }

  return result
}

export async function getSyncStorageItems(
  keys: string[]
): Promise<StorageResult> {
  let result: StorageResult = {}

  if (isChrome()) {
    const { storageGet } = await import('@services/chrome/storage')
    const data = await storageGet('sync', keys)

    result = keys.reduce((acc, key) => {
      if (key in data) {
        acc[key] = data[key]
      }
      return acc
    }, {} as StorageResult)
  } else if (isBrowser()) {
    result = keys.reduce((acc, key) => {
      const value = localStorage.getItem(key)
      if (value !== null) {
        acc[key] = value
      }
      return acc
    }, {} as StorageResult)
  }

  return result
}

export async function setSyncStorageItems(items: {
  [key: string]: string
}): Promise<void> {
  if (isChrome()) {
    const { storageSet } = await import('@services/chrome/storage')

    await storageSet('sync', items)
  } else if (isBrowser()) {
    Object.keys(items).forEach((key) => {
      localStorage.setItem(key, items[key])
    })
  }
}

export async function removeSyncStorageItems(keys: string[]): Promise<void> {
  if (isChrome()) {
    const { storageRemove } = await import('@services/chrome/storage')

    await storageRemove('sync', keys)
  } else if (isBrowser()) {
    keys.forEach((key) => {
      localStorage.removeItem(key)
    })
  }
}

export function addMessageListener<T>(callback: (message: T) => void) {
  if (isChrome()) {
    chrome.runtime.onMessage.addListener(callback)
    return () => {
      chrome.runtime.onMessage.removeListener(callback)
    }
  }
  return () => {}
}

export async function sendMessageToTab<T>(tabId: number, message: T) {
  if (isChrome()) {
    try {
      const { sendMessage } = await import('@services/chrome/tabs')

      return await sendMessage(tabId, message)
    } catch (error) {
      return
    }
  }
}

export async function sendMessageToRuntime<T>(message: T) {
  if (isChrome()) {
    const { sendRuntimeMessage } = await import('@services/chrome/runtime')
    return await sendRuntimeMessage(message)
  }
}

export async function getCurrentUrl(): Promise<string | null> {
  let url = null

  if (isChrome()) {
    const { getCurrentTab } = await import('@services/chrome/tabs')

    const currentTab = await getCurrentTab()
    url = currentTab.url || null
  }

  return url
}

export async function getCurrentPageContent(): Promise<string | null> {
  let pageContent = null

  if (isChrome()) {
    const { getCurrentTab, sendMessage } = await import('@services/chrome/tabs')

    const currentTab = await getCurrentTab()
    const currentTabId = currentTab.id ?? 0

    let outerHTMLResponse: GetOuterHTMLResponse
    try {
      outerHTMLResponse = await sendMessage<ChromeMessage>(currentTabId, {
        action: ActionType.getOuterHTML
      })
    } catch (error) {
      return pageContent
    }

    pageContent = getFormattedTextFromHTML(outerHTMLResponse.outerHTML)
  }

  return pageContent
}
