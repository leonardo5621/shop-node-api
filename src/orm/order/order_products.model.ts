import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Order, Product } from '..';

@Entity({ name: 'order_products_product' })
export class OrderProducts {
  @PrimaryGeneratedColumn()
  id: number;

  @DeleteDateColumn()
  deleted_at: Date;

  @Column({ type: 'integer', nullable: false })
  quantity: number;

  @Column({ nullable: false, name: 'order_id' })
  orderId: number;

  @ManyToOne(() => Order, order => order.orderProducts)
  @JoinColumn({ name: 'order_id' })
  order: Order;

  @Column({ name: 'product_id', nullable: false })
  productId: number;

  @ManyToOne(type => Product, product => product.orderProducts)
  @JoinColumn({ name: 'product_id' })
  products: Product[];
}
