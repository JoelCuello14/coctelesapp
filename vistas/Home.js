import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';

const Home = () => {
  const [search, setSearch] = useState('');
  const [cocktails, setCocktails] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCocktails = async () => {
    if (!search.trim()) return;
    setLoading(true);

    const url = `https://cocktail-by-api-ninjas.p.rapidapi.com/v1/cocktail?name=${search}`;
    const options = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': '59d19c3417mshf1d790e80ee03aep1c05f7jsn3d09bf054fa0',
        'x-rapidapi-host': 'cocktail-by-api-ninjas.p.rapidapi.com',
      },
    };

    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const result = await response.json();
      setCocktails(result);
    } catch (error) {
      console.error('Error fetching cocktails:', error);
      setCocktails([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Buscador de Cócteles</Text>
      <TextInput
        style={styles.input}
        placeholder="Escribe el nombre de un cóctel"
        placeholderTextColor="#a680b8"
        value={search}
        onChangeText={setSearch}
      />
      <TouchableOpacity style={styles.button} onPress={fetchCocktails}>
        <Text style={styles.buttonText}>Buscar</Text>
      </TouchableOpacity>
      {loading && <ActivityIndicator size="large" color="#a680b8" />}
      {!loading && cocktails.length === 0 && (
        <Text style={styles.noResults}>Sin resultados</Text>
      )}
      <FlatList
        data={cocktails}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.instructions}>{item.instructions}</Text>
            <Text style={styles.ingredientsTitle}>Ingredientes:</Text>
            <FlatList
              data={item.ingredients}
              keyExtractor={(ing, idx) => idx.toString()}
              renderItem={({ item }) => (
                <Text style={styles.ingredient}>• {item}</Text>
              )}
            />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f3e5f5' }, // Fondo lila pastel
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 16, color: '#6a1b9a', textAlign: 'center' },
  input: {
    borderWidth: 1,
    borderColor: '#a680b8',
    padding: 12,
    marginBottom: 16,
    borderRadius: 10,
    backgroundColor: '#ffffff',
    fontSize: 16,
    color: '#6a1b9a',
  },
  button: {
    backgroundColor: '#7e57c2',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: { color: '#ffffff', fontSize: 16, fontWeight: 'bold' },
  noResults: { textAlign: 'center', marginVertical: 16, fontSize: 16, color: '#9c27b0' },
  card: {
    marginBottom: 16,
    backgroundColor: '#f8bbd0',
    padding: 16,
    borderRadius: 12,
    elevation: 4,
    shadowColor: '#6a1b9a',
  },
  name: { fontSize: 20, fontWeight: 'bold', marginBottom: 8, color: '#4a148c' },
  instructions: { fontSize: 14, marginBottom: 8, color: '#6a1b9a' },
  ingredientsTitle: { fontSize: 16, fontWeight: 'bold', marginTop: 8, color: '#4a148c' },
  ingredient: { fontSize: 14, color: '#4a148c' },
});

export default Home;
