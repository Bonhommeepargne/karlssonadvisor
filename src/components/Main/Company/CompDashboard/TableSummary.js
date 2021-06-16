import React, { useContext } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/core';

import { getColor } from '../../../../util/function'

// import { Dimensions } from "react-native";
// const screenWidth = Dimensions.get("window").width;

// https://fonts.google.com/specimen/Nunito+Sans
import { useFonts } from 'expo-font';
import NSLight from '../../../../../assets/fonts/NunitoSans/NunitoSansLight.ttf';
import NSRegular from '../../../../../assets/fonts/NunitoSans/NunitoSansRegular.ttf';
import NSBold from '../../../../../assets/fonts/NunitoSans/NunitoSansBold.ttf';
import NSExtraBold from '../../../../../assets/fonts/NunitoSans/NunitoSansExtraBold.ttf';

export default function TableSummary(props) {

  const navigation = useNavigation();
  const company = props.data;
  const header = [' ', 'ESG', 'E', 'S', 'G'];
  const data = [['Sector',
    company.ESG == 0 ? 'na' : company.ESG,
    company.E == 0 ? 'na' : company.E,
    company.S == 0 ? 'na' : company.S,
    company.G == 0 ? 'na' : company.G
  ], 
  ['ΔChange 1Y',
    company.ESG == 0 ? 'na' : company.ESG1Y,
    company.E == 0 ? 'na' : company.E1Y,
    company.S == 0 ? 'na' : company.S1Y,
    company.G == 0 ? 'na' : company.G1Y],
  ];

  function getColor2(data) {
    if (data > 0) {
      return 'blue'
    } else if (data < 0) {
      return 'red'
    } else if (data == 'na') {
      return '#CCC'
    }
  }

  function transform(data) {
    if (data > 0) {
      return '+' + data;
    } else if (data < 0) {
      return data
    } else if (data == 0) {
      return 'stable'
    } else if (data == 'na') {
      return data
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
        <Text style={{ fontSize: 20, fontFamily: 'NSExtraBold' }}>{data}</Text>
      </View>
    )
  }

  function FirstCellHeader({ data }) {
    return (
      <View style={styles.cellStyleFirstHeader}>

        <TouchableOpacity onPress={() => { navigation.navigate('TutoESGTab') }} >
          <Icon
            style={{ paddingTop: 8 }}
            name='question-circle-o'
            type='font-awesome'
            color='silver'
            size={22}
          />
        </TouchableOpacity>

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
      nrow == 0 ? (<View style={styles.cellStyle}>
        <Text style={{ color: getColor(data), fontSize: 16, fontFamily: 'NSExtraBold', }}>{data}</Text>
      </View>) : (<View style={styles.cellStyle}>
        <Text style={{ color: getColor2(data), fontSize: 16, fontFamily: 'NSBold', }}>{transform(data)}</Text>
      </View>)
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