import React, { useState, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  RefreshControl,
  Dimensions
} from 'react-native';
import { useFonts, Poppins_300Light, Poppins_400Regular, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import { LinearGradient } from 'expo-linear-gradient'; 
import vocabularioData from './data/palabras.json'; // Ajusta la ruta si es necesario

const { width } = Dimensions.get('window');

const DiccionarioScreen = ({ temaOscuro }) => {
  const [vocabulario, setVocabulario] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const [fontsLoaded] = useFonts({
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_600SemiBold,
  });

  useEffect(() => {
    // Convertir el objeto JSON en una lista de objetos
    const vocabularioArray = Object.entries(vocabularioData).map(([palabra, traduccion]) => ({
      id: palabra, // Usa la palabra como ID única
      palabra,
      traduccion,
    }));
    setVocabulario(vocabularioArray);
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  }, []);

  const vocabularioBusqueda = vocabulario.filter((item) =>
    item.palabra.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderItem = ({ item }) => (
    <View style={[styles.item, temaOscuro ? styles.itemOscuro : styles.itemClaro]}>
      <View style={styles.textContainer}>
        <Text style={[styles.palabra, temaOscuro ? styles.textoOscuro : styles.textoClaro]}>
          {item.palabra}
        </Text>
        <Text style={[styles.traduccion, temaOscuro ? styles.textoOscuro : styles.textoClaro]}>
          {item.traduccion}
        </Text>
      </View>
    </View>
  );

  if (!fontsLoaded) {
    return (
      <View style={styles.container}>
        <Text style={[styles.cargandoTexto, temaOscuro ? styles.textoOscuro : styles.textoClaro]}>
          Cargando fuentes...
        </Text>
      </View>
    );
  }

  return (
    <LinearGradient
      colors={temaOscuro ? ['#333', '#444'] : ['#FFF', '#ACC5E9']}
      style={[styles.container, temaOscuro ? styles.containerOscuro : styles.containerClaro]}
    >
      <TextInput
        style={[styles.searchInput, temaOscuro ? styles.inputOscuro : styles.inputClaro]}
        placeholder="Buscar palabra..."
        placeholderTextColor={temaOscuro ? "#ccc" : "#666"}
        onChangeText={setSearchTerm}
        value={searchTerm}
      />
      <FlatList
        data={vocabularioBusqueda}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        contentContainerStyle={styles.listContainer}
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 0, // Ajusta el padding para que el TextInput esté bien pegado al borde
  },
  containerOscuro: {
    backgroundColor: '#333',
  },
  containerClaro: {
    backgroundColor: '#fff',
  },
  searchInput: {
    height: 55,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
    fontFamily: 'Poppins_300Light',
    fontSize: 19,
    backgroundColor: '#FFF', // Fondo blanco para el input
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  inputOscuro: {
    color: '#fff',
    backgroundColor: '#444',
    borderColor: '#666',
  },
  inputClaro: {
    color: '#000',
    backgroundColor: '#fff',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 2,
    marginBottom: 16,
    paddingHorizontal: 12,
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  itemOscuro: {
    backgroundColor: '#444',
    borderColor: '#555',
  },
  itemClaro: {
    backgroundColor: '#fff',
    borderColor: '#ccc',
  },
  palabra: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 18,
    color: '#333',
    flex: 1,
  },
  traduccion: {
    fontFamily: 'Poppins_300Light',
    fontSize: 16,
    color: '#666',
    flex: 1,
    textAlign: 'right',
  },
  textoOscuro: {
    color: '#ffffff',
  },
  textoClaro: {
    color: '#333',
  },
  listContainer: {
    flexGrow: 1,
  },
  cargandoTexto: {
    fontFamily: 'Poppins_300Light',
    fontSize: 16,
  },
});

export default DiccionarioScreen;
