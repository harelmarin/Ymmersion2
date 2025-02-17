import { Gender } from '@prisma/client';

export class ClientProfile {
  id: number;
  firstName: string;
  lastName: string;
  dateOfBirth?: Date;
  gender?: Gender;
  address?: string;
  phoneNumber?: string;
  email?: string;
  createdAt: Date;
  updatedAt: Date;
}
