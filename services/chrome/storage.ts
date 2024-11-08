import { StorageScope } from '@type/chrome'

export async function storageGet(
  scope: StorageScope,
  data:
    | string
    | string[]
    | {
        [key: string]: unknown
      }
) {
  return await chrome.storage[scope].get(data)
}

export async function storageSet(
  scope: StorageScope,
  data: { [key: string]: unknown }
) {
  return await chrome.storage[scope].set(data)
}

export async function storageRemove(scope: StorageScope, keys: string[]) {
  return await chrome.storage[scope].remove(keys)
}
