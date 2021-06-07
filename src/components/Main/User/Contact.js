import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
  Linking
} from 'react-native';
import Toast from 'react-native-toast-message';
import { sendEmail } from '../../../requests/request';

import Context from '../../../context';

// npm install react-native-elements
import { Icon } from 'react-native-elements';

// https://fonts.google.com/specimen/Nunito+Sans
import { useFonts } from 'expo-font';
import NSLight from '../../../../assets/fonts/NunitoSans/NunitoSansLight.ttf';
import NSRegular from '../../../../assets/fonts/NunitoSans/NunitoSansRegular.ttf';
import NSBold from '../../../../assets/fonts/NunitoSans/NunitoSansBold.ttf';
import NSExtraBold from '../../../../assets/fonts/NunitoSans/NunitoSansExtraBold.ttf';
import { ScrollView } from 'react-native-gesture-handler';

export default function ManageProfile({ route, navigation }) {

  const store = React.useContext(Context);

  // Gestion du formulaire
  const [firebaseError, setFirebaseError] = React.useState(null);
  const [activityIndicator, setActivityIndicator] = useState(false);

  const [fullname, setFullname] = React.useState(store.userInfo.fullname);
  const [message, setMessage] = React.useState('');
  const [phone, setPhone] = React.useState(store.userInfo.phone);
  const [email, setEmail] = React.useState(store.userInfo.email);

  const ExternalLinkBtn = (props) => {
    return <TouchableOpacity
      onPress={() => {
        Linking.openURL(props.url)
          .catch(err => {
            console.error("Failed opening page because: ", err)
            alert('Failed to open page')
          })
      }} >
      <Text style={{ fontSize: 16, fontFamily: 'NSBold', color: 'blue' }}>{props.title}</Text>
    </TouchableOpacity>
  }

  async function sendEmailToKarlsson() {
    if (message != '') {
      try {
        setFirebaseError(null);
        setActivityIndicator(true);

        let HTMLContent = `<p>Full Name: ${fullname}</p>`
          + `<p>email: <a href="${email}">${email}</a></p>`
          + `<p>Phone: ${phone}</p>`
          + `<p>Company: ${store.userInfo.company.n}</p>`
          + `<p>uid: ${store.userInfo.uid}</p>`
          + `<p>Message: ${message}</p>`

        let TEXTContent = `Full Name: ${fullname}\n`
          + `email: ${email}\n`
          + `Phone: ${phone}\n`
          + `Company: ${store.userInfo.company.n}\n`
          + `uid: ${store.userInfo.uid}\n`
          + `Message: ${message}\n`

        let content = {
          from: 'app@karlssonadvisor@com',
          to: 'charles.granger@karlssonadvisor.com,pierre.savarzeix@gmail.com',
          subject: "Message from Karlsson App user",
          text: TEXTContent,
          html: HTMLContent,
        };

        await sendEmail(content);
        setMessage('');

        setActivityIndicator(false);
        Toast.show({
          type: 'success',
          position: 'bottom',
          text1: "Message sent.",
          visibilityTime: 4000,
          autoHide: true,
          topOffset: 30,
          bottomOffset: 100
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
          bottomOffset: 100
        })
      }
    } else {
      setFirebaseError('Message empty')
    }
  }

  return (
    <SafeAreaView>
      <ScrollView keyboardShouldPersistTaps={'handled'} >
        <View style={styles.container}>
          <View style={{ alignItems: 'center',paddingBottom: 20 }}>
            <Text style={{
              fontSize: 16,
              fontFamily: 'NSLight',
              color: 'dimgrey',
            }} >You can send an Email to: </Text>
            <ExternalLinkBtn title={'pierre.riskin@karlssonadvisor.com'} url={'mailto:pierre.riskin@karlssonadvisor.com'} />
            <Text style={{
              fontSize: 16,
              fontFamily: 'NSLight',
              color: 'dimgrey',
            }} > or fill the form below:</Text>
          </View>
          <View style={styles.inputView}>
            <Icon
              style={{ paddingHorizontal: 4, width: 30 }}
              name='user'
              type='font-awesome'
              color='dimgrey'
              size={22}
            />
            <TextInput
              onChangeText={text => setFullname(text)}
              value={fullname}
              style={styles.input}
              placeholder='Full Name'
              placeholderTextColor='dimgrey'
              textContentType='name'
              autoCompleteType='name'
              returnKeyType='next'
            />
          </View>
          <View style={styles.inputView}>
            <Icon
              style={{ paddingHorizontal: 4, width: 30 }}
              name='email'
              type='Fontisto'
              color='dimgrey'
              size={22}
            />
            <TextInput
              onChangeText={text => setEmail(text)}
              value={email}
              style={styles.input}
              placeholder='Email'
              placeholderTextColor='dimgrey'
              textContentType='emailAddress'
              autoCompleteType='email'
              returnKeyType='next'
            />
          </View>
          <View style={styles.inputView}>
            <Icon
              style={{ paddingHorizontal: 4, width: 30 }}
              name='phone'
              type='font-awesome'
              color='dimgrey'
              size={22}
            />
            <TextInput
              onChangeText={text => setPhone(text)}
              value={phone}
              style={styles.input}
              placeholder='Phone'
              placeholderTextColor='dimgrey'
              textContentType='telephoneNumber'
              autoCompleteType='tel'
              keyboardType='phone-pad'
              returnKeyType='next'
            />
          </View>
          <View style={styles.inputViewLarge}>
            {/* <Icon
          style={{ paddingHorizontal: 4, width: 30 }}
          name='user'
          type='font-awesome'
          color='dimgrey'
          size={22}
        /> */}
            <TextInput
              multiline={true}
              editable
              textAlignVertical='top'
              numberOfLines={10}
              onChangeText={text => setMessage(text)}
              value={message}
              style={styles.inputLarge}
              placeholder='Message'
              placeholderTextColor='dimgrey'
              returnKeyType='next'
            />
          </View>
          <View style={{ flexDirection:'row', justifyContent: 'flex-end', paddingTop: 20 }}>
            {!activityIndicator ?
              <TouchableOpacity style={styles.button} onPress={sendEmailToKarlsson}>
                <Text style={styles.buttonText}>Send</Text>
              </TouchableOpacity> :
              <View style={styles.button}><ActivityIndicator size="large" color="dimgrey" /></View>}
          </View>
          {firebaseError &&
            <View style={styles.errorView}>
              <Text style={styles.errorText}>{firebaseError}</Text>
            </View>}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    marginVertical: 20,
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
    borderBottomColor: 'dimgrey',
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
    color: 'dimgrey',
  },
  inputLarge: {
    fontSize: 16,
    fontFamily: 'NSLight',
    paddingHorizontal: 4,
    color: 'dimgrey',
  },
  inputViewLarge: {
    borderWidth: 1,
    borderColor: 'dimgrey',
    borderRadius: 10,
    marginTop: 30,
    marginHorizontal: 20,
    padding: 5,
    // display: 'flex',
    // flexDirection: 'row',
  },
  button: {
    height:45,
    width: 110,
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
