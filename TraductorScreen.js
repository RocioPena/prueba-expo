import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
  Modal,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useFonts, Poppins_300Light, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import AppLoading from 'expo-app-loading'; // Asegúrate de importar AppLoading
import * as Speech from 'expo-speech'; // Importa Speech desde expo-speech
import translations from './data/palabras.json'; // Ajusta la ruta según tu estructura
import AntDesign from '@expo/vector-icons/AntDesign';

const { width } = Dimensions.get('window');

const TraductorScreen = ({ temaOscuro }) => {
  const [textoEntrada, setTextoEntrada] = useState('');
  const [textoTraducido, setTextoTraducido] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [idiomaOrigen, setIdiomaOrigen] = useState('es');
  const [idiomaDestino, setIdiomaDestino] = useState('nah');
  const [modalVisible, setModalVisible] = useState(false);
  const [recording, setRecording] = useState(false); // Estado para la grabación

  const [fontsLoaded] = useFonts({
    Poppins_300Light,
    Poppins_600SemiBold,
  });

  const traducirTexto = () => {
    setIsLoading(true);
    const traduccion = translations[textoEntrada] || 'Traducción no encontrada';
    setTextoTraducido(traduccion);
    setIsLoading(false);
    setModalVisible(true);
  };

  const cambiarIdiomaOrigen = (idioma) => {
    setIdiomaOrigen(idioma);
    limpiarTraduccion();
  };

  const cambiarIdiomaDestino = (idioma) => {
    setIdiomaDestino(idioma);
    limpiarTraduccion();
  };

  const limpiarTraduccion = () => {
    setTextoEntrada('');
    setTextoTraducido('');
    setModalVisible(false);
  };

  const reproducirPronunciacion = () => {
    if (textoTraducido) {
      Speech.speak(textoTraducido, { language: idiomaDestino });
    }
  };

  const iniciarGrabacion = () => {
    // Lógica para iniciar la grabación
    setRecording(true);
  };

  const detenerGrabacion = () => {
    // Lógica para detener la grabación
    setRecording(false);
  };

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  const themeStyles = styles(temaOscuro);

  return (
    <LinearGradient
      colors={temaOscuro ? ['#1e1e1e', '#333'] : ['#ACC5E9', '#FFFFFF']}
      style={themeStyles.container}>
      <View style={themeStyles.cardContainer}>
        <View style={themeStyles.idiomaContainer}>
          <Picker
            selectedValue={idiomaOrigen}
            style={[
              themeStyles.idiomaPicker,
              idiomaOrigen === 'es' && themeStyles.idiomaPickerSelected,
            ]}
            onValueChange={(itemValue) => cambiarIdiomaOrigen(itemValue)}>
            <Picker.Item label="Español" value="es" />
            <Picker.Item label="Náhuatl" value="nah" />
          </Picker>

          <TouchableOpacity
            style={themeStyles.swapButton}
            onPress={() => {
              const temp = idiomaOrigen;
              setIdiomaOrigen(idiomaDestino);
              setIdiomaDestino(temp);
            }}>
            <AntDesign name="swap" size={24} color="black" />
          </TouchableOpacity>

          <Picker
            selectedValue={idiomaDestino}
            style={[
              themeStyles.idiomaPicker,
              idiomaDestino === 'nah' && themeStyles.idiomaPickerSelected,
            ]}
            onValueChange={(itemValue) => cambiarIdiomaDestino(itemValue)}>
            <Picker.Item label="Español" value="es" />
            <Picker.Item label="Náhuatl" value="nah" />
          </Picker>
        </View>

        <TextInput
          style={themeStyles.input}
          placeholder={`Escribe el texto en ${idiomaOrigen === 'es' ? 'Español' : 'Náhuatl'}`}
          placeholderTextColor={temaOscuro ? '#888' : '#AAA'}
          value={textoEntrada}
          onChangeText={setTextoEntrada}
        />
        
        <View style={themeStyles.buttonsContainer}>
          <TouchableOpacity
            style={themeStyles.translateButton}
            onPress={traducirTexto}
            disabled={isLoading}>
            <Text style={themeStyles.buttonText}>Traducir</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={themeStyles.recordButton}
            onPress={recording ? detenerGrabacion : iniciarGrabacion}>
            <Text style={themeStyles.buttonText}>
              {recording ? 'Detener' : 'Grabar'}
            </Text>
          </TouchableOpacity>
        </View>
        
        {isLoading && (
          <ActivityIndicator
            size="large"
            color={temaOscuro ? '#FFFFFF' : '#000000'}
          />
        )}
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={themeStyles.modalOverlay}>
          <View style={themeStyles.modalContent}>
            <Text style={themeStyles.resultado}>{textoTraducido}</Text>
            <View style={themeStyles.modalButtonsContainer}>
              <TouchableOpacity
                style={themeStyles.playButton}
                onPress={reproducirPronunciacion}
                disabled={!textoTraducido}>
                <Text style={themeStyles.buttonText}>Reproducir</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={themeStyles.closeButton}
                onPress={() => setModalVisible(false)}>
                <Text style={themeStyles.buttonText}>Cerrar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </LinearGradient>
  );
};

