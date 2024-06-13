import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';

import { Product } from 'network/models/product-models';

const CarouselItem: React.FunctionComponent<{ item: Product }> = ({ item }) => {
  console.log(JSON.stringify(item, null, 2));
  console.log('Price: ', item.unitPrice);
  return (
    <View style={styles.container}>
      <Image source={{ uri: item.pictures ? item.pictures[0] : '' }} style={styles.image} />
      <View style={styles.divider} />
      <View style={styles.data}>
        <Text style={styles.price}>{item.unitPrice}</Text>
        <Text style={styles.status}>{item.state}</Text>
        <Text style={styles.name}>{item.title}</Text>
        <Icon name="heart-outlined" size={25} color="#000000" style={styles.like} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 250,
    width: 150,
    margin: 4,
    borderRadius: 10,
    backgroundColor: '#ffffff',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.26,
    shadowRadius: 12,
    elevation: 3,
    shadowColor: '#000000',
  },
  image: {
    width: 140,
    height: 140,
    margin: 10,
  },
  divider: {
    borderTopColor: '#666666',
    borderTopWidth: 0.4,
  },
  data: {
    height: 80,
    width: 150,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    left: 5,
    top: 10,
    position: 'absolute',
    color: '#000000',
  },
  status: {
    fontSize: 16,
    color: '#ffffff',
    right: 5,
    top: 10,
    height: 20,
    borderRadius: 5,
    backgroundColor: '#799943',
    paddingHorizontal: 5,
    position: 'absolute',
  },
  name: {
    width: 90,
    fontSize: 16,
    fontWeight: 'bold',
    left: 5,
    bottom: 10,
    position: 'absolute',
    color: '#000000',
    textAlign: 'center',
  },
  like: {
    right: 5,
    bottom: 5,
    position: 'absolute',
  },
});

export default CarouselItem;
