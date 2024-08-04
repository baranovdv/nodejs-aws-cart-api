import { Injectable } from '@nestjs/common';

import { v4 } from 'uuid';

import { Cart, CartStatuses } from '../models';
import { InjectRepository } from '@nestjs/typeorm';
import { CartEntity } from 'src/db/entities/cart.entity';
import { Repository } from 'typeorm';
import { CartItemEntity } from 'src/db/entities/cartItem.entity';
import { UpdateCartDto } from '../dto/update-cart.dto';
import { ProductEntity } from 'src/db/entities/product.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartEntity)
    private cartRepository: Repository<CartEntity>,
    @InjectRepository(CartItemEntity)
    private cartItemRepository: Repository<CartItemEntity>,
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,
  ) {}

  private userCarts: Record<string, Cart> = {};

  async findByUserId(userId: string): Promise<Cart> {
    const cart = await this.cartRepository.find({
      where: { user: { id: userId } },
      relations: {
        items: {
          product: true,
        },
      },
    });

    const items = cart.reduce((acc, prod) => {
      acc.push(...prod.items);

      return acc;
    }, []);

    return { id: cart[0].id, items: items };
  }

  async createByUserId(userId: string) {
    const id = v4();
    const userCart = this.cartRepository.create({
      id,
      user: { id: userId },
      items: [],
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

  async updateByUserId(userId: string, cartItem: UpdateCartDto): Promise<Cart> {
    const cart = await this.findOrCreateByUserId(userId);

    const cartItemDB = await this.cartItemRepository.findOneBy({
      product: {
        id: cartItem.product.id,
      },
    });

    if (!cartItemDB) {
      const productDB = await this.productRepository.findOneBy({
        id: cartItem.product.id,
      });

      if (!productDB) {
        await this.productRepository.insert(cartItem.product);
      }

      const id = v4();

      await this.cartItemRepository.insert({
        id: id,
        cart: cart,
        product: cartItem.product,
        count: cartItem.count,
      });
    }

    if (cartItemDB) {
      if (cartItem.count === 0) {
        await this.cartItemRepository.delete({ id: cartItemDB.id });
      } else {
        await this.cartItemRepository.update(
          { id: cartItemDB.id },
          { count: cartItem.count },
        );
      }
    }

    const updatedCart = await this.cartRepository.findOne({
      where: { user: { id: userId } },
      relations: {
        items: {
          product: true,
        },
      },
    });

    return updatedCart;
  }

  removeByUserId(userId): void {
    this.userCarts[userId] = null;
  }
}
