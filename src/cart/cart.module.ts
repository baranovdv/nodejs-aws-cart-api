import { Module } from '@nestjs/common';

import { OrderModule } from '../order/order.module';

import { CartController } from './cart.controller';
import { CartService } from './services';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartEntity } from 'src/db/entities/cart.entity';
import { CartItemEntity } from 'src/db/entities/cartItem.entity';
import { OrderEntity } from 'src/db/entities/order.entity';
import { UserEntity } from 'src/db/entities/user.entity';
import { ProductEntity } from 'src/db/entities/product.entity';


@Module({
  imports: [ TypeOrmModule.forFeature([UserEntity, CartEntity, CartItemEntity, ProductEntity, OrderEntity]), OrderModule ],
  providers: [ CartService ],
  controllers: [ CartController ]
})
export class CartModule {}
