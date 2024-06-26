import { StyleSheet } from 'react-native';

import { useTheme } from '@react-navigation/native';

const useStyles = () => {
  const { colors } = useTheme();

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#efefef',
    },
    flexContainer: {
      flex: 1,
      flexDirection: 'column',
      marginBottom: 20,
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      color: colors.text,
      padding: 10,
    },
    button: {
      marginTop: 10,
      backgroundColor: '#000000',
      padding: 10,
      borderRadius: 5,
    },
    buttonText: {
      color: '#ffffff',
      textAlign: 'center',
      fontSize: 16,
      fontWeight: 'bold',
    },
    seeAll: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#0000ff',
      paddingVertical: 10,
      alignSelf: 'center',
    },
    furniture: {
      marginTop: 10,
      marginHorizontal: 10,
      width: '95%',
      flexDirection: 'row',
      flexWrap: 'wrap',
      height: 140,
      borderRadius: 10,
      backgroundColor: '#000000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.26,
      shadowRadius: 12,
      elevation: 3,
      shadowColor: '#000000',
      marginBottom: 24,
    },
    image: {
      width: 150,
      height: 140,
      borderTopLeftRadius: 10,
      borderBottomLeftRadius: 10,
    },
    divider: {
      borderLeftColor: '#efefef',
      borderLeftWidth: 0.6,
      height: '100%',
    },
    info: {
      flex: 1,
      height: 140,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#000000',
      borderTopRightRadius: 10,
      borderBottomRightRadius: 10,
    },
    text: {
      width: '100%',
      textAlign: 'left',
      paddingHorizontal: 12,
      fontSize: 17,
      fontWeight: 'bold',
      color: '#ffffff',
      justifyContent: 'flex-start',
    },
    subText: {
      width: '100%',
      textAlign: 'left',
      paddingHorizontal: 12,
      fontSize: 17,
      color: '#ffffff',
      justifyContent: 'flex-start',
    },
    payments: {
      width: '100%',
      height: 180,
      backgroundColor: '#ffffff',
      paddingVertical: 30,
      marginBottom: 16,
    },
    paymentTitle: {
      textAlign: 'center',
      fontSize: 18,
      fontWeight: 'bold',
      color: '#202020',
    },
    paymentsContainer: {
      paddingHorizontal: 40,
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginTop: 30,
      marginBottom: 30,
    },
    payment: {
      width: 150,
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
    },
    paymentText: {
      fontSize: 15,
      color: '#000000',
    },
    paymentDivider: {
      width: 0.5,
      height: 60,
      backgroundColor: '#000000',
    },
    paymentIcon: {
      margin: 10,
    },
    end: {
      flex: 1,
      justifyContent: 'flex-end',
    },
    imageRight: {
      width: 200,
      height: 120,
      borderTopRightRadius: 10,
      borderBottomRightRadius: 10,
    },
    shipment: {
      flexDirection: 'row',
      marginHorizontal: 10,
      width: '95%',
      height: 120,
      borderRadius: 10,
      backgroundColor: '#000000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.26,
      shadowRadius: 12,
      elevation: 3,
      shadowColor: '#000000',
      marginBottom: 24,
    },
    infoShipment: {
      flex: 1,
      height: 120,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#000000',
      borderTopLeftRadius: 10,
      borderBottomLeftRadius: 10,
    },
    fedex: {
      color: '#00cc00',
    },
    searchBarContainer: {
      backgroundColor: '#f5f5f5',
      paddingHorizontal: 16,
    },
  });
};

export default useStyles;
