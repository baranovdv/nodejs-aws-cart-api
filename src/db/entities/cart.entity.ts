import { CartStatuses } from 'src/cart';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { CartItemEntity } from './cartItem.entity';

@Entity()
export class CartEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  user_id: string;

  @Column({
    type: 'enum',
    enum: CartStatuses,
  })
  status: CartStatuses;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => CartItemEntity, (cartItem) => cartItem.cart, {
    eager: true,
    cascade: true
  })
  items: CartItemEntity[];
}
