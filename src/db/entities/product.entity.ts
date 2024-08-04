import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { CartItemEntity } from './cartItem.entity';

@Entity('products')
export class ProductEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column('varchar', { length: 255 })
  title: string;

  @Column('varchar', { length: 255 })
  description: string;

  @Column('numeric', { precision: 5, scale: 2 })
  price: number;

  @OneToMany(() => CartItemEntity, (cartItem) => cartItem.product)
  cartItems: CartItemEntity[];
}
