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
  product_id: string;
  count: number;
  price: number;
};

export type CartItemReq = {
  product: Product;
  count: number;
  price: number;
};

export type Cart = {
  id: string;
  user_id?: string;
  created_at?: string;
  updated_at?: string;
  status?: CartStatuses;
  items: CartItem[];
};

// const test_cart: Cart = {
//   "id": "a0be6e86-841f-4c45-a47d-53af3a766f27",
//   "user_id": "c6154b4a-ca44-489b-9eb2-71529b25aa30",
//   "status": "OPEN",
//   "items":
//   [
//     {
//       "product": {
//       "id": "f31f4b88-ed57-4452-b6b4-889d83bb85c1",
//       "title": "product title",
//       "description": "product description",
//       "price": 444,
//     },
//       "count": 3
//     },
//   ],
// }
