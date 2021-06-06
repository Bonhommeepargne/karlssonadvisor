import React, { useEffect, useState, useContext } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity
} from 'react-native';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/core';
import Store from '../../../../context';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import * as fb from "../../../../firebase";
import Toast from 'react-native-toast-message';
import { MaterialIcons } from '@expo/vector-icons';
import onSelectedItemsChange from '../../../../util/onSelectedItemsChange'

// https://fonts.google.com/specimen/Nunito+Sans
import NSLight from '../../../../../assets/fonts/NunitoSans/NunitoSansLight.ttf';
import NSRegular from '../../../../../assets/fonts/NunitoSans/NunitoSansRegular.ttf';
import NSBold from '../../../../../assets/fonts/NunitoSans/NunitoSansBold.ttf';
import NSExtraBold from '../../../../../assets/fonts/NunitoSans/NunitoSansExtraBold.ttf';

const items = [
    // this is the parent or 'item'
    {
        name: 'Region',
        id: 0,
        // these are the children or 'sub items'
        children: [
            {
                name: 'WEST EUROPE',
                id: 1,
            },
            {
                name: 'EAST EUROPE',
                id: 2,
            },
            {
                name: 'NORTH AMERICA',
                id: 3,
            },
            {
                name: 'SOUTH AMERICA',
                id: 4,
            },
            {
                name: 'ASIA',
                id: 5,
            },
            {
                name: 'PACIFIC',
                id: 6,
            },
            {
                name: 'MID EAST',
                id: 7,
            },
            {
                name: 'AFRICA',
                id: 8,
            },
        ],
    }
];

export default function SelectFilter() {

    const navigation = useNavigation();
    const dataStore = useContext(Store);

    const [selectedItems, setSelectedItems] = useState(dataStore.preferences);

    async function updateFilterSavePreferences() {
        try {
            fb.updateUser(dataStore.user.uid, {
                preferences: selectedItems
            });
            dataStore.updateUserInfo({ preferences: selectedItems });
            dataStore.updatePreferences(selectedItems);
            navigation.goBack();
            Toast.show({
                type: 'success',
                position: 'bottom',
                text1: "Filter preferences succesfully saved.",
                visibilityTime: 4000,
                autoHide: true,
                topOffset: 30,
                bottomOffset: 40
            })
        } catch (err) {
            console.error("Update Sector Preferences Error", err);
            Toast.show({
                type: 'error',
                position: 'bottom',
                text1: "Try again later.",
                visibilityTime: 4000,
                autoHide: true,
                topOffset: 30,
                bottomOffset: 40
            })
        }
    }

    function updateFilterPreferences() {
        dataStore.updateUserInfo({ preferences: selectedItems });
        dataStore.updatePreferences(selectedItems);
        navigation.goBack();
    }

    let onSelectedItemsChange = (selectedItems) => {
        setSelectedItems(selectedItems);
    }

    return (
        <View style={styles.container}>
            <View style={styles.barRank}>
                <View style={{ marginHorizontal: 15, marginVertical: 10 }}>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={styles.titleScore}>Filter</Text>
                        <View style={{ flexDirection: 'row', paddingTop: 4 }}  >
                            <TouchableOpacity onPress={() => { navigation.goBack() }} >
                                <Icon
                                    name='close-o'
                                    type='evilicon'
                                    color='black'
                                    size={30}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <SectionedMultiSelect
                        items={items}
                        IconRenderer={MaterialIcons}
                        uniqueKey="id"
                        subKey="children"
                        selectText="Filter by Segments..."
                        showDropDowns={true}
                        readOnlyHeadings={true}
                        onSelectedItemsChange={onSelectedItemsChange}
                        selectedItems={selectedItems}
                        expandDropDowns={true}
                        styles={{
                            button: { backgroundColor: '#7c9e15' }, cancelButton: { backgroundColor: 'grey' },
                            selectToggleText: { color: 'black', fontFamily: 'NSBold', },
                            selectToggle: { height: 50, padding: 10 }
                        }}
                    />

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 20, alignItems: 'center' }}>
                        <TouchableOpacity
                            style={{ paddingVertical: 8, paddingHorizontal: 15, borderRadius: 10, backgroundColor: 'grey' }}
                            onPress={() => (updateFilterSavePreferences())}
                        >
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ justifyContent: 'center' }}>
                                    <Text style={{ fontSize: 14, fontFamily: 'NSRegular', color: '#FFF' }}>Save {'&'} Apply</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{ paddingVertical: 8, paddingHorizontal: 15, borderRadius: 10, backgroundColor: 'grey' }}
                            onPress={() => (updateFilterPreferences())}
                        >
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ justifyContent: 'center' }}>
                                    <Text style={{ fontSize: 14, fontFamily: 'NSRegular', color: '#FFF' }}>Apply</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
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