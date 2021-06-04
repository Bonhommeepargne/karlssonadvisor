import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import TabPerf from './TabPerf';
import Header from '../Header/Header';
import _ from 'lodash';

export default function MTabPerf() {

  return (
    <View style={styles.container}>
      <Header helper={'TutoControversyMenu'} color={"#353535"} />
      <TabPerf />
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f6f6f6'
    },
  });