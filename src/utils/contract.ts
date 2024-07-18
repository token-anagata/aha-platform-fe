import { ABI_AHA_CONTRACT } from "@/abi/aha";
import { ABI_ICO_CONTRACT } from "@/abi/ico";
import { ABI_USDT_CONTRACT } from "@/abi/usdt";
import { BNB_RECEPIENT, ETH_RECEPIENT } from "@/configurations/common";
import { ETH_SYMBOL, ICO_CONTRACT_ADDRESS, ICO_SYMBOL } from "@/configurations/contract";
import { AHA_CONTRACT_ADDRESS, AHA_SYMBOL, USDT_CONTRACT_ADDRESS, USDT_SYMBOL } from "@/configurations/contract";
import { Address } from "viem";

export const INVEST_STATUS = [
    'FREZE FUNDING',
    'ON FUNDING',
    'FULFILLED',
    'NOT FULFILLED',
    'FINISHED'
]

export function getTokenSymbol(symbol: string) : string{
    
    switch (symbol) {
        case AHA_SYMBOL:
            return AHA_SYMBOL;
          
        case USDT_SYMBOL:
            return USDT_SYMBOL;
    
        default:
            return AHA_SYMBOL;

    }
}

export function getContractAddress(name: string) : Address{
    switch (name) {
        case AHA_SYMBOL:
            return AHA_CONTRACT_ADDRESS as Address;

        case USDT_SYMBOL:
            return USDT_CONTRACT_ADDRESS as Address;
            
        case ICO_SYMBOL:
            return ICO_CONTRACT_ADDRESS as Address;
    
        default:
            return ICO_CONTRACT_ADDRESS as Address;
          
    }
}


export function getContractAbi(name: string){
    switch (name) {
        case AHA_SYMBOL:
            return ABI_AHA_CONTRACT;

        case USDT_SYMBOL:
            return ABI_USDT_CONTRACT;
            
        case ICO_SYMBOL:
            return ABI_ICO_CONTRACT;
    
        default:
            return ABI_ICO_CONTRACT;
          
    }
}


export function getTokenRecepient(name: string) : string{
    switch (name) {
        case AHA_SYMBOL:
            return BNB_RECEPIENT;

        case USDT_SYMBOL:
            return BNB_RECEPIENT;
        
        case ETH_SYMBOL:
            return ETH_RECEPIENT;
    
        default:
            return ETH_RECEPIENT;
          
    }
}