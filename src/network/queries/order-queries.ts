import { useMutation } from '@tanstack/react-query';

import { AxiosResult } from 'network/models/axios';
import { Order } from 'network/models/order-models';
import OrderService from 'network/services/order-services';

const useAddOrder = ({ onError, onSuccess }: AxiosResult<Order>) =>
  useMutation(OrderService.addOrder, { onError, onSuccess });

export { useAddOrder };
