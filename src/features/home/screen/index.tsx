import React, { useEffect } from 'react';
import { SafeAreaView, Text } from 'react-native';

import { translate } from 'localization/hooks';

import interceptors from 'network/client/interceptors';
import { useGetProducts } from 'network/queries/product-queries';

import useStyles from './styles';

interceptors();

const HomeScreen: React.FunctionComponent = () => {
  const styles = useStyles();

  const { data } = useGetProducts();

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <SafeAreaView style={styles.container}>
      <Text accessibilityRole="text" style={styles.title}>
        {translate('screen.home.title')}
      </Text>
      <Text style={styles.title}>{data}</Text>
    </SafeAreaView>
  );
};

export default HomeScreen;
