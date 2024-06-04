import { BSC_API_KEY, BSC_API_URL } from "@/configurations/common";
import { AHA_CONTRACT_ADDRESS } from "@/configurations/contract";
import request from "@/http/request";
import { TokenHolderList } from "@/types/token";
import { AxiosResponse } from "axios";

const apiUrl = `${BSC_API_URL}/api?module=token&action=tokenholderlist&contractaddress=${AHA_CONTRACT_ADDRESS}&page=1&offset=1000&sort=asc&apikey=${BSC_API_KEY}`;

export async function getTokenHolders(): Promise<number> {
    try {
        const response : AxiosResponse = await request.get(apiUrl);
        const transactions: TokenHolderList[] = response?.data.result;

        return transactions.length
    } catch (error) {
        console.error('Error fetching token holders:', (error as Error).message);
        return 0
    }
}

