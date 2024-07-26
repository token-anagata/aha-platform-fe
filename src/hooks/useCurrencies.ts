

import request from '@/http/request';
import { useQuery } from '@tanstack/react-query';

interface UsdValue {
    usd: number;
}

export interface ResponseCurrencies {
    [key: string]: UsdValue;
}

const currencies = 'binancecoin,ethereum,tether,solana,ripple'
const currenciesUrl = `https://api.coingecko.com/api/v3/simple/price?ids=${currencies}&vs_currencies=usd`

export const fetchCurrencies = async (): Promise<ResponseCurrencies> => {
    const response = await request.get(currenciesUrl);
    
    return response as ResponseCurrencies;
};

export const useCurrencies = () => {
    return useQuery({
        queryKey: ['currencies'],
        queryFn: () => fetchCurrencies(),
        staleTime: 2000000,
    });
};


