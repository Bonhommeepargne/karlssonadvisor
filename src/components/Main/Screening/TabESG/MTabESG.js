import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import TabESG from './TabESG';
import Header from '../Header/Header';
import _ from 'lodash';
import Store from './../../../../context';

export default function MTabESG() {

  return (
    <Store.Consumer>
      {(store) => (
        <View style={styles.container}>
          <Header helper={'TutoESGMenu'} color={'#6A8712'} nb={store.nbESG} />
          <TabESG />
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