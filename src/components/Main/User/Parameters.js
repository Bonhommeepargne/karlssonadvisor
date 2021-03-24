import React, { useState, useEffect, useContext } from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Switch
} from 'react-native';
import Context from './../../../context';
import * as fb from "../../../firebase";
import Toast from 'react-native-toast-message';

// https://fonts.google.com/specimen/Nunito+Sans
import { useFonts } from 'expo-font';
import NSLight from '../../../../assets/fonts/NunitoSans/NunitoSansLight.ttf';
import NSRegular from '../../../../assets/fonts/NunitoSans/NunitoSansRegular.ttf';
import NSBold from '../../../../assets/fonts/NunitoSans/NunitoSansBold.ttf';
import NSExtraBold from '../../../../assets/fonts/NunitoSans/NunitoSansExtraBold.ttf';

export default function Parameters() {

  const store = useContext(Context);
  const [isEnabled, setIsEnabled] = useState(true);

  async function toggleSwitch() {
    try {
      setIsEnabled(prev => !prev)
      await fb.updateUser(store.user.uid, { notification: !isEnabled});
      let response = await fb.getUser(store.user.uid);
      store.updateUserInfo(response);
    } catch (err) {
      console.error("Notification Erro Update", err);
      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: "Try again later.",
        visibilityTime: 4000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40
      })
    }
  };

  useEffect(function () {
    if (!store.userInfo.notification) {
      setIsEnabled(true)
    } else {
      setIsEnabled(store.userInfo.notification)
    }
    // StatusBar.setBarStyle('light-content', true);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        <View style={styles.elementLeft}>
          <Text style={styles.parameterText}>
            Notifications
            </Text>
        </View>
        <View style={styles.elementRight}>
          <Switch
            trackColor={{ false: "#767577", true: "#86B206" }}
            thumbColor={isEnabled ? "#fff" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#C8C8C8',
    paddingHorizontal: 20,
    // width: '90%'
  },
  elementLeft: {
    // borderWidth: 2,
    // borderColor: 'red'
  },
  elementRight: {
    // borderWidth: 2,
    // borderColor: 'red'
  },
  parameterText: {
    fontSize: 18,
    fontFamily: 'NSLight',
    color: 'black',
  },
});
