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

  const seriesESG = dataGraph(dataStore.companyArray[index].ESG_IG_decile, dataStore.companyArray[index].Datenum);
  const seriesE = dataGraph(dataStore.companyArray[index].E_IG_decile, dataStore.companyArray[index].Datenum);
  const seriesS = dataGraph(dataStore.companyArray[index].S_IG_decile, dataStore.companyArray[index].Datenum);
  const seriesG = dataGraph(dataStore.companyArray[index].G_IG_decile, dataStore.companyArray[index].Datenum);
  const sector = dataStore.companyArray[index].SASBSubSector;

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

  const dataSummary = { sector: sector, ESG: seriesESG[11].decile, E: seriesE[11].decile, S: seriesS[11].decile, G: seriesG[11].decile,
    ESG1Y: seriesESG[11].decile - seriesESG[0].decile, E1Y: seriesE[11].decile - seriesE[0].decile, S1Y: seriesS[11].decile - seriesS[0].decile, 
    G1Y: seriesG[11].decile - seriesG[0].decile, intensityRank: dataStore.companyArray[index].intensityRank,
    controversies: dataStore.companyArray[index].controversies,
    pctSales: ( dataStore.companyArray[index].salesAverage[1] / dataStore.companyArray[index].totalSalesGroup[1] ) * 100,
    pctCO2: ( dataStore.companyArray[index].carbonAverage[1] / dataStore.companyArray[index].totalCarbonGroup[1] ) * 100
  };

  return (
    <Store.Consumer>
      {(store) => (
        <View style={{ backgroundColor: "#F5F5F5", flex: 1 }} >
          <TopBar />
          <View>
            <SafeAreaView>
              <ScrollView>
                <View style={styles.company}>
                  <Text style={styles.companyTitle}>{dataStore.companyDisplayName}</Text>
                </View>
                <Summary data={dataSummary} />
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
    fontSize: 25,
    fontFamily: 'NSRegular',
    color: "black",
    textAlign: 'center',
  },
  sideModal: {
    width: "100%",
    height: "100%",
  }
});