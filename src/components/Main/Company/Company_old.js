import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native';
import { Icon } from 'react-native-elements';

import CompanySheet from './CompanySheet';
import Search from '../Search/Search';
import WatchListSelect from './WatchListSelect';

const Stack = createStackNavigator();

export default function Company() {

  let handlerRight = ({ route, navigation }) => (
    <TouchableWithoutFeedback onPress={() =>
      (navigation.navigate('Search'))
    }>
      <Icon
        style={{ paddingRight: 20 }}
        name='search'
        type='font-awesome-5'
        color='#fff'
        size={20}
      />
    </TouchableWithoutFeedback>
  )

  let handlerLeft = ({ route, navigation }) => (
    <TouchableWithoutFeedback onPress={() =>
      (navigation.navigate('WatchListSelect'))
    }>
      <Icon
        style={{ paddingLeft: 15 }}
        name='bars'
        type='font-awesome-5'
        color='#fff'
        size={20}
      />
    </TouchableWithoutFeedback>
  )

  return (
    <Stack.Navigator>
      <Stack.Screen name="CompanySheet" component={CompanySheet} options={({ route, navigation }) => ({
        title: 'Company',
        headerTitleStyle: { alignSelf: 'center' },
        headerTintColor: '#fff', headerStyle: {
          backgroundColor: '#6A8712', elevation: 0, shadowOpacity: 0,
          borderBottomWidth: 0
        },
        headerRight: () => handlerRight({ route, navigation }),
        headerLeft: () => handlerLeft({ route, navigation }),
      })} />
      <Stack.Screen name="WatchListSelect" component={WatchListSelect} />
      <Stack.Screen name="Search" component={Search} options={{
        title: 'Search company',
        headerTintColor: '#fff', headerStyle: {
          backgroundColor: '#6A8712', elevation: 0, shadowOpacity: 0,
          borderBottomWidth: 0
        }}} />
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