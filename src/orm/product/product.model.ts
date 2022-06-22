import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { OrderProducts } from '..';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  name: string;

  @Column({ type: 'varchar', length: 2000 })
  description: string;

  @Column({ type: 'float', nullable: false })
  price: number;

  @Column({ type: 'int', nullable: true, name: 'stock_quantity' })
  stockQuantity: number;

  @Column({ default: true })
  enabled: boolean;

  @OneToMany(type => OrderProducts, orderProducts => orderProducts.products)
  orderProducts: OrderProducts[];
}
