const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
})

export const format = (currency?: string | number, unit = 0.000001) => {
  if (currency === undefined) {
    return ''
  }

  const result = formatter.format(Number(currency) * unit)

  return result.slice(1).split('.')[0]
}

export const currencyFormatter = {
  format
}
