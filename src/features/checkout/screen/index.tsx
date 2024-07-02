import React from 'react';
import { ScrollView, Text } from 'react-native';
import { showMessage } from 'react-native-flash-message';

import { NavigationProp } from '@react-navigation/native';

import { translate } from 'localization/hooks';

import { OrderParams } from 'network/models/order-models';
import { useAddOrder } from 'network/queries/order-queries';

import CheckoutForm from './CheckoutForm';
import styles from './styles';

type CheckoutScreenProps = {
  navigation: NavigationProp<any>;
};

const CheckoutScreen: React.FC<CheckoutScreenProps> = props => {
  const { mutate } = useAddOrder({
    onError: errorData => {
      showMessage({ message: errorData.cause?.message || errorData.message, type: 'danger' });
    },
    onSuccess: () => {
      props.navigation.goBack();
    },
  });

  const handleSubmit = (orderParams: OrderParams) => {
    mutate(orderParams);
  };

  const handleCancel = () => {
    props.navigation.goBack();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{translate('screen.checkout.title')}</Text>
      <CheckoutForm onSubmitAction={handleSubmit} onCancel={handleCancel} />
    </ScrollView>
  );
};

export default CheckoutScreen;
