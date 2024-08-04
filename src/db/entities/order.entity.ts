import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { CartEntity } from './cart.entity';
import { CartStatuses } from 'src/cart';

@Entity('orders')
export class OrderEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => UserEntity, (user) => user.orders)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @OneToOne(() => CartEntity)
  @JoinColumn()
  cart: CartEntity;

  @Column('json')
  payment: string;

  @Column('json')
  delivery: string;

  @Column('varchar', { length: 255 })
  comments: string;

  @Column({
    type: 'enum',
    enum: CartStatuses,
  })
  status: CartStatuses;

  @Column('numeric', { precision: 5, scale: 2 })
  total: number;
}
