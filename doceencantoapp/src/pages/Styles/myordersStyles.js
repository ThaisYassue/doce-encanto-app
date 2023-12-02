import { StyleSheet } from 'react-native';

export const myordersStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7A091B',
    justifyContent: 'center',
    padding: 10,
  },

  card: {
    justifyContent: 'space-between',
    marginBottom: 20,
    marginTop: 10,
    backgroundColor: '#FBF3DE'
  },
  
  orders: {
    marginTop: 10,
    marginBottom: 20,
    backgroundColor: '#FBF3DE',
    borderRadius: 5,
    width: '80%',
    alignSelf: 'center',
    padding: 15,
  },

  subtitulo: {
    fontWeight: 'bold',
    alignSelf: 'center',
    color: '#FBF3DE',
    marginTop: 20,
    fontSize: 18,
  },

  titulo: {
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    color: '#FBF3DE',
    marginTop: 20,
    fontSize: 21,
    marginLeft: 10,
  },
  
  text: {
    lineHeight: 32,
  },
});
