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
    const products = await this.cartRepository.find({
      where: { user_id: userId },
      relations: ['items'],
    });

    const items = products.reduce((acc, prod) => {
      acc.push(...prod.items);

      return acc;
    }, []);

    return { id: userId, items: items };
  }

  async createByUserId(userId: string) {
    const id = v4();
    const date = new Date().toISOString();
    const userCart = this.cartRepository.create({
      id,
      user_id: userId,
      items: [],
      created_at: date,
      updated_at: date,
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

    const parsedPrice = +cartItem.price;

    if (itemIndex > -1) {
      items.splice(itemIndex, 1, {
        id: items[itemIndex].id,
        cart_id: items[itemIndex].cart_id,
        product_id: cartItem.product.id,
        count: cartItem.count,
        price: parsedPrice,
      });
    } else {
      items.push({
        id: cartItem.product.id,
        cart_id: id,
        product_id: cartItem.product.id,
        count: cartItem.count,
        price: parsedPrice,
      });
    }

    const date = new Date().toISOString();
    const updatedCart = {
      id,
      status: rest.status,
      user_id: userId,
      items: items,
      updated_at: date,
      created_at: date,
    };

    await this.cartRepository.save(updatedCart);

    return updatedCart;
  }

  removeByUserId(userId): void {
    this.userCarts[userId] = null;
  }
}
