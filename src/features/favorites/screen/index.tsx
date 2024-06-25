import React from 'react';
import { FlatList, SafeAreaView, Text, View } from 'react-native';

import { useQueryClient } from '@tanstack/react-query';

import { translate } from 'localization/hooks';

import { useGetFavorites, useRemoveFavorite } from 'network/queries/favorite-queries';

import FavoriteItem from './favoriteItem';
import styles from './styles';

const FavoritesScreen = () => {
  const { data } = useGetFavorites();
  const queryClient = useQueryClient();
  const { mutate: removeFavorite } = useRemoveFavorite({
    onError: error => {
      console.log('RemoveFavorite: ', error.cause);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['getFavorites']);
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.flexContainer}>
        <Text style={styles.title}>{translate('screen.favorites.title')}</Text>
        <FlatList
          scrollEnabled
          showsHorizontalScrollIndicator={false}
          data={data?.data}
          keyExtractor={product => product.id.toString()}
          renderItem={({ item, index }) => {
            return FavoriteItem({
              item,
              index,
              size: data?.data.length || 0,
              onRemovePress: () => {
                removeFavorite(item.id);
              },
            });
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default FavoritesScreen;
