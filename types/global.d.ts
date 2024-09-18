export {}

declare global {
  interface Window {
    Coframe?: any // eslint-disable-line
  }
}

declare module '*.json' {
  const value: any // eslint-disable-line
  export default value
}
