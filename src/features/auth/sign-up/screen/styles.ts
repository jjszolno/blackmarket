import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 10,
    alignSelf: 'stretch',
    margin: 30,
  },

  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  text: {
    fontSize: 14,
    marginBottom: 4,
  },
  logo: {
    marginVertical: 20,
    alignSelf: 'center',
  },

  input: {
    marginBottom: 10,
    height: 40,
    borderColor: '#000000',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
  },

  button: {
    marginTop: 10,
    /* grey color when disabled and black when enabled */
    backgroundColor: '#000000',
    color: '#000000',
    padding: 10,
    borderRadius: 5,
  },

  buttonText: {
    color: '#ffffff',
    textAlign: 'center',

    fontSize: 16,
    fontWeight: 'bold',
  },

  error: {
    color: 'red',
    padding: 10,
  },

  info: {
    marginTop: 20,
    fontSize: 14,
    textAlign: 'center',
    alignSelf: 'center',
  },

  link: {
    color: '#000000',
    textDecorationLine: 'underline',
    fontSize: 14,
  },
});

export default styles;
