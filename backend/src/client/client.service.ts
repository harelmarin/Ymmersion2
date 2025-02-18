import { Injectable } from '@nestjs/common';
import { CreateClientProfileDto } from './dto/create-client.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ClientProfile } from './entities/client.entity';
import { UpdateClientProfileDto } from './dto/update-client.dto';

@Injectable()
export class ClientService {
  constructor(private readonly prisma: PrismaService) {}

  async createClient(data: CreateClientProfileDto): Promise<ClientProfile> {
    try {
      const {
        firstName,
        lastName,
        email,
        phoneNumber,
        address,
        dateOfBirth,
        gender,
      } = data;

      return await this.prisma.clientProfile.create({
        data: {
          firstName,
          lastName,
          email,
          phoneNumber,
          address,
          dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
          gender,
        },
      });
    } catch (error) {
      throw new Error('Error while creating client profile: ' + error.message);
    }
  }

  async updateClient(
    id: string,
    data: UpdateClientProfileDto,
  ): Promise<ClientProfile> {
    try {
      return await this.prisma.clientProfile.update({
        where: { id: parseInt(id) },
        data: { ...data },
      });
    } catch (error) {
      throw new Error('Error while updating client profile: ' + error.message);
    }
  }

  async deleteClient(id: string): Promise<ClientProfile> {
    try {
      return await this.prisma.clientProfile.delete({
        where: { id: parseInt(id) },
      });
    } catch (error) {
      throw new Error('Error while deleting client profile: ' + error.message);
    }
  }

  async getAllClients(): Promise<ClientProfile[]> {
    try {
      return await this.prisma.clientProfile.findMany();
    } catch (error) {
      throw new Error('Error while getting all clients: ' + error.message);
    }
  }

  async getClientById(id: string): Promise<ClientProfile> {
    try {
      return await this.prisma.clientProfile.findUnique({
        where: { id: parseInt(id) },
      });
    } catch (error) {
      throw new Error('Error while getting client by id: ' + error.message);
    }
  }

  async getClientCount(): Promise<number> {
    try {
      return await this.prisma.clientProfile.count();
    } catch (error) {
      throw new Error('Error while getting client count: ' + error.message);
    }
  }

  async getLastAddedClient(): Promise<ClientProfile> {
    try {
      return await this.prisma.clientProfile.findFirst({
        orderBy: { createdAt: 'desc' },
      });
    } catch (error) {
      throw new Error(
        'Error while getting last added client: ' + error.message,
      );
    }
  }
}
