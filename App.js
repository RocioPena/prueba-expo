import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Navigation from './Navigation'; // Assuming Navigation is your main navigation file

export default function App() {
  return (
    <View style={styles.container}>
      <Navigation />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
