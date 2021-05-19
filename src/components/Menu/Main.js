import React, { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Menu from './Menu';
import Login from '../Connection/Login/Login';
import Loader from '../Loader/Loader';

import Store from '../../context';

export default function Main() {

    // const toto = useContext(Store);

    // console.log(toto.user);
    // console.log(toto.userInfo);
    // console.log('loader',toto.ourLoader)

    return (
        <Store.Consumer>
            {(store) => (
                <>
                {!store.ourLoader ?
                <View style={styles.hide}>
                    { !store.user || !store.userInfo ? <Loader /> : (store.user === -1 ? <Login /> : <Menu />)}
                </View> :
                <View style={styles.container}>
                { !store.user || !store.userInfo ? <Loader /> : (store.user === -1 ? <Login /> : <Menu />)}
                </View>}
                </>
            )}
        </Store.Consumer>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        width: '100%',
        height: '100%',
    },
    hide: {
        flex: 1,
        width: '100%',
        height: '100%',
        display: 'none',
        backgroundColor: 'red',
        borderColor: 'red',
        borderWidth: 1,
    },
});



