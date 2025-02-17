import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaClient } from '@prisma/client';
import { VehicleModule } from './vehicle/vehicle.module';

@Module({
  imports: [PrismaClient, VehicleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
