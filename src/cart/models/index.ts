export enum CartStatuses {
  OPEN = 'OPEN',
  ORDERED = 'ORDERED',
}

export type Product = {
  id: string;
  title: string;
  description: string;
  price: number;
};

export type CartItem = {
  id?: string;
  cart_id?: string;
  product: Product;
  count: number;
};

export type Cart = {
  id: string;
  user_id?: string;
  created_at?: Date;
  updated_at?: Date;
  status?: CartStatuses;
  items: CartItem[];
};
