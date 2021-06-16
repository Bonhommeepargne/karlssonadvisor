import React, { useState, useEffect, useContext } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import Store from "./../../../context";
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';

// https://fonts.google.com/specimen/Nunito+Sans
import { useFonts } from 'expo-font';
import NSLight from '../../../../assets/fonts/NunitoSans/NunitoSansLight.ttf';
import NSRegular from '../../../../assets/fonts/NunitoSans/NunitoSansRegular.ttf';
import NSBold from '../../../../assets/fonts/NunitoSans/NunitoSansBold.ttf';
import NSExtraBold from '../../../../assets/fonts/NunitoSans/NunitoSansExtraBold.ttf';


export default function Subscription() {

  const navigation = useNavigation();

  const dataStore = useContext(Store);

  useEffect(() => {
    dataStore.setOurLoader(true);
  }, [])

  return (
    <Store.Consumer>
      {(store) => (
        <View style={styles.container}>
            <View style={styles.manchette} >
              <Text style={styles.text}>Plan type:</Text>
              <Text style={styles.val}>{store.userInfo.subscription.type}</Text>
            </View >
            <View style={styles.manchette} >
              <Text style={styles.text}>Start Date:</Text>
              <Text style={styles.val}>{moment(store.userInfo.subscription.start).format('DD-MMMM-YYYY')}</Text>
            </View >
            <View style={styles.manchette} >
              <Text style={styles.text}>Expire:</Text>
              <Text style={styles.val}>{moment(store.userInfo.subscription.expire).format('DD-MMMM-YYYY')}</Text>
            </View >
            <View style={styles.manchette} >
              {moment().isBefore(moment(store.userInfo.subscription.expire)) ?
                 <Text style={styles.notExpired}>Your subscription will expire in {moment(store.userInfo.subscription.expire).diff(moment(), 'days')} days.</Text>
                  : <Text style={styles.expired}>Your subscription has expired.</Text>}
            </View >
            <View style={{ flexDirection:'row', justifyContent: 'flex-end', paddingTop: 20 }}>
              <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Contact')}>
                <Text style={styles.buttonText}>Contact Karlsson to renew</Text>
              </TouchableOpacity>
          </View>
        </View >
      )
}
    </Store.Consumer >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    paddingHorizontal: 15
  },
  text: {
    fontSize: 18,
    color: 'black',
    fontFamily: 'NSRegular'
  },
  val: {
    fontSize: 18,
    color: 'grey',
    paddingLeft: 10,
    fontFamily: 'NSRegular'
  },
  notExpired: {
    fontSize: 18,
    color: 'grey',
    textAlign: 'center',
    fontFamily: 'NSBold'
  },
  expired: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    fontFamily: 'NSBold'
  },
  manchette: {
    flexDirection: 'row',
    paddingVertical: 10
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 20,
    borderColor: 'grey',
    marginTop: 0,
    alignItems: 'center',
    justifyContent:'center',
    borderWidth: 1,
    borderRadius: 10
  },
  buttonText: { fontFamily: 'NSRegular', fontSize: 16, color: 'grey' },
});
