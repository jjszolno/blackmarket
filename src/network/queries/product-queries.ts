import { useQuery } from '@tanstack/react-query';

import ProductsService from 'network/services/products-services';

const useGetProducts = () => useQuery(['get'], ProductsService.getProducts);

const useGetProductById = (id: string) => {
  return useQuery(['get', id], () => ProductsService.getProductById(id));
};

export { useGetProducts, useGetProductById };
