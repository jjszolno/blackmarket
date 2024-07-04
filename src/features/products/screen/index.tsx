import { debounce } from 'lodash';
import React, { useCallback, useState } from 'react';
import { FlatList, SafeAreaView, View } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { addFavorite, authStore, getFavorites, removeFavorite } from 'store';

import { useNavigation } from '@react-navigation/native';
import { SearchBar } from '@rneui/themed';

import SearchComponent from 'common/searchComponent';

import { translate } from 'localization/hooks';

import { MainStackScreens } from 'navigation/stacks/main';

import { LineItemParams } from 'network/models/product-models';
import { FavoriteParams } from 'network/models/product-models';
import { useAddProductToCart } from 'network/queries/cart-queries';
import { useAddFavorite, useRemoveFavorite } from 'network/queries/favorite-queries';
import { useGetProducts } from 'network/queries/product-queries';

import ProductItem from './productItem';
import styles from './styles';

const ProductsScreen: React.FunctionComponent = () => {
  const [search, setSearch] = useState('');
  const { data: products } = useGetProducts(search);
  const items = products?.data?.length || 0;
  const { navigate } = useNavigation();
  const { user } = authStore.getState();
  const favorites = getFavorites();

  const { mutate: addProductToCart } = useAddProductToCart({
    onError: error => {
      showMessage({ message: error.cause?.message || error.message, type: 'danger' });
    },
    onSuccess: () => {
      showMessage({ message: translate('alert.addedToCart'), type: 'success' });
    },
  });

  const onAddToCartPress = (product_id: number, quantity: number) => {
    const lineItemParams: LineItemParams = {
      line_item: {
        quantity,
        product_id,
      },
    };
    addProductToCart(lineItemParams);
  };

  const { mutate: addFavoriteCall } = useAddFavorite({
    onError: error => {
      showMessage({ message: error.cause?.message || error.message, type: 'danger' });
    },
    onSuccess: data => {
      addFavorite(data);
    },
  });

  const { mutate: removeFavoriteCall } = useRemoveFavorite({
    onError: error => {
      showMessage({ message: error.cause?.message || error.message, type: 'danger' });
    },
    onSuccess: response => {
      removeFavorite(response.id);
    },
  });

  const handleSearch = (text: React.SetStateAction<string>) => {
    setSearch(text);
    updateSearch();
  };

  const updateSearch = useCallback(() => {
    debounce(() => setSearch(search), 800);
  }, [search]);

  const handleLikePress = (id: number) => {
    const favorite = favorites.find(product => product.product.id === id);
    if (favorite !== undefined) {
      removeFavoriteCall(favorite.id);
    } else {
      const favoriteProduct: FavoriteParams = {
        favorite_products: {
          product_id: id,
          user_id: user?.id,
        },
      };
      addFavoriteCall(favoriteProduct);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <SearchBar
        placeholder="Search for products"
        lightTheme
        onChangeText={text => handleSearch(text)}
        value={search}
        containerStyle={styles.searchBarContainer}
      />
      {products && products.data.length !== 0 && search.length > 0 ? (
        <SearchComponent
          search={search}
          products={products.data}
          likedProducts={favorites}
          onClearAllPress={() => handleSearch('')}
        />
      ) : (
        <View style={styles.flexContainer}>
          <FlatList
            scrollEnabled
            showsHorizontalScrollIndicator={false}
            data={products?.data}
            keyExtractor={product => product.id.toString()}
            renderItem={({ item, index }) => {
              return ProductItem({
                item,
                liked: favorites.find(product => product.product.id === item.id) !== undefined,
                isLast: index === items - 1,
                onItemPress: () => {
                  const favorite = favorites.find(product => product.product.id === item.id);
                  navigate(MainStackScreens.Detail, {
                    productId: item.id,
                    favoriteId: favorite?.id,
                  });
                },
                onLikePress: () => {
                  handleLikePress(item.id);
                },
                onBuyPress: () => {
                  onAddToCartPress(item.id, 1);
                },
              });
            }}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default ProductsScreen;
