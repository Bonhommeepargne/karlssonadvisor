import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Linking
} from 'react-native';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/core';
import Store from '../../context';

// https://fonts.google.com/specimen/Nunito+Sans
import NSLight from '../../../assets/fonts/NunitoSans/NunitoSansLight.ttf';
import NSRegular from '../../../assets/fonts/NunitoSans/NunitoSansRegular.ttf';
import NSBold from '../../../assets/fonts/NunitoSans/NunitoSansBold.ttf';
import NSExtraBold from '../../../assets/fonts/NunitoSans/NunitoSansExtraBold.ttf';

export default function TutoUNGC() {

    const navigation = useNavigation();

    const ExternalLinkBtn = (props) => {
        return <TouchableOpacity
          onPress={() => {
            Linking.openURL(props.url)
              .catch(err => {
                console.error("Failed opening page because: ", err)
                alert('Failed to open page')
              })
          }}>
          <Text style={{ fontSize: 16, fontFamily: 'NSBold', color: 'blue' }}>{props.title}</Text>
        </TouchableOpacity>
      }

    return (
        <Store.Consumer>
            {(store) => (
                <View style={styles.container}>
                    <View style={styles.barRank}>
                        <View style={{ marginHorizontal: 15, marginVertical: 10 }}>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={styles.titleScore}>Controversy</Text>
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
                                    The Global Compact is a voluntary commitment from companies, associations, or non-governmental 
                                    organizations to respect ten universally accepted principles (derived from international conventions) 
                                    and grouped under four themes: human rights, labor standards, the environment, and the fight against corruption.
                                    </Text>
                                    <ExternalLinkBtn title={'Learn more >>'} url={'https://www.unglobalcompact.org/'} 
                                        style={{ fontSize: 16, fontFamily: 'NSRegular' }}/>
                                    <Text style={{ fontSize: 16, fontFamily: 'NSRegular', color: 'grey', paddingTop: 15 }}>
                                        {'\u2022'} Pass: the company complies with the UN Global Compact.
                                    </Text>
                                    <Text style={{ fontSize: 16, fontFamily: 'NSRegular', color: 'grey', paddingTop: 15 }}>
                                        {'\u2022'} Watch List: the company encounters some issues regarding one or more principles.
                                    </Text>
                                    <Text style={{ fontSize: 16, fontFamily: 'NSRegular', color: 'grey', paddingTop: 15 }}>
                                        {'\u2022'} Failed: the company failed to comply with the UN Global Compact requirements.
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