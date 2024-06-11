import React from 'react';
import { SafeAreaView, Text } from 'react-native';

import { translate } from 'localization/hooks';

import useStyles from './styles';

const HomeScreen: React.FunctionComponent = () => {
  const styles = useStyles();

  return (
    <SafeAreaView style={styles.container}>
      <Text accessibilityRole="text" style={styles.title}>
        {translate('screen.home.title')}
      </Text>
    </SafeAreaView>
  );
};

export default HomeScreen;
