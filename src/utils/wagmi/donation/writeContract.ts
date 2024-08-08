import { getContractAbi, getContractAddress } from "@/utils/contract";
import { writeContract } from "@wagmi/core";
import { config } from "@/configurations/wagmi";
import { DECIMALS, REAL_DECIMALS, getTransactionConfirmed } from "..";
import { Address } from "viem";
import { ABI_DONATION_CONTRACT } from "@/abi/donation";
import { DONATION_CONTRACT_ADDRESS } from "@/configurations/contract";

export async function approve(address: Address, amount: number, tokenType: string) {
    const contractAbi = getContractAbi(tokenType)
    const contractAddress = getContractAddress(tokenType)

    const result = await writeContract(config, {
        abi: contractAbi,
        address: contractAddress,
        functionName: 'approve',
        args: [
            DONATION_CONTRACT_ADDRESS,
            BigInt(amount) * DECIMALS,
        ],
        account: address
    })

    return result
}

export async function donateToken(address: Address, amount: number, tokenType: string, projectId: string) {
    const contractAddress = getContractAddress(tokenType)
    const hashApprove = await approve(address, amount, tokenType);
    const confirmed = await getTransactionConfirmed(hashApprove);

    if (confirmed) {
        const result = await writeContract(config, {
            abi: ABI_DONATION_CONTRACT,
            address: DONATION_CONTRACT_ADDRESS as Address,
            functionName: 'donate',
            args: [
                contractAddress as string,
                BigInt(amount * 10 ** REAL_DECIMALS),
                BigInt(projectId)
            ],
            account: address
        })

        return result
    }

    return false

}