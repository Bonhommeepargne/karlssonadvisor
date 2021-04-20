import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import Context from '../../../context';
import Constants from 'expo-constants';
import WatchListSelect from '../../../components/Main/Company/WatchListSelect'
import { Icon } from 'react-native-elements';

/* Modal watch list select Select compagny */

export default function SideModal({route, navigation}) {

  const store = React.useContext(Context);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backList} activeOpacity={1} onPress={() => { navigation.goBack() }}></TouchableOpacity>
      <View style={styles.list}>
        <View style={{ height: Constants.statusBarHeight }}></View>
        <View style={styles.listCompany}>
          <WatchListSelect route={route} navigation={navigation} />
        </View >
        <View style={{ flexDirection: 'row', height: 60, backgroundColor: '#FFF',}}>
          <TouchableOpacity style={styles.buttonLeft} activeOpacity={1} onPress={() => { navigation.goBack() }}>
            <Icon
              style={{ paddingLeft: 18, paddingRight: 25 }}
              name='arrow-left'
              type='font-awesome-5'
              color='black'
              size={20}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonRight} activeOpacity={1} onPress={() => { navigation.navigate('WatchList') }}>
            <Icon
              style={{ paddingLeft: 18, paddingRight: 25 }}
              name='edit'
              type='font-awesome-5'
              color='black'
              size={24}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    flex: 1,
    width: '100%',
    height: '100%',
  },
  backList: {
    position: "absolute",
    width: '100%',
    height: '100%',
    backgroundColor: '#000000aa',
  },
  list: {
    width: '75%',
    height: '100%',
    backgroundColor: '#FFFFFF',
  },
  listCompany: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  buttonLeft: {
    flex: 1,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#CCC'
  },
  buttonRight: {
    flex: 1,
    justifyContent: 'center',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderColor: '#CCC'
  },
});