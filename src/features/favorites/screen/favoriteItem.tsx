import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Favorite } from 'network/models/product-models';

const FavoriteItem: React.FunctionComponent<{
  item: Favorite;
  index: number;
  size: number;
  onRemovePress: () => void;
}> = ({ item, index, size, onRemovePress }) => {
  return (
    <View
      style={[
        styles.container,
        index === 0 && styles.containerFirst,
        index === size - 1 && styles.containerLast,
      ]}>
      <Image
        source={{ uri: item.product.pictures ? item.product.pictures[0] : '' }}
        style={styles.image}
      />
      <View style={styles.data}>
        <Text style={styles.name}>{item.product.title}</Text>
        <Text numberOfLines={1} style={styles.status}>
          {item.product.state}
        </Text>
        <Text style={styles.price}>{item.product.unitPrice}</Text>
        <TouchableOpacity style={styles.deleteButton} onPress={() => onRemovePress()}>
          <Text style={styles.deleteText}>Remove</Text>
        </TouchableOpacity>
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
    borderColor: '#000000',
    backgroundColor: '#ffffff',
  },
  containerFirst: {
    paddingTop: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderTopWidth: 1,
  },
  containerLast: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
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
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
    marginTop: 15,
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
    right: 0,
    bottom: 5,
    padding: 10,
    borderColor: '#000000',
    borderRadius: 5,
    borderWidth: 1,
  },
  deleteText: {
    color: '#000000',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default FavoriteItem;
