import React from 'react';
import { StyleSheet, Text, View,StatusBar } from 'react-native';

// import * as fb from "../../firebase";
// import Context from '../../context';

// npm i @react-navigation/bottom-tabs react-native-elements
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'react-native-elements';
import CompanySheet from '../Main/Company/CompanySheet';
import Screening from '../Main/Screening/Tab';
import News from '../Main/News/News';
import Notifications from '../Main/Notifications/Notifications';
import UserMenu from '../Main/User/UserMenu';

const Tab = createBottomTabNavigator();

export default function ReactNavigationBottomTabs() {

  // Ici on doit charger les infos users
  // const store = React.useContext(Context);
  
  return (
    <Tab.Navigator
      tabBarOptions={
        {
          // Default Color is blue you can change it by following props
          activeTintColor: '#86B206',
          // inactiveTintColor: '#ff6b81',
          // Default Background Color is white you can change it by following props
          // activeBackgroundColor: '#ced6e0',
          // inactiveBackgroundColor: '#ced6e0',
          labelStyle: {
            fontSize: 12,
            fontFamily: 'NSBold',
          }
        }
      }
    >
      <Tab.Screen
        name='Company'
        component={CompanySheet}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name='bar-chart' color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name='Screening'
        component={Screening}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name='grid-on' color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name='News'
        component={News}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name='library-books' color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name='Notifications'
        component={Notifications}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name='notifications' color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name='User'
        component={UserMenu}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name='person' color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 40,
    fontWeight: 'bold',
  },
});