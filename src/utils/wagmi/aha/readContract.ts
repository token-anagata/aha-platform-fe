import { AHA_CONTRACT_ADDRESS, ICO_CONTRACT_ADDRESS } from '@/configurations/contract';
import { readContract } from '@wagmi/core'
import { config } from '@/configurations/wagmi';
import { Address } from 'viem';
import { ABI_AHA_CONTRACT } from '@/abi/aha';

export async function getAllowance(address: Address) {
    const result = await readContract(config, {
        abi: ABI_AHA_CONTRACT,
        address: AHA_CONTRACT_ADDRESS as Address,
        account: address as Address,
        functionName: 'allowance',
        args: [
            '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
            ICO_CONTRACT_ADDRESS
        ]
    })

    return result
}
