import client from '../client';
import { Favorite, FavoriteParams, FavoriteResponse } from '../models/product-models';

const FavoriteService = {
  getFavorites: async () => {
    const { data: favorites } = await client.get<FavoriteResponse>('/favorite_products');
    return favorites;
  },
  addFavorite: async (request: FavoriteParams) => {
    const { data } = await client.post<Favorite>('/favorite_products', request);
    return data;
  },
  removeFavorite: async (id: number) => {
    const { data } = await client.delete<void>(`/favorite_products/${id}`);
    return { data, id };
  },
};

export default FavoriteService;
