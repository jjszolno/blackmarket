import React from 'react';
import { FlatList, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import IconAwesome from 'react-native-vector-icons/FontAwesome';

import { useNavigation } from '@react-navigation/native';

import { translate } from 'localization/hooks';

import { MainStackScreens } from 'navigation/stacks/main';

import { useGetProducts } from 'network/queries/product-queries';

import CarouselItem from './carouselItem';
import useStyles from './styles';

const furnitureImage = require('assets/home/furniture.png');
const fedexImage = require('assets/home/fedex.jpeg');

const HomeScreen: React.FunctionComponent = () => {
  const styles = useStyles();
  const { data: products } = useGetProducts();
  const { navigate } = useNavigation();

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.flexContainer}>
        <FlatList
          horizontal
          scrollEnabled
          showsHorizontalScrollIndicator={false}
          data={products?.data}
          keyExtractor={product => product.id.toString()}
          renderItem={({ item }) => {
            return CarouselItem({
              item,
              onItemPress: () => {
                navigate(MainStackScreens.Detail, { productId: item.id });
              },
            });
          }}
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
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