const styles = (temaOscuro) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 15,
      backgroundColor: temaOscuro ? '#1e1e1e' : '#ffffff',
    },
    cardContainer: {
      width: width * 0.9,
      padding: 20,
      borderRadius: 15,
      backgroundColor: temaOscuro ? '#333' : '#FFF',
      shadowColor: temaOscuro ? '#000' : '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 10,
      elevation: 5,
      alignItems: 'center',
    },
    idiomaContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
      marginBottom: 20,
    },
    idiomaPicker: {
      width: '40%',
      height: 50,
      color: temaOscuro ? '#FFF' : '#000',
      borderColor: temaOscuro ? '#ffffff' : '#a6a8ab',
      borderWidth: 1,
      borderRadius: 8,
      backgroundColor: temaOscuro ? '#444' : '#FFF',
      fontFamily: 'Poppins_300Light',
    },
    idiomaPickerSelected: {
      borderColor: temaOscuro ? '#ffffff' : '#a6a8ab',
    },
    swapButton: {
      backgroundColor: 'transparent',
      alignItems: 'center',
      justifyContent: 'center',
      width: 50,
      height: 50,
      marginHorizontal: 10,
    },
    input: {
      width: '100%',
      height: 50,
      borderColor: temaOscuro ? '#ffffff' : '#a6a8ab',
      borderWidth: 1,
      borderRadius: 8,
      paddingHorizontal: 12,
      marginBottom: 20,
      color: temaOscuro ? '#FFF' : '#000',
      fontFamily: 'Poppins_300Light',
      fontSize: 16,
    },
    buttonsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      marginBottom: 20,
    },
    translateButton: {
      backgroundColor: temaOscuro ? '#FF7D00' : '#FF7D00',
      paddingVertical: 12,
      paddingHorizontal: 20,
      shadowColor: temaOscuro ? '#FF4040' : '#FF4040',
      shadowOffset: { width: 0, height: 5 },
      shadowOpacity: temaOscuro ? 0.5 : 0.3,
      shadowRadius: 8,
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: 'center',
      width: 110,
      height: 50,
    },
    recordButton: {
      backgroundColor: temaOscuro ? '#4CAF50' : '#4CAF50',
      paddingVertical: 12,
      paddingHorizontal: 20,
      shadowColor: temaOscuro ? '#4CAF50' : '#4CAF50',
      shadowOffset: { width: 0, height: 5 },
      shadowOpacity: temaOscuro ? 0.5 : 0.3,
      shadowRadius: 8,
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: 'center',
      width: 110,
      height: 50,
    },
    playButton: {
      backgroundColor: temaOscuro ? '#57c036' : '#57c036',
      paddingVertical: 12,
      paddingHorizontal: 20,
      shadowColor: temaOscuro ? '#57c036' : '#57c036',
      shadowOffset: { width: 0, height: 5 },
      shadowOpacity: temaOscuro ? 0.5 : 0.3,
      shadowRadius: 8,
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: 'center',
      width: 110,
      height: 50,
    },
    closeButton: {
      backgroundColor: temaOscuro ? '#FF4040' : '#FF4040',
      paddingVertical: 12,
      paddingHorizontal: 20,
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: 'center',
      width: 110,
      height: 50,
    },
    buttonText: {
      fontSize: 14,
      fontFamily: 'Poppins_300Light',
      color: '#ffffff',
    },
    resultado: {
      fontSize: 18,
      color: temaOscuro ? '#CCC' : '#333',
      fontFamily: 'Poppins_400Regular',
      textAlign: 'center',
      marginVertical: 20,
      width: '100%',
      backgroundColor: temaOscuro ? '#1e1e1e' : '#ffffff',
      borderRadius: 20,
      padding: 20,
      shadowColor: temaOscuro ? '#000' : '#000',
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: temaOscuro ? 0.5 : 0.3,
      shadowRadius: 15,
      elevation: 10,
      borderWidth: 1,
      borderColor: temaOscuro ? '#333' : '#ddd',
    },
    modalOverlay: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
      width: width * 0.9,
      backgroundColor: temaOscuro ? '#1e1e1e' : '#ffffff',
      borderRadius: 20,
      padding: 20,
      alignItems: 'center',
      shadowColor: temaOscuro ? '#000' : '#000',
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: temaOscuro ? 0.5 : 0.3,
      shadowRadius: 15,
      elevation: 10,
      borderWidth: 1,
      borderColor: temaOscuro ? '#333' : '#ddd',
    },
    modalButtonsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 20,
      width: '100%',
    },
  });

export default TraductorScreen;
