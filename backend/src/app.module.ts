import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaClient } from '@prisma/client';
import { VehicleModule } from './vehicle/vehicle.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [PrismaClient, VehicleModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
