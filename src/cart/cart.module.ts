import { Module } from '@nestjs/common';

import { OrderModule } from '../order/order.module';

import { CartController } from './cart.controller';
import { CartService } from './services';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartEntity } from 'src/db/entities/cart.entity';
import { CartItemEntity } from 'src/db/entities/cartItem.entity';


@Module({
  imports: [ TypeOrmModule.forFeature([CartEntity, CartItemEntity]), OrderModule ],
  providers: [ CartService ],
  controllers: [ CartController ]
})
export class CartModule {}
