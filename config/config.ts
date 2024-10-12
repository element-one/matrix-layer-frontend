import { createConfig, http } from '@wagmi/core'
import { bscTestnet, sepolia } from '@wagmi/core/chains'

export const config = createConfig({
  chains: [bscTestnet],
  transports: {
    [bscTestnet.id]: http(),
    [sepolia.id]: http()
  }
})
