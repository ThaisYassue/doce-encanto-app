import { StyleSheet } from 'react-native';

export const orderStyles = StyleSheet.create({
  container: {
    backgroundColor: '#7A091B',
  },

  cakeItemContainer: {
    padding: 10,

    marginTop: 20,
    width: '100%',
    backgroundColor: '#FBF3DE',
    borderRadius: 10,
 
  },
  cakeInfoContainer: {
    flexDirection: 'row',
    flex: 1,
 
    justifyContent: 'space-between',
  },

  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end', // Ajuste para alinhar à direita
    marginRight: 5,
  },

  quantityButton: {
    height: 20,
    width: 20,
    backgroundColor: '#7A091B',
    alignItems: 'center',
    borderRadius: 5,
    marginLeft: 5,
  },
  quantityButtonText: {
    color: 'white',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'left',
    marginTop: 10,
  },
  switchText: {
    textAlign: 'center',
    fontSize: 15,
    marginLeft: 10,
  },
  pickerContainer: {
    height: 220
  },
  sizeSliderContainer: {},
  sizeSliderText: {
    textAlign: 'center',
    fontSize: 15,
    marginTop: 10,
  },
  //P M G
  sizeTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  observationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  observationInput: {
    flex: 1,
    marginLeft: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 5,
  },

  sendOrderButton: {
    backgroundColor: '#470214',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    paddingVertical: 15,
    marginBottom: 10,
  },
  sendOrderButtonText: {
    color: '#FBF3DE',
    fontSize: 16,
    fontWeight: 'bold',
  },
  orderButton: {
    backgroundColor: '#470214',
    paddingVertical: 15,
    borderRadius: 5,
    marginBottom: 10,
  },

  cakeName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cakeImage: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
    borderRadius: 25,
    marginBottom: 5,
  },
  cakePrice: {
    fontSize: 16,
    color: '#470214',
    fontWeight: 'bold',
  },
  quantityText: {
    fontSize: 16,
  },
  switchLabel: {
    fontSize: 12,
  },
  pickerText: {
    fontSize: 16,
  },
  totalPriceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 110,
    marginBottom:30
  },
  totalPriceLabel: {
    fontSize: 16,
    color: 'white',
   
  },
  totalPriceValue: {
    fontSize: 16,
    color: 'white',

  },
});
