import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Menu from './src/components/Menu/Menu'
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import Context from "./src/context";

export default function App() {

  const [store, setStore] = useState({
    main: {
      value: 'Company',
      change: changeMain,
    },
  });

  function changeMain(newValue) {
    setStore((oldState) => {
      oldState.main.value = newValue;
      return { ...oldState };
    });
  }

  return (
    <NavigationContainer>
      <View style={styles.container}>
        <Context.Provider value={store}>
          <Menu />
        </Context.Provider>
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
