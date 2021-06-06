import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import sizeLabel from '../../../../util/sizeLabel';
import filterByCriteria from '../../../../util/filterByCriteria';
import Store from '../../../../context';
import _ from "lodash";
import { useNavigation } from '@react-navigation/native';
import onSelectedItemsChange from '../../../../util/onSelectedItemsChange';

import NSLight from '../../../../../assets/fonts/NunitoSans/NunitoSansLight.ttf';
import NSRegular from '../../../../../assets/fonts/NunitoSans/NunitoSansRegular.ttf';
import NSBold from '../../../../../assets/fonts/NunitoSans/NunitoSansBold.ttf';
import NSExtraBold from '../../../../../assets/fonts/NunitoSans/NunitoSansExtraBold.ttf';

export default function TabPerf({ setNb }) {

    const navigation = useNavigation();
    const [columns, setColumns] = useState([
        "Name",
        "s",
        "Cont",
        "Perf3M",
        "Perf1Y",
        "Perf3Y"
    ])
    const [direction, setDirection] = useState(null)
    const [selectedColumn, setSelectedColumn] = useState(null)
    const [data, setData] = useState([]);

    const dataStore = useContext(Store);

    useEffect(() => {
        let calcData = _.orderBy(filterByCriteria(dataStore.sectorArray[dataStore.indexSector], onSelectedItemsChange(dataStore.preferences)), 's', "desc");
        setData(calcData);
        dataStore.updateNbPerf(calcData.length);

    }, [dataStore.indexSector, dataStore.preferences]);

    const getItem = (item) => {
        // console.log({ row: dataStore.indexSector, col: item.ind });
        navigation.navigate('Company');
        dataStore.newIndexCompany({ row: dataStore.indexSector, col: item.ind });
      };

    const sortTable = (column) => {
        let newDirection = null;
        if (column == selectedColumn) {
            newDirection = direction === "desc" ? "asc" : "desc"
        } else {
            newDirection = "desc"
        }
        const sortedData = _.orderBy(data, [column], [newDirection])
        setSelectedColumn(column)
        setDirection(newDirection)
        setData(sortedData)
    }
    const tableHeader = () => (
        <>
        <View style={styles.tableHeaderTop}>
            <View style={styles.columnFirstHeader}>

            </View>
            <View style={styles.columnSecondHeader}>
                
            </View>
            <View style={styles.columnHeader}>
                
            </View>
            <View style={styles.columnHeader3}>
                <Text style={styles.columnHeaderTop}>Market Performance %</Text>
            </View>
        </View>
        <View style={styles.tableHeader}>
            {
                columns.map((column, index) => {
                    {
                        return (
                            <TouchableOpacity
                                key={index}
                                style={index == 0 ? styles.columnFirstHeader : (index == 1 ? styles.columnSecondHeader : 
                                    (index == 2 ? styles.columnThirdHeader : styles.columnHeader))}
                                onPress={() => sortTable(column)}>
                                <Text style={styles.columnHeaderTxt}>{column == 's' ? selectedColumn != 's' && <MaterialCommunityIcons
                                    name='alpha-c-box' size={20} /> : (column.substring(0, 4) == 'Perf' ? column.substring(4, 6) : column )}
                                    {selectedColumn === column && <MaterialCommunityIcons
                                        name={direction === "desc" ? "arrow-down-drop-circle" : "arrow-up-drop-circle"} size={column == 's' ? 20 : 12} // "arrow-down-drop-circle" : "arrow-up-drop-circle"
                                    />
                                    }
                                </Text>
                            </TouchableOpacity>
                        )
                    }
                })
            }
        </View>
        </>
    )

    const DisplayRank = ({ perf }) => (
        <Text style={{ ...styles.columnRowTxt, color: perf > 0 ? 'blue' : 'red'}}>{perf === 0 ? '-' : perf}</Text>
    )

    const DisplayControversy = ({ note, color }) => {
        return <Text style={{ ...styles.columnRowTxt, color: color == '' ? 'grey' : color.toLowerCase() }}>{ note }</Text>
    };

    // {delta > 1 ? '↑' : ( delta > -1 ? '' :'↓' )}

    const DisplaySize = ({ size }) => {
        
        let label = sizeLabel(size);

        return (
        <>
            <Text style={{ ...styles.columnSecondRowTxt, color: 'grey' }}>{label.letter}</Text>
        </>)
    }

    return (

        <View style={styles.container}>

            <FlatList
                data={data}
                style={{ width: "100%" }}
                keyExtractor={(item, index) => index + ""}
                ListHeaderComponent={tableHeader}
                stickyHeaderIndices={[0]}
                renderItem={({ item, index }) => {
                    return (
                        <View style={{ ...styles.tableRow, backgroundColor: index % 2 == 1 ? "#f6f6f6" : "white" }}>
                            <TouchableOpacity style={{width: "39%"}} onPress={() => { getItem({ code: item.Sedol7, name: item.Name, ind: item.ind }) }} >
                                <Text style={styles.columnFirstRowTxt}>{item.Name}</Text>
                            </TouchableOpacity>
                            <DisplaySize size={item.s} />
                            <DisplayControversy note={item.Controversies} color={item.ContColor} />
                            <DisplayRank perf={item.Perf3M} />
                            <DisplayRank perf={item.Perf1Y} />
                            <DisplayRank perf={item.Perf3Y} />
                        </View>
                    )
                }}
            />

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 0
    },
    tableHeader: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        backgroundColor: '#53586f', //#6A8712",
        // borderTopEndRadius: 10,
        // borderTopStartRadius: 10,
    },
    tableHeaderTop: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        backgroundColor: '#53586f', //#6A8712",
        // borderTopEndRadius: 10,
        // borderTopStartRadius: 10,
    },
    tableRow: {
        flexDirection: "row",
        height: 40,
        alignItems: "center",
    },
    columnFirstHeader: {
        width: "39%",
        justifyContent: "center",
        alignItems: "center"
    },
    columnSecondHeader: {
        width: "5%",
        justifyContent: "center",
        alignItems: "flex-start"
    },
    columnThirdHeader: {
        width: "14%",
        justifyContent: "center",
        alignItems: "center"
    },
    columnHeader: {
        width: "14%",
        justifyContent: "center",
        alignItems: "center",
        // borderLeftWidth: 1,
        // borderLeftColor: '#FFF'
    },
    columnHeader3: {
        width: "42%",
        justifyContent: "center",
        alignItems: "center",
    },
    columnHeaderTxt: {
        color: "white",
        fontFamily: 'NSBold',
        paddingBottom: 10,
    },
    columnHeaderTop: {
        color: "white",
        fontFamily: 'NSBold',
        fontSize: 14,
        paddingTop: 5,
    },
    columnFirstRowTxt: {
        textAlign: "left",
        fontFamily: 'NSRegular',
        paddingLeft: 10,
    },
    columnRowTxt: {
        width: "14%",
        textAlign: "center",
        fontFamily: 'NSBold',
        fontSize: 13,
    },
    columnSecondRowTxt: {
        width: "5%",
        textAlign: "center",
        fontFamily: 'NSLight',
        fontSize: 10,
    }
});
