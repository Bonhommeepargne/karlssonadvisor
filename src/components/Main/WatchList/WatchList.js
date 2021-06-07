import React, { useState, useEffect, useContext } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  TouchableWithoutFeedback,
} from 'react-native';
import Toast from 'react-native-toast-message';
import * as fb from "../../../firebase";
import context from '../../../context';
import { Icon } from 'react-native-elements';

// https://fonts.google.com/specimen/Nunito+Sans
import { useFonts } from 'expo-font';
import NSLight from '../../../../assets/fonts/NunitoSans/NunitoSansLight.ttf';
import NSRegular from '../../../../assets/fonts/NunitoSans/NunitoSansRegular.ttf';
import NSBold from '../../../../assets/fonts/NunitoSans/NunitoSansBold.ttf';
import NSExtraBold from '../../../../assets/fonts/NunitoSans/NunitoSansExtraBold.ttf';
import { NavigationHelpersContext } from '@react-navigation/core';

export default function WatchList() {

  const user = useContext(context);
  const [masterDataSource, setMasterDataSource] = useState([]);

  useEffect(function () {
    let unsubscribe = fb.db.collection("watchlist").where("uid", "==", user.user.uid)
      .onSnapshot((querySnapshot) => {
        var companyList = [];
        querySnapshot.forEach((doc) => {
          let obj = doc.data();
          companyList.push({...obj, id: doc.id});
        });
        user.storeWatchList(companyList);
        setMasterDataSource(companyList);
      });
    
      return unsubscribe;
  }, []);

  const ItemView = ({ item }) => {
    return (
      <View style={{flex: 1, display: "flex", flexDirection: 'row', justifyContent: 'space-between',
        paddingTop: 10, paddingBottom: 10,
        paddingLeft:20, paddingRight: 25, }}>
        <View style={{flex: 1, display: "flex", flexDirection: 'column', width: "80%", height: "100%",}}>
          <Text style={styles.itemName}>
            {item.n.toUpperCase()}
          </Text>
          <Text style={styles.itemCountry}>
            {item.p}
          </Text>
        </View>
        <View style={{justifyContent: 'center'}}>
          <TouchableWithoutFeedback onPress={() => getItem(item)}>
            <Icon
              style={{}}
              name='trash-alt'
              type='font-awesome-5'
              color='black'
              size={20}
            />
          </TouchableWithoutFeedback>
        </View>
      </View>
    );
  };

  const ItemSeparatorView = () => {
    return (
      // Flat List Item Separator
      <View
        style={{
          height: 1,
          width: '100%',
          backgroundColor: '#C8C8C8',
        }}
      />
    );
  };

  const getItem = (item) => {
    try {
      fb.deleteSecurityToWatchlist(item.id);
      Toast.show({
        type: 'success',
        position: 'bottom',
        text1: item.n + ' deleted from watchlist',
        visibilityTime: 4000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 100
      })
    } catch (error) {
      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'Error deleting',
        visibilityTime: 4000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 100
      });
    };
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={masterDataSource}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={ItemSeparatorView}
        renderItem={ItemView}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  container: {
    backgroundColor: 'white',
  },
  itemName: {
    fontSize: 16,
    fontFamily: 'NSBold',
    width: "100%",
  },
  itemCountry: {
    fontSize: 12,
    fontFamily: 'NSLight',
  },
});
