import request from '@/http/request';

export interface InvestType {
    investment_id: string;
    investment_date: string;
    project_id: string;
    wallet_id: string;
    investment_currency: string;
    investment_value: number;
    status: number;
}

export const usePostInvest = async (params: InvestType) => {
    const response = await request.post('/api/investment', params);

    return response
}