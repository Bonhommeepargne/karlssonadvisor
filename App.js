import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Menu from './src/components/Menu/Menu';
import Login from './src/components/Connection/Login/Login';
import Loader from './src/components/Loader/Loader';
import 'react-native-gesture-handler';
import Context from "./src/context";
import { NavigationContainer } from '@react-navigation/native';
import useAuth from "./src/components/Connection/Login/useAuth";
import { MenuProvider } from 'react-native-popup-menu';

export default function App() {

  const { user, userInfo } = useAuth();

  return (
    <NavigationContainer>
      <MenuProvider>
        <View style={styles.container}>
          <StatusBar style='light' backgroundColor={'#4A5E0C'} />
          <Context.Provider value={{ user, userInfo }}>
            {user === null || userInfo === null ? <Loader /> : user === -1 ? <Login /> : <Menu />}
          </Context.Provider>
        </View>
      </MenuProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
