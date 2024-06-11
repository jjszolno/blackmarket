import client from '../client';
import { ProductsResponse } from '../models/product-models';

const ProductsService = {
  get: async () => {
    const { data } = await client.get<ProductsResponse>('/products');
    console.log(data);
    return data;
  },
};

export default ProductsService;
