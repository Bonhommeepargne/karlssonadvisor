import React, { useState, useEffect, useContext } from 'react';
import * as fb from '../../../firebase'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Modal,
} from 'react-native';

// expo install expo-linear-gradient (For Expo Users)
// Alternate: npm i react-native-linear-gradient (For non-expo users)
import { LinearGradient } from 'expo-linear-gradient';
import Store from '../../../context';

// npm install react-native-elements
import { Icon } from 'react-native-elements';

// https://fonts.google.com/specimen/Nunito+Sans
import { useFonts } from 'expo-font';
import NSLight from '../../../../assets/fonts/NunitoSans/NunitoSansLight.ttf';
import NSRegular from '../../../../assets/fonts/NunitoSans/NunitoSansRegular.ttf';
import NSBold from '../../../../assets/fonts/NunitoSans/NunitoSansBold.ttf';
import NSExtraBold from '../../../../assets/fonts/NunitoSans/NunitoSansExtraBold.ttf';

// import pour la Gestion du formulaire
import { resetPassword } from '../../../firebase';

var email = "";

export default function sendActivationLink() {

  const dataStore = useContext(Store);

  useEffect(() => {
    dataStore.setOurLoader(true);
  }, [])

  // Gestion du formulaire
  const [firebaseError, setFirebaseError] = React.useState(null);;

  async function sendActivationLink() {
    try {
      await fb.sendEmailForVerification();
      setFirebaseError('An email has been sent to you.');
    } catch (err) {
      console.error("Reset password Error", err);
      setFirebaseError(err.message);
    }
  }

  async function goBackToLogin() {
    try {
      await fb.logout();
    } catch (err) {
      console.error("Reset password Error", err);
      setFirebaseError(err.message);
    }
  }

  return (
    <LinearGradient colors={['#6A8712', '#86B206']} style={styles.container}>
      <View style={{ width: '95%', padding:10 }}>
        <Text style={styles.titleText}>
          Account not activated yet.
          </Text>
        <Text style={styles.pText}>
          Check your Email and click on the activation link.
          </Text>
        <View style={{ paddingTop: 10 }}>
          <TouchableOpacity style={styles.button} onPress={sendActivationLink}>
            <Text style={styles.buttonText}>Resend Activation link</Text>
          </TouchableOpacity>
        </View>
        <View style={{ paddingTop: 10 }}>
          <TouchableOpacity style={styles.button} onPress={goBackToLogin}>
            <Text style={styles.buttonText}>Go back to login page</Text>
          </TouchableOpacity>
        </View>

        {firebaseError &&
          <View style={styles.errorView}>
            <Text style={styles.errorText}>{firebaseError}</Text>
          </View>}

      </View>
    </LinearGradient >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  back: {
    marginTop: 20,
    marginHorizontal: 0,
    alignItems: 'flex-start'
  },
  titleText: {
    alignSelf: 'center',
    fontSize: 22,
    fontFamily: 'NSBold',
    marginTop: 170,
    color: '#fff',
  },
  pText: {
    fontSize: 20,
    fontFamily: 'NSLight',
    color: '#fff',
    textAlign: 'center',
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
    borderBottomColor: '#fff',
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
    color: '#fff',
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
