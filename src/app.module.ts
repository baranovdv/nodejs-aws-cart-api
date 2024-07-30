import { Module } from '@nestjs/common';

import { AppController } from './app.controller';

import { CartModule } from './cart/cart.module';
import { AuthModule } from './auth/auth.module';
import { OrderModule } from './order/order.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartEntity } from './db/entities/cart.entity';
import { CartItemEntity } from './db/entities/cartItem.entity';
import { DataSourceOptions } from 'typeorm';

const ormConfig: DataSourceOptions = {
  type: 'postgres',
  host: 'database-cart.crym86aeeuit.ap-southeast-2.rds.amazonaws.com',
  port: 5432,
  username: 'postgres',
  password: '385920er!',
  database: 'postgres',
  entities: [CartEntity, CartItemEntity],
  synchronize: true,
};

@Module({
  imports: [
    TypeOrmModule.forRoot(ormConfig),
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
