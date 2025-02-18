export type ClientData = {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth?: Date | null;
  gender?: Gender | null;
  address?: string | null;
  phoneNumber?: string | null;
  email?: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export enum Gender {
  male = 'male',
  female = 'female',
  other = 'other',
}
