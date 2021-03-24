import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Menu from './src/components/Menu/Menu';
import Login from './src/components/Connection/Login/Login';
import Loader from './src/components/Loader/Loader';
import 'react-native-gesture-handler';
import Context from "./src/context";
import { useFonts } from 'expo-font';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import useAuth from "./src/components/Connection/Login/useAuth";
import { MenuProvider } from 'react-native-popup-menu';
import Toast from 'react-native-toast-message';

import NSLight from './assets/fonts/NunitoSans/NunitoSansLight.ttf';
import NSRegular from './assets/fonts/NunitoSans/NunitoSansRegular.ttf';
import NSBold from './assets/fonts/NunitoSans/NunitoSansBold.ttf';
import NSExtraBold from './assets/fonts/NunitoSans/NunitoSansExtraBold.ttf'; 

export default function App() {

  const { user, userInfo, updateUserInfo, companyDisplay, newCompanyDisplay,companyArray, pushCompanyArray,
    watchList, storeWatchList, allSecurities, storeAllSecurities} = useAuth();

  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: 'black',
      background:'#FFF'
    },
  };

  const [loaded] = useFonts({
    NSLight,
    NSRegular,
    NSBold,
    NSExtraBold,
  });

  if (!loaded) {
    return (
      <Loader />
    );
  }

  return (
    <>
    <NavigationContainer theme={MyTheme}>
      <MenuProvider>
        <View style={styles.container}>
          <StatusBar style='light' backgroundColor={'#4A5E0C'} />
          <Context.Provider value={{ user, userInfo, updateUserInfo, companyDisplay, newCompanyDisplay,
              companyArray, pushCompanyArray, watchList, storeWatchList, allSecurities, storeAllSecurities }}>
            { !user || !userInfo ? <Loader /> : user === -1 ? <Login /> : <Menu />}
          </Context.Provider>
        </View>
      </MenuProvider>
    </NavigationContainer>
    <Toast ref={(ref) => Toast.setRef(ref)} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
