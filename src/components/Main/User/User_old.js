import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import UserMenu from './UserMenu'
import ManageProfile from './ManageProfile'
// import Avatar from './Avatar'
import Subscription from './ManageProfile'
import WatchList from '../WatchList/WatchList'
import Notifications from './Notifications'

const Stack = createStackNavigator();

export default function User() {

  return (
    <Stack.Navigator>
      <Stack.Screen name="UserMenu" component={UserMenu} options={{ headerShown: false }} />
      <Stack.Screen name="ManageProfile" component={ManageProfile} options={{  title: 'Edit profile', 
          headerTintColor: '#fff',headerStyle: {
            backgroundColor: '#6A8712', elevation: 0, shadowOpacity: 0,
            borderBottomWidth: 0,} }} />
      <Stack.Screen name="Subscription" component={Subscription} options={{  title: 'Subscription' }} />
      {/* <Stack.Screen name="Avatar" component={Avatar} options={{  title: 'Avatar' }} /> */}
      <Stack.Screen name="Notifications" component={Notifications} options={{  title: 'Notifications' }} />
      <Stack.Screen name="WatchList" component={WatchList} options={{  title: 'WatchList' }} />
    </Stack.Navigator>
  );

}
