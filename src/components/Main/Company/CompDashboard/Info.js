import React, { useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Linking,
  Button,
  TouchableOpacity
} from 'react-native';
import TableSummaryPerf from './TableSummaryPerf'

// https://fonts.google.com/specimen/Nunito+Sans
import { useFonts } from 'expo-font';
import NSLight from '../../../../../assets/fonts/NunitoSans/NunitoSansLight.ttf';
import NSRegular from '../../../../../assets/fonts/NunitoSans/NunitoSansRegular.ttf';
import NSBold from '../../../../../assets/fonts/NunitoSans/NunitoSansBold.ttf';
import NSExtraBold from '../../../../../assets/fonts/NunitoSans/NunitoSansExtraBold.ttf';

import { useNavigation } from '@react-navigation/core';

export default function Info(props) {

  const company = props.data;


  const ExternalLinkBtn = (props) => {
    return <TouchableOpacity
      onPress={() => {
        Linking.openURL(props.url)
          .catch(err => {
            console.error("Failed opening page because: ", err)
            alert('Failed to open page')
          })
      }}>
        <Text style={{ fontSize: 14, fontFamily: 'NSBold', color: 'blue' }}>{props.title}</Text>
      </TouchableOpacity>
  }

  return (
    <View style={styles.container}>
      <View style={styles.barRank}>
        <View style={{ marginHorizontal: 15 }}>
          <Text style={styles.titleScore}>Corporate information</Text>

          <View style={{ paddingVertical: 15 }}>
            <View style={{ width: '90%' }}>
              {/* <View><Text style={{ fontSize: 16, fontFamily: 'NSRegular', }}>Address: </Text></View> */}
              <Text style={{ fontSize: 16, fontFamily: 'NSBold', color: 'grey' }}>{company.Address}</Text>
              <Text style={{ fontSize: 16, fontFamily: 'NSBold', color: 'grey' }}>{company.Country}</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 10, alignItems: 'center' }}>
              <View>
                <Text style={{ fontSize: 14, fontFamily: 'NSBold', color: 'grey' }}>{company.Phone}</Text>
                <ExternalLinkBtn title={company.Website1} url={company.Website1} />
              </View>
              <View>
                <Text style={{ fontSize: 14, fontFamily: 'NSBold', color: 'grey' }}>#Nb of employee</Text>
                <Text style={{ fontSize: 14, fontFamily: 'NSBold', color: 'grey' }}>{!isNaN(company.employee) ? company.employee.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : '-'}</Text>
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
});