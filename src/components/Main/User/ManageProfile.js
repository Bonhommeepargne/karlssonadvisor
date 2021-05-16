import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
  Modal,
} from 'react-native';
import Loader from './../../Loader/Loader'
import { useIsFocused } from '@react-navigation/native';
import Toast from 'react-native-toast-message';

import * as fb from "../../../firebase";
import Context from '../../../context';

// npm install react-native-elements
import { Icon } from 'react-native-elements';

// https://fonts.google.com/specimen/Nunito+Sans
import { useFonts } from 'expo-font';
import NSLight from '../../../../assets/fonts/NunitoSans/NunitoSansLight.ttf';
import NSRegular from '../../../../assets/fonts/NunitoSans/NunitoSansRegular.ttf';
import NSBold from '../../../../assets/fonts/NunitoSans/NunitoSansBold.ttf';
import NSExtraBold from '../../../../assets/fonts/NunitoSans/NunitoSansExtraBold.ttf';

export default function ManageProfile({route, navigation}) {

  const store = React.useContext(Context);

  // Gestion du formulaire
  const [firebaseError, setFirebaseError] = React.useState(null);
  const [activityIndicator, setActivityIndicator] = useState(false);

  const [fullname, setFullname] = React.useState(store.userInfo.fullname);
  const [company, setCompany] = React.useState(store.userInfo.company.n);
  const [position, setPosition] = React.useState(store.userInfo.position);
  const [phone, setPhone] = React.useState(store.userInfo.phone);
  const isFocused = useIsFocused();

  const [loaded] = useFonts({
    NSLight,
    NSRegular,
    NSBold,
    NSExtraBold,
  });
  
  useEffect(function () {
    setCompany(store.userInfo.company.n);
    }, [isFocused]);

  function onEdit() {
    (navigation.navigate('Search', { query: 'modifycompany' }))
  }

  async function updateProfile() {
    try {
      setActivityIndicator(true);
      await fb.updateUser(store.user.uid, {
        fullname: fullname,
        position: typeof position == 'undefined' ? '' : position,
        phone: typeof phone == 'undefined' ? '' : phone
      });
      let response = await fb.getUser(store.user.uid);
      store.updateUserInfo(response);
      setActivityIndicator(false);
      setFirebaseError("Info succesfully updated.")
      Toast.show({
        type: 'success',
        position: 'bottom',
        text1: "Info succesfully updated.",
        visibilityTime: 4000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40
      })
    } catch (err) {
      console.error("Update Info Error", err);
      setFirebaseError(err.message);
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
  }

  if (!loaded) {
    return (
      <Loader />
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputView}>
        <Icon
          style={{ paddingHorizontal: 4, width: 30 }}
          name='user'
          type='font-awesome'
          color='black'
          size={22}
        />
        <TextInput
          onChangeText={text => setFullname(text)}
          value={fullname}
          style={styles.input}
          placeholder='Full Name'
          placeholderTextColor='black'
          textContentType='name'
          autoCompleteType='name'
          returnKeyType='next'
        />
      </View>
      <View style={styles.inputView}>
        <Icon
          style={{ paddingHorizontal: 4, width: 30 }}
          name='building'
          type='font-awesome'
          color='black'
          size={22}
        />
        <TextInput
          onChangeText={text => setCompany(text)}
          value={company}
          style={styles.input}
          placeholder='Company'
          placeholderTextColor='black'
          textContentType='organizationName'
          returnKeyType='next'
          onFocus={onEdit}
          editable={false}
        />
        <TouchableOpacity
          style={{ paddingVertical: 4 }}
          onPress={() => {
            onEdit();
          }}
        >
          <Icon
            style={{ paddingHorizontal: 4 }}
            name='edit'
            type='font-awesome'
            color='black'
            size={22}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.inputView}>
        <Icon
          style={{ paddingHorizontal: 4, width: 30 }}
          name='user-md'
          type='font-awesome'
          color='black'
          size={22}
        />
        <TextInput
          onChangeText={text => setPosition(text)}
          value={position}
          style={styles.input}
          placeholder='Job Position'
          placeholderTextColor='black'
          textContentType='jobTitle'
          returnKeyType='next'
        />
      </View>
      <View style={styles.inputView}>
        <Icon
          style={{ paddingHorizontal: 4, width: 30 }}
          name='phone'
          type='font-awesome'
          color='black'
          size={22}
        />
        <TextInput
          onChangeText={text => setPhone(text)}
          value={phone}
          style={styles.input}
          placeholder='Phone'
          placeholderTextColor='black'
          textContentType='telephoneNumber'
          autoCompleteType='tel'
          keyboardType='phone-pad'
          returnKeyType='next'
        />
      </View>
      <View style={{ paddingTop: 20 }}>
        {!activityIndicator ?
          <TouchableOpacity style={styles.button} onPress={updateProfile}>
            <Text style={styles.buttonText}>Update</Text>
          </TouchableOpacity> :
          <View style={styles.activityIndicator}><ActivityIndicator size="large" color="black" /></View>}
      </View>
      {/* {firebaseError &&
        <View style={styles.errorView}>
          <Text style={styles.errorText}>{firebaseError}</Text>
        </View>} */}
    </View>)
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    marginTop: 10,
  },
  back: {
    marginTop: 20,
    marginHorizontal: 0,
    alignItems: 'flex-start'
  },
  welcomeText: {
    alignSelf: 'center',
    fontSize: 40,
    fontFamily: 'NSLight',
    marginTop: 190,
    color: '#fff',
  },
  switchTabsView: {
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  switchText: {
    padding: 2,
    fontSize: 20,
    color: '#fff',
    fontFamily: 'NSExtraBold',
  },
  inputView: {
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    marginTop: 10,
    marginHorizontal: 20,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  errorView: {
    marginTop: 40,
    marginHorizontal: 20,
  },
  errorText: {
    padding: 2,
    fontSize: 17,
    color: '#FFA07A',
    fontFamily: 'NSRegular',
    textAlign: 'center',
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 16,
    fontFamily: 'NSLight',
    paddingHorizontal: 4,
    color: 'black',
  },
  button: {
    marginHorizontal: 20,
    backgroundColor: '#fafafa',
    marginTop: 12,
    paddingVertical: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: { fontFamily: 'NSRegular', fontSize: 16, color: '#000' },
  forgotPasswordText: {
    marginHorizontal: 20,
    marginTop: 20,
    alignSelf: 'flex-end',
    color: '#fff',
    fontSize: 18,
    fontFamily: 'NSBold',
  },
  buttonOpacity: {
    backgroundColor: '#222f3e',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 4,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
