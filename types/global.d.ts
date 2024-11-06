import en from '../messages/en.json'

type Messages = typeof en

declare global {
  interface Window {
    Coframe?: any // eslint-disable-line
  }
  // use type safe message keys with 'next-intl'
  interface IntlMessages extends Messages {}
}

declare module '*.json' {
  const value: any // eslint-disable-line
  export default value
}

export {}
