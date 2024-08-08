import request from '@/http/request';
import { useQuery } from '@tanstack/react-query';
import { Address } from 'viem';

export interface InvestType {
    conversion_currency?: string | null;
    conversion_value?: string | null;
    dt_modified?: string;
    dt_record?: string;
    investment_currency: string;
    investment_date: string;
    investment_id: string;
    investment_value: string | number;
    member_id?: string;
    project_id: string;
    status: number;
    user_modified?: string | null;
    user_record?: string | null;
    wallet_id: string;
}

interface InvestResponse {
    message: string;
    data: InvestType[];
}

export const usePostInvest = async (params: InvestType) => {
    const response = await request.post('/api/investment', params);

    return response
}

export const fetchListInvest = async (id: string, address: Address): Promise<InvestType[] | null> => {
    const response: InvestResponse = await request.get(`/api/investment/${id}/${address}`);

    if (response.data) {
        const reverse: InvestType[] = response.data.reverse()

        return reverse;
    }

    return null
};

export const useListInvest = (id: string, address: Address) => {
    return useQuery({
        queryKey: ['donation'],
        queryFn: () => fetchListInvest(id, address),
        staleTime: 2000000,
    });
};
