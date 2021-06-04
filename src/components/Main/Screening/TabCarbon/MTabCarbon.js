import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import TabCarbon from './TabCarbon';
import Header from '../Header/Header';
import _ from 'lodash';

export default function MTabCarbon() {

  return (
    <View style={styles.container}>
      <Header helper={'TutoCarbonMenu'} color={'dimgray'} />
      <TabCarbon />
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f6f6f6'
    },
  });