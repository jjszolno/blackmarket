import { debounce } from 'lodash';
import React, { useCallback, useState } from 'react';
import { FlatList, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { showMessage } from 'react-native-flash-message';

import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { SearchBar } from '@rneui/themed';

import SearchComponent from 'common/searchComponent';

import { translate } from 'localization/hooks';

import { MainStackScreens } from 'navigation/stacks/main';

import {
  useGetCart,
  useRemoveProductFromCart,
  useUpdateProductQuantity,
} from 'network/queries/cart-queries';
import { useGetProducts } from 'network/queries/product-queries';

import CartItem from './cartItem';
import styles from './styles';

const CartScreen = () => {
  const { navigate } = useNavigation();
  const [search, setSearch] = useState('');
  const { data: { data: products = [] } = {} } = useGetProducts(search);
  const { data: cart, refetch } = useGetCart();
  const { mutate: removeItem } = useRemoveProductFromCart({
    onError: error => {
      showMessage({ message: error.message, type: 'danger' });
    },
    onSuccess: () => {
      refetch();
    },
  });
  const { mutate: updateProductQuantity } = useUpdateProductQuantity({
    onError: error => {
      showMessage({ message: error.message, type: 'danger' });
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

  const handleSearch = (text: React.SetStateAction<string>) => {
    setSearch(text);
    updateSearch();
  };

  const updateSearch = useCallback(() => {
    debounce(() => setSearch(search), 800);
  }, [search]);

  return (
    <SafeAreaView style={styles.container}>
      <SearchBar
        placeholder="Search for products"
        lightTheme
        onChangeText={text => handleSearch(text)}
        value={search}
        containerStyle={styles.searchBarContainer}
      />
      {products.length && search.length > 0 ? (
        <SearchComponent
          search={search}
          products={products}
          likedProducts={[]}
          onClearAllPress={() => handleSearch('')}
        />
      ) : cart?.lineItems?.length ? (
        <View style={styles.flexContainer}>
          <View style={styles.horizontalContainer}>
            <Text style={styles.cart}>{translate('screen.cart.shoppingCart')}</Text>
            <TouchableOpacity onPress={() => clearCart()}>
              <Text style={styles.clear}>{translate('screen.cart.clearAll')}</Text>
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
              <Text style={styles.total}>{translate('screen.cart.total')}</Text>
              <View style={styles.line} />
              <Text style={styles.totalPrice}>{cart?.totalPrice}</Text>
            </View>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                navigate(MainStackScreens.Checkout);
              }}>
              <Text style={styles.buttonText}>{translate('screen.cart.checkout')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={styles.flexContainer}>
          <Text style={styles.empty}>{translate('screen.cart.noItems')}</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default CartScreen;
