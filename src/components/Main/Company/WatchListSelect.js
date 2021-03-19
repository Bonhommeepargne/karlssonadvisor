import React, { useState, useEffect, useContext } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
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

export default function WatchList({routes, navigation}) {

  const store = useContext(context);
  const [masterDataSource, setMasterDataSource] = useState([]);

  useEffect(function () {
    fb.db.collection("watchlist").where("uid", "==", store.user.uid)
      .onSnapshot((querySnapshot) => {
        var companyList = [];
        querySnapshot.forEach((doc) => {
          let obj = doc.data();
          companyList.push({ ...obj, id: doc.id });
        });
        setMasterDataSource(companyList);
      });
  }, []);

  const ItemView = ({ item }) => {
    return (
      <View style={{
        flexDirection: 'row', justifyContent: 'space-between', paddingTop: 10, paddingBottom: 10,
        paddingLeft: 20, paddingRight: 25, backgroundColor: '#FFF'
      }}>
        <View styles={{}}>
          <TouchableOpacity onPress={() => { getItem(item);}} >
            <Text style={styles.itemName}>
              {item.n.toUpperCase()}
            </Text>
            <Text style={styles.itemCountry}>
              {item.p}
            </Text>
          </TouchableOpacity>
        </View>
        {/* <View style={{justifyContent: 'center'}}>
        <TouchableWithoutFeedback onPress={() => getItem(item)}>
            <Icon
              style={{}}
              name='trash-alt'
              type='font-awesome-5'
              color='black'
              size={20}
            />
          </TouchableWithoutFeedback>
        </View> */}
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
    store.newCompanyDisplay(item.c);
    navigation.goBack()
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
    // width: 350
  },
  itemCountry: {
    fontSize: 12,
    fontFamily: 'NSLight',
  },
});
