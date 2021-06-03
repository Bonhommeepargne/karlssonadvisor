import React, { useState, useEffect, useContext } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
} from 'react-native';
import { Icon } from 'react-native-elements';
import Store from '../../../../context';
import _ from 'lodash';
import * as fb from "../../../../firebase";
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/core';

import NSLight from '../../../../../assets/fonts/NunitoSans/NunitoSansLight.ttf';
import NSRegular from '../../../../../assets/fonts/NunitoSans/NunitoSansRegular.ttf';
import NSBold from '../../../../../assets/fonts/NunitoSans/NunitoSansBold.ttf';
import NSExtraBold from '../../../../../assets/fonts/NunitoSans/NunitoSansExtraBold.ttf';

import { MaterialIcons } from '@expo/vector-icons';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import { NavigationHelpersContext } from '@react-navigation/core';

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
                name: 'MIDDLE EAST',
                id: 7,
            },
            {
                name: 'AFRICA',
                id: 8,
            },
        ],
    }
];

export default function Header({ filter, setFilter, helper, color }) {

    const [visible, setVisible] = useState(false);
    const dataStore = useContext(Store);
    const navigation = useNavigation();

    const [selectedItems, setSelectedItems] = useState(!dataStore.userInfo.preferences ? [1, 2, 3, 4, 5, 6, 7, 8] : dataStore.userInfo.preferences);

    useEffect(() => {
        onSelectedItemsChange(selectedItems);
    }, [])

    async function updateFilterPreferences() {
        try {
          await fb.updateUser(dataStore.user.uid, {
            preferences : selectedItems
          });
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

    let onSelectedItemsChange = (selectedItems) => {
        let criteria = [];

        setSelectedItems(selectedItems);
        selectedItems.forEach(element => {
            let region = items[0].children;
            region.forEach(el => {
                if (el.id == element) {
                    criteria.push({ Region: el.name });
                }
            })
        });
        setFilter(criteria);
    };

    let HandlerRight = () => (
        <View style={{ flexDirection: "row", paddingRight: 5 }}>
            {visible &&
                <TouchableOpacity onPress={() => {
                    updateFilterPreferences();
                }} >
                    <Icon
                        style={{ paddingRight: 20 }}
                        name='save'
                        type='materialicons'
                        color='#fff'
                        size={25}
                    />
                </TouchableOpacity>
            }
            <TouchableOpacity onPress={() => {
                visible == false ? navigation.navigate(helper) : setVisible((oldVisible) => (!oldVisible))
            }} >
                <View style={{ width: 24, alignItems: 'center' }} >
                    {visible == false ? <Icon
                        style={{ paddingRight: 0 }}
                        name='question-circle-o'
                        type='font-awesome'
                        color='#fff'
                        size={22}
                    /> :
                        <Icon
                            style={{ paddingRight: 0, paddingTop: 3 }}
                            name='times'
                            type='font-awesome-5'
                            color='#fff'
                            size={20}
                        />
                    }
                </View>
            </TouchableOpacity>
        </View>
    )

    let HandlerRight2 = () => (
        <View style={{ paddingRight: 5 }}>
            <TouchableOpacity onPress={() => {
                 setVisible((oldVisible) => (!oldVisible))
            }} style={{ width: 24, }}>
                <Icon
                    style={{ paddingRight: 0, paddingTop: 3 }}
                    name='edit'
                    type='font-awesome-5'
                    color='#fff'
                    size={18}
                />
            </TouchableOpacity>
        </ View>
    )

    return (
        <Store.Consumer>
            {(store) => (
                <View>
                    <View style={{
                        marginTop: 0, backgroundColor: color,
                        color: '#FFF', flexDirection: "row", justifyContent: 'space-between',
                        alignItems: 'center', paddingHorizontal: 15, paddingVertical: 10
                    }}>
                        <View style={{ flex: 1, alignContent: 'flex-start' }}>
                            <Text style={styles.title}>{store.sectorArray[store.indexCompany.row][store.indexCompany.col].SASBIndustryGroup}
                            </Text>
                        </View>
                        <HandlerRight />
                    </View>
                    { visible &&
                        <View style={{
                            backgroundColor: '#FFF',
                            paddingHorizontal: 10, paddingTop: 9, paddingBottom: 10
                        }} >
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
                        </View>}
                    {!visible &&
                        <View style={{
                            marginTop: 0, backgroundColor: color,
                            color: '#FFF', flexDirection: "row", justifyContent: 'space-between',
                            alignItems: 'center', paddingHorizontal: 15, paddingVertical: 10
                        }}>
                            <View style={{ flex: 1, alignContent: 'flex-start' }} >
                                <Text style={{ fontSize: 14, fontFamily: 'NSRegular', color: "#FFF" }}>
                                    {filter.map(function (elem) {
                                            return elem.Region;
                                        }).join(", ")
                                    }</Text>
                            </View>
                            <HandlerRight2 />
                        </View>
                    }
                </View>
            )}
        </Store.Consumer>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 16,
        fontFamily: 'NSBold',
        color: "#FFF",
    }
})
