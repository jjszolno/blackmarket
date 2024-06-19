import { useQuery } from '@tanstack/react-query';

import ProductsService from 'network/services/products-services';

const useGetProducts = () => useQuery(['getProducts'], ProductsService.getProducts);

const useGetProductById = (id: number) => {
  return useQuery(['get', id], () => ProductsService.getProductById(id));
};

export { useGetProducts, useGetProductById };
