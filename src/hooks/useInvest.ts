import request from '@/http/request';

export interface InvestType {
    donation_id: string;
    donation_date: string;
    project_id: string;
    wallet_id: string;
    donation_currency: string;
    donation_value: number;
    conversion_currency: string;
    conversion_value: number;
    status: number;
}

export const usePostInvest = async (params: InvestType) => {
    const response = await request.post('/api/donation', params);

    return response
}