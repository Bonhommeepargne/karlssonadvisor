import React, { useState, useEffect, useContext } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Button
} from 'react-native';
import axios from 'axios';
import { useNavigation, useIsFocused } from '@react-navigation/native';

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

  const [masterDataSource, setMasterDataSource] = useState({});
  const [dataLoaded, setDataLoaded] = useState(false);

  const dataStore = useContext(Store);
  const isFocused = useIsFocused();

  const storeData = useContext(Store)

  useEffect(() => {

    var config = {
      method: 'get',
      url: 'https://finlive-app.herokuapp.com/ESG/' + dataStore.companyDisplay,
      headers: {
        'pass': 'CALLIBRI'
      }
    };


    console.log(storeData.companyArray.length);
    let test = false;
    for (let i = 0; i < storeData.companyArray.length; i++) {
      if (dataStore.companyDisplay === dataStore.companyArray[i].Sedol7) {
        test = true;
        setMasterDataSource(dataStore.companyArray[i]);
        break;
      }
    }

    console.log('__________________')
    for (let i = 0; i < storeData.companyArray.length; i++) {
      console.log(dataStore.companyArray[i].NAME)
    }
    console.log('__________________')

    if ( test === false ) {
      axios(config)
        .then(function (response) {
          setMasterDataSource(response.data);
          storeData.pushCompanyArray(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
      }

}, [isFocused]);

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
  <Store.Consumer>
    {(store) => (
      <View style={{ backgroundColor: "#F5F5F5", flex: 1 }}>
        <TopBar />
        <View style={styles.company}>
          <Text style={styles.companyTitle}>{masterDataSource.NAME}</Text>
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
    )}
  </Store.Consumer>
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