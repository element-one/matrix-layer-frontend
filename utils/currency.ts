import BigNumber from 'bignumber.js'
import { formatUnits } from 'ethers'

export const formatCurrency = (
  amount: string | number,
  decimals: number = 18
) => {
  try {
    const formattedAmount = formatUnits(
      new BigNumber(amount).toFixed(0),
      decimals
    )
    return parseFloat(formattedAmount).toFixed(2)
  } catch (error) {
    console.log('format USDT error: ', error)
    return ''
  }
}

export function formatUSDT(
  amount: string | number,
  decimals: number = 18
): string {
  try {
    const formattedAmount = formatUnits(
      new BigNumber(amount).toFixed(0),
      decimals
    )
    return parseFloat(formattedAmount).toFixed(2)
  } catch (error) {
    console.log('format USDT error: ', error)
    return ''
  }
}
