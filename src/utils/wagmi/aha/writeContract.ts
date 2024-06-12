import { AHA_CONTRACT_ADDRESS, STAKE_CONTRACT_ADDRESS } from '@/configurations/contract';
import { writeContract } from '@wagmi/core'
import { config } from '@/configurations/wagmi';
import { Address } from 'viem';
import { ABI_AHA_CONTRACT } from '@/abi/aha';
import { DECIMALS, REAL_DECIMALS } from '..';
import { BNB_RECEPIENT } from '@/configurations/common';


export async function approve(address: Address, amount: number) {
    const result = await writeContract(config, {
        abi: ABI_AHA_CONTRACT,
        address: AHA_CONTRACT_ADDRESS as Address,
        functionName: 'approve',
        args: [
            STAKE_CONTRACT_ADDRESS,
            BigInt(amount) * DECIMALS,
        ],
        account: address
    })

    return result
}

export async function transferAha(address: Address, amount: number) {
    const result = await writeContract(config, {
        abi: ABI_AHA_CONTRACT,
        address: AHA_CONTRACT_ADDRESS as Address,
        functionName: 'transfer',
        args: [
            BNB_RECEPIENT,
            BigInt(amount * 10 ** REAL_DECIMALS),
        ],
        account: address
    })

    return result
}