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
import { useNavigation } from '@react-navigation/core';
import onSelectedItemsChange from '../../../../util/onSelectedItemsChange';

import NSLight from '../../../../../assets/fonts/NunitoSans/NunitoSansLight.ttf';
import NSRegular from '../../../../../assets/fonts/NunitoSans/NunitoSansRegular.ttf';
import NSBold from '../../../../../assets/fonts/NunitoSans/NunitoSansBold.ttf';
import NSExtraBold from '../../../../../assets/fonts/NunitoSans/NunitoSansExtraBold.ttf';

export default function Header({ helper, color, nb }) {

    const dataStore = useContext(Store);
    const navigation = useNavigation();

    // const [selectedItems, setSelectedItems] = useState(dataStore.preferences);
    const [filter, setFilter] = useState([]);

    useEffect(() => {
        // setSelectedItems(dataStore.preferences);
        setFilter(onSelectedItemsChange(dataStore.preferences));
    }, [dataStore.preferences])

    let HandlerRight = () => (
        <View style={{ flexDirection: "row", paddingRight: 5 }}>
            <TouchableOpacity onPress={() => { navigation.navigate(helper) }} >
                <View style={{ width: 24, alignItems: 'center' }} >
                    <Icon
                        style={{ paddingRight: 0 }}
                        name='question-circle-o'
                        type='font-awesome'
                        color='#fff'
                        size={22}
                    />
                </View>
            </TouchableOpacity>
        </View>
    )

    let HandlerRight2 = () => (
        <View style={{ paddingRight: 5 }}>
            <TouchableOpacity onPress={() => {
                navigation.navigate('SelectFilter');
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

                    <View style={{
                        marginTop: 0, backgroundColor: color,
                        color: '#FFF', flexDirection: "row", justifyContent: 'space-between',
                        alignItems: 'center', paddingHorizontal: 15, paddingBottom: 10
                    }}>
                        <View style={{ flex: 5, justifyContent: 'center' }}>
                            <TouchableOpacity onPress={() => { navigation.navigate('SelectFilter'); }} >
                                <View>
                                    <Text>
                                        <Text style={{ fontSize: 14, fontFamily: 'NSRegular', color: "#FFF" }}>
                                            {onSelectedItemsChange(store.preferences).map(function (elem) {
                                                return elem.Region;
                                            }).join(", ")
                                            }</Text>
                                        <Text style={{ fontSize: 16, fontFamily: 'NSRegular', color: "#FFF" }}>  {'\u270E'}</Text>
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 1 }}>
                            <View style={{
                                borderColor: '#FFF', borderWidth: 1, alignItems: 'center',
                                borderTopLeftRadius: 15, borderTopRightRadius: 15
                            }}>
                                <Text style={{ fontSize: 16, fontFamily: 'NSBold', color: '#FFF' }}>{nb}</Text>
                            </View>
                            <View style={{
                                borderColor: '#FFF', borderLeftWidth: 1, borderRightWidth: 1,
                                borderBottomWidth: 1, alignItems: 'center',
                                borderBottomLeftRadius: 15, borderBottomRightRadius: 15
                            }}>
                                <Text style={{ fontSize: 16, fontFamily: 'NSBold', color: '#FFF' }}>
                                    {store.sectorArray[store.indexCompany.row][store.indexCompany.col].ESG_IG_nb_last}
                                </Text>
                            </View>
                        </View>
                    </View>

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
