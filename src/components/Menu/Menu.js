import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

// npm i @react-navigation/bottom-tabs react-native-elements
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'react-native-elements';
import Company from '../Main/Company/Company';
import Screening from '../Main/Screening/Screening';
import News from '../Main/News/News';
import Notifications from '../Main/Notifications/Notifications';
import User from '../Main/User/User';

const Tab = createBottomTabNavigator();

export default function ReactNavigationBottomTabs() {
  return (
    <Tab.Navigator
      tabBarOptions={
        {
          // Default Color is blue you can change it by following props
          // activeTintColor: '#ff4757',
          // inactiveTintColor: '#ff6b81',
          // Default Background Color is white you can change it by following props
          // activeBackgroundColor: '#ced6e0',
          // inactiveBackgroundColor: '#ced6e0',
        }
      }
    >
      <Tab.Screen
        name='Company'
        component={Company}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name='home' color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name='Screening'
        component={Screening}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name='message' color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name='News'
        component={News}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name='person' color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name='Notifications'
        component={Notifications}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name='person' color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name='User'
        component={User}
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