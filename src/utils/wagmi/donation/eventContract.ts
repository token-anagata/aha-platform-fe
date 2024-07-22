import { Address } from "viem";
import { publicClient } from "@/configurations/viem";
import { DONATION_CONTRACT_ADDRESS } from "@/configurations/contract";
import { DONATE_BLOCKNUMBER } from "@/configurations/chains";
import { ABI_DONATION_CONTRACT } from "@/abi/donation";

export async function getListDonate(projectId: string) {
    const blockNumber = await publicClient.getBlockNumber()

    const logs = await publicClient.getContractEvents({
        address: DONATION_CONTRACT_ADDRESS as Address,
        abi: ABI_DONATION_CONTRACT,
        eventName: 'DonationReceived',
        args: {
            //user: address,
            projectId: projectId
            //to: AHA_STAKING_ADDRESS
        },
        fromBlock: DONATE_BLOCKNUMBER,
        toBlock: blockNumber
    })
    // for (let i = 0; i < logs.length; i++) {
    //     const block = await publicClient.getBlock({
    //         blockHash: logs[i].blockHash
    //     })
        
    //     logs[i].timestamp = Number(block.timestamp)
    // }

    return logs.reverse()
}