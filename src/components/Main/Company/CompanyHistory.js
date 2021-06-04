import React, { useState, useEffect, useContext } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity
} from 'react-native';

import GraphRank from './CompDashboard/GraphRank';

// https://fonts.google.com/specimen/Nunito+Sans
// import { useFonts } from 'expo-font';
// import NSLight from '../../../../assets/fonts/NunitoSans/NunitoSansLight.ttf';
// import NSRegular from '../../../../assets/fonts/NunitoSans/NunitoSansRegular.ttf';
// import NSBold from '../../../../assets/fonts/NunitoSans/NunitoSansBold.ttf';
// import NSExtraBold from '../../../../assets/fonts/NunitoSans/NunitoSansExtraBold.ttf';

import Store from '../../../context';

export default function CompanyHistory({ route, navigation }) {

  const dataStore = useContext(Store);

  const [comp, setComp] = useState(null);
  const [dataESG, setDataESG] = useState(null);
  const [dataE, setDataE] = useState(null);
  const [dataS, setDataS] = useState(null);
  const [dataG, setDataG] = useState(null);

  let company = null;

  useEffect(() => {
    company = dataStore.sectorArray[dataStore.indexCompany.row][dataStore.indexCompany.col]

    setComp(company);

    setDataESG({
      title: 'Aggregate ESG Rating',
      groupname: company.SASBSubSector,
      series: company.DataGraphESG
    });

    setDataE({
      title: 'Environmental Rating',
      groupname: company.SASBSubSector,
      series: company.DataGraphE
    });

    setDataS({
      title: 'Social Rating',
      groupname: company.SASBSubSector,
      series: company.DataGraphS
    })

    setDataG({
      title: 'Governance Rating',
      groupname: company.SASBSubSector,
      series: company.DataGraphG
    })

  }, [dataStore.indexCompany.row, dataStore.indexCompany.col]);

  return (
    <>
      { comp &&
        (<View style={{ backgroundColor: "#F5F5F5", flex: 1 }} >
          {/* <TopBar /> */}
          <View>
            <SafeAreaView>
              <ScrollView>
                <View style={styles.company}>
                  <Text style={styles.companyTitle}>{comp.Name}</Text>
                  <Text style={styles.regionCountry}>{comp.Region} - {comp.Country}</Text>
                </View>
                {/* <Summary data={comp} /> */}
                <GraphRank data={dataESG} />
                <GraphRank data={dataE} />
                <GraphRank data={dataS} />
                <GraphRank data={dataG} />
                {/* <Info data={comp} /> */}
                <View style={{ height: 50 }}>
                </View>
              </ScrollView>
            </SafeAreaView>
          </View>
        </View>)
      }
    </>
  );
}

const styles = StyleSheet.create({
  company: {
    marginVertical: 10,
    width: "100%",
  },
  companyTitle: {
    fontSize: 22,
    fontFamily: 'NSExtraBold',
    color: "#40520b",
    textAlign: 'center',
  },
  regionCountry: {
    fontSize: 14,
    fontFamily: 'NSRegular',
    color: "black",
    textAlign: 'center',
  },
  sideModal: {
    width: "100%",
    height: "100%",
  }
});