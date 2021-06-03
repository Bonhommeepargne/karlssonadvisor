import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import TabESG from './TabESG';
import Header from '../Header/Header';
import _ from 'lodash';

import NSLight from '../../../../../assets/fonts/NunitoSans/NunitoSansLight.ttf';
import NSRegular from '../../../../../assets/fonts/NunitoSans/NunitoSansRegular.ttf';
import NSBold from '../../../../../assets/fonts/NunitoSans/NunitoSansBold.ttf';
import NSExtraBold from '../../../../../assets/fonts/NunitoSans/NunitoSansExtraBold.ttf';

export default function MTabESG() {

  const [ filter, setFilter ] = useState([])

  return (
    <View style={styles.container}>
      <Header filter={filter} setFilter={setFilter} helper={'TutoESGMenu'} color={'#6A8712'} />
      <TabESG filter={filter} />
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f6f6f6'
    },
  });