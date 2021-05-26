// Searching using Search Bar Filter in React Native List View
// https://aboutreact.com/react-native-search-bar-filter-on-listview/

// import React in our code
import React, { useState, useEffect, useContext } from 'react';

// import all the components we are going to use
import { SafeAreaView, Text, StyleSheet, View, FlatList, ActivityIndicator, TouchableWithoutFeedback } from 'react-native';
import { SearchBar } from 'react-native-elements';
import * as fb from '../../../firebase';
import context from '../../../context';
import Toast from 'react-native-toast-message';
import { getAllSecurities } from '../../../requests/request';
import findCompany from '../../../util/findCompany';

import NSLight from '../../../../assets/fonts/NunitoSans/NunitoSansLight.ttf';
import NSRegular from '../../../../assets/fonts/NunitoSans/NunitoSansRegular.ttf';
import NSBold from '../../../../assets/fonts/NunitoSans/NunitoSansBold.ttf';
import NSExtraBold from '../../../../assets/fonts/NunitoSans/NunitoSansExtraBold.ttf';

export default function Search({ route, navigation }) {
  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);
  const storeData = useContext(context);

  useEffect(() => {

    // console.log('masterDataSource :>> ', masterDataSource.length);
    async function fetchData() {
      let res = await getAllSecurities();
      let data = res.data;

      storeData.storeAllSecurities(data);
      setMasterDataSource(watchlistClean(data));
      setFilteredDataSource(watchlistClean(data));
    }

    function watchlistClean(data) {
      if (route.params.query === 'add') {
        let watchListc = [];
        storeData.watchList.forEach(elem => watchListc.push(elem.c));
        // console.log('watchListc :>> ', watchListc);
        const securitiesAllowed = data.filter(function (item) {
          return watchListc.indexOf(item.c) == -1;
        });
        return securitiesAllowed;
      } else {
        return data
      }
    }

    try {
      if (storeData.allSecurities == undefined || storeData.allSecurities.length == 0) {
        fetchData();
      } else {
        setMasterDataSource(storeData.allSecurities);
        setFilteredDataSource(storeData.allSecurities);
      }
    } catch (error) {
      console.log(error);
    }

  }, []);

  const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource
      // Update FilteredDataSource
      const newData = masterDataSource.filter(function (item) {
        const itemData = item.n
          ? item.n.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };

  const ItemView = ({ item }) => {
    return (
      // Flat List Item
      <View>
        <Text style={styles.itemName} onPress={() => getItem(item)}>
          {item.n.toUpperCase()}
        </Text>
        <Text style={styles.itemCountry} onPress={() => getItem(item)}>
          {item.p}
        </Text>
      </View>
    );
  };

  const ItemSeparatorView = () => {
    return (
      // Flat List Item Separator
      <View
        style={{
          height: 0.5,
          width: '100%',
          backgroundColor: '#C8C8C8',
        }}
      />
    );
  };

  const getItem = (item) => {
    if (route.params.query === 'add') {
      try {
        fb.addSecurityToWatchlist({ ...item, uid: storeData.user.uid });
        Toast.show({
          type: 'success',
          position: 'bottom',
          text1: item.n + ' added to watchlist',
          visibilityTime: 4000,
          autoHide: true,
          topOffset: 30,
          bottomOffset: 40
        })
        // console.log(navigation)
        navigation.goBack();
      } catch (error) {
        Toast.show({
          type: 'error',
          position: 'bottom',
          text1: 'Error updating',
          visibilityTime: 4000,
          autoHide: true,
          topOffset: 30,
          bottomOffset: 40
        });
        // navigation.goBack();
      }
    } else if (route.params.query === 'modifycompany') {
      fb.updateUser(storeData.user.uid, { company: item });
      storeData.updateUserInfo({ company: item });
      Toast.show({
        type: 'success',
        position: 'bottom',
        text1: item.n + ' is now your company',
        visibilityTime: 4000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40
      })
      navigation.goBack();
    } else if (route.params.query === 'select') {
      storeData.setLoader(true);
      findCompany(storeData.sectorArray, item, storeData.updateDate).then((val) => {
        if (val.tab) { storeData.pushSectorArray(val.tab) }
        storeData.newIndexSector(val.coord.row);
        storeData.newIndexCompany(val.coord);
        navigation.navigate('Company');
        storeData.setLoader(false);
      }).catch(err => {
        storeData.setLoader(false);
        console.log(err)
      });
    } else if (route.params.query === 'firstuse') {
      fb.updateUser(storeData.user.uid, { company: item });
      findCompany([], item, storeData.updateDate).then((val) => {
        if (val.tab) { storeData.pushSectorArray(val.tab) }
        storeData.newIndexSector(val.coord.row);
        storeData.newIndexCompany(val.coord);
        storeData.updateUserInfo({ company: item });
        navigation.navigate('Company');
        storeData.setLoader(false);
      }).catch(err => {
        storeData.setLoader(false);
        console.log(err)
      });
      Toast.show({
        type: 'success',
        position: 'bottom',
        text1: item.n + ' is now your company',
        visibilityTime: 4000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40
      })
    };
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <SearchBar
          round
          lightTheme={true}
          inputContainerStyle={{ backgroundColor: "#FFF" }}
          // backgroundColor="#FFF"
          searchIcon={{ size: 24 }}
          onChangeText={(text) => searchFilterFunction(text)}
          onClear={(text) => searchFilterFunction('')}
          placeholder="Search..."
          value={search}
        />
        {filteredDataSource.length > 0 ? 
        <FlatList
          keyboardShouldPersistTaps={'handled'}
          data={filteredDataSource}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={ItemSeparatorView}
          renderItem={ItemView}
        /> : <View style={styles.activityIndicator}><ActivityIndicator size="large" color="#FFF" /></View>
        }
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  itemName: {
    fontSize: 16,
    fontFamily: 'NSBold',
    paddingTop: 10,
    paddingLeft: 20
  },
  itemCountry: {
    fontSize: 12,
    fontFamily: 'NSLight',
    paddingBottom: 10,
    paddingLeft: 20
  },
  activityIndicator: {
    marginTop: 22,
  }
});
