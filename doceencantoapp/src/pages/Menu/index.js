import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { menuStyles } from '../Styles/menuStyles';
import api, { findCakeInfo } from '../../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Menu() {
  const navigation = useNavigation();
  const [cakes, setCakes] = useState([]);

  const handleVermais = (cake) => {
    navigation.navigate('InfoCake', cake);
  };

  const getAllCake = async () => {
    const cakeData = [];

    for (var i = 1; i <= 6; i++) {
      const response = await findCakeInfo(i);
      if (response.name !== '' || response.name) {
        cakeData.push(response);
      }
    }

    const pairs = [];
    for (let i = 0; i < cakeData.length; i += 2) {
      pairs.push(cakeData.slice(i, i + 2));
    }

    setCakes(pairs);
  };

  useEffect(() => {
    getAllCake();
  }, []);

  return (
    <ScrollView style={menuStyles.container}>
      {cakes.map((pair, rowIndex) => (
        <View key={rowIndex} style={menuStyles.rowContainer}>
          {pair.map((cake, colIndex) => (
            <View key={colIndex} style={menuStyles.cakeContainer}>
              <Image
                style={menuStyles.imagem}
                source={{ uri: cake.imageUrl }}
              />
              <Text style={menuStyles.cakeName}>{cake.name}</Text>
              <View style={menuStyles.cakePrice}>
                <Text>R$ {cake.price},00</Text>
              </View>
              <View style={menuStyles.containerBotaoVerMais}>
                <TouchableOpacity
                  style={menuStyles.botaoVerMais}
                  onPress={() => handleVermais(cake)}>
                  <Text style={menuStyles.botaoVerMaisTexto}>Ver Mais</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      ))}
    </ScrollView>
  );
}
