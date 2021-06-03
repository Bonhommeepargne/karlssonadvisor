import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    SafeAreaView
} from 'react-native';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/core';
import Store from '../../context';

// https://fonts.google.com/specimen/Nunito+Sans
import NSLight from '../../../assets/fonts/NunitoSans/NunitoSansLight.ttf';
import NSRegular from '../../../assets/fonts/NunitoSans/NunitoSansRegular.ttf';
import NSBold from '../../../assets/fonts/NunitoSans/NunitoSansBold.ttf';
import NSExtraBold from '../../../assets/fonts/NunitoSans/NunitoSansExtraBold.ttf';

export default function TutoCarbon() {

    const navigation = useNavigation();

    return (
        <Store.Consumer>
            {(store) => (
                <SafeAreaView style={styles.container}>
                <View>
                    <View style={styles.barRank}>
                        <View style={{ marginHorizontal: 15, marginVertical: 10, }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
                                <Text style={styles.titleScore}>Carbon intensity</Text>
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

                            <ScrollView style={{narginBottom: 10}}>
                                <View style={{ paddingBottom: 5 }}>
                                    <Text style={{ fontSize: 16, fontFamily: 'NSRegular', color: 'grey', paddingTop: 15 }}>
                                        Carbon intensity is defined as the average of most recently reported scope 1 and scope 2 tons of CO2 emissions among ESG data providers divided by a weighted of total sales reported in millions of USD.
                                    </Text>
                                    <Text style={{ fontSize: 16, fontFamily: 'NSRegular', color: 'grey', paddingTop: 15 }}>
                                    	The ranking, ranging from “High” to “Good”, represents the statistical dispersion of carbon intensities emitted
                                         by each company within {store.sectorArray[store.indexCompany.row][store.indexCompany.col].Name}’s competitive universe.
                                    </Text>
                                    <Text style={{ fontSize: 16, fontFamily: 'NSRegular', color: 'grey', paddingTop: 15 }}>
                                    	The population is divided into five even-sized quintiles:
                                    </Text>
                                    <Text style={{ fontSize: 16, fontFamily: 'NSRegular', color: 'grey', paddingTop: 15 }}>
                                        {'\u2022'} Good means the company ranks among the 20% best performing companies in terms of carbon intensity;
                                    </Text>
                                    <Text style={{ fontSize: 16, fontFamily: 'NSRegular', color: 'grey', paddingTop: 15 }}>
                                        {'\u2022'} Fair means the company ranks among the 40% top performing companies in terms of carbon intensity but is not among the 20% best performing companies;
                                    </Text>
                                    <Text style={{ fontSize: 16, fontFamily: 'NSRegular', color: 'grey', paddingTop: 15 }}>
                                        {'\u2022'} Average means the company ranks among the 60% top performing companies in terms of carbon intensity but is not among the 40% best performing companies;
                                    </Text>
                                    <Text style={{ fontSize: 16, fontFamily: 'NSRegular', color: 'grey', paddingTop: 15 }}>
                                        {'\u2022'} Poor means the company ranks among the 80% top performing companies in terms of carbon intensity but is not among the 60% best performing companies;
                                    </Text>
                                    <Text style={{ fontSize: 16, fontFamily: 'NSRegular', color: 'grey', paddingTop: 15 }}>
                                        {'\u2022'} High means the company ranks among the 20% worst performing companies in terms of carbon intensity.
                                    </Text>
                                    <Text style={{ fontSize: 16, fontFamily: 'NSRegular', color: 'grey', paddingTop: 15 }}>
                                        TOTAL SALES INDUSTRY displays {store.sectorArray[store.indexCompany.row][store.indexCompany.col].Name}’s total sales share of 
                                        the total sales in the {store.sectorArray[store.indexCompany.row][store.indexCompany.col].SASBIndustryGroup} industry.
                                    </Text>
                                    <Text style={{ fontSize: 16, fontFamily: 'NSRegular', color: 'grey', paddingTop: 15 }}>
                                        CO2 EMISSIONS INDUSTRY displays {store.sectorArray[store.indexCompany.row][store.indexCompany.col].Name}’s total share of 
                                        CO2 emissions within the {store.sectorArray[store.indexCompany.row][store.indexCompany.col].SASBIndustryGroup} industry.
                                    </Text>
                                </View>
                            </ScrollView>
                        </View>
                    </View>
                </View>
                </SafeAreaView>
            )}
        </Store.Consumer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        height: "100%",
        backgroundColor: "#00000000",
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 30
    },
    barRank: {
        marginVertical: 70,
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