import React, {useEffect, useContext} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableWithoutFeedback,
} from 'react-native';
import Search from './Search';
import Store from '../../../context';

import NSLight from '../../../../assets/fonts/NunitoSans/NunitoSansLight.ttf';
import NSRegular from '../../../../assets/fonts/NunitoSans/NunitoSansRegular.ttf';
import NSBold from '../../../../assets/fonts/NunitoSans/NunitoSansBold.ttf';
import NSExtraBold from '../../../../assets/fonts/NunitoSans/NunitoSansExtraBold.ttf';

export default function DefineCompany() {

    const dataStore = useContext(Store);

    useEffect(() => {
        dataStore.setOurLoader(true);
      }, [])

    return (
        <View style={{ flex: 1 }}>
            <View style={{
                marginTop: 0, backgroundColor: '#6A8712',
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