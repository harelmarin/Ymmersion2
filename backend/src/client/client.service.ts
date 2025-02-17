import { Injectable } from '@nestjs/common';
import { CreateClientProfileDto } from './dto/create-client.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ClientProfile } from './entities/client.entity';

@Injectable()
export class ClientService {
  constructor(private readonly prisma: PrismaService) { }

  async createClient(data: CreateClientProfileDto): Promise<ClientProfile> {
    try {
      return await this.prisma.clientProfile.create({
        data: { ...data },
      });
    } catch (error) {
      throw new Error('Error while creating client profile: ' + error.message);
    }
  }
}
