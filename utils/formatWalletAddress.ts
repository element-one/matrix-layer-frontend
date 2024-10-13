export const formatWalletAddress = (address?: string) => {
  if (!address) {
    return ''
  }

  return `${address.slice(0, 4)}...${address.slice(address.length - 6)}`
}

export const formatClaimWalletAddress = (address?: string) => {
  if (!address) {
    return ''
  }

  return `${address.slice(0, 10)}*****${address.slice(address.length - 6)}`
}
