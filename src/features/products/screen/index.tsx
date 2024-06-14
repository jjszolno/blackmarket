import React from 'react';
import { FlatList, SafeAreaView, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { MainStackScreens } from 'navigation/stacks/main';

import { useGetProducts } from 'network/queries/product-queries';

import ProductItem from './productItem';
import styles from './styles';

const ProductsScreen: React.FunctionComponent = () => {
  const { data } = useGetProducts();
  const items = data?.data.length || 0;
  const { navigate } = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.flexContainer}>
        <FlatList
          scrollEnabled
          showsHorizontalScrollIndicator={false}
          data={data?.data}
          keyExtractor={product => product.id}
          renderItem={({ item, index }) => {
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
                console.log('onItemPress', item.title);
              },
            });
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default ProductsScreen;
