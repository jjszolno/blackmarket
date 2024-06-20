import client from '../client';
import { Order, OrderParams } from '../models/order-models';

const OrderService = {
  addOrder: async (request: OrderParams) => {
    const { data } = await client.post<Order>('/orders', request);
    return data;
  },
};

export default OrderService;
