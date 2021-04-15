import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { DefaultTheme, Provider as PaperProvider, FAB } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Navigation } from './src/components/Navigation';

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#3498db',
    accent: '#f1c40f',
  },
};

export default class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <SafeAreaProvider>
          <Navigation />
          <FAB
            style={styles.fab}
            animated
            icon="plus"
            color="white"
            onPress={() => console.log('Pressed')}
          />
        </SafeAreaProvider>
      </NavigationContainer>
    )
  }
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 20,
    right: 0,
    bottom: 60,
  },
})
