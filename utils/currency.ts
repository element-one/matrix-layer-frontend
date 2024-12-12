import BigNumber from 'bignumber.js'
import { formatUnits } from 'ethers'

const MATRIX_AMOUNT = process.env.NEXT_PUBLIC_MATRIX_AMOUNT ?? '100*1e18'

export const formatCurrency = (
  amount: string | number = 0,
  decimals: number = 18,
  roundDown?: boolean
) => {
  try {
    const formattedAmount = formatUnits(
      new BigNumber(amount).toFixed(0),
      decimals
    )

    if (roundDown) {
      return Math.floor(Number(formattedAmount)).toString()
    }
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

export const getBigNumberFromEnv = (envAmount: string): BigNumber => {
  if (!envAmount?.trim()) {
    return new BigNumber(0)
  }

  try {
    if (!envAmount.includes('*')) {
      const value = new BigNumber(envAmount.trim())
      return value.isNaN() ? new BigNumber(0) : value
    }

    const [value, multiplier] = envAmount.split('*').map((part) => part.trim())
    console.log('value: ', value)
    console.log('multiplier: ', multiplier)

    const valueBN = new BigNumber(value)
    const multiplierBN = new BigNumber(multiplier)

    if (valueBN.isNaN() || multiplierBN.isNaN()) {
      console.warn('Invalid number format in environment variable:', envAmount)
      return new BigNumber(0)
    }

    return valueBN.multipliedBy(multiplierBN)
  } catch (error) {
    console.error('Error parsing environment variable amount:', error)
    return new BigNumber(0)
  }
}

export const isBigNumberEqual = (
  value: string | number,
  compareValue: BigNumber
): boolean => {
  if (!value) return false
  try {
    const bigNumValue = new BigNumber(value)
    return bigNumValue.eq(compareValue)
  } catch (e) {
    return false
  }
}

export const formatForMatrix = (amount: string | number): string => {
  try {
    const amountBN = new BigNumber(amount)
    if (amountBN.isNaN()) return '0'

    if (isBigNumberEqual(amount, getBigNumberFromEnv(MATRIX_AMOUNT))) {
      return 'Matrix'
    }

    console.log('amountBN: ', amountBN)
    console.log(
      'getBigNumberFromEnv(MATRIX_AMOUNT): ',
      getBigNumberFromEnv(MATRIX_AMOUNT)
    )

    return formatUSDT(amount)
  } catch (error) {
    console.error('Error formatting for matrix:', error)
    return '0'
  }
}
