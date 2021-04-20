import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import Context from '../../../context';
import Constants from 'expo-constants';

import NSLight from '../../../../assets/fonts/NunitoSans/NunitoSansLight.ttf';
import NSRegular from '../../../../assets/fonts/NunitoSans/NunitoSansRegular.ttf';
import NSBold from '../../../../assets/fonts/NunitoSans/NunitoSansBold.ttf';
import NSExtraBold from '../../../../assets/fonts/NunitoSans/NunitoSansExtraBold.ttf';

export default function DataLoader(props) {

  const store = React.useContext(Context);

  return (
    <View style={styles.container}>
      <View style={styles.backList} ></View>
      <View style={styles.list}>
        <View style={{ height: Constants.statusBarHeight }}></View>
        <View style={{ justifyContent:'center', alignItems:'center', flex:1}} >
          <View style={styles.listCompany}>
            <Text style={{textAlign: 'center', fontSize: 15,
                fontFamily: 'NSRegular',}}>Loading Company</Text>
            <ActivityIndicator size="large" color="#86B206" />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    flex: 1,
    width: '100%',
    height: '100%',
  },
  backList: {
    position: "absolute",
    width: '100%',
    height: '100%',
    backgroundColor: '#000000aa',
  },
  list: {
    width: '100%',
    height: '100%',
  },
  listCompany: {
    width: 200,
    height: 150,
    borderRadius: 30,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
});