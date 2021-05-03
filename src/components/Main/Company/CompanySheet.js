import React, { useState, useEffect, useContext } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Button
} from 'react-native';
import dataGraph from '../../../util/dataGraph';

import { getCompanyESG } from './../../../requests/request'

import Summary from './CompDashboard/Summary'
import GraphRank from './CompDashboard/GraphRank';
import TopBar from './TopBar';

// https://fonts.google.com/specimen/Nunito+Sans
// import { useFonts } from 'expo-font';
// import NSLight from '../../../../assets/fonts/NunitoSans/NunitoSansLight.ttf';
// import NSRegular from '../../../../assets/fonts/NunitoSans/NunitoSansRegular.ttf';
// import NSBold from '../../../../assets/fonts/NunitoSans/NunitoSansBold.ttf';
// import NSExtraBold from '../../../../assets/fonts/NunitoSans/NunitoSansExtraBold.ttf';

import Store from '../../../context';

export default function CompanySheet({ route, navigation }) {

  const [index, setIndex] = useState(0);

  const dataStore = useContext(Store);

  useEffect(() => {

    let test = false;
    for (let i = 0; i < dataStore.companyArray.length; i++) {
      // console.log('dataStore.companyArray[i] :>> ',i, dataStore.companyArray[i].NAME, dataStore.companyArray[i].Sedol7);
      if (dataStore.companyDisplay === dataStore.companyArray[i].Sedol7) {
        test = true;
        setIndex(i);
        break;
      }
    }

    async function getESGData() {
      dataStore.setLoader((value) => (true));
      let response = await getCompanyESG(dataStore.companyDisplay);
      dataStore.pushCompanyArray(response.data);
      setIndex(dataStore.companyArray.length - 1);
      dataStore.setLoader((value) => (false));
      // for (let i = 0; i < dataStore.companyArray.length; i++) {
      //   console.log('dataStore.companyArray[i] :>> ',i, dataStore.companyArray[i].NAME, dataStore.companyArray[i].Sedol7);
      // }
    }

    if (test === false) {
      getESGData();
    }

  }, [dataStore.companyDisplay]);

  const company = dataStore.companyArray[index];
  const seriesESG = dataGraph(company.ESG_IG_decile, company.Datenum);
  const seriesE = dataGraph(company.E_IG_decile, company.Datenum);
  const seriesS = dataGraph(company.S_IG_decile, company.Datenum);
  const seriesG = dataGraph(company.G_IG_decile, company.Datenum);
  const sector = company.SASBSubSector;

  const dataESG = {
    title: 'Agregate ESG Rating',
    groupname: sector,
    series: seriesESG
  }

  const dataE = {
    title: 'Environmental Rating',
    groupname: sector,
    series: seriesE
  }

  const dataS = {
    title: 'Social Rating',
    groupname: sector,
    series: seriesS
  }
  const dataG = {
    title: 'Governance Rating',
    groupname: sector,
    series: seriesG
  }

  return (
    <Store.Consumer>
      {(store) => (
        <View style={{ backgroundColor: "#F5F5F5", flex: 1 }} >
          <TopBar />
          <View>
            <SafeAreaView>
              <ScrollView>
                <View style={styles.company}>
                  <Text style={styles.companyTitle}>{store.companyDisplayName}</Text>
                </View>
                <Summary data={company} />
                <GraphRank data={dataESG} />
                <GraphRank data={dataE} />
                <GraphRank data={dataS} />
                <GraphRank data={dataG} />
                <View style={{ height: 200 }}>
                </View>
              </ScrollView>
            </SafeAreaView>
          </View>
        </View>
      )}
    </Store.Consumer>
  );
}

const styles = StyleSheet.create({
  company: {
    marginVertical: 10,
    width: "100%",
    // height: 40,
    // alignItems: 'center',
  },
  companyTitle: {
    fontSize: 22,
    fontFamily: 'NSRegular',
    color: "black",
    textAlign: 'center',
  },
  sideModal: {
    width: "100%",
    height: "100%",
  }
});