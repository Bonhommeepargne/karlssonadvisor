import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { getColor } from '../../../../util/function';
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

// "alpha-s-circle-outline" : "alpha-s-circle-outline"

export default function TabESG({ setNb }) {

    const navigation = useNavigation();
    const [columns, setColumns] = useState([
        "Name",
        "s",
        "ESG",
        "E",
        "S",
        "G"
    ])
    const [direction, setDirection] = useState(null)
    const [selectedColumn, setSelectedColumn] = useState(null)
    const [data, setData] = useState([]);

    const dataStore = useContext(Store);

    useEffect(() => {
        let calcData = _.orderBy(filterByCriteria(dataStore.sectorArray[dataStore.indexSector], onSelectedItemsChange(dataStore.preferences)), 's', 'desc');
        setData(calcData);
        dataStore.updateNbESG(calcData.length);

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
        <View style={styles.tableHeader}>
            {
                columns.map((column, index) => {
                    {
                        return (
                            <TouchableOpacity
                                key={index}
                                style={index == 0 ? styles.columnFirstHeader : (index == 1 ? styles.columnSecondHeader : styles.columnHeader)}
                                onPress={() => sortTable(column)}>
                                <Text style={styles.columnHeaderTxt}>{column == 's' ? selectedColumn != 's' && <MaterialCommunityIcons
                                    name='alpha-c-box' size={20} /> : column}
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
    )

    const DisplayRank = ({ note, delta }) => (
        <Text style={{ ...styles.columnRowTxt, color: getColor(note) }}>{note == 0 ? '-' : note +
            (delta > 1 ? '↑' : (delta > -1 ? '' : '↓'))}</Text>
    )

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
                            <DisplayRank note={item.ESG} delta={item.ESG1Y} />
                            <DisplayRank note={item.E} delta={item.E1Y} />
                            <DisplayRank note={item.S} delta={item.S1Y} />
                            <DisplayRank note={item.G} delta={item.G1Y} />
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
        backgroundColor: "#7c9e15",
        // borderTopEndRadius: 10,
        // borderTopStartRadius: 10,
        height: 50
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
    columnHeader: {
        width: "14%",
        justifyContent: "center",
        alignItems: "center"
    },
    columnHeaderTxt: {
        color: "white",
        fontFamily: 'NSRegular',
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
    },
    columnSecondRowTxt: {
        width: "5%",
        textAlign: "center",
        fontFamily: 'NSLight',
        fontSize: 10,
    }
});
