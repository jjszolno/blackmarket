import { createSelectors } from 'store/utils';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { FAVORITES } from 'constants/storages';

import { Favorite } from 'network/models/product-models';

import { zustandStorage } from 'storage/zustand-storage';

export interface FavoritesState {
  favorites: Favorite[];
  addFavorite: (favorite: Favorite) => void;
  removeFavorite: (favoriteId: number) => void;
  setFavorites: (favorites: Favorite[]) => void;
  clearFavorites: () => void;
}

const _useFavorites = create(
  persist<FavoritesState>(
    set => ({
      favorites: [],
      addFavorite: newFavorite => set(state => ({ favorites: [...state.favorites, newFavorite] })),
      removeFavorite: favoriteId =>
        set(state => ({
          favorites: state.favorites.filter(favorite => favorite.id !== favoriteId),
        })),
      setFavorites: favorites => set({ favorites }),
      clearFavorites: () => set({ favorites: [] }),
    }),
    {
      name: FAVORITES,
      storage: createJSONStorage(() => zustandStorage),
    },
  ),
);

export const useFavorites = createSelectors(_useFavorites);
export const favoritesStore = _useFavorites;
export const getFavorites = () => _useFavorites.getState().favorites;

export const addFavorite = (favorite: Favorite) => _useFavorites.getState().addFavorite(favorite);
export const removeFavorite = (favoriteId: number) =>
  _useFavorites.getState().removeFavorite(favoriteId);
export const setFavorites = (favorites: Favorite[]) =>
  _useFavorites.getState().setFavorites(favorites);
export const clearFavorites = () => _useFavorites.getState().clearFavorites();
