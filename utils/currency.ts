import { formatUnits } from 'ethers'

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
})

export const formatCurrency = (
  currency?: string | number,
  unit = 0.000000000000000001
) => {
  if (currency === undefined) {
    return ''
  }

  const result = formatter.format(Number(currency) * unit)

  return result.slice(1).split('.')[0]
}

export function formatUSDT(
  amount: string | number,
  decimals: number = 18
): string {
  const formattedAmount = formatUnits(amount.toString(), decimals)
  return parseFloat(formattedAmount).toFixed(2)
}