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
    target_donation: string;
    project_name: string;
    slug: string;
    project_title: string;
    project_description: string;
    project_area: string;
    project_size: string;
    project_category: string;
    project_type: string;
    end_date: string;
    project_stage: string;
    project_priority: string;
    project_component: string;
    project_plant: string;
    project_fulfilment_percentage: string;
    target_investment: string;
    apy_investor: string;
    investor_aha_token: string;
    investor_reward_usdt: string;
    days_left: number;
    percentage_fulfilled: string;
    total_donors: number;
    total_conversion_value: number | string;
    images: ProjectImage[];
}