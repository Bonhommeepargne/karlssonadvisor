import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, StatusBar, SafeAreaView } from 'react-native';
// import Menu from './src/components/Menu/Menu';
// import Login from './src/components/Connection/Login/Login';
import Loader from './src/components/Loader/Loader';
// import SideModal from './src/components/Menu/SideModal/SideModal';
import DataLoader from './src/components/Menu/DataLoader/DataLoader';
import Main from './src/components/Menu/Main';

import 'react-native-gesture-handler';
import Context from "./src/context";
import { useFonts } from 'expo-font';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import useAuth from "./src/components/Connection/Login/useAuth";
import Toast from 'react-native-toast-message';

import NSLight from './assets/fonts/NunitoSans/NunitoSansLight.ttf';
import NSRegular from './assets/fonts/NunitoSans/NunitoSansRegular.ttf';
import NSBold from './assets/fonts/NunitoSans/NunitoSansBold.ttf';
import NSExtraBold from './assets/fonts/NunitoSans/NunitoSansExtraBold.ttf'; 

export default function App() {
  const [ loader, setLoader ] = useState(false);

  let { user, userInfo, updateUserInfo, companyDisplay, companyDisplayName, newCompanyDisplay,companyArray, pushCompanyArray,
    sectorDisplay, sectorDisplayName, newSectorDisplay, sectorArray, pushSectorArray, indexArray, newIndexArray,
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
  
  // sideModalVisible, setSideModalVisible, 
  return (
    <>
    <StatusBar backgroundColor="#6A8712"/>
    <NavigationContainer theme={MyTheme}>
        <SafeAreaView style={styles.container}>
          <Context.Provider value={{ user, userInfo, updateUserInfo, 
              companyDisplay, companyDisplayName, newCompanyDisplay,
              companyArray, pushCompanyArray, 
              sectorDisplay, sectorDisplayName, newSectorDisplay, 
              sectorArray, pushSectorArray, indexArray, newIndexArray,
              watchList, storeWatchList, allSecurities, storeAllSecurities, 
              loader, setLoader }}>
              <Main />
              {loader && <DataLoader />}
          </Context.Provider>
        </SafeAreaView>
    </NavigationContainer>
    <Toast ref={(ref) => Toast.setRef(ref)} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});
