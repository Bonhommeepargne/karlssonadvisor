import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import { Icon } from 'react-native-elements';

import TableSummary from './TableSummary'
import GaugeLinear4Controversy from './GaugeLinear4Controversy'
import CarbonSummary from './CarbonSummary'

// https://fonts.google.com/specimen/Nunito+Sans
import { useFonts } from 'expo-font';
import NSLight from '../../../../../assets/fonts/NunitoSans/NunitoSansLight.ttf';
import NSRegular from '../../../../../assets/fonts/NunitoSans/NunitoSansRegular.ttf';
import NSBold from '../../../../../assets/fonts/NunitoSans/NunitoSansBold.ttf';
import NSExtraBold from '../../../../../assets/fonts/NunitoSans/NunitoSansExtraBold.ttf';

import { useNavigation } from '@react-navigation/core';

export default function Summary(props) {

  const company = props.data;
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.barRank}>
        <View style={{ marginHorizontal: 15 }}>
          <Text style={styles.titleScore}>ESG Industry Rankings</Text>

          <View style={{ paddingVertical: 15 }}>
            <View style={{ flexDirection: 'row', paddingBottom:10 }}>
              <View><Text style={{ fontSize: 16, fontFamily: 'NSRegular', }}>Sector: </Text></View>
              <Text style={{ fontSize: 16, fontFamily: 'NSBold', color: 'grey' }}>{company.SASBSubSector} ({company.ESG_SubSector_nb_last})</Text>
            </View>
            <View style={{ flexDirection: 'row'}}>
              <View><Text style={{ fontSize: 16, fontFamily: 'NSRegular', }}>Industry: </Text></View>
              <Text style={{ fontSize: 16, fontFamily: 'NSBold', color: 'grey' }}>{company.SASBIndustryGroup}</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 10, alignItems: 'center' }}>
              <Text style={{ fontSize: 14, fontFamily: 'NSRegular', color: 'grey' }}>Total {company.ESG_IG_nb_last} Stocks</Text>
              <TouchableOpacity
                style={{ borderWidth: 1, paddingVertical: 3, paddingHorizontal: 8, borderRadius: 10, borderColor: 'grey' }}
                onPress={() => (navigation.navigate('Screening', { screen: 'ESG'}))}
              >
                <View style={{ flexDirection: 'row' }}>
                  <View style={{ justifyContent: 'center' }}>
                  <Text style={{ fontSize: 14, fontFamily: 'NSRegular', color: 'grey' }}>{company.ESG_IG_nb_rk_last} Ranked</Text>
                  </View>
                  <View style={{ justifyContent: 'center' }}><Text style={{ fontSize: 18,color: 'grey' }}> &gt;&gt;</Text></View>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <TableSummary data={company} />

          <View style={{ paddingTop: 15, paddingBottom: 25 }}>
            <Text style={styles.titleScore}>Controversy</Text>
            <GaugeLinear4Controversy val={company.controversies} />
          </View>

          <View style={{ paddingBottom: 20 }}>
            <Text style={styles.titleScore}>Carbon Intensity Industry</Text>
            <CarbonSummary data={company} />
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
    // justifyContent: 'flex-start'
  },
  barRank: {
    marginVertical: 10,
    justifyContent: 'flex-start',
    width: "95%",
    borderWidth: 1,
    borderColor: '#CCC',
    padding: 5,
    borderRadius: 15,
    backgroundColor: "white",
  },
  titleScore: {
    fontSize: 22,
    fontFamily: 'NSExtraBold',
    color: "black"
  },
});