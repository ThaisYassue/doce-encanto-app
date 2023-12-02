import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import LoginScreen from '../pages/Login/index';
import { findCakeInfo } from './api'; 

export default function App() {
  const [cakes, setCakes] = useState();
  const [cakeTypes, setCakeTypes] = useState([]);

  const navigation = useNavigation();

  const handleVermais = () => {
    // Lógica de login aqui (não se preocupar com a validação neste exemplo)

    // Redirecionar para a tela do menu principal
    navigation.navigate('MainMenu');
  };

  const getCake = async (cake) => {
    const response = await findCakeInfo(cake)
    setCakeTypes(response)
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.cakes}
        value={cakes}
        onChangeText={(texto) => setCakes(texto)}
        underlineColorAndroid="transparent"
      />

      <Button title="Entrar" onPress = {() => getCake(cakes)} />
  
          <Text style={styles.cakeTypes}>{cake.name}</Text>
          <Text style={styles.cakeTypes}>{cake.price}</Text>
          <Text style={styles.cakeTypes}>{cake.imageUrl}</Text>
          <Text style={styles.cakeTypes}>{cake.description}</Text>
    
    </View>
  );
}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cakes: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
  },
  cakeTypes: {
    fontSize: 16,
    marginBottom: 5,
  },
};
