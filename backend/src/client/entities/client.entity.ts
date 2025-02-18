import { Gender } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class ClientProfile {
  @ApiProperty({
    description: 'ID unique du client',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'Prénom du client',
    example: 'Jean',
  })
  firstName: string;

  @ApiProperty({
    description: 'Nom du client',
    example: 'Dupont',
  })
  lastName: string;

  @ApiProperty({
    description: 'Email du client',
    example: 'jean.dupont@email.com',
  })
  email: string;

  @ApiProperty({
    description: 'Numéro de téléphone',
    example: '0612345678',
    required: false,
  })
  phoneNumber?: string;

  @ApiProperty({
    description: 'Adresse du client',
    example: '123 rue de la Paix, 75000 Paris',
  })
  address: string;

  @ApiProperty({
    description: 'Date de création du profil',
    example: '2024-03-20T10:00:00Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Date de mise à jour du profil',
    example: '2024-03-20T10:00:00Z',
  })
  updatedAt: Date;

  @ApiProperty({
    description: 'Date de naissance du client',
    example: '1990-01-01',
  })
  dateOfBirth?: Date;

  @ApiProperty({
    description: 'Genre du client',
    example: 'Male',
  })
  gender?: Gender;
}
