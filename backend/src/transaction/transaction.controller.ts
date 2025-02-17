import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { Logger } from '@nestjs/common';

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) { }


  @Get()
  async getAllTransaction() {
    return await this.transactionService.GetAllTransaction();
  }

  @Get(':id')
  async getTransactionById(@Param('id', ParseIntPipe) id: number) {
    return await this.transactionService.getTransactionById(id)
  }

  @Post()
  async createTransaction(@Body() data: CreateTransactionDto) {
    Logger.log('Received data:', data);
    return await this.transactionService.CreateTransaction(data);
  }
}
