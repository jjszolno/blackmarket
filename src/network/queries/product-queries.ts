import { useQuery } from '@tanstack/react-query';

import ProductsService from 'network/services/products-services';

const useGetProducts = (text?: string) => {
  return useQuery(['getProducts', text], () => ProductsService.getProducts(text));
};

const useGetProductById = (id: number) => {
  return useQuery(['get', id], () => ProductsService.getProductById(id));
};

export { useGetProducts, useGetProductById };
