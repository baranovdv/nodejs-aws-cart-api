import { Injectable } from '@nestjs/common';

import { v4 } from 'uuid';

import { Cart, CartItem } from '../models';

@Injectable()
export class CartService {
  private userCarts: Record<string, Cart> = {};

  findByUserId(userId: string): Cart {
    return this.userCarts[ userId ];
  }

  createByUserId(userId: string) {
    const id = v4();
    const userCart = {
      id,
      items: [],
    };

    this.userCarts[ userId ] = userCart;

    return userCart;
  }

  findOrCreateByUserId(userId: string): Cart {
    const userCart = this.findByUserId(userId);

    if (userCart) {
      return userCart;
    }

    return this.createByUserId(userId);
  }

  updateByUserId(userId: string, cartItem: CartItem): Cart {
    const { id, ...rest } = this.findOrCreateByUserId(userId);

    const items = rest.items || [];
    const idOfDuplicate = items.findIndex(item => item.product.id === cartItem.product.id)

    if (idOfDuplicate >= 0) {
      if (cartItem.count === 0) {
        items.splice(idOfDuplicate, 1)
      } else {
        items[idOfDuplicate] = cartItem;
      }
    } else {
      items.push(cartItem)
    }



    const updatedCart = {
      id,
      ...rest,
      items: items,
    }

    this.userCarts[ userId ] = { ...updatedCart };

    return { ...updatedCart };
  }

  removeByUserId(userId): void {
    this.userCarts[ userId ] = null;
  }

}
