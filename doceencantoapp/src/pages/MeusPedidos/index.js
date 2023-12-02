import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { findUserOrders } from '../../services/api';
import { myordersStyles } from '../Styles/myordersStyles';
import { Card, Title, Paragraph } from 'react-native-paper';

export default function MeusPedidos({ route }) {
  const [order, setOrder] = useState(route.params);
  const [price, setPrice] = useState(0);
  const [userOrders, setUserOrders] = useState([]);
  const [userName, setUserName] = useState('');
  const [orderNumberData, setOrderNumberData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const email = await AsyncStorage.getItem('usuario');
        const userOrdersData = await findUserOrders(email);
        setUserOrders(userOrdersData);
        setUserName(email ?? '');
      } catch (error) {
        console.error('Erro ao buscar pedidos do usuário:', error);
      }
    };

    fetchData();
  }, [userOrders]);

  const OrderCard = ({ order }) => (
    <Card style={myordersStyles.card}>
      <Card.Content>
        <Title>Número do Pedido: {order.orderNumber}</Title>
        <Paragraph>Data: {order.orderDate}</Paragraph>
        <Paragraph>Hora: {order.orderTime}</Paragraph>
        <Paragraph>Preço: R$ {order.orderPrice},00</Paragraph>
      </Card.Content>
    </Card>
  );

  return (
    <ScrollView>
      <View style={myordersStyles.container}>
        <Text style={myordersStyles.titulo}>Olá, {userName}!</Text>
        <Text style={myordersStyles.subtitulo}>Histórico de Pedidos:</Text>
        {userOrders &&
          userOrders.map((userOrder, index) => (
            <OrderCard key={index} order={userOrder} />
          ))}
      </View>
    </ScrollView>
  );
}
