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
  const [ loader, setLoader ] = useState(false); // false == isLoaded
  const [ourLoader, setOurLoader ] = useState(false);
  
  let { user, userInfo, updateUserInfo, sectorArray, pushSectorArray, indexSector, newIndexSector,
    indexCompany, newIndexCompany, watchList, storeWatchList, 
    allSecurities, storeAllSecurities, preferences, updatePreferences, 
    nbESG, updateNbESG, nbCarbon, updateNbCarbon, nbPerf, updateNbPerf,
    updateDate} = useAuth();
    
  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: 'black',
      background:'#FFF'
    },
  };

  const [loadedFont] = useFonts({
    NSLight,
    NSRegular,
    NSBold,
    NSExtraBold,
  });
  // #3c4d08
  return (
    <>
      <StatusBar backgroundColor="#3c4d08"/>
      <NavigationContainer theme={MyTheme}>
          <SafeAreaView style={styles.container}>
            <Context.Provider value={{ user, userInfo, updateUserInfo, sectorArray,
                pushSectorArray, indexSector, newIndexSector, indexCompany, newIndexCompany,
                watchList, storeWatchList, allSecurities, storeAllSecurities, 
                preferences, updatePreferences, 
                nbESG, updateNbESG, nbCarbon, updateNbCarbon, nbPerf, updateNbPerf,
                updateDate, loader, setLoader, ourLoader, setOurLoader }}>
                  {/* <Loader /> */}
                  {loadedFont && <Main />}
                  {!loadedFont || !ourLoader && <Loader />}
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
  hide: {
    display: 'none',
    backgroundColor: 'red',
    borderColor: 'red',
    borderWidth: 1,
  }

});
