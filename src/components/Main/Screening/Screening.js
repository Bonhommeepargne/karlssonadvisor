import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import Store from './../../../context';

export default function Screening() {

  return (
    <Store.Consumer>
    {(store) => (
      <View style={styles.container}>
        <Text>Screening</Text>
        <Text>Open up App.js to start working on your app! {store.main.value}</Text>
        <Button
          title="To Increment"
          onPress={() => {}}
        />
      </View>
    )}
    </Store.Consumer>
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
    borderColor: "purple",
  },
});