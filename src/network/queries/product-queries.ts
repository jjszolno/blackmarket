import { useQuery } from '@tanstack/react-query';

import ProductsService from 'network/services/products-services';

const useGetProducts = () =>
  useQuery({
    queryKey: ['get-products'],
    queryFn: ProductsService.get,
  });

export { useGetProducts };
