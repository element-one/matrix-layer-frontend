export async function getCurrentWindow() {
  return await chrome.windows.getCurrent({ populate: true })
}
