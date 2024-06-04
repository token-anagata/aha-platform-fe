import { Chain, bsc, bscTestnet, hardhat } from "wagmi/chains";

const CHAIN : string = import.meta.env.VITE_CHAIN_NETWORK
export const FROM_BLOCKNUMBER = import.meta.env.VITE_FROM_BLOCKNUMBER

export function getChainNetwork() : Chain{
    switch (CHAIN) {
        case 'hardhat':
            return hardhat;

        case 'bsc':
            return bsc
    
        default:
            return bscTestnet
          
    }
}

export function getPublicRpc() : string{
    if(CHAIN === 'amoy'){
        return 'https://rpc-amoy.polygon.technology'
    }else if(CHAIN === 'bsc'){
        return 'https://binance.llamarpc.com'
    }else{
        return 'https://endpoints.omniatech.io/v1/bsc/testnet/public'
    }
}