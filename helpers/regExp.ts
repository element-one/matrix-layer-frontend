function addFlags(regex: RegExp, flags: string): RegExp {
  const { source, flags: regexFlags } = regex
  const newFlags = regexFlags + flags

  return new RegExp(source, newFlags)
}

export const dateISO = new RegExp(
  /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(?::\d{2}(?:\.\d+)?(?:[+-]\d{2}:\d{2}|Z)?)?/
)
export const dateISOOnly = new RegExp(`^${dateISO.source}$`)
export const dateISOGlobal = addFlags(dateISO, 'g')

const quotesAndAsterisks = new RegExp(/["*]/)

export const quotesAndAsterisksGlobal = addFlags(quotesAndAsterisks, 'g')
