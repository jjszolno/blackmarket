import React from 'react';
import { FlatList, SafeAreaView, Text, View } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { removeFavorite } from 'store';

import { useQueryClient } from '@tanstack/react-query';

import { translate } from 'localization/hooks';

import { useGetFavorites, useRemoveFavorite } from 'network/queries/favorite-queries';

import FavoriteItem from './favoriteItem';
import styles from './styles';

const FavoritesScreen = () => {
  const { data: { data: favorites = [] } = {} } = useGetFavorites();
  const queryClient = useQueryClient();
  const { mutate: removeFavoriteCall } = useRemoveFavorite({
    onError: error => {
      showMessage({ message: error.cause?.message || error.message, type: 'danger' });
    },
    onSuccess: response => {
      queryClient.invalidateQueries(['getFavorites']);
      removeFavorite(response.id);
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.flexContainer}>
        <Text style={styles.title}>{translate('screen.favorites.title')}</Text>
        <FlatList
          scrollEnabled
          showsHorizontalScrollIndicator={false}
          data={favorites}
          keyExtractor={product => product.id.toString()}
          renderItem={({ item, index }) => {
            return FavoriteItem({
              item,
              index,
              size: favorites?.length || 0,
              onRemovePress: () => {
                removeFavoriteCall(item.id);
              },
            });
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default FavoritesScreen;
