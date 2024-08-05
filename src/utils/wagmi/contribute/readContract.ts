import { INVEST_CONTRACT_ADDRESS } from '@/configurations/contract';
import { readContract } from '@wagmi/core'
import { config } from '@/configurations/wagmi';
import { Address } from 'viem';
import { ABI_CONTRIBUTE_CONTRACT } from '@/abi/contribute';

export async function getProject(address: Address, projectId: string) {
    const result = await readContract(config, {
        abi: ABI_CONTRIBUTE_CONTRACT,
        address: INVEST_CONTRACT_ADDRESS as Address,
        account: address as Address,
        functionName: 'getProject',
        args: [
            projectId
        ]
    })
    
    return result
}

export async function getTotalProjectAmount(address: Address, projectId: string) {
    const result = await readContract(config, {
        abi: ABI_CONTRIBUTE_CONTRACT,
        address: INVEST_CONTRACT_ADDRESS as Address,
        account: address as Address,
        functionName: 'getTotalProjectAmount',
        args: [
            projectId
        ]
    })
    
    return result
}
