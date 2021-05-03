import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Constants from 'expo-constants';
import TabPerf from './TabPerf/TabPerf';
import TabESG from './TabESG/TabESG';
import TabCarbon from './TabCarbon/TabCarbon';
import Store from '../../../context';

import { getSectorESG } from './../../../requests/request'

import NSLight from '../../../../assets/fonts/NunitoSans/NunitoSansLight.ttf';
import NSRegular from '../../../../assets/fonts/NunitoSans/NunitoSansRegular.ttf';
import NSBold from '../../../../assets/fonts/NunitoSans/NunitoSansBold.ttf';
import NSExtraBold from '../../../../assets/fonts/NunitoSans/NunitoSansExtraBold.ttf';

// npm install @react-navigation/material-top-tabs react-native-tab-view
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

function TitleSector() {
  return (
    <Store.Consumer>
      {(store) => (
        <View style={{ height: 50, padding: 10 }}>
          <Text style={{ fontSize: 20, fontFamily: 'NSBold', color: 'blue' }}>{store.sectorDisplayName}</Text>
        </View>
      )}
    </Store.Consumer>
  )
}

function MTabESG() {
  return (
    <View style={styles.container}>
      <TitleSector />
      <TabESG />
    </View>
  );
}

function MTabCarbon() {
  return (
    <View style={styles.container}>
      <TitleSector />
      <TabCarbon />
    </View>
  );
}
function MTabPerf() {
  return (
    <View style={styles.container}>
      <TitleSector />
      <TabPerf />
    </View>
  );
}

const Tab = createMaterialTopTabNavigator();

export default function TopTabs() {

  const dataStore = useContext(Store);
  const [index, setIndex] = useState(0);

  useEffect(() => {

    let test = false;
    for (let i = 0; i < dataStore.sectorArray.length; i++) {
      if (dataStore.sectorDisplay === dataStore.sectorArray[i][0].SASBSubSectorCode) {
        test = true;
        setIndex(i);
        break;
      }
    }

    async function getESGSectorData() {
      dataStore.setLoader((value) => (true));
      let response = await getSectorESG(dataStore.sectorDisplay);
      dataStore.pushSectorArray(response.data);
      setIndex(dataStore.sectorArray.length - 1);
      dataStore.setLoader((value) => (false));
    }

    if (test === false) {
      getESGSectorData();
    }

  }, [dataStore.sectorDisplay]);

  return (
    <Tab.Navigator style={{ marginTop: Constants.statusBarHeight }} tabBarOptions={{
      activeTintColor: '#86b206',
      inactiveTintColor: 'gray',
      indicatorStyle: {
        backgroundColor: '#86b206',
      },
    }}>
      <Tab.Screen name='ESG' component={MTabESG} />
      <Tab.Screen name='Carbon' component={MTabCarbon} />
      <Tab.Screen name='Performance' component={MTabPerf} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f6f6'
  },
});