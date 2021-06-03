import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

// https://fonts.google.com/specimen/Nunito+Sans
import { useFonts } from 'expo-font';
import NSLight from '../../../../../assets/fonts/NunitoSans/NunitoSansLight.ttf';
import NSRegular from '../../../../../assets/fonts/NunitoSans/NunitoSansRegular.ttf';
import NSBold from '../../../../../assets/fonts/NunitoSans/NunitoSansBold.ttf';
import NSExtraBold from '../../../../../assets/fonts/NunitoSans/NunitoSansExtraBold.ttf';

export default function GaugeLinear3UNGC({ val }) {

  let riskLevel = toNumber(val);

  function toNumber(val) {
    if ( val == 'Failed' ) {
      return 1
    } else if ( val == 'Watch List') {
      return 2
    } else if ( val == 'Pass') {
      return 4
    }
  }

  return (
    <View>
      <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center'}}>
        <View style={{ flex: 1, alignItems: 'center', }}>
          <Text style={{ fontSize: 20, fontFamily: 'NSExtraBold', color: (riskLevel == 1 ? 'darkgrey' : '#FFF') }}>▼</Text>
        </View>
        <View style={{ flex: 1, alignItems: 'center', }}>
          <Text style={{ fontSize: 20, fontFamily: 'NSExtraBold', color: (riskLevel == 2 ? 'darkgrey' : '#FFF') }}>▼</Text>
        </View>
        <View style={{ flex: 1, alignItems: 'center', }}>
          <Text style={{ fontSize: 20, fontFamily: 'NSExtraBold', color: (riskLevel == 4 ? 'darkgrey' : '#FFF') }}>▼</Text>
        </View>
      </View>

      <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center' }}>
        <View style={{
          flex: 1, alignItems: 'center', backgroundColor: (riskLevel == 1 ? 'red' : '#FFF'), borderWidth: 1,
          borderColor: '#C8C8C8', borderBottomLeftRadius: 10,
          padding: 5, borderTopLeftRadius: 10,
        }}>
          <Text style={{ fontSize: 12, fontFamily: 'NSExtraBold', color: (riskLevel == 1 ? '#FFF' : '#C8C8C8') }}>FAILED</Text>
        </View>
        <View style={{
          flex: 1, alignItems: 'center', backgroundColor: (riskLevel == 2 ? 'orange' : '#FFF'), borderTopWidth: 1,
          borderColor: '#C8C8C8', borderBottomWidth: 1, padding: 5,
        }}>
          <Text style={{ fontSize: 12, fontFamily: 'NSExtraBold', color: (riskLevel == 2 ? '#FFF' : '#C8C8C8') }}>WATCH LIST</Text>
        </View>
        <View style={{
          flex: 1, alignItems: 'center', backgroundColor: (riskLevel == 4 ? 'green' : '#FFF'), borderWidth: 1,
          borderBottomRightRadius: 10, borderColor: '#C8C8C8', padding: 5, borderTopRightRadius: 10,
        }}>
          <Text style={{ fontSize: 12, fontFamily: 'NSExtraBold', color: (riskLevel == 4 ? '#FFF' : '#C8C8C8') }}>PASS</Text>
        </View>
      </View>

    </View>
  );

}

const styles = StyleSheet.create({
});