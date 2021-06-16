import React, { useEffect, useState, useContext } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Store from '../../../../context';
import moment from 'moment';

// import { Dimensions } from "react-native";
// const screenWidth = Dimensions.get("window").width;

// https://fonts.google.com/specimen/Nunito+Sans
import { useFonts } from 'expo-font';
import NSLight from '../../../../../assets/fonts/NunitoSans/NunitoSansLight.ttf';
import NSRegular from '../../../../../assets/fonts/NunitoSans/NunitoSansRegular.ttf';
import NSBold from '../../../../../assets/fonts/NunitoSans/NunitoSansBold.ttf';
import NSExtraBold from '../../../../../assets/fonts/NunitoSans/NunitoSansExtraBold.ttf';

export default function TableSummaryPerf(props) {

  const dataStore = useContext(Store);

  const endOfMonth = moment(dataStore.updateDate).endOf('month').subtract(1, 'month').format('DD/MM/YY');

  const company = props.data;
  const header = [ endOfMonth, '%'];
  const data = [['ΔLast Month', company.Perf1M ],
                ['ΔYear to date', company.PerfYTD ],
               ['Δ3 Month', company.Perf3M ],
               ['Δ6 Month', company.Perf6M ],
               ['Δ 1 Year', company.Perf1Y ],
               ['Δ 3 Years', company.Perf3Y ]];

  function getColor2(data) {
    if ( data > 0 ) {
      return 'blue'
    } else if ( data < 0) {
      return 'red'
    } else if ( data == 0 ) {
      return 'grey'
    } 
  }

  function transform(data) {
    if ( data > 0 ) {
      return '+' + data;
    } else if ( data < 0) {
      return data
    } else if ( data == 0 ) {
      return 'stable'
    } 
  }

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
        <Text style={{ fontSize: 16, fontFamily: 'NSRegular', color: 'grey' }}>{data}</Text>
      </View>
    );
  }

  function FirstCellHeader({ data }) {
    return (
      <View style={styles.cellStyleFirstHeader}>
        <Text style={{ fontSize: 16, fontFamily: 'NSExtraBold',
            textAlign: 'center' }}>{data}</Text>
      </View>
    );
  }

  function Row({ column, index }) {
    let first = column[0];

    return (
      <View style={styles.rowStyle}>
        <FirstCell data={first} />
        {column.slice(1).map((data, ind) => (
          <Cell key={ind} data={data} ind={ind} nrow={index} />
        ))}
      </View>
    );
  }

  function Cell({ ind, data, nrow }) {

    return (
      (<View style={styles.cellStyle}>
        <Text style={{ color: getColor2(data), fontSize: 14, fontFamily: 'NSBold', }}>{transform(data)}</Text>
      </View>)
    );
  }

  function FirstCell({ data }) {
    return (
      <View style={styles.cellStyleFirst}>
        <Text style={{ fontSize: 14, fontFamily: 'NSRegular', }}>{data}</Text>
      </View>
    );
  }

  function TableData({ data, header }) {
    return (
      <>
        <RowHeader column={header} />
        {data.map((column, index) => (
          <Row key={index} column={column} index={index} />
        ))}
      </>
    )
  }

  return (
    <TableData header={header} data={data} />
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