import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import GaugeCircle from './GaugeCircle';
import GaugeLinear4 from './GaugeLinear4';
import { useNavigation } from '@react-navigation/core';
import { Icon } from 'react-native-elements';

import NSLight from '../../../../../assets/fonts/NunitoSans/NunitoSansLight.ttf';
import NSRegular from '../../../../../assets/fonts/NunitoSans/NunitoSansRegular.ttf';
import NSBold from '../../../../../assets/fonts/NunitoSans/NunitoSansBold.ttf';
import NSExtraBold from '../../../../../assets/fonts/NunitoSans/NunitoSansExtraBold.ttf';

import { Dimensions } from "react-native";
const screenWidth = Dimensions.get("window").width;

export default function CarbonSummary(props) {

  const company = props.data;

  const sectorsales = (company.salesAverage[1] / company.totalSalesGroup[1]) * 100;
  const sectorco2 = (company.carbonAverage[1] / company.totalCarbonGroup[1]) * 100;

  const navigation = useNavigation();

  // const carbon = 47;
  // const gaugeWidth = Math.round(screenWidth * 0.38);

  return (
    <View style={styles.container}>
      <View style={styles.barRank}>
        <View style={{ marginHorizontal: 15 }}>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={styles.titleScore}>Carbon Intensity</Text>
            <TouchableOpacity onPress={() => { navigation.navigate('TutoCarbon') }} >
              <Icon
                style={{ paddingTop: 8 }}
                name='question-circle-o'
                type='font-awesome'
                color='silver'
                size={22}
              />
            </TouchableOpacity>
          </View>


          <View style={styles.container}>
            <View style={{ paddingBottom: 10 }} >
              <View style={{ paddingBottom: 10 }}>
                <View style={{ flexDirection: 'row' }}>
                  {/* <View><Text style={{ fontSize: 16, fontFamily: 'NSRegular', }}>Industry: </Text></View> */}
                  <Text style={{ fontSize: 16, fontFamily: 'NSBold', color: 'grey' }}>{company.SASBIndustryGroup}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 10, alignItems: 'center' }}>
                  <Text style={{ fontSize: 14, fontFamily: 'NSRegular', color: 'grey' }}>World ({company.carbonAverage_nb[1]}) - Rated ({company.carbonAverage_nb_rk[1]})</Text>
                  <TouchableOpacity
                    style={{ borderWidth: 1, paddingVertical: 3, paddingHorizontal: 8, borderRadius: 10, borderColor: 'grey' }}
                    onPress={() => (navigation.navigate('Carbon'))}
                  >
                    <View style={{ flexDirection: 'row' }}>
                      <View style={{ justifyContent: 'center' }}>
                        <Text style={{ fontSize: 14, fontFamily: 'NSRegular', color: 'grey' }}>Screen</Text>
                      </View>
                      <View style={{ justifyContent: 'center' }}><Text style={{ fontSize: 18, color: 'grey' }}> &gt;&gt;</Text></View>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>

              <GaugeLinear4 val={company.intensityRank[1]} />
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <View style={{ paddingHorizontal: 10, }}>
                <GaugeCircle val={sectorsales} text1='TOTAL SALES' text2="INDUSTRY" />
              </View>
              <View style={{ paddingHorizontal: 10, }}>
                <GaugeCircle val={sectorco2} text1='CO2 EMISSIONS' text2="INDUSTRY" />
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "#F5F5F5",
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  barRank: {
    marginHorizontal: 10,
    marginBottom: 10,
    justifyContent: 'flex-start',
    width: "95%",
    borderWidth: 1,
    borderColor: '#CCC',
    padding: 5,
    borderRadius: 15,
    backgroundColor: "white",
  },
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
  titleScore: {
    fontSize: 22,
    fontFamily: 'NSExtraBold',
    color: "black"
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