import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { CartEntity } from './cart.entity';

@Entity()
export class CartItemEntity {
  @PrimaryGeneratedColumn('uuid')
  cart_id: number;

  @Column({ type: 'uuid' })
  product_id: string;

  @Column({ type: 'int' })
  count: number;

  @Column({ type: 'int' })
  price: number;

  @ManyToOne(() => CartEntity, (cart) => cart.items, {
    eager: true,
    cascade: true,
  })
  cart: CartEntity;
}
