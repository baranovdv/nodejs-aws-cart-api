import { CartStatuses } from 'src/cart';
import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  PrimaryColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { CartItemEntity } from './cartItem.entity';
import { UserEntity } from './user.entity';

@Entity('carts')
export class CartEntity {
  @PrimaryColumn('uuid')
  id: string;

  @ManyToOne(() => UserEntity, (user) => user.carts)
  @JoinColumn({ name: 'user_id' }) 
  user: UserEntity;

  @Column({
    type: 'enum',
    enum: CartStatuses,
  })
  status: CartStatuses;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => CartItemEntity, (cartItem) => cartItem.cart, {
    eager: true,
    cascade: true
  })
  items: CartItemEntity[];
}
