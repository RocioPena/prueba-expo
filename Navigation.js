import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, StyleSheet, TouchableOpacity, Image, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import TraductorScreen from './TraductorScreen';
import WelcomeScreen from './WelcomeScreen';
import InicioScreen from './InicioScreen';
import DiccionarioScreen from './DiccionarioScreen';
import { useFonts, Poppins_400Regular } from '@expo-google-fonts/poppins';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const iconColor = {
  active: '#333',
  inactive: '#888',
  inicio: '#555',
  traductor: '#444',
  diccionario: '#222',
};

// Custom header component
const HeaderTitle = ({ temaOscuro }) => (
  <View style={styles.headerContainer}>
    <View style={styles.leftHeaderContainer}>
      <Image
        source={require('./assets/Cabeza.png')} 
        style={styles.logo}
      />
      <Text style={[styles.headerTitleText, { color: temaOscuro ? '#FDF6E3' : '#333' }]}>Nanhu</Text>
    </View>
    {/* Removed icon from the header */}
  </View>
);

const MainTabs = ({ temaOscuro }) => {
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
          fontSize: 12,
          fontFamily: 'Poppins_400Regular',
        },
        tabBarActiveTintColor: iconColor.active,
        tabBarInactiveTintColor: iconColor.inactive,
        tabBarStyle: {
          backgroundColor: temaOscuro ? '#333' : '#FFFFFF',
          borderTopWidth: 0,
        },
        headerStyle: {
          backgroundColor: temaOscuro ? '#333' : '#FFFFFF',
          shadowColor: 'transparent',
          elevation: 0,
        },
        headerTitleStyle: {
          fontSize: 18,
          fontFamily: 'Poppins_400Regular',
          color: temaOscuro ? '#FDF6E3' : '#333',
        },
        headerTitle: () => <HeaderTitle temaOscuro={temaOscuro} />,
      })}
    >
      <Tab.Screen name="Inicio" component={InicioScreen} />
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
          {() => <MainTabs temaOscuro={temaOscuro} />}
        </Stack.Screen>
      </Stack.Navigator>
      <TouchableOpacity 
        onPress={alternarTema} 
        style={styles.floatingButton}
        accessible={true} 
        accessibilityLabel={temaOscuro ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'}
      >
        <MaterialCommunityIcons 
          name={temaOscuro ? 'weather-night' : 'white-balance-sunny'} 
          size={24} 
          color={temaOscuro ? '#FDF6E3' : '#F39F18'} 
        />
      </TouchableOpacity>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    flex: 1,
  },
  leftHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  logo: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  headerTitleText: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 18,
    color: '#333',
  },
  floatingButton: {
    position: 'absolute',
    bottom: 255,
    right: 20,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 14,
  },
});

export default Navigation;
