import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import { LineItem } from 'network/models/product-models';

const CartItem: React.FunctionComponent<{
  item: LineItem;
  isLast: boolean;
  onUpdatePress: (quantity: number) => void;
  onDeletePress: () => void;
}> = ({ item, isLast, onUpdatePress, onDeletePress }) => {
  return (
    <View style={isLast ? styles.containerLast : styles.container}>
      <Image
        source={{ uri: item.product.pictures ? item.product.pictures[0] : '' }}
        style={styles.image}
      />
      <View style={styles.data}>
        <Text style={styles.name}>{item.product.title}</Text>
        <Text numberOfLines={1} style={styles.status}>
          {item.product.state}
        </Text>
        <TouchableOpacity style={styles.deleteButton} onPress={onDeletePress}>
          <Text style={styles.deleteText}>Remove</Text>
        </TouchableOpacity>
        <Text style={styles.price}>{item.product.unitPrice}</Text>
        <View style={styles.controlsContainer}>
          <TouchableOpacity style={styles.icon} onPress={() => onUpdatePress(item.quantity - 1)}>
            <Icon name="trash-2" size={18} color="#000000" />
          </TouchableOpacity>
          <Text style={styles.quantity}>{item.quantity}</Text>
          <TouchableOpacity style={styles.icon} onPress={() => onUpdatePress(item.quantity + 1)}>
            <Icon name="plus" size={20} color="#000000" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
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
    position: 'absolute',
    top: 10,
    right: 10,
    fontSize: 20,
    fontWeight: 'bold',
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
    fontSize: 20,
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
  controlsContainer: {
    width: 90,
    height: 25,
    alignContent: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    position: 'absolute',
    bottom: 5,
    right: 5,
  },
  quantity: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#000000',
  },
  icon: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  buyText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  deleteButton: {
    justifyContent: 'center',
    position: 'absolute',
    left: 0,
    bottom: 5,
    padding: 10,
  },
  deleteText: {
    color: '#076CE0',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default CartItem;
