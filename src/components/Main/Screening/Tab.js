import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Constants from 'expo-constants';

// npm install @react-navigation/material-top-tabs react-native-tab-view
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

function TabA() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Tab A</Text>
    </View>
  );
}
function TabB() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Tab B</Text>
    </View>
  );
}
function TabC() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Tab C</Text>
    </View>
  );
}

const Tab = createMaterialTopTabNavigator();

export default function TopTabs() {
  return (
    <Tab.Navigator style={{ marginTop: Constants.statusBarHeight }} tabBarOptions={{
      activeTintColor: '#86b206',
      inactiveTintColor: 'gray',
      indicatorStyle: {
        backgroundColor: '#86b206',
    },
    }}>
      <Tab.Screen name='ESG' component={TabA} />
      <Tab.Screen name='Carbon' component={TabB} />
      <Tab.Screen name='Performance' component={TabC} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  containerTop: {
    flex: 1000,
  },
  container: {
    flex: 1000,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 30,
    fontWeight: 'bold',
  },
});