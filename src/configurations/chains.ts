import { Chain, bsc, bscTestnet, hardhat } from "wagmi/chains";

const CHAIN : string = import.meta.env.VITE_CHAIN_NETWORK

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