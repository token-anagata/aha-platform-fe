import { createPublicClient, http } from 'viem'
import { getChainNetwork, getPublicRpc } from './chains'

const publicRpc = getPublicRpc()

export const publicClient = createPublicClient({ 
  chain: getChainNetwork(), 
  transport: http(publicRpc), 
}) 