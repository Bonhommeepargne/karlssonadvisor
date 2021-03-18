import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableWithoutFeedback,
} from 'react-native';
import Constants from 'expo-constants';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
// import {
//     Menu,
//     MenuOptions,
//     MenuOption,
//     MenuTrigger,
// } from 'react-native-popup-menu';

export default function TopBar() {

    const navigation = useNavigation();

    let HandlerRight = () => (
        <View style={{ flexDirection: "row" }}>
            <View>
                <TouchableWithoutFeedback onPress={() =>
                    (navigation.navigate('Search'))
                }>
                    <Icon
                        style={{ paddingRight: 20 }}
                        name='search'
                        type='font-awesome-5'
                        color='#fff'
                        size={20}
                    />
                </TouchableWithoutFeedback>
            </View>
            {/* <TouchableWithoutFeedback onPress={() =>
                (navigation.navigate('Search'))
            }>
                <Icon
                    style={{ paddingRight: 25 }}
                    name='ellipsis-v'
                    type='font-awesome-5'
                    color='#fff'
                    size={20}
                />
            </TouchableWithoutFeedback> */}
            {/* <View>
                <Menu onSelect={value => alert(`Selected number: ${value}`)} style={{borderRadius: 10}} >
                    <MenuTrigger text='Select option' />
                    <MenuOptions>
                        <MenuOption value={1} text='One' />
                    </MenuOptions>
                </Menu>
            </View> */}
        </View>
    )

    let HandlerLeft = () => (
        <View>
            <TouchableWithoutFeedback onPress={() =>
                (navigation.navigate('WatchListSelect'))
            }>
                <Icon
                    style={{ paddingLeft: 18, paddingRight: 25 }}
                    name='bars'
                    type='font-awesome-5'
                    color='#fff'
                    size={24}
                />
            </TouchableWithoutFeedback>
        </View>
    )


    return (
        <View style={{
            marginTop: Constants.statusBarHeight, backgroundColor: '#6A8712',
            color: '#FFF', height: 50, flexDirection: "row", justifyContent: 'space-between',
            alignItems: 'center'
        }}>
            <HandlerLeft />
            <View>
                <Text style={styles.title}>Company</Text>
            </View>
            <HandlerRight />
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