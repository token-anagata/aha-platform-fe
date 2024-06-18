

import request from '@/http/request';
import { Project } from '@/types/project';
import { useQuery } from '@tanstack/react-query';

interface ProjectResponse {
    message: string;
    project: Project;
  }
  

export const fetchProject = async (id : string): Promise<Project | null> => {
    const response : ProjectResponse = await request.get(`/api/projects/donation/${id}`);
    
    if(response.project){
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


