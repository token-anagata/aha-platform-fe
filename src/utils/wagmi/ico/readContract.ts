import { ABI_ICO_CONTRACT } from '@/abi/ico';
import { ICO_CONTRACT_ADDRESS } from '@/configurations/contract';
import { readContract } from '@wagmi/core'
import { configBsc } from '@/configurations/wagmi';
import { Address } from 'viem';
import { publicClient } from '@/configurations/viem';

export async function getTokenPrice(address: Address) {
    const result = await publicClient.readContract({
        abi: ABI_ICO_CONTRACT,
        address: ICO_CONTRACT_ADDRESS as Address,
        account: address as Address,
        functionName: 'tokenPrice',
        args: []
    })

    return result
}

export async function getMinAmount(address: Address) {
    const result = await readContract(configBsc, {
        abi: ABI_ICO_CONTRACT,
        address: ICO_CONTRACT_ADDRESS as Address,
        account: address as Address,
        functionName: 'minAmount',
        args: []
    })

    return result
}

export async function getMaxAmount(address: Address) {
    const result = await readContract(configBsc, {
        abi: ABI_ICO_CONTRACT,
        address: ICO_CONTRACT_ADDRESS as Address,
        account: address as Address,
        functionName: 'maxAmount',
        args: []
    })

    return result
}

export async function getTokenSold(address: Address) {
    const result = await readContract(configBsc, {
        abi: ABI_ICO_CONTRACT,
        address: ICO_CONTRACT_ADDRESS as Address,
        account: address as Address,
        functionName: 'tokenSold',
        args: []
    })

    return result
}
