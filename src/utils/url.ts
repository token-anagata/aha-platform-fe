import { getBscChainNetwork, getEthChainNetwork, getRipleChainNetwork } from "@/configurations/chains";
import { useLocation } from "react-router-dom";
import { getSolanaExplorer } from "./solana";

export const useQueryUrl = () => {
    return new URLSearchParams(useLocation().search);
};

export const generateRandomId = (length: number): string => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
};

export const getChainUrl = (network: string, tx: string): string => {
    const bscChain = getBscChainNetwork()
    const ethChain = getEthChainNetwork()
    const ripleChain = getRipleChainNetwork()

    if (network === 'aha' || network === 'bnb' || network === 'usdt') {
        return `${bscChain.blockExplorers?.default.url}/tx/${tx}`
    }else if (network === 'eth'){
            return `${ethChain.blockExplorers?.default.url}/tx/${tx}`
    }else if (network === 'solana'){
            return getSolanaExplorer(tx)
    }else{
        return `${ripleChain}/${tx}`
    }
}