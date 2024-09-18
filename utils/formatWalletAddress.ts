export const formatWalletAddress = (address?: string) => {
  if (!address) {
    return ''
  }

  return `${address.slice(0, 4)}...${address.slice(address.length - 6)}`
}
