import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { Icon } from 'react-native-elements';

import GaugeLinear3UNGC from './GaugeLinear3UNGC'

// https://fonts.google.com/specimen/Nunito+Sans
import { useFonts } from 'expo-font';
import NSLight from '../../../../../assets/fonts/NunitoSans/NunitoSansLight.ttf';
import NSRegular from '../../../../../assets/fonts/NunitoSans/NunitoSansRegular.ttf';
import NSBold from '../../../../../assets/fonts/NunitoSans/NunitoSansBold.ttf';
import NSExtraBold from '../../../../../assets/fonts/NunitoSans/NunitoSansExtraBold.ttf';

import { useNavigation } from '@react-navigation/core';

export default function Ungc(props) {

  const company = props.data;
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.barRank}>
        <View style={{ marginHorizontal: 15, marginBottom: 20, marginTop: 10 }}>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={styles.titleScore}>UN Global Compact</Text>
            <TouchableOpacity onPress={() => { navigation.navigate('TutoUNGC') }} >
              <Icon
                style={{ paddingTop: 2 }}
                name='question-circle-o'
                type='font-awesome'
                color='silver'
                size={22}
              />
            </TouchableOpacity>
          </View>

          <View style={{ paddingVertical: 10 }}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ fontSize: 16, fontFamily: 'NSBold', color: 'grey' }}>Authorized list status:</Text>
            </View>
          </View>

          <View style={{ paddingTop: 5, paddingBottom: 10 }}>
            <GaugeLinear3UNGC val={company.UNGCcomp} />
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
    fontSize: 20,
    fontFamily: 'NSExtraBold',
    color: "black"
  },
  underTitleScore: {
    fontSize: 18,
    fontFamily: 'NSExtraBold',
    color: "dimgray"
  },
});