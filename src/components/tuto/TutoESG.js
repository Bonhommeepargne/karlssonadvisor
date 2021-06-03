import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity
} from 'react-native';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/core';

// https://fonts.google.com/specimen/Nunito+Sans
import NSLight from '../../../assets/fonts/NunitoSans/NunitoSansLight.ttf';
import NSRegular from '../../../assets/fonts/NunitoSans/NunitoSansRegular.ttf';
import NSBold from '../../../assets/fonts/NunitoSans/NunitoSansBold.ttf';
import NSExtraBold from '../../../assets/fonts/NunitoSans/NunitoSansExtraBold.ttf';

export default function tutoESG() {

    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <View style={styles.barRank}>
                <View style={{ marginHorizontal: 15, marginVertical: 10 }}>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={styles.titleScore}>ESG Sector Ratings</Text>
                        <TouchableOpacity onPress={() => { navigation.goBack() }} >
                            <Icon
                                style={{ paddingTop: 4 }}
                                name='close-o'
                                type='evilicon'
                                color='black'
                                size={30}
                            />
                        </TouchableOpacity>
                    </View>

                    <View style={{ paddingTop: 10, paddingBottom: 2 }}>
                        <View style={{ paddingBottom: 5 }}>
                            <Text style={{ fontSize: 16, fontFamily: 'NSRegular', color: 'grey' }}>
                                Sector is defined as an area of the economy in which businesses share operating
                                 practices that similarly affect environmental, social or governance aspects of the economy.</Text>
                            <Text style={{ fontSize: 16, fontFamily: 'NSRegular', color: 'grey', paddingTop: 15 }}>
                                Sector Ratings adopt a financial market-centric approach:</Text>
                            <Text style={{ fontSize: 16, fontFamily: 'NSRegular', color: 'grey', paddingTop: 15 }}>
                                {'\u2022'} Industry-specific ESG criteria usually combine into sectoral ESG aggregation rules;
                            </Text>
                            <Text style={{ fontSize: 16, fontFamily: 'NSRegular', color: 'grey', paddingTop: 15 }}>
                                {'\u2022'} Sector-based ratings offer an accurate combination of economic and ESG identity.
                            </Text>
                        </View>
                    </View>


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
        backgroundColor: "#00000000",
        alignItems: 'center',
        justifyContent: 'center'
    },
    barRank: {
        marginVertical: 10,
        justifyContent: 'flex-start',
        width: "95%",
        borderWidth: 1,
        borderColor: '#CCC',
        padding: 5,
        borderRadius: 15,
        backgroundColor: "white",
    },
    titleScore: {
        fontSize: 22,
        fontFamily: 'NSExtraBold',
        color: "black"
    },
    underTitleScore: {
        fontSize: 18,
        fontFamily: 'NSExtraBold',
        color: "dimgray"
    },
});