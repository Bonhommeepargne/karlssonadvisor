import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import Constants from 'expo-constants';

import GraphRank from './CompDashboard/GraphRank';
import TopBar from './TopBar';

// https://fonts.google.com/specimen/Nunito+Sans
// import { useFonts } from 'expo-font';
// import NSLight from '../../../../assets/fonts/NunitoSans/NunitoSansLight.ttf';
// import NSRegular from '../../../../assets/fonts/NunitoSans/NunitoSansRegular.ttf';
// import NSBold from '../../../../assets/fonts/NunitoSans/NunitoSansBold.ttf';
// import NSExtraBold from '../../../../assets/fonts/NunitoSans/NunitoSansExtraBold.ttf';

import Loader from '../../Loader/Loader'
import Store from '../../../context';
import * as fb from "../../../firebase";

export default function CompanySheet({ route, navigation }) {

  const data = {
    title: 'ESG Sector Decile',
    groupname: 'Financials',
    series: [
      { month: 'Jan', decile: 7 },
      { month: 'Fev', decile: 7 },
      { month: 'Mar', decile: 7 },
      { month: 'Apr', decile: 7 },
      { month: 'May', decile: 6 },
      { month: 'Jun', decile: 6 },
      { month: 'Jul', decile: 5 },
      { month: 'Aug', decile: 7 },
      { month: 'Sept', decile: 8 },
      { month: 'Oct', decile: 9 },
      { month: 'Nov', decile: 9 },
      { month: 'Dec', decile: 10 },
    ]
  };

  return (

    <View style={{ backgroundColor: "#F5F5F5", flex:1}}>
      <TopBar />
      <View style={styles.company}>
        <Text style={styles.companyTitle}>Société Générale</Text>
      </View>
      <View>
        <SafeAreaView>
          <ScrollView>
            <GraphRank data={data} />
            <GraphRank data={data} />
            <GraphRank data={data} />
            <GraphRank data={data} />
          </ScrollView>
        </SafeAreaView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  company: {
    marginVertical: 10,
    width: "100%",
    height: 40,
    alignItems: 'center',
  },
  companyTitle: {
    fontSize: 25,
    fontFamily: 'NSRegular',
    color: "black",
  }
});