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
} from 'typeorm';
import { Shop, OrderProducts } from '..';

// eslint-disable-next-line no-shadow
export enum OrderStatus {
  OPEN = 'open',
  AWAITING_DELIVERY = 'awaiting_delivery',
  DELIVERED = 'delivered',
  CANCELED = 'canceled',
}

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  @Column({ name: 'order_code', nullable: true, length: 100 })
  orderCode: string;

  @Column({
    name: 'order_status',
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.OPEN,
  })
  orderStatus: OrderStatus;

  @Column({ nullable: false, type: 'float' })
  price: number;

  @Column({
    type: 'varchar',
    nullable: true,
    length: 100,
    name: 'phone_number',
  })
  phoneNumber: string;

  @Column({
    nullable: true,
    type: 'varchar',
    length: 100,
    name: 'client_name',
  })
  clientName: string;

  @Column({
    nullable: true,
    type: 'varchar',
    length: 100,
    name: 'client_email',
  })
  clientEmail: string;

  @Column({ nullable: false, name: 'shop_id' })
  shopId: number;

  @ManyToOne(type => Shop, shop => shop.orders)
  @JoinColumn({ name: 'shop_id' })
  shop: Shop;

  @OneToMany(type => OrderProducts, orderProducts => orderProducts.order)
  orderProducts: OrderProducts[];
}
