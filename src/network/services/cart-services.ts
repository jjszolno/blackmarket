import client from '../client';
import { LineItem, LineItemParams, ShoppingCart } from '../models/product-models';

const CartService = {
  getCart: async () => {
    const { data: cart } = await client.get<ShoppingCart>('/shopping_cart');
    return cart;
  },
  addProductToCart: async (request: LineItemParams) => {
    const { data } = await client.post<LineItem>('/shopping_cart/line_items', request);
    return data;
  },

  removeProductFromCart: async (id: number) => {
    const { data } = await client.delete<void>(`/shopping_cart/line_items/${id}`);
    return data;
  },

  updateProductQuantity: async ({ id, quantity }: { id: number; quantity: number }) => {
    const request = { line_item: { quantity } };
    const { data } = await client.patch<LineItem>(`/shopping_cart/line_items/${id}`, request);
    return data;
  },
};

export default CartService;
