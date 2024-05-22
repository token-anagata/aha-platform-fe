import { ABI_ICO_CONTRACT } from '@/abi/ico';
import { ICO_CONTRACT_ADDRESS } from '@/configurations/contract';
import { config } from '@/configurations/wagmi';
import { writeContract } from '@wagmi/core'
import { Address } from 'viem';
import { DECIMALS } from '..';

export async function buyTokens(address: Address, amount: number) {
    const result = await writeContract(config, {
        abi: ABI_ICO_CONTRACT,
        address: ICO_CONTRACT_ADDRESS as Address,
        functionName: 'buyTokens',
        args: [
            BigInt(amount) * DECIMALS,
        ],
        account: address
    })
    
    return result
}
