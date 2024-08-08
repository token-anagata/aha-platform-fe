import { defaultSolanaConfig } from '@web3modal/solana/react'
import { solana, solanaTestnet, solanaDevnet } from '@web3modal/solana/chains'
import { PROJECT_ID, metadata } from './web3modal';
import { getSolanaNetworkEnviroment } from './chains';

export const chains = [solana, solanaTestnet, solanaDevnet]

const configSolana = () => {
    const chain = getSolanaNetworkEnviroment();
    
    return defaultSolanaConfig({
        metadata: metadata,
        chains: chain,
        projectId: PROJECT_ID
    })
}

export const solanaConfig = configSolana()