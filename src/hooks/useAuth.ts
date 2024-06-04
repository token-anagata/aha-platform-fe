import request from '@/http/request';
import { useQuery } from '@tanstack/react-query';

const fetchAuthData = async (): Promise<any> => {
    const response = await request.post('/api/login/verifyToken', {});
    
    return response;
};

export const useFetchAuth = () => {
    return useQuery({
        queryKey: ['auth'], 
        queryFn: () => fetchAuthData()
    });
};


