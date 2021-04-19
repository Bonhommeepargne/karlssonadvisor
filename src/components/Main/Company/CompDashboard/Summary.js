import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import { Icon } from 'react-native-elements';

import TableSummary from './TableSummary'
import GaugeLinear4 from './GaugeLinear4'
import CarbonSummary from './CarbonSummary'

// https://fonts.google.com/specimen/Nunito+Sans
import { useFonts } from 'expo-font';
import NSLight from '../../../../../assets/fonts/NunitoSans/NunitoSansLight.ttf';
import NSRegular from '../../../../../assets/fonts/NunitoSans/NunitoSansRegular.ttf';
import NSBold from '../../../../../assets/fonts/NunitoSans/NunitoSansBold.ttf';
import NSExtraBold from '../../../../../assets/fonts/NunitoSans/NunitoSansExtraBold.ttf';
import { Row } from 'react-native-table-component';

export default function Summary(props) {

  return (
    <View style={styles.container}>
      <View style={styles.barRank}>
        <View style={{ marginHorizontal: 15 }}>
          <Text style={styles.titleScore}>ESG Rankings Decile</Text>
          <TableSummary />

          <View style={{ paddingTop: 20 }}>
            <View style={{ flexDirection: 'row' }}>
              <View><Text style={{ fontSize: 16, fontFamily: 'NSRegular', }}>Peergroup :</Text></View>
              <View style={{ paddingLeft: 5 }}>
                <Text style={{ fontSize: 16, fontFamily: 'NSBold' }}>Finance</Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 5, alignItems: 'center' }}>
              <View><Text style={{ fontSize: 14, fontFamily: 'NSRegular', color: 'grey' }}>70 Stocks</Text></View>
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
                  <View style={{ justifyContent: 'center' }}><Text style={{ fontSize: 18,color: 'grey' }}> &gt; </Text></View>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          {/* <View style={{ paddingTop: 10 }}>
            <View style={{ flexDirection: 'row' }}>
              <View><Text style={{ fontSize: 16, fontFamily: 'NSRegular', }}>Industry :</Text></View>
              <View style={{ paddingLeft: 5 }}>
                <Text style={{ fontSize: 16, fontFamily: 'NSBold' }}>Consumer Discretionnary</Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 5, alignItems: 'center' }}>
              <View><Text style={{ fontSize: 14, fontFamily: 'NSRegular', }}>70 Stocks</Text></View>
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
          </View> */}

          <View style={{ paddingTop: 10 }}>
            <Text style={styles.titleScore}>Carbon</Text>
            <CarbonSummary />
          </View>

          <View style={{ paddingTop: 0, paddingBottom: 15 }}>
            <Text style={styles.titleScore}>Controversy</Text>
            <GaugeLinear4 val={3} />
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