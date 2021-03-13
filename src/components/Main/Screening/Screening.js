import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import Tab from './Tab';

const Stack = createStackNavigator();

export default function Screening() {

  return (
    <Stack.Navigator>
      <Stack.Screen name="Tab" component={Tab} options={{ headerShown: false }} />
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

  },
});