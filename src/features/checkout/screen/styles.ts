import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    alignSelf: 'stretch',
    margin: 30,
    marginTop: 10,
    marginBottom: 100,
    paddingBottom: 50,
  },

  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
    marginVertical: 20,
  },

  text: {
    fontSize: 14,
    marginBottom: 4,
  },

  input: {
    marginBottom: 10,
    height: 40,
    borderColor: '#000000',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },

  button: {
    marginTop: 10,
    backgroundColor: '#000000',
    color: '#000000',
    padding: 10,
    borderRadius: 10,
  },
  buttonCancel: {
    marginTop: 10,
    backgroundColor: '#ffffff',
    color: '#ffffff',
    padding: 10,
    borderRadius: 10,
    borderColor: '#000000',
    borderWidth: 1,
  },
  buttonCancelText: {
    color: '#000000',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
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
  label: {
    fontSize: 14,
    marginBottom: 4,
    color: '#000000',
  },

  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  pickerContainer: {
    borderColor: '#000000',
    borderWidth: 1,
    borderRadius: 10,
    height: 40,
    marginBottom: 10,
    justifyContent: 'center',
  },

  picker: {},
});

export default styles;
