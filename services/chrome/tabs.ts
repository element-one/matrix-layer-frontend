export async function getTabs(queryInfo: chrome.tabs.QueryInfo) {
  return await chrome.tabs.query(queryInfo)
}

export async function isTabExists(tabId: number) {
  const tabs = await getTabs({ currentWindow: true })
  return tabs.some((tab) => tab.id === tabId)
}

export async function getCurrentTab() {
  const tabs = await getTabs({ active: true, currentWindow: true })
  const currentTab = tabs[0]
  return currentTab
}

export async function updateTab(
  tabId: number,
  updateProperties: chrome.tabs.UpdateProperties
) {
  const tabExists = await isTabExists(tabId)
  if (!tabExists) {
    return
  }

  return chrome.tabs.update(tabId, updateProperties)
}

export async function setActiveTab(tabId: number) {
  return updateTab(tabId, { active: true })
}

export async function sendMessage<T>(tabId: number, message: T) {
  const tabExists = await isTabExists(tabId)
  if (!tabExists) {
    return
  }

  return await chrome.tabs.sendMessage(tabId, message)
}
