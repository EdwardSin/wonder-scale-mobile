import { Constants } from 'expo';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import colors from 'assets/variables/colors';

const WsStatusBar = () => (
    <View style={styles.statusbar}></View>
);
const styles = StyleSheet.create({
    statusbar: {
        height: Constants.statusBarHeight
    }
});
export default WsStatusBar;