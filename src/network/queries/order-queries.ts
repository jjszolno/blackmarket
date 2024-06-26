import { useMutation, useQuery } from '@tanstack/react-query';

import { AxiosResult } from 'network/models/axios';
import { Order } from 'network/models/order-models';
import OrderService from 'network/services/order-services';

const useGetOrders = () => useQuery(['getOrders'], OrderService.getOrders);

const useAddOrder = ({ onError, onSuccess }: AxiosResult<Order>) =>
  useMutation(OrderService.addOrder, { onError, onSuccess });

export { useGetOrders, useAddOrder };
