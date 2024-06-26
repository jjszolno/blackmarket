import client from '../client';
import { Product, ProductsResponse } from '../models/product-models';

const ProductsService = {
  getProducts: async (text?: string) => {
    const queryParams = text ? { text } : {};
    const { data: products } = await client.get<ProductsResponse>('/products', {
      params: queryParams,
    });
    return products;
  },
  getProductById: async (id: number) => {
    const { data } = await client.get<Product>(`/products/${id}`);
    return data;
  },
};

export default ProductsService;
