import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Button } from 'react-native-elements';
import { getColor } from './../../../../util/function'
import { VictoryBar, VictoryChart, VictoryTheme, VictoryLabel } from "victory-native";

import { Dimensions } from "react-native";
const screenWidth = Dimensions.get("window").width;

// https://fonts.google.com/specimen/Nunito+Sans
import NSLight from '../../../../../assets/fonts/NunitoSans/NunitoSansLight.ttf';
import NSRegular from '../../../../../assets/fonts/NunitoSans/NunitoSansRegular.ttf';
import NSBold from '../../../../../assets/fonts/NunitoSans/NunitoSansBold.ttf';
import NSExtraBold from '../../../../../assets/fonts/NunitoSans/NunitoSansExtraBold.ttf';

export default function GraphRank(props) {

  let rank = props.data.series[11].decile;
  let series = props.data.series;
  let date = props.data.series[11].month;
  let title = props.data.title;
  let groupname = props.data.groupname;

  let KarlssonTheme = VictoryTheme.material;

  return (
    <View style={styles.container}>
      <View style={styles.barRank}>
        <View style={styles.barRankHeader}>
          <View style={styles.barRankHeaderTitle}>
            <Text style={styles.titleScore}>{title}</Text>
            <Text style={styles.industry}>{groupname}</Text>
          </View>
          <View style={styles.barRankHeaderRanking}>
            <View style={styles.barRankHeaderRankingScore}>
              <View style={styles.note}>
                <Text style={{ fontSize: 35, fontFamily: 'NSExtraBold', color: getColor(rank) }}>{rank}</Text>
              </View>
              <View style={styles.sur}>
                <Text style={styles.textSur}> / 10</Text>
              </View>
            </View>
            <View style={styles.barRankHeaderRankingScoreDate}>
              <Text style={styles.dateScore}>{date}</Text>
            </View>
          </View>
        </View>
        <View style={styles.barRankChart}>
          <VictoryChart width={screenWidth}
            height={220}
            theme={KarlssonTheme}
            domainPadding={20}
            padding={{ top: 10, bottom: 40, left: 40, right: 40 }}
            maxDomain={{ y: 10 }}
            minDomain={{ y: 0 }}
          >
            <VictoryBar data={series}
              style={{
                data: {
                  fill: ({ datum }) => (getColor(datum.decile)),
                  fillOpacity: 0.7,
                  // strokeWidth: 3
                },
              }}
              x="month"
              y="decile"
              barRatio={0.8}
            // animate={{
            //   duration: 2000,
            //   onLoad: {duration: 1000 }
            // }} 
            />
          </VictoryChart>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "#F5F5F5",
    alignItems: 'center',
    // justifyContent: 'flex-start'
  },
  barRank: {
    marginVertical: 10,
    justifyContent: 'flex-start',
    width: "95%",
    height: 300,
    borderWidth: 1,
    borderColor: '#CCC',
    padding: 5,
    borderRadius: 15,
    backgroundColor: "white",
  },
  barRankHeader: {
    flexDirection: 'row',
    height: 75
  },
  barRankChart: {
    flex: 1,
  },
  barRankHeaderTitle: {
    flex: 3,
    height: 75
  },
  barRankHeaderRanking: {
    flex: 1,
    // borderWidth: 1,
    // borderColor: 'black',
    height: 75,
    borderRadius: 10,
    marginRight: 20
  },
  barRankHeaderRankingScore: {
    flex: 2,
    justifyContent: 'center',
    flexDirection: 'row'
  },
  note: {
    // borderWidth: 1,
    // borderColor: 'blue',
  },
  sur: {
    // borderWidth: 1,
    // borderColor: 'red',
    justifyContent: 'flex-end',
    paddingBottom: 5
  },
  textSur: {
    fontSize: 15,
    fontFamily: 'NSRegular',
    color: "black",
  },
  barRankHeaderRankingScoreDate: {
    // borderWidth: 1,
    // borderColor: 'black',
    flex: 1,
    justifyContent: 'center'
  },
  dateScore: {
    textAlign: 'center',
  },
  titleScore: {
    marginLeft: 15,
    fontSize: 22,
    fontFamily: 'NSExtraBold',
    color: "black",
  },
  industry: {
    marginLeft: 15,
    fontSize: 22,
    fontFamily: 'NSBold',
    color: "#696969",
  },
  rankScore: {
    fontFamily: 'NSBold',
    fontSize: 14,
  },
  dateScore: {
    fontFamily: 'NSLight',
    fontSize: 12,
    textAlign: 'center'
  }
});