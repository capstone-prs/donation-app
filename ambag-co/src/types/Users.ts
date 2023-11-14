export interface User {
  user_name: string;
  user_age: number;
  user_gender: Gender;
  user_id: string;
}

export interface Project {
  project_description:string;
  project_goal:number;
  project_image:string;
  project_name:string;
  project_org:string;
}

export type Gender = 'Male' | 'Famale';
export type NewUser = Omit<User, 'user_id'>;
export type NewProject = Omit<Project, 'program_id'>;



