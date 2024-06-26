import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import ProductItem from 'features/products/screen/productItem';

import { translate } from 'localization/hooks';

import { MainStackScreens } from 'navigation/stacks/main';

import { Favorite, LineItemParams, Product } from 'network/models/product-models';
import { useAddProductToCart } from 'network/queries/cart-queries';

interface SearchComponentProps {
  search: string;
  products: Product[];
  likedProducts: Favorite[];
  onClearAllPress: () => void;
}

const SearchComponent: React.FC<SearchComponentProps> = ({
  search,
  products,
  likedProducts,
  onClearAllPress,
}) => {
  const { mutate: addProductToCart } = useAddProductToCart({
    onError: error => {
      console.log('error: ', error);
    },
    onSuccess: () => {},
  });

  const handleAddProductToCart = (product_id: number) => {
    const lineItemParams: LineItemParams = {
      line_item: {
        quantity: 1,
        product_id,
      },
    };
    addProductToCart(lineItemParams);
  };

  const { navigate } = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.searchText}>{translate('search.searchResultsTitle', { search })}</Text>
        <TouchableOpacity
          style={styles.clear}
          onPress={() => {
            onClearAllPress();
          }}>
          <Text style={styles.seeAllText}>{translate('search.clearSearch')}</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        style={styles.list}
        scrollEnabled
        showsVerticalScrollIndicator={false}
        data={products}
        keyExtractor={product => product.id.toString()}
        renderItem={({ item, index }) => {
          return ProductItem({
            item,
            liked: likedProducts.find(product => product.product.id === item.id) !== undefined,
            isLast: index === products.length - 1,
            onItemPress: () => {
              const favorite = likedProducts?.find(product => product.product.id === item.id);
              navigate(MainStackScreens.Detail, { productId: item.id, favoriteId: favorite?.id });
            },
            onLikePress: () => {},
            onBuyPress: () => {
              handleAddProductToCart(item.id);
            },
          });
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    width: '90%',
    backgroundColor: '#efefef',
    borderWidth: 1,
    borderColor: 'black',
    marginHorizontal: 20,
    borderRadius: 10,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  flexContainer: {
    width: '90%',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  searchText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    padding: 10,
  },
  textContainer: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    textAlignVertical: 'center',
  },
  clear: {
    padding: 10,
  },
  seeAllText: {
    paddingTop: 3,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0000ff',
  },
});

export default SearchComponent;
