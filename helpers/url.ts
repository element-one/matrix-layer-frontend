export function getHostname(url: string): string {
  try {
    return new URL(url).hostname
  } catch (error) {
    return url
  }
}
