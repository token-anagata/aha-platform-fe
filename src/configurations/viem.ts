import { createPublicClient, createWalletClient, custom, http } from 'viem'
import { getBscChainNetwork, getPublicRpc } from './chains'

const publicRpc = getPublicRpc()

export const publicClient = createPublicClient({ 
  chain: getBscChainNetwork(), 
  transport: http(publicRpc), 
}) 
 
export const walletClient = createWalletClient({
  chain: getBscChainNetwork(), 
  transport: custom(window.ethereum!)
})