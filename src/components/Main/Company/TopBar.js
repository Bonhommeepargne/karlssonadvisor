import React, { useState, useEffect, useContext } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableWithoutFeedback,
} from 'react-native';
import Constants from 'expo-constants';
import Toast from 'react-native-toast-message';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import * as fb from "../../../firebase";
import Store from '../../../context';
import { set } from 'react-native-reanimated';

export default function TopBar() {

    const navigation = useNavigation();
    const dataStore = useContext(Store);
    const [UID, setUID] = useState('');
    const [myComp, setMyComp] = useState(false);

    useEffect(() => {
        let company = dataStore.sectorArray[dataStore.indexCompany.row][dataStore.indexCompany.col];

        company.Sedol7 === dataStore.userInfo.company.c ? setMyComp(true) : setMyComp(false);

        let unsubscribe = fb.db.collection("watchlist").where("uid", "==", dataStore.user.uid)
            .where("c", "==", company.Sedol7)
            .onSnapshot((querySnapshot) => {
                let test = false;
                querySnapshot.forEach((doc) => {
                    setUID(doc.id);
                    test = true;
                });
                if (test == false) { setUID('') }
            });

        return unsubscribe;
    }, [dataStore.indexCompany.row, dataStore.indexCompany.col]);

    const addWatchlist = () => {
        let company = dataStore.sectorArray[dataStore.indexCompany.row][dataStore.indexCompany.col];
        try {
            fb.addSecurityToWatchlist({
                c: company.Sedol7,
                i: company.Isin,
                n: company.NAME,
                p: company.Country,
                s: company.SASBIndustryGroupCode,
                uid: dataStore.user.uid
            });
            Toast.show({
                type: 'success',
                position: 'bottom',
                text1: company.Name + ' added to watchlist',
                visibilityTime: 4000,
                autoHide: true,
                topOffset: 30,
                bottomOffset: 40
            })
        } catch (error) {
            Toast.show({
                type: 'error',
                position: 'bottom',
                text1: 'Error updating',
                visibilityTime: 4000,
                autoHide: true,
                topOffset: 30,
                bottomOffset: 40
            });
        }
    }

    const delWatchlist = () => {
        let companyName = dataStore.sectorArray[dataStore.indexCompany.row][dataStore.indexCompany.col].Name;
        try {
            fb.deleteSecurityToWatchlist(UID);
            Toast.show({
                type: 'success',
                position: 'bottom',
                text1: companyName + ' deleted from watchlist',
                visibilityTime: 4000,
                autoHide: true,
                topOffset: 30,
                bottomOffset: 40
            })
        } catch (error) {
            Toast.show({
                type: 'error',
                position: 'bottom',
                text1: 'Error deleting',
                visibilityTime: 4000,
                autoHide: true,
                topOffset: 30,
                bottomOffset: 40
            });
        };
    }

    let HandlerRight = () => (
        <View style={{ flexDirection: "row" }}>
            {!myComp ? <TouchableWithoutFeedback onPress={() =>
                (UID === '' ? addWatchlist() : delWatchlist())
            }>
                <Icon
                    style={{ paddingRight: 25 }}
                    name={UID === '' ? 'plus-square' : 'minus-square'}
                    type='font-awesome-5'
                    color='#fff'
                    size={21}
                />
            </TouchableWithoutFeedback> :
                <TouchableWithoutFeedback onPress={() =>
                    (navigation.navigate('ManageProfile'))
                }>
                    <Icon
                        style={{ paddingRight: 25 }}
                        name='bullseye'
                        type='font-awesome-5'
                        color='#fff'
                        size={21}
                    />
                </TouchableWithoutFeedback>
            }
            <TouchableWithoutFeedback onPress={() =>
                (navigation.navigate('Search', { query: 'select' }))
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
    )

    let HandlerLeft = () => (
        <Store.Consumer>
            {(store) => (
                <View>
                    <TouchableWithoutFeedback onPress={() => {
                        navigation.navigate("SideModal")
                        // store.setSideModalVisible((value) => (!value));
                    }
                    }>
                        <Icon
                            style={{ paddingLeft: 18, paddingRight: 25 }}
                            name='list'
                            type='font-awesome-5'
                            color='#fff'
                            size={24}
                        />
                    </TouchableWithoutFeedback>
                </View>
            )}
        </Store.Consumer>
    )

    return (
        <View style={{
            marginTop: 0, backgroundColor: '#6A8712',
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
