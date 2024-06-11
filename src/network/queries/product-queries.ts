import { useMutation } from '@tanstack/react-query';

import type { AxiosResult } from 'network/models/axios';
import { ProductsResponse } from 'network/models/product-models';
import ProductsService from 'network/services/products-services';

const useGetProducts = ({ onError, onSuccess }: AxiosResult<ProductsResponse>) =>
  useMutation(ProductsService.get, {
    onError,
    onSuccess,
  });

export { useGetProducts };
