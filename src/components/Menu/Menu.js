import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native';
import { Icon } from 'react-native-elements';

import Search from './../Main/Search/Search';
import WatchListSelect from './../Main/Company/WatchListSelect';
import UserMenu from './../Main/User/UserMenu';
import ManageProfile from './../Main/User/ManageProfile';
import Subscription from './../Main/User/ManageProfile';
import WatchList from './../Main/WatchList/WatchList';
import Notifications from './../Main/Notifications/Notifications';
import Loader from '../Loader/Loader';
import MenuBottomTab from './MenuBottomTab';

import { useFonts } from 'expo-font';
import NSLight from '../../../assets/fonts/NunitoSans/NunitoSansLight.ttf';
import NSRegular from '../../../assets/fonts/NunitoSans/NunitoSansRegular.ttf';
import NSBold from '../../../assets/fonts/NunitoSans/NunitoSansBold.ttf';
import NSExtraBold from '../../../assets/fonts/NunitoSans/NunitoSansExtraBold.ttf';

const Stack = createStackNavigator();

export default function Menu() {

  const [loaded] = useFonts({
    NSLight,
    NSRegular,
    NSBold,
    NSExtraBold,
  });

  if (!loaded) {
    return (
      <Loader />
    );
  }

  return (
    <Stack.Navigator>
      <Stack.Screen name="MenuBottomTab" component={MenuBottomTab} options={{ headerShown: false }} />
      <Stack.Screen name="WatchListSelect" component={WatchListSelect} options={({ route, navigation }) => ({
        title: '',
        headerTintColor: 'black', headerStyle: {
          backgroundColor: '#FFF', elevation: 0, shadowOpacity: 0,
          borderBottomWidth: 0
        },
        headerRight: () => (
          <TouchableWithoutFeedback onPress={() =>
            (navigation.navigate('WatchList'))
          }>
            <Icon
              style={{ paddingRight: 25 }}
              name='edit'
              type='font-awesome-5'
              color='black'
              size={20}
            />
          </TouchableWithoutFeedback>
        )
      })}
      />
      <Stack.Screen name="Search" component={Search} options={{
        title: 'Search company',
        headerTintColor: '#fff', headerStyle: {
          backgroundColor: '#6A8712', elevation: 0, shadowOpacity: 0,
          borderBottomWidth: 0
        }
      }} />
      <Stack.Screen name="UserMenu" component={UserMenu} options={{ headerShown: false }} />
      <Stack.Screen name="ManageProfile" component={ManageProfile} options={{
        title: 'Edit profile',
        headerTintColor: '#fff', headerStyle: {
          backgroundColor: '#6A8712', elevation: 0, shadowOpacity: 0,
          borderBottomWidth: 0,
        }
      }} />
      <Stack.Screen name="Subscription" component={Subscription} options={{ title: 'Subscription' }} />
      {/* <Stack.Screen name="Avatar" component={Avatar} options={{  title: 'Avatar' }} /> */}
      <Stack.Screen name="Notifications" component={Notifications} options={{ title: 'Notifications' }} />
      <Stack.Screen name="WatchList" component={WatchList} options={{ title: 'WatchList' }} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "white",
    alignItems: 'center',
    justifyContent: "space-evenly",
    borderWidth: 1,
  }
});