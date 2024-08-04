import { Module } from '@nestjs/common';

import { AppController } from './app.controller';

import { CartModule } from './cart/cart.module';
import { AuthModule } from './auth/auth.module';
import { OrderModule } from './order/order.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartEntity } from './db/entities/cart.entity';
import { CartItemEntity } from './db/entities/cartItem.entity';
import { DataSourceOptions } from 'typeorm';
import { UserEntity } from './db/entities/user.entity';
import { ProductEntity } from './db/entities/product.entity';
import { OrderEntity } from './db/entities/order.entity';

const ormConfig: DataSourceOptions = {
  type: 'postgres',
  host: 'database-cart.crym86aeeuit.ap-southeast-2.rds.amazonaws.com',
  port: 5432,
  username: 'postgres',
  password: '784939oi!',
  database: 'postgres',
  entities: [UserEntity, CartEntity, CartItemEntity, ProductEntity, OrderEntity],
  // synchronize: true,
  ssl: {
    rejectUnauthorized: false,
  },
};

@Module({
  imports: [
    TypeOrmModule.forRoot(ormConfig),
    // TypeOrmModule.forFeature([UserEntity, CartEntity, CartItemEntity, ProductEntity, OrderEntity]),
    AuthModule,
    CartModule,
    OrderModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {
  // constructor(private dataSource: DataSource)
}
