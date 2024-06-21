import client from '../client';
import { Order, OrderParams, OrdersResponse } from '../models/order-models';

const OrderService = {
  getOrders: async () => {
    const { data } = await client.get<OrdersResponse>('/orders');
    return data;
  },
  addOrder: async (request: OrderParams) => {
    const { data } = await client.post<Order>('/orders', request);
    return data;
  },
};

export default OrderService;
