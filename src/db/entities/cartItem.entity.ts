import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { CartEntity } from './cart.entity';
import { ProductEntity } from './product.entity';

@Entity('cart_items')
export class CartItemEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => CartEntity, (cart) => cart.items)
  @JoinColumn({ name: 'cart_id' })
  cart: CartEntity;

  @ManyToOne(() => ProductEntity, (product) => product.cartItems)
  @JoinColumn({ name: 'product_id' })
  product: ProductEntity;

  @Column('int')
  count: number;
}
