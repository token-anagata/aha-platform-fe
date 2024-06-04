import { STAKE_CONTRACT_ADDRESS } from '@/configurations/contract';
import { writeContract } from '@wagmi/core'
import { config } from '@/configurations/wagmi';
import { Address } from 'viem';
import { ABI_STAKE_CONTRACT } from '@/abi/stake';
import { DECIMALS } from '..';

export async function stake(address: Address, stakeMonth: number, amount: number) {
    const result = await writeContract(config, {
        abi: ABI_STAKE_CONTRACT,
        address: STAKE_CONTRACT_ADDRESS as Address,
        functionName: 'stake',
        args: [
            BigInt(amount) * DECIMALS,
            BigInt(stakeMonth),
        ],
        account: address
    })

    return result
}

export async function unstake(address: Address, index: number) {
    const result = await writeContract(config, {
        abi: ABI_STAKE_CONTRACT,
        address: STAKE_CONTRACT_ADDRESS as Address,
        functionName: 'unstake',
        args: [
            BigInt(index),
        ],
        account: address
    })

    return result
}