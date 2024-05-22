
import { config } from '@/configurations/wagmi';
import { writeContract } from '@wagmi/core'
import { Address } from 'viem';
import { DECIMALS } from '..';
import { ABI_USDT_CONTRACT } from '@/abi/usdt';
import { ICO_CONTRACT_ADDRESS, USDT_CONTRACT_ADDRESS } from '@/configurations/contract';

/* global BigInt */
export async function approve(address: Address, amount: number) {
    const result = await writeContract(config, {
        abi: ABI_USDT_CONTRACT,
        address: USDT_CONTRACT_ADDRESS as Address,
        functionName: 'approve',
        args: [
            ICO_CONTRACT_ADDRESS,
            BigInt(amount) * DECIMALS,
        ],
        account: address
    })

    return result
}