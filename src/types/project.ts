export interface ProjectImage {
    project_id: string;
    image: string;
    sequence: number;
    user_record: string;
    dt_record: string;
    user_modified: string;
    dt_modified: string;
}

export interface Project {
    project_id: string;
    project_name: string;
    slug: string;
    project_title: string;
    project_description: string;
    project_category: string;
    project_component: string;
    project_plant: string;
    end_date: string;
    project_stage: string;
    target_donation: string;
    days_left: number;
    total_donors: number;
    total_conversion_value: string;
    images: ProjectImage[];
}
