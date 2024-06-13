import { useQuery } from '@tanstack/react-query';

import ProductsService from 'network/services/products-services';

const useGetProducts = () => useQuery(['get'], ProductsService.getProducts);

export { useGetProducts };
