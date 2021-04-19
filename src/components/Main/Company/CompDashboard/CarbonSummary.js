import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import GaugeCircle from './GaugeCircle';
import GaugeLinear4 from './GaugeLinear4';
import { Icon } from 'react-native-elements';

import NSLight from '../../../../../assets/fonts/NunitoSans/NunitoSansLight.ttf';
import NSRegular from '../../../../../assets/fonts/NunitoSans/NunitoSansRegular.ttf';
import NSBold from '../../../../../assets/fonts/NunitoSans/NunitoSansBold.ttf';
import NSExtraBold from '../../../../../assets/fonts/NunitoSans/NunitoSansExtraBold.ttf';

import { Dimensions } from "react-native";
const screenWidth = Dimensions.get("window").width;

export default function CarbonSummary() {

  const sectorsales = 35;
  const sectorco2 = 28;
  const industrysales = 15;
  const industryco2 = 12;

  const carbon = 47;
  const gaugeWidth = Math.round(screenWidth * 0.38);

  return (
    <View style={styles.container}>
      <View style={{ paddingBottom: 10 }} >
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 5, alignItems: 'center' }}>
          <View><Text style={{ fontSize: 20, fontFamily: 'NSRegular', color: 'dimgrey' }}>Sector Intensity:</Text></View>
          <TouchableOpacity
            style={{ borderWidth: 1, paddingVertical: 3, paddingHorizontal: 5, borderRadius: 10, borderColor: 'grey' }}
            onPress={() => (console.log('prout'))}
          >
            <View style={{ flexDirection: 'row' }}>
              <View style={{ justifyContent: 'center' }}>
                <Icon
                  style={{ paddingHorizontal: 5 }}
                  name='th'
                  type='font-awesome'
                  color='grey'
                  size={22}
                />
              </View>
              <View style={{ justifyContent: 'center' }}><Text style={{ fontSize: 18, color: 'grey' }}> &gt; </Text></View>
            </View>
          </TouchableOpacity>
        </View>
        <GaugeLinear4 val={1} />
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View style={{ paddingHorizontal: 10, }}>
          <GaugeCircle val={sectorsales} text1='TOTAL SALES' text2="OF SECTOR" />
        </View>
        <View style={{ paddingHorizontal: 10, }}>
          <GaugeCircle val={sectorco2} text1='CO2 EMISSION' text2="OF SECTOR" />
        </View>
      </View>
      {/* <View style={{ paddingBottom: 10 }} >
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 5, alignItems: 'center' }}>
          <View><Text style={{ fontSize: 20, fontFamily: 'NSRegular', color: 'dimgrey' }}>Industry Intensity:</Text></View>
          <TouchableOpacity
            style={{ borderWidth: 1, paddingVertical: 3, paddingHorizontal: 5, borderRadius: 10, borderColor: 'grey' }}
            onPress={() => (console.log('prout'))}
          >
            <View style={{ flexDirection: 'row' }}>
              <View style={{ justifyContent: 'center' }}>
                <Icon
                  style={{ paddingHorizontal: 5 }}
                  name='th'
                  type='font-awesome'
                  color='grey'
                  size={22}
                />
              </View>
              <View style={{ justifyContent: 'center' }}><Text style={{ fontSize: 18, color: 'grey' }}> &gt; </Text></View>
            </View>
          </TouchableOpacity>
        </View>
        <GaugeLinear4 val={3} />
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View style={{ paddingHorizontal: 10, }}>
          <GaugeCircle val={industrysales} text1='TOTAL SALES' text2="OF INDUSTRY" />
        </View>
        <View style={{ paddingHorizontal: 10, }}>
          <GaugeCircle val={industryco2} text1='CO2 EMISSION' text2="OF INDUSTRY" />
        </View>
      </View> */}
    </View>
  );

}

const styles = StyleSheet.create({
  titleGauge: {
    textAlign: 'center',
    color: 'darkgrey',
    fontSize: 13,
    fontWeight: '100',
    fontFamily: 'NSLight',
  },
  titleGauge2: {
    textAlign: 'center',
    color: 'darkgrey',
    fontSize: 14,
    fontWeight: '100',
    fontFamily: 'NSBold',
  },
  points: {
    textAlign: 'center',
    color: 'darkgrey',
    fontSize: 25,
    fontWeight: '100',
    fontFamily: 'NSLight',
  },
  percent: {
    textAlign: 'center',
    color: 'darkgrey',
    fontSize: 20,
    fontWeight: '100',
  },
  percentWhite: {
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
    fontWeight: '100',
  },
  container: {
    flex: 1,
    paddingTop: 10
  },
  pointsDelta: {
    color: '#4c6479',
    fontSize: 50,
    fontWeight: '100',
  },
  pointsDeltaActive: {
    color: '#fff',
  },
});