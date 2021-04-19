import React from 'react';
import { StyleSheet, Text, PanResponder, View, PanResponderInstance } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

import NSLight from '../../../../../assets/fonts/NunitoSans/NunitoSansLight.ttf';
import NSRegular from '../../../../../assets/fonts/NunitoSans/NunitoSansRegular.ttf';
import NSBold from '../../../../../assets/fonts/NunitoSans/NunitoSansBold.ttf';
import NSExtraBold from '../../../../../assets/fonts/NunitoSans/NunitoSansExtraBold.ttf';

import { Dimensions } from "react-native";
const screenWidth = Dimensions.get("window").width;

export default function GaugeCircle({ val, text1, text2 }) {

  const gaugeWidth = Math.round(screenWidth * 0.38);

  return (
    <AnimatedCircularProgress
      size={gaugeWidth}
      width={15}
      backgroundWidth={5}
      fill={val}
      tintColor="darkgrey"
      tintColorSecondary="darkgrey"
      backgroundColor="lightgrey"
      arcSweepAngle={280}
      rotation={220}
      lineCap="round"
    >{sales =>
      <View style={{ alignItems: 'center' }}>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ justifyContent: 'center' }}>
            <Text style={styles.percentWhite}>%</Text>
          </View>
          <View>
            <Text style={styles.points}>{Math.round(sales)}</Text>
          </View>
          <View style={{ justifyContent: 'center' }}>
            <Text style={styles.percent}>%</Text>
          </View>
        </View>
        <View>
          <Text style={styles.titleGauge2}>{text1}</Text>
          <Text style={styles.titleGauge}>{text2}</Text>
        </View>
      </View>
      }</AnimatedCircularProgress>
  );

}

const styles = StyleSheet.create({
  titleGauge: {
    textAlign: 'center',
    color: 'black',
    fontSize: 13,
    fontWeight: '100',
    fontFamily: 'NSLight',
  },
  titleGauge2: {
    textAlign: 'center',
    color: 'black',
    fontSize: 14,
    fontWeight: '100',
    fontFamily: 'NSBold',
  },
  points: {
    textAlign: 'center',
    color: 'black',
    fontSize: 25,
    fontWeight: '100',
    fontFamily: 'NSLight',
  },
  percent: {
    textAlign: 'center',
    color: 'darkgrey',
    fontSize: 20,
    fontWeight: '100',
  },
  percentWhite: {
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
    fontWeight: '100',
  },
  container: {
    flex: 1,
    paddingTop: 10
  },
  pointsDelta: {
    color: '#4c6479',
    fontSize: 50,
    fontWeight: '100',
  },
  pointsDeltaActive: {
    color: '#fff',
  },
});