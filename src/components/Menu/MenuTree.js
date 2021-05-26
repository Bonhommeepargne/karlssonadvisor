import React, { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';

// import * as fb from "../../firebase";
// import Context from '../../context';

// npm i @react-navigation/bottom-tabs react-native-elements
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'react-native-elements';
import CompanySheet from '../Main/Company/CompanySheet';

import MTabESG from '../Main/Screening/TabESG/MTabESG';
import MTabCarbon from '../Main/Screening/TabCarbon/MTabCarbon';
import MTabPerf from '../Main/Screening/TabPerf/MTabPerf';
import UserMenu from '../Main/User/UserMenu';

const Tab = createBottomTabNavigator();

export default function MenuTree({route, navigation}) {

  return (
    <>
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
              <Icon name='dashboard' color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name='E S G'
          component={MTabESG}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name='equalizer' color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name='Carbon'
          component={MTabCarbon}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name='donut-small' color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name='Controversy'
          component={MTabPerf}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name='flash-on' color={color} size={size} />
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
    </>
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
  }
});