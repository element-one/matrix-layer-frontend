import { dateISOOnly } from '@helpers/regExp'

export function trimString(string: string) {
  return string.replace(/\n\s*\n/g, '\n')
}

export function parseJSON(string: string) {
  return JSON.parse(string, (key, value) => {
    const isDate = typeof value === 'string' && dateISOOnly.test(value)
    if (isDate) {
      return new Date(value)
    }

    return value
  })
}
