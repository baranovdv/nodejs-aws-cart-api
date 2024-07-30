import { Injectable } from '@nestjs/common';

import { v4 } from 'uuid';

import { Cart, CartItem, CartItemReq, CartStatuses } from '../models';
import { InjectRepository } from '@nestjs/typeorm';
import { CartEntity } from 'src/db/entities/cart.entity';
import { Repository } from 'typeorm';
import { CartItemEntity } from 'src/db/entities/cartItem.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartEntity)
    private cartRepository: Repository<CartEntity>,
    @InjectRepository(CartItemEntity)
    private cartItemRepository: Repository<CartItemEntity>,
  ) {}

  private userCarts: Record<string, Cart> = {};

  async findByUserId(userId: string): Promise<Cart> {
    const cart = await this.cartRepository.findOneBy({
      user_id: userId,
    });

    return { id: cart.id, items: cart.items };
  }

  async createByUserId(userId: string) {
    const id = v4();
    const date = new Date().toISOString();
    const userCart = this.cartRepository.create({
      id,
      user_id: userId,
      items: [],
      createdAt: date,
      updatedAt: date,
      status: CartStatuses.OPEN,
    });

    await this.cartRepository.save(userCart);

    return { id: userCart.id, items: userCart.items };
  }

  async findOrCreateByUserId(userId: string): Promise<Cart> {
    const userCart = await this.findByUserId(userId);

    if (userCart) {
      return userCart;
    }

    return this.createByUserId(userId);
  }

  async updateByUserId(userId: string, cartItem: CartItemReq): Promise<Cart> {
    const { id, ...rest } = await this.findOrCreateByUserId(userId);

    const items = rest.items;

    const itemIndex = items.findIndex(
      (item) => item.product_id === cartItem.product.id,
    );

    if (itemIndex > -1) {
      items.splice(itemIndex, 1, {
        product_id: cartItem.product.id,
        count: cartItem.count,
        price: cartItem.product.price,
      });
    } else {
      items.push({
        product_id: cartItem.product.id,
        count: cartItem.count,
        price: cartItem.price
      });
    }

    const date = new Date().toISOString();
    const updatedCart = { id, ...rest, items: items, updated_at: date };

    await this.cartRepository.save(updatedCart);

    return updatedCart;
  }

  removeByUserId(userId): void {
    this.userCarts[userId] = null;
  }
}
