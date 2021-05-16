import React, { useState, useEffect } from 'react';
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

export default function Reset() {

  const [loaded] = useFonts({
    NSLight,
    NSRegular,
    NSBold,
    NSExtraBold,
  });

  // Gestion du formulaire
  const [firebaseError, setFirebaseError] = React.useState(null);
  const [modalVisible, setModalVisible] = React.useState(false);

  async function changePassword() {
    if (email != '') {
      setFirebaseError(null);
      try {
        await resetPassword(email);
        setModalVisible((prev) => !prev);
      } catch (err) {
        console.error("Reset password Error", err);
        setFirebaseError(err.message);
      }
    } else {
      setFirebaseError('Please enter a valid Email.');
    }
  }

  if (!loaded) {
    return (
      <View>
        <Text></Text>
      </View>
    );
  }

  return (
    <LinearGradient colors={['#6A8712', '#86B206']} style={styles.container}>
      <View>
        <Text style={styles.welcomeText}>
          Reset Password
          </Text>
        <View style={{ marginTop: 10 }}>
          <View style={styles.inputView}>
            <Icon
              style={{ paddingHorizontal: 4 }}
              name='envelope'
              type='font-awesome'
              color='#fff'
              size={22}
            />
            <TextInput
              style={styles.input}
              onChangeText={text => email = text}
              placeholder='Email'
              placeholderTextColor='#f1f2f6'
              keyboardType='email-address'
              textContentType='emailAddress'
              autoCapitalize='none'
              autoCompleteType='email'
              returnKeyType='next'
            />
          </View>
          <View style={{ paddingTop: 10 }}>
            <TouchableOpacity style={styles.button} onPress={changePassword}>
              <Text style={styles.buttonText}>Reset Password</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {firebaseError &&
        <View style={styles.errorView}>
          <Text style={styles.errorText}>{firebaseError}</Text>
        </View>}

      <View style={styles.centeredView} >
        <Modal animationType='slide' transparent={true} visible={modalVisible} >
          <View style={[styles.centeredView, { marginTop: -100 }]} >
            <View style={styles.modalView}>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }} >
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Reset Password </Text>
                <TouchableOpacity style={{ paddingHorizontal: 4 }} onPress={() => setModalVisible((prev) => !prev)}>
                  <Icon name='close' />
                </TouchableOpacity>
              </View>
              <View>
                <Text style={{ marginTop: 40, height: 120, fontSize: 17 }} >
                  Your Password has been reset.
                  Check your Email for instructions.
                  </Text>
              </View >
            </View>
          </View>
        </Modal>
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
