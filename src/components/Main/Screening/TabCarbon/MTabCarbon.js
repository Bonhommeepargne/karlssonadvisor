import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import TabCarbon from './TabCarbon';
import Header from '../Header/Header';
import _ from 'lodash';
import Store from './../../../../context';

export default function MTabCarbon() {

  return (
    <Store.Consumer>
      {(store) => (
        <View style={styles.container}>
          <Header helper={'TutoCarbonMenu'} color={'dimgray'} nb={store.nbCarbon} />
          <TabCarbon />
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