import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';
import { Condition } from '../enum/condition.enum';

@Entity()
export class Vehicle {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  brand: string;

  @Column()
  model: string;

  @Column()
  year: number;

  @Column()
  mileage: number;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'enum', enum: Condition })
  condition: Condition;

  @Column({ default: true })
  available: boolean;

  @CreateDateColumn()
  addedAt: Date;

  @Column('decimal', { precision: 10, scale: 2 })
  purchasePrice: number;

  // @OneToMany(() => Transaction, (transaction) => transaction.vehicle)
  // transactions: Transaction[];
}
