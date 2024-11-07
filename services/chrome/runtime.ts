export async function sendRuntimeMessage<T>(message: T) {
  return await chrome.runtime.sendMessage(message)
}
