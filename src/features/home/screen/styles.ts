import { StyleSheet } from 'react-native';

import { useTheme } from '@react-navigation/native';

const useStyles = () => {
  const { colors } = useTheme();

  return StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.background,
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      color: colors.text,
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
  });
};

export default useStyles;
