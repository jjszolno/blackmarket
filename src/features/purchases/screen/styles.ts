import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: '#efefef',
  },
  flexContainer: {
    padding: 20,
    width: '100%',
    flex: 1,
  },
  title: {
    fontSize: 20,
    color: 'black',
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  empty: {
    margin: 20,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default styles;
