import React from 'react';
import { SafeAreaView, Text } from 'react-native';

import { translate } from 'localization/hooks';

import styles from './styles';

const PurchasesScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text accessibilityRole="text" style={styles.title}>
        {translate('screen.purchases.title')}
      </Text>
    </SafeAreaView>
  );
};

export default PurchasesScreen;
