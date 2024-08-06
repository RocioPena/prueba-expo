import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import TraductorScreen from './TraductorScreen';
import InicioScreen from './InicioScreen';
import DiccionarioScreen from './DiccionarioScreen';

const Tab = createBottomTabNavigator();

const iconColor = {
  active: '#007BFF',
  inactive: '#6C757D',
  inicio: '#0444ab',
  traductor: '#1c7b1c',
  diccionario: '#a40404',
};

const MainTabs = ({ temaOscuro, alternarTema }) => {
  const [opacity] = useState(new Animated.Value(1));

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [opacity]);

  return (
    <View style={{ flex: 1 }}>
      <Tab.Navigator 
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused }) => {
            let iconName;
            let color;
            switch (route.name) {
              case 'Inicio':
                iconName = 'home';
                color = iconColor.inicio;
                break;
              case 'Traductor':
                iconName = 'translate';
                color = iconColor.traductor;
                break;
              case 'Diccionario':
                iconName = 'book';
                color = iconColor.diccionario;
                break;
              default:
                iconName = 'circle';
                color = iconColor.inicio;
            }

            return (
              <MaterialCommunityIcons
                name={iconName}
                size={24}
                color={color}
                style={focused ? { opacity: opacity } : {}}
              />
            );
          },
        })}
      >
        <Tab.Screen name="Inicio" component={InicioScreen} />
        <Tab.Screen name="Traductor" component={TraductorScreen} />
        <Tab.Screen name="Diccionario" component={DiccionarioScreen} />
      </Tab.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  // Aquí puedes agregar estilos personalizados si es necesario
});

export default MainTabs;
