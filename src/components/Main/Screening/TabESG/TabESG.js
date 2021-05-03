import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import _ from "lodash"
import Store from '../../../../context';

import NSLight from '../../../../../assets/fonts/NunitoSans/NunitoSansLight.ttf';
import NSRegular from '../../../../../assets/fonts/NunitoSans/NunitoSansRegular.ttf';
import NSBold from '../../../../../assets/fonts/NunitoSans/NunitoSansBold.ttf';
import NSExtraBold from '../../../../../assets/fonts/NunitoSans/NunitoSansExtraBold.ttf';

export default function TabESG() {
    const [columns, setColumns] = useState([
        "NAME",
        "ESG",
        "E",
        "S",
        "G"
    ])
    const [direction, setDirection] = useState(null)
    const [selectedColumn, setSelectedColumn] = useState(null)
    const [data, setData] = useState([])
    const dataStore = useContext(Store);

    useEffect(() => {

        let test = false;
        for (let i = 0; i < dataStore.sectorArray.length; i++) {
            if (dataStore.sectorDisplay === dataStore.sectorArray[i][0].SASBSubSectorCode) {
                setData(dataStore.sectorArray[i])
                break;
            }
        }
        

    }, [dataStore.sectorDisplay]);

    const sortTable = (column) => {
        const newDirection = direction === "desc" ? "asc" : "desc"
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
                                style={index == 0 ? styles.columnFirstHeader : styles.columnHeader}
                                onPress={() => sortTable(column)}>
                                <Text style={styles.columnHeaderTxt}>{column + " "}
                                    {selectedColumn === column && <MaterialCommunityIcons
                                        name={direction === "desc" ? "arrow-down-drop-circle" : "arrow-up-drop-circle"}
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
                            <Text style={{ ...styles.columnFirstRowTxt, fontWeight: "bold" }}>{item.NAME}</Text>
                            <Text style={styles.columnRowTxt}>{item.ESG}</Text>
                            <Text style={styles.columnRowTxt}>{item.E}</Text>
                            <Text style={styles.columnRowTxt}>{item.S}</Text>
                            <Text style={styles.columnRowTxt}>{item.G}</Text>
                        </View>
                    )
                }}
            />
            <StatusBar style="auto" />
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
        backgroundColor: "#6A8712",
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
        width: "40%",
        justifyContent: "center",
        alignItems: "center"
    },
    columnHeader: {
        width: "15%",
        justifyContent: "center",
        alignItems: "center"
    },
    columnHeaderTxt: {
        color: "white",
        fontFamily: 'NSBold',
    },
    columnFirstRowTxt: {
        width: "40%",
        textAlign: "left",
        fontFamily: 'NSRegular',
        paddingLeft: 10,
    },
    columnRowTxt: {
        width: "15%",
        textAlign: "center",
        fontFamily: 'NSRegular',
    }
});
