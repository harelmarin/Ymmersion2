import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ClientService } from './client.service';
import { CreateClientProfileDto } from './dto/create-client.dto';
import { UpdateClientProfileDto } from './dto/update-client.dto';

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) { }

  @Post()
  async createClient(@Body() createClientDto: CreateClientProfileDto) {
    return this.clientService.createClient(createClientDto)
  }


}
