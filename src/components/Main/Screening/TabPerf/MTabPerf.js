import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import TabPerf from './TabPerf';
import Header from '../Header/Header';
import _ from 'lodash';
import Store from './../../../../context';

export default function MTabPerf() {

  return (
    <Store.Consumer>
      {(store) => (
        <View style={styles.container}>
          <Header helper={'TutoControversyMenu'} color={"#353535"} nb={store.nbPerf} />
          <TabPerf />
        </View>
      )}
    </Store.Consumer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f6f6'
  },
});