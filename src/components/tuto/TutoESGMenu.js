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

export default function TutoESGMenu() {

    const navigation = useNavigation();

    return (
        <Store.Consumer>
            {(store) => (
                <SafeAreaView style={styles.container}>
                <View>
                    <View style={styles.barRank}>
                        <View style={{ marginHorizontal: 15, marginVertical: 10, }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
                                <Text style={styles.titleScore}>ESG Screenings</Text>
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
                                    The ESG screening tab exhibits the current relative ESG ratings of {store.sectorArray[store.indexCompany.row][store.indexCompany.col].Name}’s peers
                                     on a worldwide basis. To access more information on a company’s rating, please click on the name of the company.
                                    </Text>
                                    <Text style={{ fontSize: 16, fontFamily: 'NSRegular', color: 'grey', paddingTop: 15 }}>
                                    Ratings are done on a sector basis and range from 1 to 10, with 10 being the best possible grade.
                                    </Text>
                                    <Text style={{ fontSize: 16, fontFamily: 'NSRegular', color: 'grey', paddingTop: 15 }}>
                                    Ratings on the environmental (E), social (S) or governance (G) pillars are calculated independently, while
                                     global ESG rating is based on a combination of the three. 
                                    </Text>
                                    <Text style={{ fontSize: 16, fontFamily: 'NSRegular', color: 'grey', paddingTop: 15 }}>
                                    Arrows '↑' or '↓' express the relative evolution of the company’s rating over a one-year period.
                                     Arrows should be considered independently from the rating of a company: a 4 followed by a downward pointing 
                                     arrow means the current rating of the company is 4, down from a higher rating one year ago, not that the company lost
                                      four deciles.
                                    </Text>
                                    <Text style={{ fontSize: 16, fontFamily: 'NSRegular', color: 'grey', paddingTop: 15 }}>
                                    The column <MaterialCommunityIcons
                                    name='alpha-c-box' size={20} /> indicates the size of the company in terms of market capitalization:
                                    </Text>
                                    <Text style={{ fontSize: 16, fontFamily: 'NSRegular', color: 'grey', paddingTop: 15 }}>
                                        {'\u2022'} L indicates the company is a large capitalization, i.e., a market capitalization over 10 Billions €.
                                    </Text>
                                    <Text style={{ fontSize: 16, fontFamily: 'NSRegular', color: 'grey', paddingTop: 15 }}>
                                        {'\u2022'} M indicates the company is a medium capitalization, i.e., a market capitalization between 2 and 10 Billions €.
                                    </Text>
                                    <Text style={{ fontSize: 16, fontFamily: 'NSRegular', color: 'grey', paddingTop: 15 }}>
                                        {'\u2022'} S indicates the company is a small capitalization, i.e., a market capitalization below 2 Billions €.
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