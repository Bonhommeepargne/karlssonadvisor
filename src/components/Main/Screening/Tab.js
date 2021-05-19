import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import TabPerf from './TabPerf/TabPerf';
import TabESG from './TabESG/TabESG';
import TabCarbon from './TabCarbon/TabCarbon';
import Store from '../../../context';
import _ from 'lodash';

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
          <Text style={{ fontSize: 20, fontFamily: 'NSBold', color: 'black' }}>
            {store.sectorArray[store.indexCompany.row][store.indexCompany.col].SASBIndustryGroup}</Text>
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

  return (
    <>
      <Tab.Navigator style={{ marginTop: 0 }} tabBarOptions={{
        activeTintColor: '#6A8712',
        inactiveTintColor: 'gray',
        indicatorStyle: {
          backgroundColor: '#6A8712',
        },
      }}>
        <Tab.Screen name='ESG' component={MTabESG} />
        <Tab.Screen name='Carbon' component={MTabCarbon} />
        <Tab.Screen name='Performance' component={MTabPerf} />
      </Tab.Navigator>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f6f6'
  },
});