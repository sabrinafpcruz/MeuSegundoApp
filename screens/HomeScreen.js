import React, { useEffect, useState } from 'react';
import { View, FlatList, Alert } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import * as Location from 'expo-location';

export default function HomeScreen({ navigation }) {
  const [pokemons, setPokemons] = useState([]);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    fetchPokemons();
    getLocation();
  }, []);

  const fetchPokemons = async () => {
    try {
      const response = await fetch('http://192.168.1.107:3001/pokemons'); // substitua <SEU_IP_LOCAL>
      const data = await response.json();
      setPokemons(data);
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Não foi possível carregar os Pokémons.");
    }
  };

  const getLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') return;
    const loc = await Location.getCurrentPositionAsync({});
    setLocation(loc.coords);
  };

  const renderItem = ({ item }) => (
    <Card style={{ margin: 10 }} onPress={() => navigation.navigate('Details', { pokemon: item })}>
      <Card.Cover source={{ uri: item.image }} />
      <Card.Content>
        <Title>{item.name}</Title>
        <Paragraph>{item.type}</Paragraph>
      </Card.Content>
    </Card>
  );

  return (
    <View style={{ flex: 1 }}>
      <FlatList data={pokemons} keyExtractor={item => item.id} renderItem={renderItem} />
    </View>
  );
}
