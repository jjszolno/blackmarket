import React, { useEffect, useState } from 'react';
import { FlatList, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';

import { useGetProductById } from 'network/queries/product-queries';

import QuantitySelector from './selector';
import useStyles from './styles';
import { DetailNavigationProps } from './types';

const DetailScreen = ({
  route: {
    params: { productId },
  },
}: DetailNavigationProps) => {
  const styles = useStyles();
  const product = useGetProductById(productId);
  const [selectedImage, setSelectedImage] = useState<string | null>(
    product.data?.pictures?.[0] || null,
  );
  const [pictures, setPictures] = useState<string[]>(product.data?.pictures || []);

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
            <Icon name="heart-outlined" color="#fff" size={26} style={styles.like} />
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
              <QuantitySelector />
            </View>
          </View>
          <View style={styles.availabilityContainer}>
            <Text style={styles.availabilityLabel}>Availability: {product.data?.stock} items</Text>
            <TouchableOpacity style={styles.addToCartButton}>
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