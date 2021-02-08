import React from 'react';
import { StyleSheet, Text, View,StatusBar } from 'react-native';

// npm i @react-navigation/bottom-tabs react-native-elements
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'react-native-elements';
import Company from '../Main/Company/Company';
import Screening from '../Main/Screening/Screening';
import News from '../Main/News/News';
import Notifications from '../Main/Notifications/Notifications';
import User from '../Main/User/User';

import { useFonts } from 'expo-font';
import NSLight from '../../../assets/fonts/NunitoSans/NunitoSansLight.ttf';
import NSRegular from '../../../assets/fonts/NunitoSans/NunitoSansRegular.ttf';
import NSBold from '../../../assets/fonts/NunitoSans/NunitoSansBold.ttf';
import NSExtraBold from '../../../assets/fonts/NunitoSans/NunitoSansExtraBold.ttf';

const Tab = createBottomTabNavigator();

export default function ReactNavigationBottomTabs() {
  const [loaded] = useFonts({
    NSLight,
    NSRegular,
    NSBold,
    NSExtraBold,
  });

  if (!loaded) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <Tab.Navigator
      tabBarOptions={
        {
          // Default Color is blue you can change it by following props
          activeTintColor: '#1c9434',
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
        component={Company}
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