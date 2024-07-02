import React, { useEffect, useState } from 'react';
import { FlatList, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import Icon from 'react-native-vector-icons/Entypo';
import { authStore } from 'store';

import { Picker } from '@react-native-picker/picker';

import { translate } from 'localization/hooks';

import { LineItemParams } from 'network/models/product-models';
import { useAddProductToCart } from 'network/queries/cart-queries';
import { useAddFavorite, useRemoveFavorite } from 'network/queries/favorite-queries';
import { useGetProductById } from 'network/queries/product-queries';

import useStyles from './styles';
import { DetailNavigationProps } from './types';

const DetailScreen = ({
  route: {
    params: { productId, favoriteId },
  },
}: DetailNavigationProps) => {
  const styles = useStyles();
  const product = useGetProductById(productId);
  const [selectedImage, setSelectedImage] = useState<string | null>(
    product.data?.pictures?.[0] || null,
  );
  const [pictures, setPictures] = useState<string[]>(product.data?.pictures || []);
  const [quantity, setQuantity] = useState(1);
  const [favoriteIdValue, setFavoriteId] = useState<number | undefined>(favoriteId);
  const { user } = authStore.getState();

  const { mutate: addProductToCart } = useAddProductToCart({
    onError: error => {
      showMessage({ message: error.cause?.message || error.message, type: 'danger' });
    },
    onSuccess: () => {
      showMessage({ message: translate('alert.addedToCart'), type: 'success' });
    },
  });

  const onAddToCartPress = (id: number) => {
    const lineItemParams: LineItemParams = {
      line_item: {
        product_id: id,
        quantity,
      },
    };
    addProductToCart(lineItemParams);
  };

  const { mutate: addFavorite } = useAddFavorite({
    onError: error => {
      showMessage({ message: error.cause?.message || error.message, type: 'danger' });
    },
    onSuccess: data => {
      setFavoriteId(data.id);
    },
  });

  const { mutate: removeFavorite } = useRemoveFavorite({
    onError: error => {
      showMessage({ message: error.cause?.message || error.message, type: 'danger' });
    },
    onSuccess: () => {
      setFavoriteId(undefined);
    },
  });

  const handleLikePress = () => {
    if (favoriteIdValue) {
      removeFavorite(favoriteIdValue);
    } else {
      addFavorite({ favorite_products: { product_id: productId, user_id: user?.id } });
    }
  };

  useEffect(() => {
    if (product.data?.pictures) {
      setSelectedImage(product.data.pictures[0]);
    }
  }, [product.data]);

  //As the base doesn't have any pictures, we need to add some placeholders
  useEffect(() => {
    if (pictures.length < 3) {
      const placeholders = Array.from(
        { length: 5 - pictures.length },
        (_, index) => `https://picsum.photos/${200 + index}`,
      );
      setPictures([...pictures, ...placeholders]);
    }
  }, [pictures]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.flexContainer}>
        <Text style={styles.status}>{product.data?.state}</Text>
        <Text style={styles.title}>{product.data?.title}</Text>
        <Text style={styles.price}>{product.data?.unitPrice}</Text>

        {selectedImage && (
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: selectedImage }}
              style={styles.selectedImage}
              resizeMode="contain"
            />
            <TouchableOpacity style={styles.like} onPress={() => handleLikePress()}>
              {favoriteIdValue ? (
                <Icon name="heart" size={25} color="#ff0000" />
              ) : (
                <Icon name="heart-outlined" size={25} color="#fff" />
              )}
            </TouchableOpacity>
          </View>
        )}

        <FlatList
          horizontal
          data={pictures || []}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => setSelectedImage(item)}>
              <Image source={{ uri: item }} style={styles.image} resizeMode="cover" />
            </TouchableOpacity>
          )}
        />
        <View style={styles.buttonContainer}>
          <View style={styles.quantityContainer}>
            <Text style={styles.quantityLabel}>Quantity</Text>
            <View style={styles.quantitySelector}>
              <Picker selectedValue={quantity} onValueChange={setQuantity}>
                {Array.from({ length: 10 }, (_, index) => (
                  <Picker.Item key={index + 1} label={`${index + 1}`} value={`${index + 1}`} />
                ))}
              </Picker>
            </View>
          </View>
          <View style={styles.availabilityContainer}>
            <Text style={styles.availabilityLabel}>Availability: {product.data?.stock} items</Text>
            <TouchableOpacity
              style={styles.addToCartButton}
              onPress={() => onAddToCartPress(productId)}>
              <Text style={styles.addToCartButtonText}>Add to Cart</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.descriptionTitle}>Product Description</Text>
        <Text style={styles.descriptionText}>{product.data?.description}</Text>
      </View>
    </ScrollView>
  );
};

export default DetailScreen;
