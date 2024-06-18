import { useMutation, useQuery } from '@tanstack/react-query';

import { AxiosResult } from 'network/models/axios';
import { LineItem } from 'network/models/product-models';
import CartService from 'network/services/cart-services';

const useGetCart = () => useQuery(['getCart'], CartService.getCart);
const useAddProductToCart = ({ onError, onSuccess }: AxiosResult<LineItem>) =>
  useMutation(CartService.addProductToCart, { onError, onSuccess });

const useRemoveProductFromCart = ({ onError, onSuccess }: AxiosResult<void>) =>
  useMutation(CartService.removeProductFromCart, { onError, onSuccess });

const useUpdateProductQuantity = ({ onError, onSuccess }: AxiosResult<LineItem>) =>
  useMutation(CartService.updateProductQuantity, { onError, onSuccess });

export { useGetCart, useAddProductToCart, useRemoveProductFromCart, useUpdateProductQuantity };
