import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text } from 'react-native';

import { translate } from 'localization/hooks';

import { ProductsResponse } from 'network/models/product-models';
import { useGetProducts } from 'network/queries/product-queries';

import useStyles from './styles';

const HomeScreen: React.FunctionComponent = () => {
  const [products, setProducts] = useState<ProductsResponse | undefined>(undefined);
  const styles = useStyles();

  const { mutate } = useGetProducts({
    onError: error => {
      console.log('error', error);
    },
    onSuccess: data => {
      console.log('data', data);
      setProducts(data);
    },
  });

  useEffect(() => {
    mutate();
  });

  return (
    <SafeAreaView style={styles.container}>
      <Text accessibilityRole="text" style={styles.title}>
        {translate('screen.home.title')}
      </Text>
      <Text style={styles.buttonText}>{products?.data.length}</Text>
    </SafeAreaView>
  );
};

export default HomeScreen;
