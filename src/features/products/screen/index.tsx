import React from 'react';
import { FlatList, SafeAreaView, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { MainStackScreens } from 'navigation/stacks/main';

import { LineItemParams } from 'network/models/product-models';
import { useAddProductToCart } from 'network/queries/cart-queries';
import { useGetProducts } from 'network/queries/product-queries';

import ProductItem from './productItem';
import styles from './styles';

const ProductsScreen: React.FunctionComponent = () => {
  const { data: products } = useGetProducts();
  const items = products?.data?.length || 0;
  const { navigate } = useNavigation();

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

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.flexContainer}>
        <FlatList
          scrollEnabled
          showsHorizontalScrollIndicator={false}
          data={products?.data}
          keyExtractor={product => product.id.toString()}
          renderItem={({ item, index }) => {
            console.log('item', item.id);
            return ProductItem({
              item,
              isLast: index === items - 1,
              onItemPress: () => {
                navigate(MainStackScreens.Detail, { productId: item.id });
              },
              onLikePress: () => {
                console.log('onItemPress', item.title);
              },
              onBuyPress: () => {
                onAddToCartPress(item.id, 1);
              },
            });
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default ProductsScreen;
