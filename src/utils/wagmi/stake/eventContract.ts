import { Address } from "viem";
import { publicClient } from "@/configurations/viem";
import { STAKE_CONTRACT_ADDRESS } from "@/configurations/contract";
import { ABI_STAKE_CONTRACT } from "@/abi/stake";
import { FROM_BLOCKNUMBER } from "@/configurations/chains";

export async function getListStakeByAddress(address: Address) {
    const blockNumber = await publicClient.getBlockNumber()

    const logs = await publicClient.getContractEvents({
        address: STAKE_CONTRACT_ADDRESS as Address,
        abi: ABI_STAKE_CONTRACT,
        eventName: 'Staked',
        args: {
            user: address,
            //to: AHA_STAKING_ADDRESS
        },
        fromBlock: FROM_BLOCKNUMBER,
        toBlock: blockNumber
    })
    // for (let i = 0; i < logs.length; i++) {
    //     const block = await publicClient.getBlock({
    //         blockHash: logs[i].blockHash
    //     })
        
    //     logs[i].timestamp = Number(block.timestamp)
    // }

    return logs
}