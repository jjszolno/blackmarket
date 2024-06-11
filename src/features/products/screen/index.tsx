import React from 'react';
import { FlatList, ScrollView, View } from 'react-native';

import { useGetProducts } from 'network/queries/product-queries';

import ProductItem from './productItem';
import styles from './styles';

const PurchasesScreen = () => {
  const { data } = useGetProducts();
  const items = data?.data.length || 0;

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.flexContainer}>
        <FlatList
          scrollEnabled
          showsHorizontalScrollIndicator={false}
          data={data?.data}
          keyExtractor={product => product.id}
          renderItem={({ item, index }) => {
            return ProductItem({ item, isLast: index === items - 1 });
          }}
        />
      </View>
    </ScrollView>
  );
};

export default PurchasesScreen;
