import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
} from '@nestjs/common';
import { ClientService } from './client.service';
import { CreateClientProfileDto } from './dto/create-client.dto';
import { UpdateClientProfileDto } from './dto/update-client.dto';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { ClientProfile } from './entities/client.entity';

@ApiTags('Clients')
@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post()
  @ApiOperation({ summary: 'Créer un nouveau client' })
  @ApiBody({ type: CreateClientProfileDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Le client a été créé avec succès.',
    type: ClientProfile,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Données invalides.',
  })
  async create(@Body() createClientDto: CreateClientProfileDto) {
    return await this.clientService.createClient(createClientDto);
  }

  @Get('count')
  @ApiOperation({ summary: 'Obtenir le nombre total de clients' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Nombre total de clients récupéré avec succès.',
    type: Number,
  })
  async getCount() {
    return await this.clientService.getClientCount();
  }

  @Get('last-added')
  @ApiOperation({ summary: 'Obtenir les 3 derniers clients ajoutés' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Dernier client ajouté récupéré avec succès.',
    type: ClientProfile,
  })
  async getLastAdded() {
    return await this.clientService.getLastAddedClient();
  }

  @Get()
  @ApiOperation({ summary: 'Récupérer tous les clients' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Liste de tous les clients récupérée avec succès.',
    type: [ClientProfile],
  })
  async findAll() {
    return await this.clientService.getAllClients();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer un client par son ID' })
  @ApiParam({
    name: 'id',
    description: "L'ID du client",
    type: 'string',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Client trouvé avec succès.',
    type: ClientProfile,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Client non trouvé.',
  })
  async findOne(@Param('id') id: string) {
    return await this.clientService.getClientById(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Mettre à jour un client' })
  @ApiParam({
    name: 'id',
    description: "L'ID du client à mettre à jour",
    type: 'string',
  })
  @ApiBody({ type: UpdateClientProfileDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Client mis à jour avec succès.',
    type: ClientProfile,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Client non trouvé.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Données invalides.',
  })
  async update(
    @Param('id') id: string,
    @Body() updateClientDto: UpdateClientProfileDto,
  ) {
    return await this.clientService.updateClient(id, updateClientDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer un client' })
  @ApiParam({
    name: 'id',
    description: "L'ID du client à supprimer",
    type: 'string',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Client supprimé avec succès.',
    type: ClientProfile,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Client non trouvé.',
  })
  async remove(@Param('id') id: string) {
    return await this.clientService.deleteClient(id);
  }
}
