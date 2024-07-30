import { solana, solanaDevnet, solanaTestnet } from "@web3modal/solana/chains";
import { Transport, http } from "viem";
import { Chain, bsc, bscTestnet, hardhat, mainnet, sepolia } from "wagmi/chains";

export const ENV_NETWORK : string = import.meta.env.VITE_ENV_NETWORK

export const STAKE_BLOCKNUMBER = import.meta.env.VITE_STAKE_BLOCKNUMBER
export const DONATE_BLOCKNUMBER = import.meta.env.VITE_DONATE_BLOCKNUMBER

export function getNetworkEnviroment() : Chain[]{
    if(ENV_NETWORK === 'testnet'){
        return [bscTestnet, sepolia]
    }else if(ENV_NETWORK === 'mainnet'){
        return [bsc, mainnet]
    }else{
        return [hardhat]
    }
}

export function getSolanaNetworkEnviroment(){
    if(ENV_NETWORK === 'testnet'){
        return [solanaTestnet]
    }else if(ENV_NETWORK === 'mainnet'){
        return [solana]
    }else{
        return [solanaDevnet]
    }
}

export function getTransportChain(): Record<Chain['id'], Transport>{
    if(ENV_NETWORK === 'testnet'){
        return {
            [bscTestnet.id]: http(),
            [sepolia.id]: http()
        }
    }else if(ENV_NETWORK === 'mainnet'){
        return {
            [bsc.id]: http(),
            [mainnet.id]: http()
        }
    }else{
        return {
            [hardhat.id]: http(),
        }
    }
}

export function getBscChainNetwork(): Chain {
    if(ENV_NETWORK === 'mainnet'){
        return bsc
    }else{
        return bscTestnet
    }
}

export function getEthChainNetwork(): Chain {
    if(ENV_NETWORK === 'mainnet'){
        return mainnet
    }else{
        return sepolia
    }
}

export function getSolanaChainNetwork() {
    if(ENV_NETWORK === 'mainnet'){
        return solana
    }else{
        return solanaTestnet
    }
}

export function getBscTransportChain(): Record<Chain['id'], Transport>{
    if(ENV_NETWORK === 'testnet'){
        return {
            [bscTestnet.id]: http()
        }
    }else if(ENV_NETWORK === 'mainnet'){
        return {
            [bsc.id]: http()
        }
    }else{
        return {
            [hardhat.id]: http(),
        }
    }
}

export function getPublicRpc() : string{
    if(ENV_NETWORK === 'amoy'){
        return 'https://rpc-amoy.polygon.technology'
    }else if(ENV_NETWORK === 'mainnet'){
        return 'https://binance.llamarpc.com'
    }else{
        return 'https://endpoints.omniatech.io/v1/bsc/testnet/public'
    }
}

export const CHAINS =  [
    'eth',
    'bnb',
    'usdt',
    'aha'
]