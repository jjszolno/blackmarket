import { StyleSheet } from 'react-native';

const useStyles = () => {
  return StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 20,
      backgroundColor: '#efefef',
    },
    flexContainer: {
      marginBottom: 20,
      paddingHorizontal: 20,
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      color: '#000000',
    },
    button: {
      marginTop: 10,
      backgroundColor: '#000000',
      padding: 10,
      borderRadius: 5,
    },
    data: {
      padding: 10,
    },
    imagesContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 10,
    },
    image: {
      width: 100,
      height: 100,
      marginHorizontal: 5,
      borderRadius: 10,
    },
    selectedImage: {
      width: '100%',
      aspectRatio: 1,
      borderRadius: 10,
      marginBottom: 10,
    },
    imageContainer: {
      maxWidth: '100%',
      alignItems: 'center',
    },
    like: {
      position: 'absolute',
      bottom: 40,
      right: 33,
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
      marginBottom: 10,
    },
    price: {
      color: '#000000',
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 20,
      marginBottom: 20,
    },
    quantityContainer: {
      marginRight: 10,
      alignItems: 'center',
      justifyContent: 'center',
      paddingLeft: 10,
    },
    availabilityContainer: {
      flex: 1,
      marginLeft: 10,
    },
    quantityLabel: {
      fontSize: 16,
      textAlign: 'center',
      fontWeight: 'bold',
      marginBottom: 5,
      color: '#000000',
    },
    quantitySelector: {
      borderRadius: 10,
      borderColor: '#000000',
      borderWidth: 1,
      height: 40,
      width: 90,
      backgroundColor: '#ffffff',
      justifyContent: 'center',
    },
    availabilityLabel: {
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: 14,
      marginBottom: 10,
      color: '#000000',
    },
    addToCartButton: {
      backgroundColor: '#000000',
      paddingVertical: 9,
      paddingHorizontal: 20,
      borderRadius: 10,
      alignItems: 'center',
    },
    addToCartButtonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
    },
    descriptionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
      color: '#000000',
      paddingHorizontal: 10,
      marginTop: 10,
    },
    descriptionText: {
      fontSize: 16,
      marginBottom: 30,
      color: '#000000',
      paddingHorizontal: 10,
    },
  });
};

export default useStyles;
