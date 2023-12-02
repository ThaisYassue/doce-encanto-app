import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  Image,
  TouchableOpacity,
  TextInput,
  Button,
  Switch,
  Platform,
  Slider as SliderWeb,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Slider from '@react-native-community/slider';
import { useNavigation } from '@react-navigation/native';
import { orderStyles } from '../Styles/orderStyles';
import api, { findCakeInfo } from '../../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createUserOrder } from '../../services/api';

export default function CriarPedido() {
  const navigation = useNavigation();

  const [price, setPrice] = useState(0);
  const [cakes, setCakes] = useState([]);
  const [reload, setReload] = useState(false);

  const handleOrder = async () => {
    await createOrder().then(() => {
      setPrice(0);
      setReload(!reload);
      navigation.navigate('Meus Pedidos');
    });
  };

  const setQuantity = (type, index) => {
    setCakes((prevState) => {
      return prevState.map((cake, indexCake) => {
        if (indexCake === index) {
          type === 'increment' ? (cake.quantity += 1) : (cake.quantity -= 1);
          return cake;
        }
        return cake;
      });
    });
  };

  useEffect(() => {
    const calcularTotal = async () => {
      var priceTotal = 0;

      cakes.map((cake) => {
        priceTotal += cake.price * cake.quantity;
      });

      await gravaNome(priceTotal);

      setPrice(priceTotal);
    };

    calcularTotal();
  }, [cakes]);

  const createOrder = async () => {
    try {
      await createUserOrder(await AsyncStorage.getItem('usuario'), price);
      //console.log(response);
    } catch (error) {
      console.error('Erro ao criar pedido:', error);
    }
  };

  const gravaNome = async (priceTotal) => {
    await AsyncStorage.setItem('priceTotal', JSON.stringify(priceTotal));
  };

  const getAllCake = async () => {
    for (var i = 1; i <= 6; i++) {
      const response = await findCakeInfo(i);
      //console.log('test ', response);
      if (response.name != '' || response.name) {
        setCakes((prevState) => [...prevState, response]);
      }
    }
  };

  useEffect(() => {
    setCakes([]);
    getAllCake();
  }, [reload]);

  const [contador, setContador] = useState(0);
  const [status, setStatus] = useState(false);
  const [formato, setFormato] = useState('');
  const [tamanho, setTamanho] = useState(1);
  const [observacao, setObservacao] = useState('');

  const obterTamanhoTexto = () => {
    if (tamanho === 0) {
      return 'P';
    } else if (tamanho === 2) {
      return 'G';
    } else {
      return 'M';
    }
  };

  function atualizarContador(incrementar) {
    if (incrementar) setContador(contador + 1);
    else if (contador > 0) setContador(contador - 1);
  }

  return (
    <ScrollView>
      <SafeAreaView style={orderStyles.container}>
        <ScrollView style={{ padding: 20 }}>
          {cakes.map((cake, index) => (
            <React.Fragment key={index}>
              <View style={orderStyles.cakeItemContainer}>
                <Text style={orderStyles.cakeName}>{cake.name}</Text>
                <View style={orderStyles.cakeInfoContainer}>
                  <View>
                    <Image
                      style={orderStyles.cakeImage}
                      source={{ uri: cake.imageUrl }}
                    />
                    <Text style={orderStyles.cakePrice}>
                      R$ {cake.price},00
                    </Text>
                  </View>

                  <View>
                    <Text style={orderStyles.quantityText}>Quantidade:</Text>
                    <View style={orderStyles.quantityContainer}>
                      <TouchableOpacity
                        style={orderStyles.quantityButton}
                        onPress={() =>
                          cake.quantity > 0 && setQuantity('decrement', index)
                        }>
                        <Text style={orderStyles.quantityButtonText}>-</Text>
                      </TouchableOpacity>
                      <Text style={{ fontSize: 20 }}>{cake.quantity}</Text>
                      <TouchableOpacity
                        style={orderStyles.quantityButton}
                        onPress={() => setQuantity('increment', index)}>
                        <Text style={orderStyles.quantityButtonText}>+</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>

                <View style={orderStyles.switchContainer}>
                  <Text>Quer confeito na cobertura? </Text>
                  <Switch
                    value={cake.candy}
                    onValueChange={(valorSwitch) =>
                      setCakes((prevState) => {
                        return prevState.map((cake, indexCake) => {
                          if (indexCake === index) {
                            cake.candy = valorSwitch;
                            return cake;
                          }
                          return cake;
                        });
                      })
                    }
                  />
                  <Text style={orderStyles.switchText}>
                    {cake.candy ? 'Sim' : 'Não'}
                  </Text>
                </View>
                <View
                  style={Platform.OS === 'ios' && orderStyles.pickerContainer}>
                  <Text>Formato:</Text>
                  <Picker
                    style={{ width: '100%', height: 30 }}
                    selectedValue={cake.format}
                    onValueChange={(itemValue) =>
                      setCakes((prevState) => {
                        return prevState.map((cake, indexCake) => {
                          if (indexCake === index) {
                            cake.format = itemValue;
                            return cake;
                          }
                          return cake;
                        });
                      })
                    }>
                    <Picker.Item
                      key={''}
                      value={''}
                      label="Selecione o formato do bolo"
                    />
                    <Picker.Item key={1} value={'Redondo'} label="Redondo" />
                    <Picker.Item key={2} value={'Quadrado'} label="Quadrado" />
                  </Picker>
                </View>

                <View style={orderStyles.sizeSliderContainer}>
                  <Text style={orderStyles.sizeSliderText}>
                    Tamanho do Bolo:
                  </Text>
                  {Platform.OS == 'android' || Platform.OS == 'ios' ? (
                    <SliderWeb
                      minimumValue={0}
                      maximumValue={2}
                      step={1}
                      value={tamanho}
                      onValueChange={(valor) =>
                        setCakes((prevState) => {
                          return prevState.map((cake, indexCake) => {
                            if (indexCake === index) {
                              cake.size = valor;
                              return cake;
                            }
                            return cake;
                          });
                        })
                      }
                    />
                  ) : (
                    <Slider
                      minimumValue={0}
                      maximumValue={2}
                      step={1}
                      value={tamanho}
                      onValueChange={(valor) =>
                        setCakes((prevState) => {
                          return prevState.map((cake, indexCake) => {
                            if (indexCake === index) {
                              cake.size = valor;
                              return cake;
                            }
                            return cake;
                          });
                        })
                      }
                    />
                  )}
                  <View style={orderStyles.sizeTextContainer}>
                    <Text>P</Text>
                    <Text>M</Text>
                    <Text>G</Text>
                  </View>
                </View>
                <View style={orderStyles.observationContainer}>
                  <Text>Deseja escrever alguma observação? </Text>
                  <TextInput
                    style={orderStyles.observationInput}
                    placeholder="Observações"
                    onChangeText={setObservacao}
                  />
                </View>
              </View>
            </React.Fragment>
          ))}
          <View style={orderStyles.totalPriceContainer}>
            <Text style={orderStyles.totalPriceLabel}>
              Valor Total a Pagar:
            </Text>
            <Text style={orderStyles.totalPriceValue}>
              R$ {price.toFixed(2)}
            </Text>
          </View>
          <Button
            title="Enviar Pedido"
            onPress={handleOrder}
            style={orderStyles.orderButton}
          />
        </ScrollView>
      </SafeAreaView>
    </ScrollView>
  );
}
