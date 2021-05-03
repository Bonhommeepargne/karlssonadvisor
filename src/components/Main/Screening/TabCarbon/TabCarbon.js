import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import _ from "lodash"

import NSLight from '../../../../../assets/fonts/NunitoSans/NunitoSansLight.ttf';
import NSRegular from '../../../../../assets/fonts/NunitoSans/NunitoSansRegular.ttf';
import NSBold from '../../../../../assets/fonts/NunitoSans/NunitoSansBold.ttf';
import NSExtraBold from '../../../../../assets/fonts/NunitoSans/NunitoSansExtraBold.ttf';

export default function TabCarbon() {
    const [columns, setColumns] = useState([
        "Name",
        "ESG",
        "E",
        "S",
        "G"
    ])

    let tab = [];
    for (let i = 0; i < 9; i++) {
        var obj = {
            Name: "MUCNHEC LDLDK RUCK",
            ESG: Math.floor(Math.random() * 10),
            E: Math.floor(Math.random() * 10),
            S: Math.floor(Math.random() * 10),
            G: Math.floor(Math.random() * 10)
        };

        tab.push(obj);
    }

    const [direction, setDirection] = useState(null)
    const [selectedColumn, setSelectedColumn] = useState(null)
    const [pets, setPets] = useState(tab)

    const sortTable = (column) => {
        const newDirection = direction === "desc" ? "asc" : "desc"
        const sortedData = _.orderBy(pets, [column], [newDirection])
        setSelectedColumn(column)
        setDirection(newDirection)
        setPets(sortedData)
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
                data={pets}
                style={{ width: "100%" }}
                keyExtractor={(item, index) => index + ""}
                ListHeaderComponent={tableHeader}
                stickyHeaderIndices={[0]}
                renderItem={({ item, index }) => {
                    return (
                        <View style={{ ...styles.tableRow, backgroundColor: index % 2 == 1 ? "#f6f6f6" : "white" }}>
                            <Text style={{ ...styles.columnFirstRowTxt, fontWeight: "bold" }}>{item.Name}</Text>
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
        backgroundColor: "#86b206",
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
