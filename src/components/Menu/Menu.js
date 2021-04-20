import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native';
import { Icon } from 'react-native-elements';

import Search from './../Main/Search/Search';
import WatchListSelect from './../Main/Company/WatchListSelect';
import UserMenu from './../Main/User/UserMenu';
import ManageProfile from './../Main/User/ManageProfile';
import Subscription from './../Main/User/Subscription';
import Parameters from './../Main/User/Parameters';
import WatchList from './../Main/WatchList/WatchList';
import Notifications from './../Main/Notifications/Notifications';
import MenuBottomTab from './MenuBottomTab';
import SideModal from './../Menu/SideModal/SideModal';

const Stack = createStackNavigator();

const modalOptions = {
  headerShown: false,
  cardStyle: { backgroundColor: "transparent" },
  cardOverlayEnabled: true,
  cardStyleInterpolator: ({ current: { progress } }) => ({
    cardStyle: {
      opacity: progress.interpolate({
        inputRange: [0, 0.5, 0.9, 1],
        outputRange: [0, 0.1, 0.3, 0.7]
      })
    },
    overlayStyle: {
      opacity: progress.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 0.4],
        extrapolate: "clamp"
      })
    }
  })
};

export default function Menu() {

  return (
    <Stack.Navigator>
      <Stack.Screen name="MenuBottomTab" component={MenuBottomTab} options={{ headerShown: false }} />
      <Stack.Screen name="WatchListSelect" component={WatchListSelect} options={({ route, navigation }) => ({
        title: 'Watchlist',
        headerTintColor: 'black', headerStyle: {
          backgroundColor: '#FFF', elevation: 0, shadowOpacity: 0,
          borderBottomWidth: 1
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
          borderBottomWidth: 0
        }
      }} />
      <Stack.Screen name="Subscription" component={Subscription} options={{
        title: 'Subscription',
        headerTintColor: '#fff', headerStyle: {
          backgroundColor: '#6A8712', elevation: 0, shadowOpacity: 0,
          borderBottomWidth: 0,
        }
      }} />
      <Stack.Screen name="Parameters" component={Parameters} options={{
        title: 'Parameters',
        headerTintColor: '#fff', headerStyle: {
          backgroundColor: '#6A8712', elevation: 0, shadowOpacity: 0,
          borderBottomWidth: 0,
        }
      }} />
      {/* <Stack.Screen name="Avatar" component={Avatar} options={{  title: 'Avatar' }} /> */}
      <Stack.Screen name="Notifications" component={Notifications} options={{ title: 'Notifications' }} />
      <Stack.Screen name="SideModal" component={SideModal} options={modalOptions} />
      <Stack.Screen name="WatchList" component={WatchList} options={({ route, navigation }) => ({
        title: 'Watchlist',
        headerTintColor: '#fff', headerStyle: {
          backgroundColor: '#6A8712', elevation: 0, shadowOpacity: 0,
          borderBottomWidth: 0
        },
        headerRight: () => (
          <TouchableWithoutFeedback onPress={() =>
            (navigation.navigate('Search', { query: 'add' }))
          }>
            <Icon
              style={{ paddingRight: 25 }}
              name='plus'
              type='font-awesome-5'
              color='#FFF'
              size={20}
            />
          </TouchableWithoutFeedback>
        )
      })}
      />
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
  }
});