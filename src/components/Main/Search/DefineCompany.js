import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableWithoutFeedback,
} from 'react-native';
import Constants from 'expo-constants';
import Search from './Search';

import NSLight from '../../../../assets/fonts/NunitoSans/NunitoSansLight.ttf';
import NSRegular from '../../../../assets/fonts/NunitoSans/NunitoSansRegular.ttf';
import NSBold from '../../../../assets/fonts/NunitoSans/NunitoSansBold.ttf';
import NSExtraBold from '../../../../assets/fonts/NunitoSans/NunitoSansExtraBold.ttf';

export default function DefineCompany() {

    return (
        <View style={{ flex: 1 }}>
            <View style={{
                marginTop: Constants.statusBarHeight, backgroundColor: '#6A8712',
                color: '#FFF', height: 50, flexDirection: "row", justifyContent: 'center',
                alignItems: 'center'
            }}>
                <View>
                    <Text style={styles.title}>Enter your company :</Text>
                </View>
            </View>
            <Search route={{ params: { query: 'firstuse' } }} />
        </View>
    );

}

const styles = StyleSheet.create({
    title: {
        fontSize: 18,
        fontFamily: 'NSBold',
        color: "#FFF",
    }
})