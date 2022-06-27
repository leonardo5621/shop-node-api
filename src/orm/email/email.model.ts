import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Email {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  @Column({
    name: 'send_to',
    length: 100,
    type: 'varchar',
  })
  sendTo: string;

  @Column({
    name: 'body_text',
    length: 2000,
    type: 'varchar',
    nullable: true,
  })
  bodyText: string

  @Column({
    name: 'sent_from',
    length: 100,
    type: 'varchar',
  })
  sentFrom: string;
}