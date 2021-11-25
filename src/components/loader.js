import React from 'react'
import { View, ActivityIndicator, StyleSheet, Dimensions, Image } from 'react-native';
import LoaderGIF from '../assets/images/Spinner.gif';
const windowInfo = Dimensions.get("screen");
const Loader = (loading) => {
    return (<View style={styles.loading}>
        {/* <ActivityIndicator size='large' color="#000" /> */}
        <Image source={LoaderGIF} style={styles.loader} />
    </View>
    )
}

const styles = StyleSheet.create({
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        height: windowInfo.height,
        zIndex: 999
    },
    loader: {
        width: 50,
        height: 50
    }
});

export default Loader;