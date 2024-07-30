import request from '@/http/request';
import { useQuery } from '@tanstack/react-query';

export interface DonationType {
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

interface DonationResponse {
    message: string;
    data: DonationType[];
}

export const usePostDonation = async (params: DonationType) => {
    const response = await request.post('/api/donation', params);

    return response
}

export const fetchListDonation = async (id: string): Promise<DonationType[] | null> => {
    const response: DonationResponse = await request.get(`/api/donation/${id}`);

    if (response.data) {
        return response.data as DonationType[];
    }

    return null
};

export const useListDonation = (id: string) => {
    return useQuery({
        queryKey: ['donation'],
        queryFn: () => fetchListDonation(id),
        staleTime: 2000000,
    });
};
