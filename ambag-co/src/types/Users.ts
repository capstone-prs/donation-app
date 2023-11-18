export interface User {
  user_name: string;
  user_age: number;
  user_gender: Gender;
  user_id: string;
}

export interface Project {
  title: string;
  description: string;
  goal: number;
  deadline: number;
  image: string;
}

export interface Donor {
  address: string;
  donation: number;
}

export type Gender = 'Male' | 'Famale';
export type NewUser = Omit<User, 'user_id'>;
export type NewProject = Omit<Project, 'program_id'>;
