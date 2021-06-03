import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import TabPerf from './TabPerf';
import Header from '../Header/Header';
import _ from 'lodash';

import NSLight from '../../../../../assets/fonts/NunitoSans/NunitoSansLight.ttf';
import NSRegular from '../../../../../assets/fonts/NunitoSans/NunitoSansRegular.ttf';
import NSBold from '../../../../../assets/fonts/NunitoSans/NunitoSansBold.ttf';
import NSExtraBold from '../../../../../assets/fonts/NunitoSans/NunitoSansExtraBold.ttf';

export default function MTabPerf() {

  const [ filter, setFilter ] = useState([])

  return (
    <View style={styles.container}>
      <Header filter={filter} setFilter={setFilter} helper={'TutoControversyMenu'} color={"#353535"} />
      <TabPerf filter={filter} />
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f6f6f6'
    },
  });