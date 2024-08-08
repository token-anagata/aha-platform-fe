import { AHA_CONTRACT_ADDRESS, ICO_CONTRACT_ADDRESS } from '@/configurations/contract';
import { readContract } from '@wagmi/core'
import { config } from '@/configurations/wagmi';
import { Address } from 'viem';
import { ABI_AHA_CONTRACT } from '@/abi/aha';
import { BNB_RECEPIENT } from '@/configurations/common';

export async function getAllowance(address: Address) {
    const result = await readContract(config, {
        abi: ABI_AHA_CONTRACT,
        address: AHA_CONTRACT_ADDRESS as Address,
        account: address as Address,
        functionName: 'allowance',
        args: [
            BNB_RECEPIENT,
            ICO_CONTRACT_ADDRESS
        ]
    })

    return result
}
