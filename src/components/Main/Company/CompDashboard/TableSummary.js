import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { getColor } from '../../../../util/function'

// import { Dimensions } from "react-native";
// const screenWidth = Dimensions.get("window").width;

// https://fonts.google.com/specimen/Nunito+Sans
import { useFonts } from 'expo-font';
import NSLight from '../../../../../assets/fonts/NunitoSans/NunitoSansLight.ttf';
import NSRegular from '../../../../../assets/fonts/NunitoSans/NunitoSansRegular.ttf';
import NSBold from '../../../../../assets/fonts/NunitoSans/NunitoSansBold.ttf';
import NSExtraBold from '../../../../../assets/fonts/NunitoSans/NunitoSansExtraBold.ttf';

export default function TableSummary() {

  const [masterDataSource, setMasterDataSource] = useState({
    header: [' ', 'ESG', 'E', 'S', 'G'],
    data: [
      ['Peer Group', '6', '7', '8', '9'],
      ['ΔChange 1Y', '+2', '-1', '+1', '+3'],
    ]
  });

  function RowHeader({ column }) {
    let first = column[0];

    return (
      <View style={styles.rowStyle}>
        <FirstCellHeader data={first} />
        {column.slice(1).map((data, ind) => (
          <CellHeader key={ind} data={data} />
        ))}
      </View>
    );
  }

  function CellHeader({ data }) {
    return (
      <View style={styles.cellStyleHeader}>
        <Text style={{ fontSize: 20, fontFamily: 'NSExtraBold' }}>{data}</Text>
      </View>
    );
  }

  function FirstCellHeader({ data }) {
    return (
      <View style={styles.cellStyleFirstHeader}>
        <Text style={{ fontSize: 20, fontFamily: 'NSExtraBold' }}>{data}</Text>
      </View>
    );
  }

  function Row({ column }) {
    let first = column[0];

    return (
      <View style={styles.rowStyle}>
        <FirstCell data={first} />
        {column.slice(1).map((data, ind) => (
          <Cell key={ind} data={data} />
        ))}
      </View>
    );
  }

  function Cell({ data }) {
    return (
      <View style={styles.cellStyle}>
        <Text style={{ color: getColor(data), fontSize: 16, fontFamily: 'NSExtraBold', }}>{data}</Text>
      </View>
    );
  }

  function FirstCell({ data }) {
    return (
      <View style={styles.cellStyleFirst}>
        <Text style={{ fontSize: 16, fontFamily: 'NSRegular', }}>{data}</Text>
      </View>
    );
  }

  function TableData({ data, header }) {
    return (
      <>
        <RowHeader column={header} />
        {data.map((column, index) => (
          <Row key={index} column={column} />
        ))}
      </>
    )
  }

  return (
    <TableData header={masterDataSource.header} data={masterDataSource.data} />
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
  gridContainer: {
    width: '100%',
  },
  rowStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  cellStyle: {
    flex: 1,
    paddingVertical: 5,
    alignItems: 'center',
    borderRightColor: '#C8C8C8',
    borderRightWidth: 1,
    borderBottomColor: '#C8C8C8',
    borderBottomWidth: 1,
  },
  cellStyleHeader: {
    flex: 1,
    paddingVertical: 5,
    alignItems: 'center',
    borderRightColor: '#C8C8C8',
    borderRightWidth: 1,
    borderBottomColor: '#C8C8C8',
    borderBottomWidth: 1,
  },
  cellStyleFirst: {
    flex: 2,
    paddingVertical: 5,
    borderRightColor: '#C8C8C8',
    borderRightWidth: 1,
    borderBottomColor: '#C8C8C8',
    borderBottomWidth: 1,
  },
  cellStyleFirstHeader: {
    flex: 2,
    paddingVertical: 5,
    borderRightColor: '#C8C8C8',
    borderRightWidth: 1,
    borderBottomColor: '#C8C8C8',
    borderBottomWidth: 1,
  }
});