import React from 'react';
import { View, Image } from 'react-native';
import { Title, Paragraph } from 'react-native-paper';

export default function DetailsScreen({ route }) {
  const { pokemon } = route.params;

  return (
    <View style={{ padding: 16 }}>
      <Image source={{ uri: pokemon.image }} style={{ height: 300, borderRadius: 8 }} />
      <Title>{pokemon.name}</Title>
      <Paragraph>Tipo: {pokemon.type}</Paragraph>
      <Paragraph style={{ marginTop: 10 }}>{pokemon.description}</Paragraph>
    </View>
  );
}
