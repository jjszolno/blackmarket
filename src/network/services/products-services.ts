import client from '../client';
import { ProductsResponse } from '../models/product-models';

const ProductsService = {
  get: async () => {
    const { data } = await client.get<ProductsResponse>('/products');
    return data;
  },
};

export default ProductsService;
