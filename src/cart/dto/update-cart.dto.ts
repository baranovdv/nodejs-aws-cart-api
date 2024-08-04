import { Product } from '../models';

export type UpdateCartDto = {
  product: Product;
  count: number;
};
