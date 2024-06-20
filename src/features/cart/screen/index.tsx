import React from 'react';
import { FlatList, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';

import { useFocusEffect, useNavigation } from '@react-navigation/native';

import { MainStackScreens } from 'navigation/stacks/main';

import {
  useGetCart,
  useRemoveProductFromCart,
  useUpdateProductQuantity,
} from 'network/queries/cart-queries';

import CartItem from './cartItem';
import styles from './styles';

const CartScreen = () => {
  const { navigate } = useNavigation();
  const { data: cart, refetch } = useGetCart();
  const { mutate: removeItem } = useRemoveProductFromCart({
    onError: error => {
      console.log('error: ', error);
    },
    onSuccess: () => {
      refetch();
    },
  });
  const { mutate: updateProductQuantity } = useUpdateProductQuantity({
    onError: error => {
      console.log('error: ', error);
    },
    onSuccess: () => {
      refetch();
    },
  });
  const items = cart?.lineItems?.length || 0;

  const clearCart = () => {
    for (const item of cart?.lineItems || []) {
      removeItem(item.id);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      refetch();
    }, [refetch]),
  );

  return (
    <SafeAreaView style={styles.container}>
      {cart?.lineItems?.length ? (
        <View style={styles.flexContainer}>
          <View style={styles.horizontalContainer}>
            <Text style={styles.cart}>My shopping cart</Text>
            <TouchableOpacity onPress={() => clearCart()}>
              <Text style={styles.clear}>Clear All</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.flatListContainer}>
            <FlatList
              scrollEnabled
              data={cart?.lineItems}
              keyExtractor={item => item.product.id.toString()}
              renderItem={({ item, index }) => {
                return CartItem({
                  item,
                  isLast: index === items - 1,
                  onUpdatePress: quantity => {
                    updateProductQuantity({ id: item.id, quantity });
                  },
                  onDeletePress: () => {
                    removeItem(item.id);
                  },
                });
              }}
            />
          </View>
          <View style={styles.horizontalContainer}>
            <View style={styles.totalContainer}>
              <Text style={styles.total}>TOTAL</Text>
              <View style={styles.line} />
              <Text style={styles.totalPrice}>{cart?.totalPrice}</Text>
            </View>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                navigate(MainStackScreens.Checkout);
              }}>
              <Text style={styles.buttonText}>Go to checkout</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={styles.flexContainer}>
          <Text style={styles.empty}>No items in cart</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default CartScreen;
