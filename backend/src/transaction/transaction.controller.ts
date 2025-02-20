import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Put,
} from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Get()
  async getAllTransaction() {
    return await this.transactionService.GetAllTransaction();
  }

  @Get(':id')
  async getTransactionById(@Param('id', ParseIntPipe) id: number) {
    return await this.transactionService.getTransactionById(id);
  }

  @Get('user/:userId')
  async getAllTransactionFromUser(
    @Param('userId', ParseIntPipe) userId: number,
  ) {
    return await this.transactionService.getAllTransactionFromUser(userId);
  }

  @Post()
  async createTransaction(@Body() data: CreateTransactionDto) {
    return await this.transactionService.CreateTransaction(data);
  }

  @Delete(':id')
  async deleteTransaction(@Param('id', ParseIntPipe) id: number) {
    return await this.deleteTransaction(id);
  }

  @Patch(':id')
  async updateTransaction(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateTransactionDto,
  ) {
    return await this.updateTransaction(id, data);
  }

  @Get(':id/details')
  async getTransactionDetails(@Param('id', ParseIntPipe) id: number) {
    return await this.transactionService.getTransactionDetails(id);
  }
}
