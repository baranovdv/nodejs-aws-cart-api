import { Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { CartEntity } from './cart.entity';
import { OrderEntity } from './order.entity';

@Entity('users')
export class UserEntity {
  @PrimaryColumn('uuid')
  id: string;

  @OneToMany(() => CartEntity, (carts) => carts.user, {
    cascade: true,
  })
  carts: CartEntity;

  @OneToMany(() => OrderEntity, (order) => order.user, {
    eager: true,
    cascade: true,
  })
  orders: OrderEntity[];
}
