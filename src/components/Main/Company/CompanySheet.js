import React, { useState, useEffect, useContext } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import dataGraph from '../../../util/dataGraph';

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

  const dataStore = useContext(Store);

  const [comp, setComp] = useState(null);
  const [dataESG, setDataESG] = useState(null);
  const [dataE, setDataE] = useState(null);
  const [dataS, setDataS] = useState(null);
  const [dataG, setDataG] = useState(null);

  let company = null;
  useEffect(() => {
    dataStore.setOurLoader(true);
  }, [])

  useEffect(() => {
    company = dataStore.sectorArray[dataStore.indexCompany.row][dataStore.indexCompany.col]
    setComp(company);

    setDataESG({
      title: 'Agregate ESG Rating',
      groupname: company.SASBSubSector,
      series: dataGraph(company.ESG_SubSector_decile, company.Datenum)
    });

    setDataE({
      title: 'Environmental Rating',
      groupname: company.SASBSubSector,
      series: dataGraph(company.E_SubSector_decile, company.Datenum)
    });

    setDataS({
      title: 'Social Rating',
      groupname: company.SASBSubSector,
      series: dataGraph(company.S_SubSector_decile, company.Datenum)
    })

    setDataG({
      title: 'Governance Rating',
      groupname: company.SASBSubSector,
      series: dataGraph(company.G_SubSector_decile, company.Datenum)
    })

  }, [dataStore.indexCompany.row, dataStore.indexCompany.col]);

  return (
    <>
      { comp &&
        (<View style={{ backgroundColor: "#F5F5F5", flex: 1 }} >
          <TopBar />
          <View>
            <SafeAreaView>
              <ScrollView>
                <View style={styles.company}>
                  <Text style={styles.companyTitle}>{comp.Name}</Text>
                </View>
                {/* <TouchableOpacity
                  style={{paddingHorizontal: 5}}
                  onPress={() => console.log('toto')}
                >
                  <Text>Press Here</Text>
                </TouchableOpacity> */}
                <Summary data={comp} />
                <GraphRank data={dataESG} />
                <GraphRank data={dataE} />
                <GraphRank data={dataS} />
                <GraphRank data={dataG} />
                <View style={{ height: 100 }}>
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
    fontFamily: 'NSRegular',
    color: "black",
    textAlign: 'center',
  },
  sideModal: {
    width: "100%",
    height: "100%",
  }
});