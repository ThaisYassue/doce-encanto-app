import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Appbar, Card, Title, Paragraph } from 'react-native-paper';

export default function InfoCake({ route }) {
  const [cake, setCake] = useState(route.params);
  const navigation = useNavigation();

  function goBack() {
    navigation.goBack();
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#7A091B', justifyContent: 'center',  }}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => goBack()} />
        <Appbar.Content title={cake.name} />
      </Appbar.Header>

      <ScrollView>
        <Card style={styles.card}>
          <Card.Cover source={{ uri: cake.imageUrl }} />
          <Card.Content>
            <Title>{cake.name}</Title>
            <Paragraph>{cake.description}</Paragraph>
          </Card.Content>
          <Card.Actions>
            <Paragraph style={styles.price}>R${cake.price},00</Paragraph>
          </Card.Actions>
        </Card>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 16,
    borderRadius: 10,
    backgroundColor: '#FBF3DE',
   
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#470214',
  },
});
