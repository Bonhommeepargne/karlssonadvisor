import React, { useState, useEffect, useContext } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Alert,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Store from '../../../context'

const Stack = createStackNavigator();

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
import moment from 'moment';

// import pour la Gestion du formulaire
import * as fb from "./../../../firebase";
// import Store from '../../../context';
import Reset from './Reset';

var fullname = "";
var email = "";
var password = "";

export default function LoginScreen() {

  const [loaded] = useFonts({
    NSLight,
    NSRegular,
    NSBold,
    NSExtraBold,
  });

  const [activeTab, setActiveTab] = useState('Login');
  const [activityIndicator, setActivityIndicator] = useState(false);
  const [firebaseError, setFirebaseError] = React.useState(null);

  const dataStore = useContext(Store);

  useEffect(() => {
      dataStore.setOurLoader(true);
    }, [])

  async function authenticateUser() {
    try {
      if (activeTab === 'Login') {
        setActivityIndicator(true);
        const user = await fb.login(email, password);
        // setActivityIndicator(false);
      } else {
        setActivityIndicator(true);
        const newUser = await fb.register(fullname, email, password);
        const today = moment();
        await fb.addUser(newUser.user.uid, {
          email: email, fullname: fullname,
          uid: newUser.user.uid, admin: false, created: today.format(), subscription:
           { type: '3 Months Trial', start: today.format(), expire: today.add(3, 'month').format() }
        });
        // setActivityIndicator(false);
        // setActiveTab("Login");
      }
    } catch (err) {
      console.error("Authentication Error", err);
      setFirebaseError(err.message);
      setActivityIndicator(false);
    }
  }

  function switchTab() {
    if (activeTab === 'Login') {
      setFirebaseError(null);
      setActiveTab('Register');
    } else {
      setFirebaseError(null);
      setActiveTab('Login');
    }
  }

  function Login() {

    const navigation = useNavigation();

    const [showLoginPassword, setShowLoginPassword] = useState(false);

    return (
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
        <View style={styles.inputView}>
          <Icon
            style={{ paddingHorizontal: 4 }}
            name='key'
            type='font-awesome-5'
            color='#fff'
            size={22}
          />
          <TextInput
            onChangeText={text => password = text}
            style={styles.input}
            placeholder='Password'
            placeholderTextColor='#f1f2f6'
            secureTextEntry={!showLoginPassword}
            autoCapitalize='none'
            textContentType='password'
            returnKeyType='done'
          />
          <TouchableOpacity
            style={{ paddingVertical: 4 }}
            onPress={() => {
              setShowLoginPassword(!showLoginPassword);
            }}
          >
            <Icon
              style={{ paddingHorizontal: 4 }}
              name='eye'
              type='font-awesome'
              color='#fff'
              size={22}
            />
          </TouchableOpacity>
        </View>
        <View style={{ paddingTop: 20 }}>
        {!activityIndicator ?
            <TouchableOpacity style={styles.button} onPress={authenticateUser}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity> :
            <View style={styles.activityIndicator}><ActivityIndicator size="large" color="#FFF" /></View>}
          <TouchableOpacity onPress={() => (navigation.navigate("Reset"))}>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  function Register() {
    const [showRegisterPassword, setShowRegisterPassword] = useState(false);
    return (
      <View style={{ marginTop: 10 }}>
        <View style={styles.inputView}>
          <Icon
            style={{ paddingHorizontal: 4, width: 30 }}
            name='user'
            type='font-awesome'
            color='#fff'
            size={22}
          />
          <TextInput
            onChangeText={text => fullname = text}
            style={styles.input}
            placeholder='Full Name'
            placeholderTextColor='#f1f2f6'
            textContentType='name'
            autoCompleteType='name'
            returnKeyType='next'
          />
        </View>
        <View style={styles.inputView}>
          <Icon
            style={{ paddingHorizontal: 4, width: 30 }}
            name='envelope'
            type='font-awesome'
            color='#fff'
            size={22}
          />
          <TextInput
            onChangeText={text => email = text}
            style={styles.input}
            placeholder='Email'
            placeholderTextColor='#f1f2f6'
            keyboardType='email-address'
            textContentType='emailAddress'
            autoCapitalize='none'
            autoCompleteType='email'
            returnKeyType='next'
          />
        </View>
        {/* <View style={styles.inputView}>
          <Icon
            style={{ paddingHorizontal: 4, width: 30 }}
            name='phone'
            type='font-awesome'
            color='#fff'
            size={22}
          />
          <TextInput
            style={styles.input}
            placeholder='Phone'
            placeholderTextColor='#f1f2f6'
            keyboardType='phone-pad'
            returnKeyType='next'
          />
        </View> */}
        <View style={styles.inputView}>
          <Icon
            style={{ paddingHorizontal: 4, width: 30 }}
            name='key'
            type='font-awesome-5'
            color='#fff'
            size={22}
          />
          <TextInput
            onChangeText={text => password = text}
            style={styles.input}
            placeholder='Password'
            placeholderTextColor='#f1f2f6'
            secureTextEntry={!showRegisterPassword}
            autoCapitalize='none'
            textContentType='password'
            returnKeyType='done'
          />
          <TouchableOpacity
            style={{ paddingVertical: 4 }}
            onPress={() => {
              setShowRegisterPassword(!showRegisterPassword);
            }}
          >
            <Icon
              style={{ paddingHorizontal: 4 }}
              name='eye'
              type='font-awesome'
              color='#fff'
              size={22}
            />
          </TouchableOpacity>
        </View>
        <View style={{ paddingTop: 20 }}>
          {!activityIndicator ?
            <TouchableOpacity style={styles.button} onPress={authenticateUser}>
              <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity> :
            <View style={styles.activityIndicator}><ActivityIndicator size="large" color="#FFF" /></View>}
        </View>
      </View>
    );
  }

  // ['#0aab30', '#1c9434']
  function Auth() {

    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <LinearGradient colors={['#6A8712', '#86B206']} style={styles.container}>
          <Text style={styles.welcomeText}>
            {activeTab === 'Login' ? 'Login' : 'Register'}
          </Text>
          <View style={styles.switchTabsView}>
            <TouchableOpacity
              style={{
                borderBottomWidth: activeTab === 'Login' ? 4 : 0,
                borderBottomColor: '#fff',
                paddingHorizontal: 4,
                marginRight: 14,
              }}
              onPress={() => switchTab()}
            >
              <Text style={styles.switchText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                borderBottomWidth: activeTab === 'Register' ? 4 : 0,
                borderBottomColor: '#fff',
                paddingHorizontal: 4,
                marginRight: 14,
              }}
              onPress={() => switchTab()}
            >
              <Text style={styles.switchText}>Register</Text>
            </TouchableOpacity>
          </View>
          {activeTab === 'Login' ? <Login /> : <Register />}
          {firebaseError &&
            <View style={styles.errorView}>
              <Text style={styles.errorText}>{firebaseError}</Text>
            </View>}
        </LinearGradient>
      </TouchableWithoutFeedback>
    );
  }

  if (!loaded) {
    return (
      <View>
        <Text></Text>
      </View>
    );
  }

  return (
    <Stack.Navigator>
      <Stack.Screen name="Auth" component={Auth} options={{ headerShown: false }} />
      <Stack.Screen name="Reset" component={Reset} options={{
        title: 'Back', headerTintColor: '#fff',
        headerStyle: {
          backgroundColor: '#6A8712', elevation: 0, shadowOpacity: 0,
          borderBottomWidth: 0,
        }
      }} />
    </Stack.Navigator>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
  },
  welcomeText: {
    alignSelf: 'center',
    fontSize: 40,
    fontFamily: 'NSLight',
    marginTop: 10,
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
  socialLoginView: {
    marginTop: 40,
    marginHorizontal: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  socialLoginTouchable: {
    backgroundColor: '#fff',
    width: 40,
    height: 40,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 8,
  },
  activityIndicator: {
    marginTop: 22,
  }
});
