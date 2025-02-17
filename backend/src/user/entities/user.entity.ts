import { Role } from '@prisma/client';

export class User {
  id: number;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  password?: string;
  role: Role;
  active: boolean;
  deleted: boolean;
  createdAt: Date;
}
