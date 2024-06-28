import { debounce } from 'lodash';
import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, SafeAreaView, View } from 'react-native';
import { authStore } from 'store';

import { useNavigation } from '@react-navigation/native';
import { SearchBar } from '@rneui/themed';

import SearchComponent from 'common/searchComponent';

import { MainStackScreens } from 'navigation/stacks/main';

import { LineItemParams } from 'network/models/product-models';
import { Favorite, FavoriteParams } from 'network/models/product-models';
import { useAddProductToCart } from 'network/queries/cart-queries';
import {
  useAddFavorite,
  useGetFavorites,
  useRemoveFavorite,
} from 'network/queries/favorite-queries';
import { useGetProducts } from 'network/queries/product-queries';

import ProductItem from './productItem';
import styles from './styles';

const ProductsScreen: React.FunctionComponent = () => {
  const [search, setSearch] = useState('');
  const { data: products } = useGetProducts(search);
  const items = products?.data?.length || 0;
  const { navigate } = useNavigation();
  const { user } = authStore.getState();
  const { data: favoriteProducts, refetch } = useGetFavorites();
  const [likedProducts, setLikedProducts] = useState<Favorite[]>([]);

  const { mutate: addProductToCart } = useAddProductToCart({
    onError: error => {
      console.log('error: ', error);
    },
    onSuccess: () => {},
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

  const { mutate: addFavorite } = useAddFavorite({
    onError: error => {
      console.log('AddFavorite: ', error.cause);
    },
    onSuccess: data => {
      setLikedProducts([...likedProducts, data]);
    },
  });

  const { mutate: removeFavorite } = useRemoveFavorite({
    onError: error => {
      console.log('RemoveFavorite: ', error.cause);
    },
    onSuccess: () => {
      refetch();
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
    const favorite = likedProducts?.find(product => product.product.id === id);
    if (favorite !== undefined) {
      removeFavorite(favorite.id);
    } else {
      const favoriteProduct: FavoriteParams = {
        favorite_products: {
          product_id: id,
          user_id: user?.id,
        },
      };
      addFavorite(favoriteProduct);
    }
  };

  useEffect(() => {
    if (favoriteProducts) {
      setLikedProducts(favoriteProducts.data);
    }
  }, [favoriteProducts]);

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
          likedProducts={likedProducts}
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
                liked: likedProducts.find(product => product.product.id === item.id) !== undefined,
                isLast: index === items - 1,
                onItemPress: () => {
                  const favorite = likedProducts?.find(product => product.product.id === item.id);
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
