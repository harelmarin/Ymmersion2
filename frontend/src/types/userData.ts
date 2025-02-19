export type UserData = {
    id: string;
    name: string;
    address?: string | null;
    phoneNumber?: string | null;
    profile_pic?: string | null;
    phone?: string;
    email?: string | null;
    role: Role;
    createdAt: Date;
  };
  
  export enum Role {
    employee,
    admin
  }