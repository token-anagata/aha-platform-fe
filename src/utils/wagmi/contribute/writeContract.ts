import { writeContract } from "@wagmi/core";
import { config } from "@/configurations/wagmi";
import { DECIMALS, PERCENTAGE_DECIMALS, REAL_DECIMALS, getTransactionConfirmed } from "..";
import { Address } from "viem";
import { INVEST_CONTRACT_ADDRESS, USDT_CONTRACT_ADDRESS } from "@/configurations/contract";
import { ABI_CONTRIBUTE_CONTRACT } from "@/abi/contribute";
import { ABI_USDT_CONTRACT } from "@/abi/usdt";

export interface ProjectData {
    id: string;
    duration: number | string;
    reward: number | string;
    minAmount: number | string;
    maxAmount: number | string;
    status: number;
}

export async function approve(address: Address, amount: number) {
    const result = await writeContract(config, {
        abi: ABI_USDT_CONTRACT,
        address: USDT_CONTRACT_ADDRESS as Address,
        functionName: 'approve',
        args: [
            INVEST_CONTRACT_ADDRESS,
            BigInt(amount * 10 ** REAL_DECIMALS)
        ],
        account: address
    })

    return result
}

export async function queuesUp(address: Address, amount: number, projectId: string) {
    const hashApprove = await approve(address, amount);
    const confirmed = await getTransactionConfirmed(hashApprove);
    console.log(projectId)
    if (confirmed) {
        const result = await writeContract(config, {
            abi: ABI_CONTRIBUTE_CONTRACT,
            address: INVEST_CONTRACT_ADDRESS as Address,
            functionName: 'queuesUp',
            args: [
                projectId,
                BigInt(amount * 10 ** REAL_DECIMALS)
            ],
            account: address
        })

        return result
    }

    return false

}

export async function createProject(address: Address, data: ProjectData) {
    const result = await writeContract(config, {
        abi: ABI_CONTRIBUTE_CONTRACT,
        address: INVEST_CONTRACT_ADDRESS as Address,
        functionName: 'createProject',
        args: [
            data.id,
            BigInt(data.duration),
            BigInt(data.reward) * PERCENTAGE_DECIMALS,
            BigInt(data.minAmount) * DECIMALS,
            BigInt(data.maxAmount) * DECIMALS,
            data.status,
        ],
        account: address
    })

    return result

}