import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Menu from './Menu';
import Login from '../Connection/Login/Login';
import Loader from '../Loader/Loader';

import Store from '../../context';

export default function Main() {

    return (
        <Store.Consumer>
            {(store) => (
                <View style={styles.container}>
                    { !store.user || !store.userInfo ? <Loader /> : (store.user === -1 ? <Login /> : <Menu />)}
                </View>
            )}
        </Store.Consumer>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
});



