export async function openSidePanelForCurrentWindow(): Promise<boolean> {
  // https://stackoverflow.com/questions/77213045/error-sidepanel-open-may-only-be-called-in-response-to-a-user-gesture-re

  return new Promise((resolve, reject) => {
    chrome.windows.getCurrent({ populate: true }, (window) => {
      const windowId = window.id
      if (!windowId) {
        return reject(false)
      }

      chrome.sidePanel.open({ windowId }, () => {
        return resolve(true)
      })
    })
  })
}
