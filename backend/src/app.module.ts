import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaClient } from '@prisma/client';
import { VehicleModule } from './vehicle/vehicle.module';
import { UserModule } from './user/user.module';
import { ClientModule } from './client/client.module';
import { TransactionModule } from './transaction/transaction.module';
import { InvoiceModule } from './invoice/invoice.module';

@Module({
  imports: [PrismaClient, VehicleModule, UserModule, ClientModule, TransactionModule, InvoiceModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
