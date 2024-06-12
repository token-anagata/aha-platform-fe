import { createPublicClient, http } from 'viem'
import { getBscChainNetwork, getPublicRpc } from './chains'

const publicRpc = getPublicRpc()

export const publicClient = createPublicClient({ 
  chain: getBscChainNetwork(), 
  transport: http(publicRpc), 
}) 