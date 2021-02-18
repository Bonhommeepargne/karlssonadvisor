import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Menu from './src/components/Menu/Menu';
import Login from './src/components/Connection/Login/Login';
import 'react-native-gesture-handler';
import Context from "./src/context";
import { NavigationContainer } from '@react-navigation/native';

export default function App() {

  const [store, setStore] = useState({
    main: {
      user: null,
      change: changeUser,
    },
  });

  function changeUser(newValue) {
    setStore((oldState) => {
      oldState.main.user = newValue;
      return { ...oldState };
    });
  }

  return (
    <NavigationContainer>
      <View style={styles.container}>
        <StatusBar />
        <Context.Provider value={store}>
          {!store.main.user ? <Login /> : <Menu />}
          {/* <Menu /> */}
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
