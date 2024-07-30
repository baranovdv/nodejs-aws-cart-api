import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { CartEntity } from './cart.entity';

@Entity('cart_items')
export class CartItemEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => CartEntity, cart => cart.items)
  @JoinColumn({ name: 'cart_id' })
  cart: CartEntity;

  @Column('uuid')
  product_id: string;

  @Column('int')
  price: number;

  @Column('int')
  count: number;
}
