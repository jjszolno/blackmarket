import { useMutation, useQuery } from '@tanstack/react-query';

import { AxiosResult } from 'network/models/axios';
import { Favorite } from 'network/models/product-models';
import FavoriteService from 'network/services/favorite-services';

const useGetFavorites = () => useQuery(['getFavorites'], FavoriteService.getFavorites);

const useAddFavorite = ({ onError, onSuccess }: AxiosResult<Favorite>) =>
  useMutation(FavoriteService.addFavorite, { onError, onSuccess });

const useRemoveFavorite = ({ onError, onSuccess }: AxiosResult<Favorite>) =>
  useMutation(FavoriteService.removeFavorite, { onError, onSuccess });

export { useGetFavorites, useAddFavorite, useRemoveFavorite };
