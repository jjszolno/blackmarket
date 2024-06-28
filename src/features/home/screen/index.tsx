import { debounce } from 'lodash';
import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import IconAwesome from 'react-native-vector-icons/FontAwesome';
import { authStore } from 'store';

import { useNavigation } from '@react-navigation/native';
import { SearchBar } from '@rneui/themed';

import SearchComponent from 'common/searchComponent';

import { translate } from 'localization/hooks';

import { MainStackScreens } from 'navigation/stacks/main';

import { Favorite, FavoriteParams } from 'network/models/product-models';
import {
  useAddFavorite,
  useGetFavorites,
  useRemoveFavorite,
} from 'network/queries/favorite-queries';
import { useGetProducts } from 'network/queries/product-queries';

import CarouselItem from './carouselItem';
import useStyles from './styles';

const furnitureImage = require('assets/home/furniture.png');
const fedexImage = require('assets/home/fedex.jpeg');

const HomeScreen: React.FunctionComponent = () => {
  const styles = useStyles();
  const [search, setSearch] = useState('');
  const { data: products } = useGetProducts(search);
  const { navigate } = useNavigation();
  const { user } = authStore.getState();
  const { data: favoriteProducts, refetch } = useGetFavorites();
  const [likedProducts, setLikedProducts] = useState<Favorite[]>([]);
  const { mutate: addFavorite } = useAddFavorite({
    onError: error => {
      console.log('AddFavorite: ', error.cause);
    },
    onSuccess: data => {
      setLikedProducts([...likedProducts, data]);
    },
  });

  const { mutate: removeFavorite } = useRemoveFavorite({
    onError: error => {
      console.log('RemoveFavorite: ', error.cause);
    },
    onSuccess: () => {
      refetch();
    },
  });

  const handleLikePress = (id: number) => {
    const favorite = likedProducts?.find(product => product.product.id === id);
    if (favorite !== undefined) {
      removeFavorite(favorite.id);
    } else {
      const favoriteProduct: FavoriteParams = {
        favorite_products: {
          product_id: id,
          user_id: user?.id,
        },
      };
      addFavorite(favoriteProduct);
    }
  };

  const handleSearch = (text: React.SetStateAction<string>) => {
    setSearch(text);
    updateSearch();
  };

  const updateSearch = useCallback(() => {
    debounce(() => setSearch(search), 800);
  }, [search]);

  useEffect(() => {
    if (favoriteProducts) {
      setLikedProducts(favoriteProducts.data);
    }
  }, [favoriteProducts]);

  return (
    <View style={styles.flexContainer}>
      <SearchBar
        placeholder="Search for products"
        lightTheme
        onChangeText={text => handleSearch(text)}
        value={search}
        containerStyle={styles.searchBarContainer}
      />
      {products && products.data.length !== 0 && search.length > 0 ? (
        <SearchComponent
          search={search}
          products={products.data}
          likedProducts={likedProducts}
          onClearAllPress={() => handleSearch('')}
        />
      ) : (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
          <Text style={styles.title}>{translate('screen.home.title')}</Text>
          <FlatList
            horizontal
            scrollEnabled
            showsHorizontalScrollIndicator={false}
            data={products?.data}
            keyExtractor={product => product.id.toString()}
            renderItem={({ item }) => {
              return CarouselItem({
                item,
                liked: likedProducts.find(product => product.product.id === item.id) !== undefined,
                onItemPress: () => {
                  const favorite = likedProducts?.find(product => product.product.id === item.id);
                  navigate(MainStackScreens.Detail, {
                    productId: item.id,
                    favoriteId: favorite?.id,
                  });
                },
                onLikePress: () => {
                  handleLikePress(item.id);
                },
              });
            }}
            extraData={likedProducts}
          />
          <TouchableOpacity onPress={() => navigate(MainStackScreens.Products)}>
            <Text style={styles.seeAll}>{translate('screen.home.seeAll')}</Text>
          </TouchableOpacity>
          <View style={styles.furniture}>
            <Image source={furnitureImage} style={styles.image} />
            <View style={styles.divider} />
            <View style={styles.info}>
              <Text style={styles.text}>{translate('screen.home.check')}</Text>
              <Text style={styles.subText}>{translate('screen.home.discount')}</Text>
            </View>
          </View>
          <View style={styles.payments}>
            <Text style={styles.paymentTitle}>{translate('screen.home.payments')}</Text>
            <View style={styles.paymentsContainer}>
              <View style={styles.payment}>
                <Icon name="creditcard" size={25} color="#000000" style={styles.paymentIcon} />
                <Text style={styles.paymentText}>{translate('screen.home.credit')}</Text>
              </View>
              <View style={styles.paymentDivider} />
              <View style={styles.payment}>
                <IconAwesome name="paypal" size={25} color="#000000" style={styles.paymentIcon} />
                <Text style={styles.paymentText}>{translate('screen.home.paypal')}</Text>
              </View>
              <View style={styles.paymentDivider} />
              <View style={styles.payment}>
                <IconAwesome name="bitcoin" size={25} color="#000000" style={styles.paymentIcon} />
                <Text style={styles.paymentText}>{translate('screen.home.crypto')}</Text>
              </View>
            </View>
          </View>
          <View style={styles.shipment}>
            <View style={styles.infoShipment}>
              <Text style={styles.text}>{translate('screen.home.shipment')}</Text>
              <Text style={styles.subText}>
                {translate('screen.home.powered')}
                <Text style={styles.fedex}>{translate('screen.home.fedex')}</Text>
              </Text>
            </View>
            <View style={styles.divider} />
            <Image source={fedexImage} style={styles.imageRight} />
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default HomeScreen;
