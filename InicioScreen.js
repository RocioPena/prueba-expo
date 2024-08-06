import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts, Poppins_400Regular, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import AppLoading from 'expo-app-loading';
import startImage from './assets/Cabeza.png'; 
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const InicioScreen = ({ navigation, temaOscuro }) => {
  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  const handleBack = () => {
    navigation.navigate('Welcome');
  };

  return (
    <LinearGradient
      colors={temaOscuro ? ['#333', '#555'] : ['#FFF', '#ACC5E9']} // Degradado adaptativo
      style={styles.container}
    >
      <TouchableOpacity 
        onPress={handleBack} 
        style={[styles.volverButton, { backgroundColor: temaOscuro ? '#444' : '#f7f9f9' }]}
      >
        <Ionicons name="arrow-back" size={24} color={temaOscuro ? '#FDF6E3' : '#333'} />
      </TouchableOpacity>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Image
          source={startImage}
          style={styles.image}
        />
        <Text style={[styles.title, { color: temaOscuro ? '#FDF6E3' : '#333' }]}>¡Bienvenido a Nanhu!</Text>
        <Text style={[styles.description, { color: temaOscuro ? '#FDF6E3' : '#555' }]}>
          Nanhu es tu herramienta definitiva para traducir y consultar Náhuatl. Con nuestra app puedes:
        </Text>
        <Feature
          iconName="search"
          title="Traducción Rápida"
          description="Traduce textos entre Español y Náhuatl fácilmente, tanto en escrito como en audio."
          temaOscuro={temaOscuro}
        />
        <Feature
          iconName="book"
          title="Diccionario Completo"
          description="Consulta definiciones, sinónimos y ejemplos para enriquecer tu vocabulario."
          temaOscuro={temaOscuro}
        />
        <Feature
          iconName="microphone"
          title="Pronunciación en Tiempo Real"
          description="Escucha la pronunciación correcta de palabras en Náhuatl."
          temaOscuro={temaOscuro}
        />
      </ScrollView>
    </LinearGradient>
  );
};

const Feature = ({ iconName, title, description, temaOscuro }) => (
  <View style={styles.featureOuterContainer}>
    <View style={[styles.featureBorder, { borderColor: temaOscuro ? '#555' : '#ACC5E9' }]}>
      <View style={styles.featureContainer}>
        <Ionicons name={iconName} size={32} color={temaOscuro ? '#007BFF' : '#007BFF'} style={styles.featureIcon} />
        <View style={styles.featureTextContainer}>
          <Text style={[styles.featureTitle, { color: temaOscuro ? '#FDF6E3' : '#333' }]}>{title}</Text>
          <Text style={[styles.featureDescription, { color: temaOscuro ? '#FDF6E3' : '#666' }]}>{description}</Text>
        </View>
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: width * 0.85,
    height: width * 0.45,
    resizeMode: 'contain',
    borderRadius: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Poppins_600SemiBold',
    textAlign: 'center',
    marginBottom: 15,
  },
  description: {
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
    textAlign: 'center',
    marginBottom: 25,
    paddingHorizontal: 10,
  },
  featureOuterContainer: {
    width: '100%',
    marginBottom: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  featureBorder: {
    borderRadius: 12,
    borderWidth: 2,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  featureContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  featureIcon: {
    marginRight: 15,
  },
  featureTextContainer: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 18,
    fontFamily: 'Poppins_600SemiBold',
    marginBottom: 5,
  },
  featureDescription: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
  },
  volverButton: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    padding: 12,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
});

export default InicioScreen;
