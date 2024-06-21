
import { config } from '@/configurations/wagmi';
import { writeContract } from '@wagmi/core'
import { Address } from 'viem';
import { DECIMALS, REAL_DECIMALS  } from '..';
import { ABI_USDT_CONTRACT } from '@/abi/usdt';
import { ICO_CONTRACT_ADDRESS, USDT_CONTRACT_ADDRESS } from '@/configurations/contract';
import { BNB_RECEPIENT } from '@/configurations/common';

export async function approve(address: Address, amount: number, contract: string = ICO_CONTRACT_ADDRESS) { 
    const result = await writeContract(config, {
        abi: ABI_USDT_CONTRACT,
        address: USDT_CONTRACT_ADDRESS as Address,
        functionName: 'approve',
        args: [
            contract,
            BigInt(amount) * DECIMALS,
        ],
        account: address
    })

    return result
}

export async function transferUsdt(address: Address, amount: number) {
    const result = await writeContract(config, {
        abi: ABI_USDT_CONTRACT,
        address: USDT_CONTRACT_ADDRESS as Address,
        functionName: 'transfer',
        args: [
            BNB_RECEPIENT,
            BigInt(amount * 10 ** REAL_DECIMALS),
        ],
        account: address
    })

    return result
}