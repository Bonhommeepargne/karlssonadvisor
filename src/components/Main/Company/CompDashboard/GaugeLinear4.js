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

export default function GaugeSummary({ val }) {

  let riskLevel = val;

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
          <Text style={{ fontSize: 20, fontFamily: 'NSExtraBold', color: (riskLevel == 3 ? 'darkgrey' : '#FFF') }}>▼</Text>
        </View>
        <View style={{ flex: 1, alignItems: 'center', }}>
          <Text style={{ fontSize: 20, fontFamily: 'NSExtraBold', color: (riskLevel == 4 ? 'darkgrey' : '#FFF') }}>▼</Text>
        </View>
        <View style={{ flex: 1, alignItems: 'center', }}>
          <Text style={{ fontSize: 20, fontFamily: 'NSExtraBold', color: (riskLevel == 5 ? 'darkgrey' : '#FFF') }}>▼</Text>
        </View>
      </View>

      <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center' }}>
        <View style={{
          flex: 1, alignItems: 'center', backgroundColor: (riskLevel == 1 ? 'red' : '#FFF'), borderWidth: 1,
          borderColor: '#C8C8C8', borderBottomLeftRadius: 10,
          padding: 5, borderTopLeftRadius: 10,
        }}>
          <Text style={{ fontSize: 12, fontFamily: 'NSExtraBold', color: (riskLevel == 1 ? '#FFF' : '#C8C8C8') }}>BAD</Text>
        </View>

        <View style={{
          flex: 1, alignItems: 'center', backgroundColor: (riskLevel == 2 ? 'orange' : '#FFF'), borderTopWidth: 1,
          borderColor: '#C8C8C8', borderBottomWidth: 1, padding: 5,
        }}>
          <Text style={{ fontSize: 12, fontFamily: 'NSExtraBold', color: (riskLevel == 2 ? '#FFF' : '#C8C8C8') }}>POOR</Text>
        </View>

        <View style={{
          flex: 1, alignItems: 'center', backgroundColor: (riskLevel == 3 ? 'yellow' : '#FFF'), borderTopWidth: 1,
          borderColor: '#C8C8C8', borderBottomWidth: 1, borderLeftWidth: 1, padding: 5,
        }}>
          <Text style={{ fontSize: 12, fontFamily: 'NSExtraBold', color: (riskLevel == 3 ? 'darkgrey' : '#C8C8C8') }}>AVG</Text>
        </View>

        <View style={{
          flex: 1, alignItems: 'center', backgroundColor: (riskLevel == 4 ? 'lightgreen' : '#FFF'), borderTopWidth: 1,
          borderColor: '#C8C8C8', borderBottomWidth: 1, borderLeftWidth: 1, padding: 5,
        }}>
          <Text style={{ fontSize: 12, fontFamily: 'NSExtraBold', color: (riskLevel == 4 ? '#FFF' : '#C8C8C8') }}>FAIR</Text>
        </View>

        <View style={{
          flex: 1, alignItems: 'center', backgroundColor: (riskLevel == 5 ? 'green' : '#FFF'), borderWidth: 1,
          borderBottomRightRadius: 10, borderColor: '#C8C8C8', padding: 5, borderTopRightRadius: 10,
        }}>
          <Text style={{ fontSize: 12, fontFamily: 'NSExtraBold', color: (riskLevel == 5 ? '#FFF' : '#C8C8C8') }}>GOOD</Text>
        </View>

      </View>

    </View>
  );

}

const styles = StyleSheet.create({
});