import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  useFonts,
  AbrilFatface_400Regular,
} from '@expo-google-fonts/abril-fatface';
import loginStyles from '../Styles/styles';
import { findUserOrders, createUserOrder } from '../../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [userOrders, setUserOrders] = useState([]);

  let [fontsLoaded] = useFonts({
    'AbrilFatface-Regular': AbrilFatface_400Regular,
  });

  const handleLogin = async () => {
    const orders = await findUserOrders(email);
    console.log(orders);

    if (orders) {
      setUserOrders(orders);
      await AsyncStorage.setItem('usuario', email);

      console.log('Pedidos do usuário:', orders);

      navigation.navigate('CakeInfo');
    } else {
      console.log('Usuário não cadastrado.');
    }
  };

  useEffect(() => {}, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}>
      <View style={loginStyles.container}>
        <View>
          <Text
            style={[
              loginStyles.titleLogin,
              { fontFamily: 'AbrilFatface-Regular' },
            ]}>
            Doce Encanto
          </Text>
        </View>
        <View style={loginStyles.inputContainer}>
          <Text style={loginStyles.titleLogin2}>Entrar</Text>

          <Text style={loginStyles.email}>Usuário</Text>
          <TextInput
            style={loginStyles.input}
            placeholder="Digite seu usuário"
            onChangeText={setEmail}
          />
          <Text style={loginStyles.senha}>Senha</Text>
          <TextInput
            style={loginStyles.input}
            placeholder="Digite sua senha"
            secureTextEntry
          />
          <TouchableOpacity style={loginStyles.button} onPress={handleLogin}>
            <Text style={loginStyles.buttonText}>Entrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
