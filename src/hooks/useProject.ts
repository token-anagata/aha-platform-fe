

import request from '@/http/request';
import { Project } from '@/types/project';
import { useQuery } from '@tanstack/react-query';

interface ProjectResponse {
    message: string;
    project: Project;
}

export interface ProjectType {
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



export const fetchProject = async (id: string): Promise<Project | null> => {
    const response: ProjectResponse = await request.get(`/api/projects/donation/${id}`);

    if (response.project) {
        return response.project as Project;
    }

    return null
};

export const useProject = (id: string) => {
    return useQuery({
        queryKey: ['project'],
        queryFn: () => fetchProject(id),
        staleTime: 2000000,
    });
};

export const usePostProject = async (params: ProjectType) => {
    const response = await request.post('/api/donation', params);

    return response
}


