import { AHA_CONTRACT_ADDRESS, ICO_CONTRACT_ADDRESS } from '@/configurations/contract';
import { readContract } from '@wagmi/core'
import { config } from '@/configurations/wagmi';
import { Address } from 'viem';
import { ABI_AHA_CONTRACT } from '@/abi/aha';
import { OWNER_ADDRESS } from '@/configurations/common';

export async function getAllowance(address: Address) {
    const result = await readContract(config, {
        abi: ABI_AHA_CONTRACT,
        address: AHA_CONTRACT_ADDRESS as Address,
        account: address as Address,
        functionName: 'allowance',
        args: [
            OWNER_ADDRESS,
            ICO_CONTRACT_ADDRESS
        ]
    })

    return result
}
