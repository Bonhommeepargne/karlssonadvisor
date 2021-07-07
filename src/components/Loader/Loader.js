import React from 'react';
import { StyleSheet, StatusBar, View, ActivityIndicator, ImageBackground } from 'react-native';

export default function Loader() {

    return (
        <>
            {/* <StatusBar backgroundColor="#FFF" /> */}
            <View style={styles.container}>
                <ImageBackground source={require('../../../assets/splash.png')} style={styles.image}>
                    <ActivityIndicator size="large" color="#86B206" />
                    {/* <Text style={styles.text}>Loading...</Text> */}
                </ImageBackground>
            </View>
        </>
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
    image: {
        flex: 1,
        width: "100%",
        height: "100%",
        resizeMode: "cover",
        justifyContent: "center"
    },
    text: {
        fontSize: 18,
        color: 'black'
    }
});