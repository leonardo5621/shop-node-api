import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Order } from '..';
import { Product } from '../product/product.model';

@Entity()
export class Shop {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, type: 'varchar', length: 100 })
  name: string;

  @Column({ nullable: false, type: 'varchar', length: 200 })
  address: string;

  @Column({ type: 'varchar', length: 1000, nullable: true, name: 'map_link' })
  mapLink: string;

  @ManyToMany(type => Product)
  @JoinTable()
  products: Product[];

  @OneToMany(type => Order, order => order.shop)
  orders: Order[];
}
