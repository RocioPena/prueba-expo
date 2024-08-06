import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import TraductorScreen from './TraductorScreen';
import WelcomeScreen from './WelcomeScreen';
import InicioScreen from './InicioScreen';
import DiccionarioScreen from './DiccionarioScreen';
import HeaderTitle from './HeaderTitle'; 

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const iconColor = {
  active: '#007BFF',
  inactive: '#6C757D',
  inicio: '#0444ab',
  traductor: '#1c7b1c',
  diccionario: '#a40404',
};

const MainTabs = ({ temaOscuro, alternarTema }) => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, size }) => {
          let iconName;
          const iconColorToUse = focused ? iconColor.active : iconColor.inactive;
          let specificColor;

          switch (route.name) {
            case 'Inicio':
              iconName = focused ? 'home' : 'home-outline';
              specificColor = iconColor.inicio;
              break;
            case 'Traductor':
              iconName = focused ? 'translate' : 'translate-outline';
              specificColor = iconColor.traductor;
              break;
            case 'Diccionario':
              iconName = focused ? 'book' : 'book-outline';
              specificColor = iconColor.diccionario;
              break;
            default:
              iconName = 'home-outline'; 
              specificColor = iconColor.inactive;
          }

          return <MaterialCommunityIcons name={iconName} size={size} color={specificColor} />;
        },
        tabBarLabelStyle: {
          fontSize: 16,
          fontFamily: 'Poppins_300Light',
        },
        tabBarActiveTintColor: iconColor.active,
        tabBarInactiveTintColor: iconColor.inactive,
        tabBarStyle: {
          backgroundColor: temaOscuro ? '#333' : '#FFFFFF',
          borderTopColor: temaOscuro ? '#333' : '#FFFFFF',
        },
        headerStyle: {
          backgroundColor: temaOscuro ? '#333' : '#FFFFFF',
          shadowColor: 'transparent', 
          elevation: 0, 
        },
        headerTitleStyle: {
          fontFamily: 'Poppins_600SemiBold',
          fontSize: 20,
          marginVertical: 5, 
        },
        headerTitle: () => <HeaderTitle temaOscuro={temaOscuro} alternarTema={alternarTema} />,
      })}
    >
      <Tab.Screen name="Inicio">
        {() => <InicioScreen temaOscuro={temaOscuro} />}
      </Tab.Screen>
      <Tab.Screen name="Traductor">
        {() => <TraductorScreen temaOscuro={temaOscuro} />}
      </Tab.Screen>
      <Tab.Screen name="Diccionario">
        {() => <DiccionarioScreen temaOscuro={temaOscuro} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

const Navigation = () => {
  const [temaOscuro, setTemaOscuro] = useState(false);

  const alternarTema = () => {
    setTemaOscuro(prevTemaOscuro => !prevTemaOscuro);
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Welcome" 
          component={WelcomeScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Main" 
          options={{ headerShown: false }}   
        >
          {() => <MainTabs temaOscuro={temaOscuro} alternarTema={alternarTema} />}
        </Stack.Screen>
      </Stack.Navigator>
      <TouchableOpacity 
        onPress={alternarTema} 
        style={[styles.floatingButton, { backgroundColor: temaOscuro ? '#333' : '#007BFF' }]} // Color de fondo adaptativo
        accessible={true} 
        accessibilityLabel={temaOscuro ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'}
      >
        <MaterialCommunityIcons 
          name={temaOscuro ? 'weather-night' : 'white-balance-sunny'} 
          size={28} 
          color={temaOscuro ? '#FDF6E3' : '#f39f18'} 
        />
      </TouchableOpacity>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  floatingButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
    shadowColor: '#000',
    borderRadius: 30,
  },
});

export default Navigation;
