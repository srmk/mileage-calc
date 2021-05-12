import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet } from 'react-native';
// import { DefaultTheme, Provider as PaperProvider, FAB } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Navigation } from './src/components/Navigation';
import { navigationRef } from './src/components/Navigation/navigation_helper';
import SplashScreen from "react-native-splash-screen";

export default function App() {
  React.useEffect(() => {
    SplashScreen.hide();
  });
  return (
    <NavigationContainer ref={navigationRef}>
      <SafeAreaProvider>
        <Navigation />
      </SafeAreaProvider>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
})