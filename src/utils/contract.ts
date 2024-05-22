import { ICO_CONTRACT_ADDRESS, ICO_SYMBOL } from "@/configurations/contract";
import { AHA_CONTRACT_ADDRESS, AHA_SYMBOL, USDT_CONTRACT_ADDRESS, USDT_SYMBOL } from "@/configurations/contract";
import { Address } from "viem";

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