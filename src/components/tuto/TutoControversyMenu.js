import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    SafeAreaView
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/core';
import Store from '../../context';

// https://fonts.google.com/specimen/Nunito+Sans
import NSLight from '../../../assets/fonts/NunitoSans/NunitoSansLight.ttf';
import NSRegular from '../../../assets/fonts/NunitoSans/NunitoSansRegular.ttf';
import NSBold from '../../../assets/fonts/NunitoSans/NunitoSansBold.ttf';
import NSExtraBold from '../../../assets/fonts/NunitoSans/NunitoSansExtraBold.ttf';

export default function TutoControversyMenu() {

    const navigation = useNavigation();

    return (
        <Store.Consumer>
            {(store) => (
                <SafeAreaView style={styles.container}>
                <View>
                    <View style={styles.barRank}>
                        <View style={{ marginHorizontal: 15, marginVertical: 10, }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
                                <Text style={styles.titleScore}>Controversy Screenings</Text>
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
                                    The controversy screening tab exhibits where {store.sectorArray[store.indexCompany.row][store.indexCompany.col].Name}’s peers stand in terms of controversy. 
                                    To access more information on a company’s rating, please click on the name of the company.
                                    </Text>
                                    <Text style={{ fontSize: 16, fontFamily: 'NSRegular', color: 'grey', paddingTop: 15 }}>
                                    Controversy refers to scandals over environmental, social or governance themes that may 
                                    have a material negative impact on a company’s brand reputation, business or stock price. Controversies 
                                    usually relate to environmental, human, or labor rights scandals, suppliers and customers issues 
                                    and governance problems.
                                    </Text>
                                    <Text style={{ fontSize: 16, fontFamily: 'NSRegular', color: 'grey', paddingTop: 15 }}>
                                        {'\u2022'} None: no controversy has been detected by financial markets.
                                    </Text>
                                    <Text style={{ fontSize: 16, fontFamily: 'NSRegular', color: 'grey', paddingTop: 15 }}>
                                        {'\u2022'} Low: the company may be affected by a controversy and is under scrutiny.
                                    </Text>
                                    <Text style={{ fontSize: 16, fontFamily: 'NSRegular', color: 'grey', paddingTop: 15 }}>
                                        {'\u2022'} Watch: the company is involved in one or more significant controversy.
                                    </Text>
                                    <Text style={{ fontSize: 16, fontFamily: 'NSRegular', color: 'grey', paddingTop: 15 }}>
                                        {'\u2022'} Alert: the company is affected by a severe controversy.
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