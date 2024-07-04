import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';

import { translate } from 'localization/hooks';

import { Product } from 'network/models/product-models';

const ProductItem: React.FunctionComponent<{
  item: Product;
  isLast: boolean;
  liked: boolean;
  onItemPress: () => void;
  onLikePress: () => void;
  onBuyPress: () => void;
}> = ({ item, isLast, liked, onItemPress, onLikePress, onBuyPress }) => {
  return (
    <TouchableOpacity
      style={isLast ? styles.containerLast : styles.container}
      onPress={() => onItemPress()}>
      <Image source={{ uri: item.pictures ? item.pictures[0] : '' }} style={styles.image} />
      <View style={styles.data}>
        <Text style={styles.name}>{item.title}</Text>
        <Text numberOfLines={1} style={styles.status}>
          {item.state}
        </Text>
        <Text style={styles.price}>{item.unitPrice}</Text>
        <TouchableOpacity style={styles.likeButton} onPress={() => onLikePress()}>
          {liked ? (
            <Icon name="heart" size={24} color="#ff0000" />
          ) : (
            <Icon name="heart-outlined" size={24} color="#000000" />
          )}
        </TouchableOpacity>
        <TouchableOpacity style={styles.buyButton} onPress={() => onBuyPress()}>
          <Text style={styles.buyText}>{translate('screen.product.addToCart')}</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 140,
    width: '100%',
    padding: 10,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBlockColor: '#000000',
  },
  containerLast: {
    height: 150,
    width: '100%',
    padding: 10,
    flexDirection: 'row',
  },
  image: {
    width: 80,
    height: 100,
    margin: 10,
    justifyContent: 'center',
  },
  data: {
    flex: 1,
    height: '100%',
    width: 240,
    padding: 10,
  },
  price: {
    marginTop: 10,
    fontSize: 20,
    color: '#000000',
  },
  status: {
    width: 70,
    fontSize: 14,
    color: '#ffffff',
    backgroundColor: '#799943',
    padding: 3,
    borderTopRightRadius: 5,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    marginTop: 5,
  },
  name: {
    width: 120,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
  },
  likeButton: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 15,
    position: 'absolute',
    top: 5,
    right: 5,
  },
  buyButton: {
    width: 100,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00031A',
    borderRadius: 5,
    position: 'absolute',
    right: 5,
    bottom: 5,
  },
  buyText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
});

export default ProductItem;
