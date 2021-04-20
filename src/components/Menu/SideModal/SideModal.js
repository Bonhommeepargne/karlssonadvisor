import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Button,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import Context from '../../../context';
import Constants from 'expo-constants';
import WatchListSelect from '../../../components/Main/Company/WatchListSelect'

/* Modal watch list select Select compagny */ 

export default function SideModal(props) {

  const store = React.useContext(Context);

  return (
    <View style={styles.container}> 
      <TouchableOpacity style={styles.backList} activeOpacity={1} onPress={() => { store.setSideModalVisible((value) => (!value))}}></TouchableOpacity>
      <View style={styles.list}>
        <View style={{height: Constants.statusBarHeight}}></View>
        <View style={styles.listCompany}>
          <WatchListSelect />
        </View>
        <Button style={{marginTop: 15}} title="Back" onPress={() => {store.setSideModalVisible((value) => (!value))}} color="#6A8712" />
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
  listCompany : {
    flex: 1,
    width: "100%",
    height: "100%",
  },
});