import React from 'react';
import { SafeAreaView, SectionList, Text, View } from 'react-native';

import { translate } from 'localization/hooks';

import { useGetOrders } from 'network/queries/order-queries';

import OrderItem from './orderItem';
import styles from './styles';

const PurchasesScreen: React.FunctionComponent = () => {
  const { data: { data: orders = [] } = {} } = useGetOrders();

  const sections =
    orders.length > 0
      ? orders.map(order => ({
          title: `Order ${order.id}`,
          data: order.lineItems || [],
        }))
      : [];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.flexContainer}>
        <Text style={styles.title}>{translate('screen.purchases.title')}</Text>
        {orders.length > 0 ? (
          <SectionList
            sections={sections}
            scrollEnabled
            showsHorizontalScrollIndicator={false}
            keyExtractor={order => order.id.toString()}
            renderItem={({ item, index, section }) => {
              return OrderItem({
                item,
                index,
                size: section.data.length,
              });
            }}
          />
        ) : (
          <Text style={styles.empty}>{translate('screen.purchases.empty')}</Text>
        )}
      </View>
    </SafeAreaView>
  );
};

export default PurchasesScreen;
