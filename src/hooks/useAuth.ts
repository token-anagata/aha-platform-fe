import request from '@/http/request';
import { useQuery } from '@tanstack/react-query';

interface ResponseAuth {
    valid: boolean;
}

const fetchAuthData = async (): Promise<ResponseAuth> => {
    const response = await request.post('/api/login/verifyToken', {});
    
    return response as ResponseAuth;
};

export const useFetchAuth = () => {
    return useQuery({
        queryKey: ['auth'], 
        queryFn: () => fetchAuthData(),
        staleTime: 2000000,
    });
};


