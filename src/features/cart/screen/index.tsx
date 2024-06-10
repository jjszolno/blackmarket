import React from 'react';
import { SafeAreaView, Text } from 'react-native';

import { translate } from 'localization/hooks';

import styles from './styles';

const CartScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text accessibilityRole="text" style={styles.title}>
        {translate('screen.cart.title')}
      </Text>
    </SafeAreaView>
  );
};

export default CartScreen;
