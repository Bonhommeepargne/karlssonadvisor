import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import { Icon } from 'react-native-elements';

import TableSummary from './TableSummary'

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

          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={styles.titleScore}>ESG Sector Ratings</Text>
            <TouchableOpacity onPress={() => { navigation.navigate('TutoESG') }} >
              <Icon
                style={{ paddingTop: 8 }}
                name='question-circle-o'
                type='font-awesome'
                color='silver'
                size={22}
              />
            </TouchableOpacity>
          </View>

          <View style={{ paddingTop: 10, paddingBottom: 2 }}>
            <View style={{ flexDirection: 'row', paddingBottom: 5 }}>
              {/* <View><Text style={{ fontSize: 16, fontFamily: 'NSRegular', }}>Sector: </Text></View> */}
              <Text style={{ fontSize: 16, fontFamily: 'NSBold', color: 'grey' }}>{company.SASBSubSector}</Text>
            </View>
            <View style={{ flexDirection: 'row', paddingBottom: 10 }}>
              <Text style={{ fontSize: 16, fontFamily: 'NSBold', color: 'grey' }}>World ({company.ESG_SubSector_nb_rk_last}) - Rated ({company.ESG_SubSector_nb_last})</Text>
            </View>
          </View>

          <TableSummary data={company} />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 10, alignItems: 'center' }}>
              <Text style={{ fontSize: 14, fontFamily: 'NSRegular', color: 'grey' }}></Text>
              <TouchableOpacity
                style={{ borderWidth: 1, paddingVertical: 3, paddingHorizontal: 8, borderRadius: 10, borderColor: 'grey' }}
                onPress={() => (navigation.navigate('CompanyHistory'))}
              >
                <View style={{ flexDirection: 'row' }}>
                  <View style={{ justifyContent: 'center' }}>
                    <Text style={{ fontSize: 14, fontFamily: 'NSRegular', color: 'grey' }}>Rating History</Text>
                  </View>
                  <View style={{ justifyContent: 'center' }}><Text style={{ fontSize: 18, color: 'grey' }}> &gt;&gt;</Text></View>
                </View>
              </TouchableOpacity>
            </View>

          <View style={{ paddingTop: 20, paddingBottom: 10 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={styles.underTitleScore}>Comparative Universe</Text>
              <TouchableOpacity onPress={() => { navigation.navigate('TutoESGComparative') }} >
                <Icon
                  style={{ paddingTop: 3 }}
                  name='question-circle-o'
                  type='font-awesome'
                  color='silver'
                  size={22}
                />
              </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row', paddingTop: 10 }}>
              {/* <View><Text style={{ fontSize: 16, fontFamily: 'NSRegular', }}>Industry: </Text></View> */}
              <Text style={{ fontSize: 16, fontFamily: 'NSBold', color: 'grey' }}>{company.SASBIndustryGroup}</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 10, alignItems: 'center' }}>
              <Text style={{ fontSize: 14, fontFamily: 'NSRegular', color: 'grey' }}>World ({company.ESG_IG_nb_last}) - Rated ({company.ESG_IG_nb_rk_last})</Text>
              <TouchableOpacity
                style={{ borderWidth: 1, paddingVertical: 3, paddingHorizontal: 8, borderRadius: 10, borderColor: 'grey' }}
                onPress={() => (navigation.navigate('E S G'))}
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

          {/* <View style={{ paddingTop: 5, paddingBottom: 25 }}>
            <Text style={styles.titleScore}>Controversy</Text>
            <GaugeLinear4Controversy val={company.controversies} />
          </View>

          <View style={{ paddingBottom: 20 }}>
            <Text style={styles.titleScore}>Carbon Intensity Industry</Text>
            <CarbonSummary data={company} />
          </View> */}

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
    marginBottom: 10,
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
  underTitleScore: {
    fontSize: 18,
    fontFamily: 'NSExtraBold',
    color: "dimgray"
  },
});