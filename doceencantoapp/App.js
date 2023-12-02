import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign, Ionicons, FontAwesome } from '@expo/vector-icons';
import LoginScreen from './src/pages/Login/index';
import Menu from './src/pages/Menu/index';
import CriarPedido from './src/pages/CriarPedido/index';
import MeusPedidos from './src/pages/MeusPedidos/index';
import InfoCake from './src/pages/Menu/InfoCake/index';
import { menuStyles } from './src/pages/Styles/menuStyles';
import api, { deleteUser } from './src/services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Feather } from '@expo/vector-icons';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function Deletar({ navigation }) {
  const handleDeletarUsuario = async () => {
    try {
      // aqui é o e-mail que ficou guardado no AsyncStorage
      const usuario = await AsyncStorage.getItem('usuario');

      // Deleta o usuário e seus pedidos
      const mensagemDeletarUsuario = await deleteUser(usuario);

      // Exibir no log
      //console.log(mensagemDeletarUsuario);

      // tirar o e-mail do AsyncStorage
      await AsyncStorage.removeItem('usuario');

      // ir para a tela de login depois de excluir
      navigation.navigate('Login');
    } catch (error) {
      console.error('Erro ao deletar usuário:', error);
    }
  };

  return (
    <TouchableOpacity
      style={menuStyles.botaoDeletar}
      onPress={handleDeletarUsuario}>
      <View>
        <Feather name="power" size={20} color="#FBF3DE" />
      </View>
    </TouchableOpacity>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" headerMode="none">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="CakeInfo" component={BottomTabNavigator} />
        <Stack.Screen name="InfoCake" component={InfoCake} />
        <Stack.Screen name="Meus Pedidos" component={BottomTabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const BottomTabNavigator = ({ navigation }) => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Menu"
        component={Menu}
        options={{
          headerRight: () => <Deletar navigation={navigation} />,
          tabBarLabel: 'Menu',
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="menuunfold" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Criar Pedido"
        component={CriarPedido}
        options={{
          headerRight: () => <Deletar navigation={navigation} />,
          tabBarLabel: 'Criar Pedido',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="create-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Meus Pedidos"
        component={MeusPedidos}
        options={{
          headerRight: () => <Deletar navigation={navigation} />,
          tabBarLabel: 'Meus Pedidos',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="list-alt" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
