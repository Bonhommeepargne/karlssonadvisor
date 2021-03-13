import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';

export default function Loader() {

    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color="#86B206" />
            {/* <Text style={styles.text}>Loading...</Text> */}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        height: "100%",
        backgroundColor: "white",
        alignItems: 'center',
        justifyContent: "space-evenly",
    },
    text: {
        fontSize: 18,
        color: 'black'
    }
});