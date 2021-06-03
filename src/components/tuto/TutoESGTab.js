import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity
} from 'react-native';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/core';
import Store from '../../context';

// https://fonts.google.com/specimen/Nunito+Sans
import NSLight from '../../../assets/fonts/NunitoSans/NunitoSansLight.ttf';
import NSRegular from '../../../assets/fonts/NunitoSans/NunitoSansRegular.ttf';
import NSBold from '../../../assets/fonts/NunitoSans/NunitoSansBold.ttf';
import NSExtraBold from '../../../assets/fonts/NunitoSans/NunitoSansExtraBold.ttf';

export default function tutoESGTab() {

    const navigation = useNavigation();

    return (
        <Store.Consumer>
            {(store) => (
                <View style={styles.container}>
                    <View style={styles.barRank}>
                        <View style={{ marginHorizontal: 15, marginVertical: 10 }}>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={styles.titleScore}>ESG Sector Ratings table</Text>
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
                                    <Text style={{ fontSize: 16, fontFamily: 'NSRegular', color: 'grey', paddingTop: 15 }}>
                                        {'\u2022'} Each rating exhibits a worldwide relative ESG ranking 
                                         of {store.sectorArray[store.indexCompany.row][store.indexCompany.col].Name} within
                                           the World {store.sectorArray[store.indexCompany.row][store.indexCompany.col].SASBSubSector} sector.
                            </Text>
                                    <Text style={{ fontSize: 16, fontFamily: 'NSRegular', color: 'grey', paddingTop: 15 }}>
                                        {'\u2022'} Ratings on the environmental (E), social (S) or governance (G) pillars are calculated independently, while global ESG rating is based on a combination of the three.
                            </Text>
                                    <Text style={{ fontSize: 16, fontFamily: 'NSRegular', color: 'grey', paddingTop: 15 }}>
                                        {'\u2022'} Rating is displayed on a scale of 1 to 10, with 10 being the best score.
                            </Text>
                                    <Text style={{ fontSize: 16, fontFamily: 'NSRegular', color: 'grey', paddingTop: 15 }}>
                                        {'\u2022'} When no specific environmental (E), social (S) or governance (G) rating exists, Karlsson Advisor exhibits an aggregated global ESG rating reflecting the view financial markets have on the company considering the absence of specific ratings on the three pillars.
                            </Text>
                                </View>
                            </View>

                        </View>
                    </View>
                </View>
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