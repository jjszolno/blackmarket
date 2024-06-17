import client from '../client';
import { Product, ProductsResponse } from '../models/product-models';

const ProductsService = {
  getProducts: async () => {
    const { data } = await client.get<ProductsResponse>('/products');
    return data;
  },
  getProductById: async (id: string) => {
    const { data } = await client.get<Product>(`/products/${id}`);
    return data;
  },
};

export default ProductsService;
