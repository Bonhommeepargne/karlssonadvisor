import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import TabPerf from './TabPerf/TabPerf';
import TabESG from './TabESG/TabESG';
import TabCarbon from './TabCarbon/TabCarbon';
import Store from '../../../context';
import namecompany from '../../../util/namecompany';
import _ from 'lodash';

import { getSectorESG } from './../../../requests/request';
import formatNumber from '../../../util/formatNumber';
import intensity from '../../../util/intensity';

import NSLight from '../../../../assets/fonts/NunitoSans/NunitoSansLight.ttf';
import NSRegular from '../../../../assets/fonts/NunitoSans/NunitoSansRegular.ttf';
import NSBold from '../../../../assets/fonts/NunitoSans/NunitoSansBold.ttf';
import NSExtraBold from '../../../../assets/fonts/NunitoSans/NunitoSansExtraBold.ttf';

// npm install @react-navigation/material-top-tabs react-native-tab-view
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

function TitleSector() {
  return (
    <Store.Consumer>
      {(store) => (
        <View style={{ height: 50, padding: 10 }}>
          <Text style={{ fontSize: 20, fontFamily: 'NSBold', color: 'black' }}>{store.sectorDisplayName}</Text>
        </View>
      )}
    </Store.Consumer>
  )
}

function MTabESG(props) {

  return (
    <View style={styles.container}>
      <TitleSector />
      <TabESG />
    </View>
  );
}

function MTabCarbon(props) {
  return (
    <View style={styles.container}>
      <TitleSector />
      <TabCarbon />
    </View>
  );
}
function MTabPerf(props) {
  return (
    <View style={styles.container}>
      <TitleSector />
      <TabPerf />
    </View>
  );
}

const Tab = createMaterialTopTabNavigator();

export default function TopTabs() {

  const dataStore = useContext(Store);
  const [ data, setData ] = useState([]);

  useEffect(() => {
    console.log('sector');
    // console.log(dataStore.sectorArray);
    // console.log(dataStore.sectorArray.length);
    // console.log(dataStore.sectorArray)
    let test = false;
    for (let i = 0; i < dataStore.sectorArray.length; i++) {    
      if (dataStore.sectorDisplay === dataStore.sectorArray[i][0].SASBIndustryGroupCode) {
        test = true;
        console.log('sector trouvée' + i)
        dataStore.newIndexArray(i);
        setData(dataStore.sectorArray[i]);
        break;
      }
    }

    async function getESGSectorData() {
      dataStore.setLoader((value) => (true));
      console.log('secteur demandé', dataStore.sectorDisplay)
        let response = await getSectorESG('SASBIndustryGroupCode',dataStore.sectorDisplay);
        if (!response.data) {
          dataStore.setLoader((value) => (false));
          return;
        }
        let dataLoaded = response.data;
        let dataObj =[];

        for (let t=0; t< dataLoaded.length; t++ ) {
          let obj = {};
          obj = _.pick(dataLoaded[t], 'ESG', 'E', 'S', 'G', 'ESG1Y', 'E1Y', 'S1Y', 'G1Y', 'SASBIndustryGroupCode',
            'Sedol7' )
          obj.Perf1M = formatNumber(dataLoaded[t].Perf1M);
          obj.Perf3M = formatNumber(dataLoaded[t].Perf3M);
          obj.Perf1Y = formatNumber(dataLoaded[t].Perf1Y);
          obj.Perf6M = formatNumber(dataLoaded[t].Perf6M);
          obj.PerfYTD = formatNumber(dataLoaded[t].PerfYTD);
          obj.Perf3Y = formatNumber(dataLoaded[t].Perf3Y);
          obj.Name = namecompany(dataLoaded[t].NAME);
          obj.Int = dataLoaded[t].intensityRank[1];
          obj.SalesPct =  formatNumber(( dataLoaded[t].salesAverage[1] / dataLoaded[t].totalSalesGroup[1] ) * 100);
          obj.CarbonPct =  formatNumber(( dataLoaded[t].carbonAverage[1] / dataLoaded[t].totalCarbonGroup[1] ) * 100);
          obj.Carbon = Number((Math.abs(dataLoaded[t].carbonAverage[1])/1000).toFixed(1));
          obj.s = parseInt(dataLoaded[t].Market_Cap/100)/10;
          dataObj.push(obj);
        }
        setData(dataObj);
        dataStore.pushSectorArray(dataObj);
        dataStore.newIndexArray(dataStore.sectorArray.length - 1);

        dataStore.setLoader((value) => (false));
    }

    if (test === false) {
      console.log('sector pas trouvée')
      getESGSectorData();
    }

    // console.log(dataStore.indexArray)
    // console.log(dataStore.sectorArray.length);
    // console.log(JSON.stringify(dataStore.sectorArray))

  }, [ dataStore.sectorDisplay ]);

  return (
    <> 
      {data.length > 0 &&
        <Tab.Navigator style={{ marginTop: 0 }} tabBarOptions={{
          activeTintColor: '#6A8712',
          inactiveTintColor: 'gray',
          indicatorStyle: {
            backgroundColor: '#6A8712',
          },
        }}>
          <Tab.Screen name='ESG' component={MTabESG} />
          <Tab.Screen name='Carbon' component={MTabCarbon} />
          <Tab.Screen name='Performance' component={MTabPerf} />
        </Tab.Navigator>
      }
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f6f6'
  },
});