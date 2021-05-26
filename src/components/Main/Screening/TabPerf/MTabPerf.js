import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import TabPerf from './TabPerf';
import Store from '../../../../context';
import _ from 'lodash';

import NSLight from '../../../../../assets/fonts/NunitoSans/NunitoSansLight.ttf';
import NSRegular from '../../../../../assets/fonts/NunitoSans/NunitoSansRegular.ttf';
import NSBold from '../../../../../assets/fonts/NunitoSans/NunitoSansBold.ttf';
import NSExtraBold from '../../../../../assets/fonts/NunitoSans/NunitoSansExtraBold.ttf';

// npm install @react-navigation/material-top-tabs react-native-tab-view
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

function TitleSector() {
  return (
    <Store.Consumer>
      {(store) => (
        <View style={{ height: 50, padding: 10, backgroundColor: '#6A8712' }}>
          <Text style={{ fontSize: 20, fontFamily: 'NSBold', color: '#FFF' }}>
            {store.sectorArray[store.indexCompany.row][store.indexCompany.col].SASBIndustryGroup}</Text>
        </View>
      )}
    </Store.Consumer>
  )
}

export default function MTabPerf() {

  return (
    <View style={styles.container}>
      <TitleSector />
      <TabPerf />
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f6f6f6'
    },
  });