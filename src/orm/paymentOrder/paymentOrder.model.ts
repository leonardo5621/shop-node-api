import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  DeleteDateColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { Order } from '..';

export enum PaymentStatus {
  CONFIRMED = 'confirmed',
  AWAITING_CONFIRMATION = 'awaiting_confirmation',
  FAILED = 'failed',
}

@Entity({ name: 'payment_order' })
export class PaymentOrder {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  @Column({ nullable: false, name: 'order_id' })
  orderId: number;

  @OneToOne(type => Order, order => order.paymentOrder)
  @JoinColumn({ name: 'order_id' })
  order: Order;

  @Column({
    name: 'payment_status',
    type: 'enum',
    enum: PaymentStatus,
    default: PaymentStatus.AWAITING_CONFIRMATION,
  })
  paymentStatus: PaymentStatus;
}