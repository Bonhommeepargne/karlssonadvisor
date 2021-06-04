import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import TabESG from './TabESG';
import Header from '../Header/Header';
import _ from 'lodash';

export default function MTabESG() {

  return (
    <View style={styles.container}>
      <Header helper={'TutoESGMenu'} color={'#6A8712'} />
      <TabESG />
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f6f6f6'
    },
  });