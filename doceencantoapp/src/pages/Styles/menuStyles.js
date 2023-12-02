import { StyleSheet, Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const cardWidth = (screenWidth - 40) / 2; // Dividindo por 2 para ter dois cards por linha

export const menuStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#7A091B',
    justifyContent: 'space-between', 
    padding: 10,
  },
  rowContainer: {
    flexDirection: 'row', 
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  cakeContainer: {
    marginBottom: 10,
    marginRight: 10, 
    backgroundColor: '#FBF3DE',
    borderRadius: 20,
    width: cardWidth, 
  },
  cakeName: {
    marginTop: 10,
    fontSize: 20,
    color: '#470214',
    fontWeight: 'bold',
    marginBottom: 8,
    paddingHorizontal: 10,
  },
  cakePrice: {
    fontSize: 15,
    color: '#470214',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  imagem: {
    width: '100%',
    height: 220,
    borderRadius: 60,
    marginBottom: 16,
  },
  containerBotaoVerMais: {
     marginBottom: 10,
     marginTop: 10,
     paddingHorizontal: 10,
     
  },
  botaoVerMais: {
    backgroundColor: '#470214',
    borderRadius: 5,
    paddingVertical: 15,
    justifyContent: 'center',
    elevation: 2, // Adicionando sombra no Android
    shadowColor: '#470214', // Adicionando sombra no iOS
    shadowOffset: { width: 0, height: 2 }, // Adicionando sombra no iOS
    shadowOpacity: 0.8, // Adicionando sombra no iOS
    shadowRadius: 4, // Adicionando sombra no iOS
  },
  botaoVerMaisTexto: {
    color: '#FBF3DE',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center', 
  },
  name: {
    marginTop: 10,
    fontSize: 22,
    color: '#470214',
    fontWeight: 'bold',
    alignContent: 'center',

  },
  price: {
    fontSize: 15,
    color: '#470214',
  
    textShadowColor: '#470214',
 
  },
  description: {
    fontSize: 18,
    marginTop: 10,
  },
  botaoDeletar: {
    position: 'absolute',
    top: 3,
    right: 22,
    bottom:6,
    backgroundColor: '#7A091B',
    padding: 5,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
});
