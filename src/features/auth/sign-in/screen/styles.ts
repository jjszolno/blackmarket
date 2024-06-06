import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 10,
    alignSelf: 'stretch',
    marginHorizontal: 30,
    marginBottom: 15,
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
    backgroundColor: '#000000',
    padding: 10,
    borderRadius: 5,
  },

  buttonInverted: {
    marginTop: 10,
    backgroundColor: '#ffffff',
    padding: 10,
    borderRadius: 5,
    borderColor: '#000000',
    borderWidth: 1,
  },

  buttonText: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },

  buttonTextInverted: {
    color: '#000000',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },

  error: {
    color: 'red',
    padding: 10,
  },

  info: {
    marginBottom: 5,
    fontSize: 16,
    textAlign: 'center',
    alignSelf: 'center',
    color: '#000000',
  },

  link: {
    color: '#076CE0',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    alignSelf: 'center',
    marginTop: 10,
  },
});

export default styles;
